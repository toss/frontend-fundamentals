// EVAL TASK: Predictability - Function Names That Shadow Library Patterns
// Expected: Identify that function names like `fetch`, `get`, `post` shadow common patterns and behave unexpectedly compared to standard APIs
// Domain: SaaS API client wrapper

type RequestConfig = {
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
  cache?: boolean;
};

type Response<T> = {
  data: T;
  status: number;
  headers: Record<string, string>;
};

// This shadows the global fetch and behaves very differently
export async function fetch<T>(url: string, config?: RequestConfig): Promise<T> {
  // Unlike native fetch, this returns data directly, not a Response object
  // This is confusing because developers expect fetch() to return Response
  const response = await window.fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
  });

  // Auto-parses JSON unlike native fetch
  const data = await response.json();

  // Throws on non-2xx unlike native fetch which only throws on network errors
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  // Also does automatic caching which native fetch doesn't do
  if (config?.cache !== false) {
    sessionStorage.setItem(`cache_${url}`, JSON.stringify(data));
  }

  return data as T;
}

// This shadows common HTTP method names but has unexpected behavior
export async function get<T>(url: string, params?: Record<string, string>): Promise<T> {
  // Unexpected: automatically adds auth header from localStorage
  const token = localStorage.getItem('authToken');

  // Unexpected: modifies the URL by adding a timestamp for cache busting
  const timestamp = Date.now();
  const queryParams = new URLSearchParams({ ...params, _t: String(timestamp) });
  const fullUrl = `${url}?${queryParams}`;

  // Unexpected: retries 3 times automatically
  let lastError: Error | null = null;
  for (let i = 0; i < 3; i++) {
    try {
      return await fetch<T>(fullUrl, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (err) {
      lastError = err as Error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // exponential backoff
    }
  }
  throw lastError;
}

// This shadows common HTTP method names and does unexpected things
export async function post<T, D = unknown>(url: string, data: D): Promise<T> {
  // Unexpected: validates data against a schema if it exists
  const schema = (window as any).__API_SCHEMAS__?.[url];
  if (schema && !schema.validate(data)) {
    throw new Error('Validation failed');
  }

  // Unexpected: adds CSRF token automatically
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  // Unexpected: logs all POST requests to console in non-production
  if (process.env.NODE_ENV !== 'production') {
    console.log('[API POST]', url, data);
  }

  const response = await window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken || '',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(data),
  });

  // Unexpected: automatically refreshes auth token if response includes new one
  const newToken = response.headers.get('X-New-Token');
  if (newToken) {
    localStorage.setItem('authToken', newToken);
  }

  return response.json();
}

// Naming suggests it deletes, but it actually just marks as deleted
export async function remove(url: string): Promise<void> {
  // Unexpected: doesn't actually DELETE, just POSTs a soft-delete flag
  await post(url, { _deleted: true, _deletedAt: new Date().toISOString() });
}

// Name suggests a simple request, but it does caching, retrying, and transformation
export async function request<T>(
  method: string,
  url: string,
  data?: unknown
): Promise<Response<T>> {
  // Check cache first for GET requests
  if (method === 'GET') {
    const cached = sessionStorage.getItem(`cache_${url}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      // Unexpected: returns cached data with fake status/headers
      return {
        data: parsed,
        status: 200,
        headers: { 'X-Cache': 'HIT' },
      };
    }
  }

  // Unexpected: transforms snake_case to camelCase in response
  const response = await window.fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });

  const json = await response.json();
  const transformed = transformKeys(json); // snake_case -> camelCase

  return {
    data: transformed as T,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
  };
}

// Helper that's not exported but affects all responses
function transformKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(transformKeys);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
        transformKeys(value),
      ])
    );
  }
  return obj;
}

// Default export that looks like axios but isn't
export default {
  get,
  post,
  delete: remove, // confusingly named
  request,
};

// Simple GraphQL API client for GitHub
export async function graphqlRequest(query: string, variables?: any, token?: string): Promise<any> {
  const response = await fetch('/api/github/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'GraphQL request failed');
  }

  return data;
}

// Auth endpoints
export const AUTH_LOGIN_URL = 'https://frontend-fundamentals.com/api/github/login';
export const USER_ME_URL = '/api/github/me';

// User info request
export async function getUserInfo(token: string): Promise<any> {
  const response = await fetch(USER_ME_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
}
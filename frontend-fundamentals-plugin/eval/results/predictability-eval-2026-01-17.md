# Predictability Skill Evaluation

> **Evaluation Timestamp:** 2026-01-17
> **Model:** Claude Opus 4.5

## Summary

| Task | Grade | Issue Found | Fix Suggested |
|------|-------|-------------|---------------|
| `hidden-side-effects.tsx` | PASS | Side effects in getter/calculator functions | Rename functions or move side effects to dedicated functions |
| `inconsistent-returns.tsx` | PASS | Functions return different types (string, boolean, objects with varying shapes) | Use discriminated union with consistent return shape |
| `use-cart.tsx` | PASS | Hidden analytics/localStorage in pure-looking functions (`getItemById`, `calculateShipping`, `isEligibleForFreeShipping`, `itemCount`, `subtotal`) | Separate pure calculations from side effects; make effects explicit |
| `api-client.ts` | PASS | Functions named `fetch`, `get`, `post`, `remove` shadow standard APIs and behave unexpectedly | Rename to distinctive names like `fetchWithAuth`, `getJSON`, `postWithRetry` |

**Overall Result: 4/4 PASS**

---

## Detailed Results

### hidden-side-effects.tsx

**Code Review:**

The file contains three functions with names that suggest pure operations but contain hidden side effects:

1. **`getUser()`** - The `get` prefix implies a pure getter, but it:
   - Calls `analytics.track('user_fetched')` as a side effect

2. **`calculateTotal(items)`** - The `calculate` prefix implies a pure calculation, but it:
   - Writes to `localStorage.setItem('lastTotal', String(total))`

3. **`formatDate(date)`** - The `format` prefix implies pure transformation, but it:
   - Logs to `console.log('Formatting date:', date)`

**Issue Identified:**

All three functions violate the principle of least surprise. Their names suggest they are pure functions (getters, calculators, formatters) but they contain hidden side effects:
- `getUser` tracks analytics
- `calculateTotal` persists to localStorage
- `formatDate` logs to console

Callers have no way to know these side effects occur just by looking at the function signatures or names.

**Suggested Fix:**

1. **Option A: Rename functions to include action verbs that indicate side effects:**
   ```typescript
   function fetchAndTrackUser() {
     const user = cache.get('user');
     analytics.track('user_fetched');
     return user;
   }

   function calculateAndPersistTotal(items: Item[]) {
     const total = items.reduce((sum, item) => sum + item.price, 0);
     localStorage.setItem('lastTotal', String(total));
     return total;
   }
   ```

2. **Option B: Move side effects to dedicated functions and keep pure functions pure:**
   ```typescript
   // Pure getter
   function getUser() {
     return cache.get('user');
   }

   // Dedicated side effect function
   function trackUserFetched() {
     analytics.track('user_fetched');
   }

   // Pure calculation
   function calculateTotal(items: Item[]) {
     return items.reduce((sum, item) => sum + item.price, 0);
   }

   // Pure formatter (remove console.log entirely or use a debug mode)
   function formatDate(date: Date) {
     return date.toLocaleDateString();
   }
   ```

**Grade:** PASS

**Reasoning:** Correctly identified all three hidden side effects in functions with misleading names (getUser, calculateTotal, formatDate). Suggested appropriate fixes: either rename functions to include action verbs that reveal the side effects, or separate the pure logic from the side effects into distinct functions. This aligns with the grader criteria for this task.

---

### inconsistent-returns.tsx

**Code Review:**

The file contains three validation functions that all serve a similar purpose (validate input) but return completely different types:

1. **`validateEmail(email)`**:
   - Returns `string` ('Email is required', 'Invalid email format') for errors
   - Returns `boolean` (`true`) for success
   - Return type is `string | boolean`

2. **`validatePassword(password)`**:
   - Returns `{ valid: false, error: 'Too short' }` for errors
   - Returns `{ valid: true }` for success (missing `error` field)
   - Object shape is inconsistent

3. **`validateUsername(username)`**:
   - Uses `ValidationResult` interface with `isValid` and optional `message`
   - Returns `{ isValid: false }` for errors (missing `message`)
   - Returns `{ isValid: true, message: 'Valid' }` for success (unnecessary `message`)
   - Inconsistent use of optional `message` field

**Issue Identified:**

The validation functions have inconsistent return types making them unpredictable to use:
- `validateEmail`: Returns `string | boolean` - completely mixed types
- `validatePassword`: Uses `valid` and `error` fields with inconsistent presence
- `validateUsername`: Uses `isValid` and `message` fields with inconsistent presence

This forces consumers to write complex type guards and makes the API confusing.

**Suggested Fix:**

Use a discriminated union type with a consistent return shape across all validators:

```typescript
type ValidationResult =
  | { isValid: true }
  | { isValid: false; message: string };

function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  if (!email.includes('@')) {
    return { isValid: false, message: 'Invalid email format' };
  }
  return { isValid: true };
}

function validatePassword(password: string): ValidationResult {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  return { isValid: true };
}

function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }
  return { isValid: true };
}
```

This discriminated union ensures:
- Consistent property names (`isValid`, `message`)
- `message` is only present when `isValid: false` (not optional - required for errors)
- TypeScript can narrow the type based on `isValid`

**Grade:** PASS

**Reasoning:** Correctly identified the core issue: three validation functions with the same purpose return completely different types (string/boolean, objects with different shapes, objects with inconsistent optional fields). Suggested the appropriate fix: a discriminated union type that provides consistent return shape. This matches the grader criteria exactly.

---

### use-cart.tsx

**Code Review:**

This is a React hook for shopping cart functionality. The hook contains several functions with hidden side effects:

**Functions with misleading names that have hidden side effects:**

1. **`itemCount` (useMemo)** - Name suggests a simple count:
   - Calls `analytics.track('cart_count_calculated', { count })`
   - Calls `console.log('[Cart] Item count:', count)`

2. **`subtotal` (useMemo)** - Name suggests a simple sum:
   - Writes `localStorage.setItem('lastCartSubtotal', String(total))`
   - Calls `analytics.track('high_value_cart', { subtotal: total })` conditionally

3. **`getItemById(id)`** - "get" prefix suggests pure lookup:
   - Calls `analytics.track('cart_item_lookup', { id, found: !!item })`
   - Reads and writes `localStorage` for "recently viewed in cart"

4. **`calculateShipping(zipCode)`** - "calculate" prefix suggests pure calculation:
   - Writes `localStorage.setItem('lastShippingZip', zipCode)`
   - Calls `analytics.track('shipping_calculated', { zipCode })`
   - Writes `sessionStorage.setItem('shipping_${zipCode}', String(total))`

5. **`isEligibleForFreeShipping()`** - "is" prefix suggests pure boolean check:
   - Calls `analytics.track('free_shipping_check', {...})`
   - Calls `console.log()` conditionally
   - Dispatches `window.dispatchEvent(new CustomEvent('cart:nearFreeShipping', ...))`

**Functions where side effects are expected (setters/actions):**
- `addItem`, `removeItem`, `updateQuantity`, `clearCart` - These have appropriate action-verb names, so side effects like localStorage writes and analytics are acceptable.

**Issue Identified:**

Multiple "pure-looking" functions contain hidden side effects:
- `itemCount` and `subtotal` (memoized values) trigger analytics and storage writes
- `getItemById` (getter) tracks lookups and updates "recently viewed"
- `calculateShipping` (calculator) persists data and tracks analytics
- `isEligibleForFreeShipping` (predicate) tracks, logs, and dispatches events

These violate predictability because callers expect getters, calculators, and predicates to be pure.

**Suggested Fix:**

Separate pure calculations from side effects:

```typescript
export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // PURE calculations - no side effects
  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  // PURE getter - no side effects
  const getItemById = useCallback((id: string): CartItem | undefined => {
    return items.find(item => item.id === id);
  }, [items]);

  // PURE calculation - no side effects
  const calculateShipping = useCallback((zipCode: string): number => {
    const baseRate = 5.99;
    const distanceMultiplier = zipCode.startsWith('9') ? 1.5 : 1;
    const weightSurcharge = items.length > 5 ? 2.99 : 0;
    return baseRate * distanceMultiplier + weightSurcharge;
  }, [items]);

  // PURE predicate - no side effects
  const isEligibleForFreeShipping = useCallback((): boolean => {
    return subtotal >= 75;
  }, [subtotal]);

  // EXPLICIT side effect functions - clearly named
  const trackCartViewed = useCallback(() => {
    analytics.track('cart_count_calculated', { count: itemCount });
  }, [itemCount]);

  const trackItemLookup = useCallback((id: string, found: boolean) => {
    analytics.track('cart_item_lookup', { id, found });
  }, []);

  const trackShippingCalculation = useCallback((zipCode: string) => {
    analytics.track('shipping_calculated', { zipCode });
    localStorage.setItem('lastShippingZip', zipCode);
  }, []);

  // ... rest of the hook
}
```

Alternatively, if analytics must be automatic, use a wrapper pattern:

```typescript
// Hook for pure cart logic
function useCartState() { /* pure logic only */ }

// Hook that adds analytics layer
function useCartWithAnalytics() {
  const cart = useCartState();
  // Wrap functions to add tracking
  // Name makes it clear side effects occur
}
```

**Grade:** PASS

**Reasoning:** Correctly identified all hidden side effects in functions with misleading names: `itemCount`, `subtotal`, `getItemById`, `calculateShipping`, and `isEligibleForFreeShipping`. Differentiated these from action functions (addItem, removeItem, etc.) where side effects are expected. Suggested appropriate fix: separate pure calculations from side effects and make effects explicit through dedicated functions or naming. This matches the grader criteria.

---

### api-client.ts

**Code Review:**

This file exports API client functions that shadow common library/browser API names but behave very differently:

1. **`fetch<T>(url, config)`** - Shadows global `fetch`:
   - Returns data directly (not a `Response` object like native fetch)
   - Auto-parses JSON (native fetch requires `.json()` call)
   - Throws on non-2xx status (native fetch only throws on network errors)
   - Automatically caches to sessionStorage (native fetch doesn't cache)

2. **`get<T>(url, params)`** - Shadows common HTTP library pattern:
   - Auto-adds auth header from localStorage (unexpected)
   - Adds timestamp to URL for cache busting (unexpected)
   - Automatically retries 3 times with exponential backoff (unexpected)

3. **`post<T, D>(url, data)`** - Shadows common HTTP library pattern:
   - Validates against schema from `window.__API_SCHEMAS__` (unexpected)
   - Auto-adds CSRF token from meta tag (unexpected)
   - Logs in non-production (unexpected)
   - Auto-refreshes auth token from response header (unexpected)

4. **`remove(url)`** - Named like a DELETE operation:
   - Actually does a soft-delete via POST with `_deleted: true` flag
   - Doesn't perform actual HTTP DELETE

5. **`request<T>(method, url, data)`** - Generic request function:
   - Returns cached data with fake status/headers for GET requests
   - Transforms all response keys from snake_case to camelCase (unexpected)

6. **Default export** - Looks like axios but isn't:
   - `delete: remove` is confusingly aliased

**Issue Identified:**

All exported functions shadow standard browser/library API names (`fetch`, `get`, `post`, `request`, `remove`/`delete`) but behave very differently:
- `fetch` doesn't return a Response object
- `get` has auto-retry, auto-auth, auto-cache-busting
- `post` has schema validation, CSRF, token refresh
- `remove` doesn't actually DELETE
- `request` transforms response data and returns fake cached responses

Developers familiar with native fetch or libraries like axios will be surprised by this behavior.

**Suggested Fix:**

Rename functions to clearly indicate their enhanced/different behavior:

```typescript
// Clear that this is NOT the native fetch
export async function fetchJSON<T>(url: string, config?: RequestConfig): Promise<T> {
  // ... implementation
}

// Clear about what it does
export async function getWithAuth<T>(
  url: string,
  params?: Record<string, string>
): Promise<T> {
  // ... implementation
}

// Or more descriptive
export async function getJSONWithRetry<T>(
  url: string,
  params?: Record<string, string>
): Promise<T> {
  // ... implementation
}

// Clear about the auth and CSRF behavior
export async function postWithAuth<T, D = unknown>(
  url: string,
  data: D
): Promise<T> {
  // ... implementation
}

// VERY clear this is NOT a DELETE
export async function softDelete(url: string): Promise<void> {
  // ... implementation
}

// Clear about caching and transformation
export async function requestWithCache<T>(
  method: string,
  url: string,
  data?: unknown
): Promise<Response<T>> {
  // ... implementation
}

// Default export with clear naming
export default {
  getWithAuth,
  postWithAuth,
  softDelete,  // Not 'delete' which is misleading
  requestWithCache,
};
```

Alternatively, create an explicitly named client:

```typescript
// Makes it clear this is a custom client, not standard fetch/axios
export const apiClient = {
  get: getWithAuth,     // Users know apiClient.get !== fetch
  post: postWithAuth,
  delete: softDelete,
  request: requestWithCache,
};
```

**Grade:** PASS

**Reasoning:** Correctly identified that functions named `fetch`, `get`, `post`, `remove`, and `request` shadow standard browser/library APIs but behave very differently (auto-retry, auto-auth, JSON parsing, snake_case transformation, soft delete instead of DELETE, etc.). Suggested the appropriate fix: use distinctive names like `fetchJSON`, `getWithAuth`, `postWithAuth`, `softDelete`, `requestWithCache` to clearly indicate behavior differences from standard APIs. This matches the grader criteria exactly.

---

## Evaluation Summary

All four predictability tasks were evaluated and received **PASS** grades:

| Task | Key Issue | Key Fix |
|------|-----------|---------|
| `hidden-side-effects.tsx` | Getter/calculator names hide side effects | Rename or separate pure from impure |
| `inconsistent-returns.tsx` | Validation functions return different types | Discriminated union with consistent shape |
| `use-cart.tsx` | Pure-looking hook functions have hidden effects | Separate pure calculations from explicit effects |
| `api-client.ts` | Function names shadow standard APIs | Use distinctive names revealing behavior |

**Predictability Skill: PASS (4/4 tasks)**

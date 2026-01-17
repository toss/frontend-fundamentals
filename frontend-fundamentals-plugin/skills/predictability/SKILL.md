---
name: predictability
description: Use when reviewing or writing code where function names don't match behavior, return types vary, or side effects are hidden.
---

# Predictability

Functions should behave as their names suggest. No hidden surprises.

## When to Apply

- Function named "get" or "calculate" but has side effects
- Similar functions return different types
- Names shadow well-known library names
- Type system doesn't prevent invalid states

## Key Pattern: Reveal Hidden Logic

If a function does more than its name suggests, the name is lying:

❌ Bad:
```tsx
function getUser() {
  const user = cache.get('user');
  analytics.track('user_fetched'); // Hidden side effect!
  return user;
}
```

✅ Good:
```tsx
function getUser() {
  return cache.get('user');
}

function fetchUserWithTracking() {
  const user = getUser();
  analytics.track('user_fetched');
  return user;
}
```

## Key Pattern: Unify Return Types

Similar functions should return consistent types:

❌ Bad:
```tsx
function validateEmail(email: string) {
  if (!email) return 'Email required';     // string
  if (!email.includes('@')) return 'Invalid'; // string
  return true;                              // boolean
}
```

✅ Good:
```tsx
type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

function validateEmail(email: string): ValidationResult {
  if (!email) return { ok: false, error: 'Email required' };
  if (!email.includes('@')) return { ok: false, error: 'Invalid' };
  return { ok: true };
}
```

## Quick Reference

| Smell | Fix |
|-------|-----|
| `getX()` with side effects | Split: pure getter + explicit action function |
| `calculateX()` that saves to storage | Rename to `calculateAndSaveX()` or split |
| Different return types for same operation | Discriminated union: `{ ok: true } \| { ok: false; error }` |
| Function named `map` that filters | Use distinctive name, don't shadow builtins |
| Boolean flags that allow invalid states | Sum types / discriminated unions |

## Anti-Patterns to Avoid

- Don't remove useful side effects entirely; relocate them explicitly
- Don't create overly complex type gymnastics
- Don't break existing API contracts without migration path

Reference: https://frontend-fundamentals.com/code-quality/predictable/

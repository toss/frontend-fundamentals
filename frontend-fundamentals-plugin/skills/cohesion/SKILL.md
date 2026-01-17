---
name: cohesion
description: Use when reviewing or writing code where related files are scattered, magic numbers are duplicated, or changes require touching many directories.
---

# Cohesion

Code that changes together should live together. Related logic belongs in one place.

## When to Apply

- Same constant/value repeated across multiple files
- Feature changes require modifying 5+ scattered directories
- Related types, hooks, and components in separate folder hierarchies
- Import paths span many unrelated directories

## Key Pattern: Colocate by Feature

When files always change together, put them together:

❌ Bad:
```
src/
├── components/UserForm.tsx
├── hooks/useUserValidation.ts
├── utils/userHelpers.ts
├── types/userTypes.ts
└── api/userApi.ts
```

✅ Good:
```
src/features/user/
├── UserForm.tsx
├── useUserValidation.ts
├── userHelpers.ts
├── types.ts
└── api.ts
```

## Key Pattern: Single Source of Truth

Magic numbers appearing in multiple places should be centralized:

❌ Bad:
```tsx
// Pagination.tsx
const pages = Math.ceil(total / 20);

// useItems.ts
const offset = (page - 1) * 20;

// api.ts
const limit = params.limit || 20;
```

✅ Good:
```tsx
// constants.ts
export const PAGE_SIZE = 20;

// All files import PAGE_SIZE
import { PAGE_SIZE } from './constants';
```

## Quick Reference

| Smell | Fix |
|-------|-----|
| Same magic number in 3+ files | Extract to shared constant |
| Feature touches `components/`, `hooks/`, `utils/`, `types/` | Colocate in `features/featureName/` |
| Long relative imports `../../..` | Files probably belong closer together |
| Copy-paste of business logic | Extract to shared module in feature folder |
| Types defined far from usage | Colocate types with the code that uses them |

## When Duplication is OK

Strategic duplication is acceptable when:
- Two features will likely diverge
- Coupling would create unwanted dependencies
- The "shared" code is trivial (< 5 lines)

## Anti-Patterns to Avoid

- Don't force unrelated code together just because it's similar
- Don't create deep nested folder hierarchies
- Don't prematurely abstract; wait for 3+ usages

Reference: https://frontend-fundamentals.com/code-quality/cohesive/

# EVAL TASK: Cohesion - Scattered Files

## Expected Issue
Identify that user-related files are scattered across the codebase, making it hard to understand and modify user features as a unit.

## Current Structure (problematic)

```
src/
├── components/
│   └── UserForm.tsx
├── hooks/
│   └── useUserValidation.ts
├── utils/
│   └── userHelpers.ts
├── types/
│   └── userTypes.ts
└── api/
    └── userApi.ts
```

## Problem
When modifying user features, you need to touch 5 different directories. Changes to user logic require understanding relationships across scattered files.

## Expected Suggestion
Colocate user-related files:

```
src/
├── features/
│   └── user/
│       ├── UserForm.tsx
│       ├── useUserValidation.ts
│       ├── userHelpers.ts
│       ├── userTypes.ts
│       └── userApi.ts
```

## Context
- UserForm.tsx imports useUserValidation
- useUserValidation imports userTypes
- userHelpers is only used by UserForm
- userApi is called by useUserValidation
- All 5 files change together when user requirements change

---
name: readability
description: Use when reviewing or writing code where logic is hard to follow, conditions are complex, or magic numbers appear.
---

# Readability

Code should be easy to read and understand. Readers should grasp intent without mental gymnastics.

## When to Apply

- Complex conditionals that require tracing multiple paths
- Magic numbers without semantic meaning
- Nested ternaries that obscure logic
- Components mixing unrelated execution paths
- Implementation details leaking into high-level code

## Key Pattern: Separate Code That Doesn't Run Together

When a component has branches for completely different user types, split it:

❌ Bad:
```tsx
function SubmitButton() {
  const isAdmin = useRole() === 'admin';
  useEffect(() => { if (!isAdmin) return; showAnimation(); }, [isAdmin]);
  return isAdmin ? <AdminBtn onClick={approve} /> : <UserBtn disabled />;
}
```

✅ Good:
```tsx
function SubmitButton() {
  const role = useRole();
  if (role === 'admin') return <AdminSubmitButton />;
  return <UserSubmitButton />;
}

function AdminSubmitButton() {
  useEffect(() => { showAnimation(); }, []);
  return <button onClick={approve}>Approve & Submit</button>;
}

function UserSubmitButton() {
  return <button disabled={!canSubmit}>Submit for Review</button>;
}
```

## Quick Reference

| Smell | Fix |
|-------|-----|
| Nested ternary `a ? b ? c : d : e` | Early returns or if/else blocks |
| Magic number `if (x > 86400)` | Named constant `const SECONDS_PER_DAY = 86400` |
| Complex condition `if (a && !b \|\| c)` | Extract to named boolean `const canProceed = ...` |
| Mixed branches for different users | Split into separate components per user type |
| Low-level details in component | Extract to well-named helper function |

## Anti-Patterns to Avoid

- Don't over-abstract: 3 similar lines is better than premature abstraction
- Don't add comments to explain bad code; fix the code instead
- Don't create deep component hierarchies for "flexibility"

Reference: https://frontend-fundamentals.com/code-quality/readable/

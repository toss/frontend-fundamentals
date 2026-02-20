# Evaluation Grading Criteria

## Grading Scale

| Grade | Criteria |
|-------|----------|
| **PASS** | Correctly identifies the seeded issue AND suggests appropriate fix |
| **PARTIAL** | Identifies issue but suggests wrong/harmful fix OR misses secondary issues |
| **FAIL** | Misses critical issue OR suggests harmful change |

## Per-Principle Grading

### Readability

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `mixed-branches.tsx` | Code for different user roles mixed in one component | Split into separate components by role | Over-abstracting into a factory pattern |
| `nested-ternary.tsx` | Nested ternaries are hard to read | Early returns, if/else, or switch | Adding more comments to explain ternaries |
| `magic-numbers.tsx` | Numbers without semantic meaning | Named constants with clear names | Inline comments explaining numbers |
| `checkout-summary.tsx` | Guest/member/premium logic interleaved in one component | Separate components per user type (GuestCheckout, MemberCheckout, PremiumCheckout) | Adding more conditionals or flags |
| `notification-badge.tsx` | 4-5 levels of nested ternary operators | Extract to helper functions or lookup objects | Keeping ternaries with added comments |

**Must NOT Suggest:**
- Over-abstraction that reduces readability
- Premature DRY that obscures intent
- Adding layers of indirection for "future flexibility"

### Predictability

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `hidden-side-effects.tsx` | Side effects in functions named as getters/calculators | Move side effects to dedicated functions, rename to include action verb | Keeping side effects but adding comments |
| `inconsistent-returns.tsx` | Functions with same purpose return different types | Discriminated union type, consistent return shape | Keeping inconsistent types with type guards |
| `use-cart.tsx` | Hidden analytics/localStorage in "pure" functions like `getItemById`, `calculateShipping` | Separate pure calculations from side effects; make effects explicit | Documenting side effects in JSDoc only |
| `api-client.ts` | Functions named `fetch`, `get`, `post` behave differently from browser/library APIs | Use distinctive names like `fetchWithAuth`, `getJSON`, `postWithRetry` | Keeping same names with documentation |

**Must NOT Suggest:**
- Breaking existing API contracts
- Removing useful side effects entirely without replacement
- Overly complex type gymnastics

### Cohesion

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `scattered-files.md` | Related files spread across directories | Colocate by feature/domain | Create one giant file with everything |
| `magic-number-duplication.tsx` | Same magic number in multiple files | Single source of truth constant | Different constants per file with same value |
| `payment-flow/` | Payment feature code scattered across 7 directories | Colocate all payment code in `features/payment/` | Create abstract "shared" modules |

**Must NOT Suggest:**
- Premature abstraction
- Forcing unrelated code together
- Creating deep folder hierarchies

### Coupling

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `props-drilling.tsx` | Props passed through many component layers | Composition pattern, Context where appropriate | Global state for everything |
| `god-hook.tsx` | Hook doing too many unrelated things | Split into focused single-responsibility hooks | More flags and options in the same hook |
| `dashboard-layout.tsx` | Props drilled through 4-5 component layers | Composition pattern (children), Context for truly shared state | Redux/global store for all props |
| `use-dashboard.tsx` | God hook with 18 useState, 12 useEffect, 30+ returned values | Split into useUser, usePreferences, useWidgets, useNotifications, etc. | Adding more parameters to control behavior |

**Must NOT Suggest:**
- Over-centralized state management
- Coupling through new abstractions
- Moving all logic to a single "smart" component

## Evaluation Protocol

1. **Run each task 3 times** (model outputs are stochastic)
2. **Grade each trial independently** using criteria above
3. **Record outcome**: PASS / PARTIAL / FAIL with reasoning
4. **Skill passes if**: ≥2/3 trials achieve PASS

## Recording Format

```markdown
## [Task Name]

### Trial 1
- **Grade**: PASS / PARTIAL / FAIL
- **Identified Issue**: [quote or summary]
- **Suggested Fix**: [quote or summary]
- **Reasoning**: [why this grade]

### Trial 2
...

### Trial 3
...

### Summary
- Pass Rate: X/3
- Common Failures: [patterns if any]
```

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

**Must NOT Suggest:**
- Over-abstraction that reduces readability
- Premature DRY that obscures intent
- Adding layers of indirection for "future flexibility"

### Predictability

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `hidden-side-effects.tsx` | Side effects in functions named as getters/calculators | Move side effects to dedicated functions, rename to include action verb | Keeping side effects but adding comments |
| `inconsistent-returns.tsx` | Functions with same purpose return different types | Discriminated union type, consistent return shape | Keeping inconsistent types with type guards |

**Must NOT Suggest:**
- Breaking existing API contracts
- Removing useful side effects entirely without replacement
- Overly complex type gymnastics

### Cohesion

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `scattered-files.md` | Related files spread across directories | Colocate by feature/domain | Create one giant file with everything |
| `magic-number-duplication.tsx` | Same magic number in multiple files | Single source of truth constant | Different constants per file with same value |

**Must NOT Suggest:**
- Premature abstraction
- Forcing unrelated code together
- Creating deep folder hierarchies

### Coupling

| Task | Must Catch | Good Fix | Bad Fix |
|------|-----------|----------|---------|
| `props-drilling.tsx` | Props passed through many component layers | Composition pattern, Context where appropriate | Global state for everything |
| `god-hook.tsx` | Hook doing too many unrelated things | Split into focused single-responsibility hooks | More flags and options in the same hook |

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

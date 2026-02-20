# Running Evaluations

## Purpose

Evaluate whether skills effectively guide Claude to identify code quality issues and suggest appropriate fixes.

## Prerequisites

```bash
# Ensure plugin is loaded
claude --plugin-dir ./frontend-fundamentals-plugin
```

## Evaluation Workflow

### Phase 1: Baseline (Without Skill)

Run each task WITHOUT the skill loaded to establish baseline performance.

```bash
# Start fresh session without skill
claude

# For each task, paste the code and ask:
"Review this code for quality issues and suggest improvements."
```

Record results in `eval/results/baseline-{date}.md`

### Phase 2: With Skill

Run each task WITH the relevant skill loaded.

```bash
# Start session with plugin
claude --plugin-dir ./frontend-fundamentals-plugin

# Invoke the skill first, then review
/readability  # or /predictability, /cohesion, /coupling

# Then paste code and ask:
"Review this code for {principle} issues."
```

Record results in `eval/results/with-skill-{date}.md`

## Task Prompts

### Readability Tasks

1. **mixed-branches.tsx**
   ```
   Review this React component for readability issues:
   [paste code]
   ```

2. **nested-ternary.tsx**
   ```
   Review these functions for readability issues:
   [paste code]
   ```

3. **magic-numbers.tsx**
   ```
   Review this code for readability issues:
   [paste code]
   ```

4. **checkout-summary.tsx** ⭐ NEW
   ```
   Review this e-commerce checkout component for readability issues:
   [paste code]
   ```

5. **notification-badge.tsx** ⭐ NEW
   ```
   Review this notification badge component for readability issues:
   [paste code]
   ```

### Predictability Tasks

1. **hidden-side-effects.tsx**
   ```
   Review these functions for predictability issues:
   [paste code]
   ```

2. **inconsistent-returns.tsx**
   ```
   Review these validation functions for predictability issues:
   [paste code]
   ```

3. **use-cart.tsx** ⭐ NEW
   ```
   Review this cart hook for predictability issues:
   [paste code]
   ```

4. **api-client.ts** ⭐ NEW
   ```
   Review this API client module for predictability issues:
   [paste code]
   ```

### Cohesion Tasks

1. **scattered-files.md**
   ```
   Review this directory structure for cohesion issues:
   [paste content]
   ```

2. **magic-number-duplication.tsx**
   ```
   Review this code spread across multiple files for cohesion issues:
   [paste code]
   ```

3. **payment-flow/** ⭐ NEW
   ```
   Review these payment feature files for cohesion issues.
   The files are currently organized as:
   - src/components/common/PaymentMethodSelector.tsx
   - src/components/forms/CreditCardForm.tsx
   - src/types/payment-types.ts
   - src/constants/payment-config.ts
   - src/utils/pricing.ts (contains payment-utils)
   - src/hooks/usePaymentValidation.ts
   - src/services/payment-api.ts

   [paste all files]
   ```

### Coupling Tasks

1. **props-drilling.tsx**
   ```
   Review these React components for coupling issues:
   [paste code]
   ```

2. **god-hook.tsx**
   ```
   Review this React hook for coupling issues:
   [paste code]
   ```

3. **dashboard-layout.tsx** ⭐ NEW
   ```
   Review this dashboard layout for coupling issues:
   [paste code]
   ```

4. **use-dashboard.tsx** ⭐ NEW
   ```
   Review this dashboard hook for coupling issues:
   [paste code]
   ```

## Grading

Use `eval/graders/grader.md` for grading criteria.

For each task:
1. Run 3 trials
2. Grade each: PASS / PARTIAL / FAIL
3. Record reasoning
4. Calculate pass rate (need ≥2/3 PASS)

## Results Template

Create file: `eval/results/{baseline|with-skill}-{YYYY-MM-DD}.md`

```markdown
# Eval Results: {Baseline|With Skill} - {Date}

## Summary
| Principle | Task | Pass Rate | Notes |
|-----------|------|-----------|-------|
| readability | mixed-branches | 0/3 | ... |
| readability | checkout-summary | 0/3 | ... |
| ... | ... | ... | ... |

## Detailed Results

### Readability

#### mixed-branches.tsx
[Use grader.md recording format]

...
```

## Task Inventory

| Principle | Task | Domain | Difficulty |
|-----------|------|--------|------------|
| readability | mixed-branches.tsx | Generic | Basic |
| readability | nested-ternary.tsx | Generic | Basic |
| readability | magic-numbers.tsx | Generic | Basic |
| readability | checkout-summary.tsx | E-commerce | Advanced |
| readability | notification-badge.tsx | SaaS | Advanced |
| predictability | hidden-side-effects.tsx | Generic | Basic |
| predictability | inconsistent-returns.tsx | Generic | Basic |
| predictability | use-cart.tsx | E-commerce | Advanced |
| predictability | api-client.ts | Generic | Advanced |
| cohesion | scattered-files.md | Generic | Basic |
| cohesion | magic-number-duplication.tsx | Generic | Basic |
| cohesion | payment-flow/ | Fintech | Advanced |
| coupling | props-drilling.tsx | Generic | Basic |
| coupling | god-hook.tsx | Generic | Basic |
| coupling | dashboard-layout.tsx | SaaS | Advanced |
| coupling | use-dashboard.tsx | SaaS | Advanced |

## Iterating on Skills

If pass rate < 2/3:

1. Analyze failure patterns
2. Identify gaps in skill guidance
3. Update skill with explicit guidance for failure cases
4. Re-run eval
5. Repeat until ≥2/3 pass rate

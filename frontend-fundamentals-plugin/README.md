# Frontend Fundamentals Plugin

A Claude Code plugin that reviews your code against [Frontend Fundamentals](https://frontend-fundamentals.com) principles by Toss.

## What It Does

This plugin helps you write better frontend code by checking for:

| Principle | What It Checks |
|-----------|----------------|
| **Cohesion** | Are related things together? (scattered files, magic numbers) |
| **Coupling** | Is change impact minimized? (props drilling, god hooks) |
| **Predictability** | Does code do what the name says? (hidden side effects) |
| **Readability** | Is code easy to follow? (nested ternaries, complex conditions) |

## Installation

```bash
claude plugin add https://github.com/toss/frontend-fundamentals
```

Or clone manually:
```bash
git clone https://github.com/toss/frontend-fundamentals.git
claude --plugin ./frontend-fundamentals/frontend-fundamentals-plugin
```

## Usage

### Option 1: Review After Coding

After you finish writing code, run the review command:

```
/review
```

The reviewer will:
1. Check your branch diff against `main`
2. Analyze code against the 4 principles
3. Output categorized findings (Critical / Warnings / Suggestions)

### Option 2: Iterative Improvement (Recommended)

Ask Claude to keep improving until the review passes:

```
Review my code with /review and fix any issues found.
Repeat until no critical issues remain.
```

Or be more specific:

```
1. Run /review on my changes
2. Fix all Critical and Warning issues
3. Run /review again to verify
4. Continue until clean
```

This creates a feedback loop where Claude:
1. Reviews your code
2. Fixes identified issues
3. Re-reviews to confirm fixes
4. Repeats until quality standards are met

### Option 3: Review Specific Files

```
/review src/components/UserForm.tsx
```

## Example Output

```markdown
# Code Review: feature/user-form

## Summary
Props drilling through 3 layers and inconsistent validation return types.

## Critical (must fix)
- **Coupling** `UserForm.tsx:L42` - Issue: `user` prop passes through
  Form → FormBody → FormFields without being used - Fix: Use composition
  pattern with children

## Warnings (should fix)
- **Predictability** `validators.ts:L15` - Issue: `validateName` returns
  boolean but `validateAge` returns object - Fix: Use consistent
  ValidationResult type

## Suggestions
- **Readability** `UserForm.tsx:L67` - Issue: Nested ternary for
  button state - Fix: Extract to named variable `const canSubmit = ...`
```

## Skills Reference

The plugin includes 4 skills you can also use directly:

- `cohesion` - Code organization and magic number patterns
- `coupling` - Component dependencies and props drilling
- `predictability` - Function naming and return type consistency
- `readability` - Code clarity and condition complexity

Load a skill directly:
```
Load the coupling skill and review this component
```

## Learn More

- [Frontend Fundamentals](https://frontend-fundamentals.com) - Full documentation
- [GitHub](https://github.com/toss/frontend-fundamentals) - Source code

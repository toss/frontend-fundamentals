# Frontend Fundamentals Plugin

> Claude Code plugin for automated code quality review

**Frontend Fundamentals Plugin** brings [Frontend Fundamentals](https://frontend-fundamentals.com) code quality principles directly into your Claude Code workflow. It automatically reviews your code against 4 core principles and suggests improvements.

## 🧭 When to Use

- 🔍 When you've finished coding and want a quick quality check
- 🔄 When you want Claude to iteratively improve code until it meets standards
- 👥 When you're reviewing a PR and want consistent quality criteria
- 🛠️ When your team wants to enforce shared code quality standards

## 📦 Installation

### From GitHub (Recommended)

**Step 1:** Add the marketplace
```bash
/plugin marketplace add toss/frontend-fundamentals
```

**Step 2:** Install the plugin
```bash
/plugin install frontend-fundamentals@toss-frontend-fundamentals
```

Or use the interactive UI: run `/plugin`, go to **Discover** tab, and select the plugin.

### From Local Clone

```bash
git clone https://github.com/toss/frontend-fundamentals.git
claude --plugin ./frontend-fundamentals/frontend-fundamentals-plugin
```

## 🚀 Usage

### Review After Coding

```
/frontend-fundamentals:review
```

Reviews your branch diff against `main` and outputs findings as Critical / Warnings / Suggestions.

### Iterative Improvement (Recommended)

Ask Claude to keep improving until the review passes:

```
Review my code with /frontend-fundamentals:review and fix any issues found.
Repeat until no critical issues remain.
```

This creates a feedback loop: review → fix → re-review → repeat until clean.

### Review Specific Files

```
/frontend-fundamentals:review src/components/UserForm.tsx
```

## 📚 Code Quality Principles

| Principle | What It Checks |
|-----------|----------------|
| **Cohesion** | Are related things together? (scattered files, magic numbers) |
| **Coupling** | Is change impact minimized? (props drilling, god hooks) |
| **Predictability** | Does code do what the name says? (hidden side effects) |
| **Readability** | Is code easy to follow? (nested ternaries, complex conditions) |

Learn more at [frontend-fundamentals.com/code-quality](https://frontend-fundamentals.com/code-quality/)

## 📝 Example Output

```markdown
# Code Review: feature/user-form

## Summary
Props drilling through 3 layers and inconsistent validation return types.

## Critical (must fix)
- **Coupling** `UserForm.tsx:L42` - Props pass through 3 layers unused
  → Use composition pattern with children

## Warnings (should fix)
- **Predictability** `validators.ts:L15` - Inconsistent return types
  → Use ValidationResult type for all validators
```

## License

MIT © Viva Republica, Inc. See [LICENSE](../LICENSE.md) for details.

<a title="Toss" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="Toss" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>

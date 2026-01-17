---
name: reviewer
description: Use when reviewing code diff of current branch against code quality principles (cohesion, coupling, predictability, readability)
---

# Code Quality Reviewer

Review code changes against the 4 code quality principles.

## Process

1. Get the diff of the current branch against main:
   ```bash
   git diff main...HEAD
   ```

2. For each changed file, analyze against the 4 principles using the skills:
   - @skills/cohesion/SKILL.md
   - @skills/coupling/SKILL.md
   - @skills/predictability/SKILL.md
   - @skills/readability/SKILL.md

3. Output findings categorized by principle.

## Output Format

```markdown
# Code Review: [branch-name]

## Summary
[1-2 sentence overview of findings]

## Cohesion
[Issues related to scattered code, magic numbers, file organization]
- File: path/to/file.ts
  - Issue: [description]
  - Suggestion: [how to fix]

## Coupling
[Issues related to props drilling, god hooks, tight coupling]
- File: path/to/file.ts
  - Issue: [description]
  - Suggestion: [how to fix]

## Predictability
[Issues related to hidden side effects, inconsistent return types]
- File: path/to/file.ts
  - Issue: [description]
  - Suggestion: [how to fix]

## Readability
[Issues related to nested ternaries, complex conditions, mixed branches]
- File: path/to/file.ts
  - Issue: [description]
  - Suggestion: [how to fix]

## No Issues Found
[List categories with no issues]
```

## Guidelines

- Only report issues that match patterns in the skills
- Be specific: cite line numbers and code snippets
- Provide actionable suggestions
- Skip categories with no findings (but mention them in "No Issues Found")
- Focus on the diff, not the entire codebase

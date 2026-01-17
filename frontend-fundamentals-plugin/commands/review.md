---
description: Review current branch diff against code quality principles
---

Dispatch the `reviewer` subagent to review the code diff of the current branch.

The reviewer will:
1. Get diff between current branch and main
2. Analyze changes against cohesion, coupling, predictability, readability principles
3. Output categorized findings with specific suggestions

$ARGUMENTS

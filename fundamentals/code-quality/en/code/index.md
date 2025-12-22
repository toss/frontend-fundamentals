---
comments: false
---

# Four Principles of Writing Good Code

Good frontend code is **easily modifiable** code.
When implementing new requirements, code that is easy to modify and deploy is considered good code.
You can determine if code is easily modifiable based on four criteria.

## 1. Readability

**Readability** refers to how easy it is to read the code.
For code to be easily modifiable, you must first understand what the code does.

Readable code has fewer contexts for the reader to consider at once and flows naturally from top to bottom.

### Strategies to Improve Readability

- **Reducing Context**
  - [Separate code that doesn't execute together](./examples/submit-button.md)
  - [Abstract implementation details](./examples/login-start-page.md)
  - [Split functions combined by logic type](./examples/use-page-state-readability.md)
- **Naming**
  - [Name complex conditions](./examples/condition-name.md)
  - [Name magic numbers](./examples/magic-number-readability.md)
- **Reading from Top to Bottom**
  - [Reduce context switching](./examples/user-policy.md)
  - [Simplify ternary operators](./examples/ternary-operator.md)
  - [Reading from Left to Right](./examples/comparison-order.md)

## 2. Predictability

**Predictability** refers to how well your colleagues can predict the behavior of a function or component.
Highly predictable code follows consistent rules, allowing one to understand its behavior just by looking at the function or component's name, parameters, and return values.

### Strategies to Improve Predictability

- [Manage names to avoid duplication](./examples/http.md)
- [Unify return types for similar functions](./examples/use-user.md)
- [Expose hidden logic](./examples/hidden-logic.md)

## 3. Cohesion

**Cohesion** refers to whether code that needs to be modified is always modified together.
Highly cohesive code does not cause unintended errors in other parts when one part is modified.
This is because the structure ensures that parts that need to be modified together are indeed modified together.

::: info Readability and Cohesion Can Conflict

Generally, to increase cohesion, you may need to make decisions that reduce readability, such as abstracting variables or functions.
If not modifying together can cause errors, prioritize cohesion by generalizing and abstracting the code.
If the risk is low, prioritize readability by allowing code duplication.

:::

### Strategies to Improve Cohesion

- [Place files that are modified together in the same directory](./examples/code-directory.md)
- [Eliminate magic numbers](./examples/magic-number-cohesion.md)
- [Consider form cohesion](./examples/form-fields.md)

## 4. Coupling

**Coupling** refers to the scope of impact when code is modified.
Code that is easy to modify has a limited scope of impact, making it easier to predict the range of changes.

### Strategies to Reduce Coupling

- [Manage responsibilities one at a time](./examples/use-page-state-coupling.md)
- [Allow code duplication](./examples/use-bottom-sheet.md)
- [Eliminate Props Drilling](./examples/item-edit-modal.md)

## Viewing Code Quality from Multiple Angles

Unfortunately, it is difficult to satisfy all four criteria simultaneously.

For example, to ensure that functions or variables are always modified together, you might generalize and abstract them, increasing cohesion. However, this reduces readability due to the abstraction.

Allowing code duplication can reduce the scope of impact, thus lowering coupling. However, if one side is modified and the other is not, cohesion decreases.

Frontend developers must deeply consider the current situation and prioritize which values to emphasize for long-term ease of modification.

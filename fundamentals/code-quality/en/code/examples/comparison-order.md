# Make Comparisons Read from Left to Right

<div style="margin-top: 16px">
<Badge type="info" text="Readability" />
</div>

When the order of inequality operators in range-checking conditions is not natural, it takes more time for code readers to understand the intent of the condition.

## 📝 Code Examples

The following code examples check if values satisfy range conditions.

```typescript
if (a >= b && a <= c) {
  ...
}

if (score >= 80 && score <= 100) {
  console.log("Excellent");
}

if (price >= minPrice && price <= maxPrice) {
  console.log("Affordable price");
}
```

## 👃 Code Smell Detection

### Readability

While these code examples are logically correct, they don't read naturally. Writing conditions like `a >= b && a <= c` requires checking the middle value `a` twice, which makes readers' minds work harder to understand the condition.

It would be more intuitive if it read naturally from left to right like mathematical range expressions: `b ≤ a ≤ c`.

## ✏️ Improvement

By writing conditions in an order that reads naturally from left to right (from range start to end), code readers can grasp the range at a glance.

```typescript
if (b <= a && a <= c) {
  ...
}

if (80 <= score && score <= 100) {
  console.log("Excellent");
}

if (minPrice <= price && price <= maxPrice) {
  console.log("Affordable price");
}
```

This way, conditions read like mathematical inequalities: `b ≤ a ≤ c`, `80 ≤ score ≤ 100`, `minPrice ≤ price ≤ maxPrice`, allowing code readers to intuitively understand range conditions.

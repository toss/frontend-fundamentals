# 让比较从左到右阅读

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

在范围检查的条件语句中，如果不等号的顺序不够自然，代码阅读者理解条件意图就需要更多时间。

## 📝 代码示例

以下代码检查数值是否满足范围条件。

```typescript
if (a >= b && a <= c) {
  ...
}

if (score >= 80 && score <= 100) {
  console.log("优秀");
}

if (price >= minPrice && price <= maxPrice) {
  console.log("合理价格");
}
```

## 👃 代码异味检测

### 可读性

这些代码在逻辑上是正确的，但阅读起来不够自然。像 `a >= b && a <= c` 这样写需要检查中间值 `a` 两次，这让代码阅读者理解条件时感到复杂。

如果能像数学中表示范围那样，按 `b ≤ a ≤ c` 的形式从左到右自然阅读，会更加直观。

## ✏️ 改进方法

按照从范围起点到终点、从左到右阅读的顺序编写条件，代码阅读者可以一眼看出范围。

```typescript
if (b <= a && a <= c) {
  ...
}

if (80 <= score && score <= 100) {
  console.log("优秀");
}

if (minPrice <= price && price <= maxPrice) {
  console.log("合理价格");
}
```

这样编写，条件读起来就像数学不等式：`b ≤ a ≤ c`、`80 ≤ score ≤ 100`、`minPrice ≤ price ≤ maxPrice`，让代码阅读者能够直观地理解范围条件。

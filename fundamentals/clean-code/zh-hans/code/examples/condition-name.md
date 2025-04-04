# 为复杂条件命名

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

如果复杂的条件表达式没有特定的命名，就很难一眼理解其含义。

## 📝 代码示例

下列代码实现了筛选类别和价格范围相匹配的商品的逻辑。

```typescript
const result = products.filter((product) =>
  product.categories.some(
    (category) =>
      category.id === targetCategory.id &&
      product.prices.some((price) => price >= minPrice && price <= maxPrice)
  )
);
```

## 👃 闻代码

### 可读性

在这段代码中，匿名函数和条件错综复杂。`filter`、`some`和`&&`等逻辑多层嵌套，导致很难确定正确的条件。

代码阅读者需要考虑的上下文过多，导致可读性变差。[^1]

[^1]: [程序员超强大脑](https://product.dangdang.com/29567786.html)一书中提到，人的大脑一次性能够处理和存储的信息大约是 6 个。

## ✏️ 尝试改善

以下代码展示了如何给条件加上明确的名称，以减少代码阅读者需要考虑的语境。

```typescript
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some(
      (price) => price >= minPrice && price <= maxPrice
    );

    return isSameCategory && isPriceInRange;
  });
});
```

通过明确命名筛选同类且价格范围的商品条件，可以避免追踪复杂的条件表达式，清晰表达代码的意图。

## 🔍 深入了解：为条件式命名的标准

什么时候适合给条件表达式或函数命名并将其提取？

### 适合为条件命名的情况

- **处理复杂逻辑时**：当条件语句或函数中的复杂逻辑跨越多行时，最好为其命名，明确展示函数的作用。这样可以提高代码可读性，维护和审查变得更加容易。

- **需要重用时**：如果同一逻辑可能在多个地方反复使用，可以通过声明变量或函数来实现重用。这样可以减少代码重复，便于后续的维护。

- **需要单元测试时**：分离函数后，可以独立编写单元测试。单元测试可以轻松验证函数是否正常工作，尤其在测试复杂逻辑时非常实用。

### 不需要为条件命名的情况

- **当逻辑简单时**：如果逻辑非常简单，实际上不需要为其命名。例如，将数组中的元素翻倍的代码 `arr.map(x => x * 2)` ，即使不命名，也很直观。

- **当只使用一次时**：如果某个逻辑在代码中只出现一次，而且逻辑并不复杂，那么在匿名函数中直接处理逻辑可能更加直观。

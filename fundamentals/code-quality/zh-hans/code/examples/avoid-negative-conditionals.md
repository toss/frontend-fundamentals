# 避免否定条件

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

否定条件会增加认知负担，因为在阅读代码时需要在头脑中进行额外的转换。
特别是使用双重否定时，理解代码意图会变得更加困难。

## 📝 代码示例

以下代码是根据商品库存状态显示购买按钮的组件。

```tsx
function CheckoutButton({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;

  if (!isOutOfStock) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

此代码使用了否定条件 `!isOutOfStock`。需要在头脑中将"不是缺货"转换为"有库存"，这使得代码难以阅读。

## 👃 识别代码异味

### 可读性

否定条件 `!isOutOfStock` 需要通过以下过程来理解：

1. 理解 `isOutOfStock` 的意思是"缺货"
2. 认识到 `!` 表示"不是"
3. 在头脑中将"不是缺货"→"有库存"进行转换

这种额外的转换过程会妨碍代码阅读的流畅性。

## ✏️ 改进方法

### 方法1: 改为肯定条件

将变量名改为肯定形式可以使其读起来更自然。

```jsx
function CheckoutButton({ product }) {
  const isAvailable = product.stock > 0;

  if (isAvailable) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

`isAvailable` 的意思"可购买"可以立即理解，代码变得更容易阅读。

### 方法2: 利用Early Return

先处理异常情况，可以更清晰地编写主要逻辑。

```jsx
function CheckoutButton({ product }) {
  const isOutOfStock = product.stock === 0;

  if (isOutOfStock) {
    return <Button disabled>품절</Button>;
  }

  return <Button onClick={handleCheckout}>구매하기</Button>;
}
```

先处理缺货状态，正常情况可以简单表达。

## 🔍 深入了解: 实际开发中常见的案例

### 案例1: 按钮启用状态

**❌ 双重否定 - 难以阅读**

```jsx
function SubmitButton({ form }) {
  const isInvalid = !form.email || !form.password;

  return (
    <Button disabled={!isInvalid}>
      {/* "不是无效"? */}
      提交
    </Button>
  );
}
```

**✅ 肯定变量名 - 易于阅读**

```jsx
function SubmitButton({ form }) {
  const isValid = form.email && form.password;

  return (
    <Button disabled={!isValid}>
      {/* "有效"的否定 → disabled */}
      提交
    </Button>
  );
}
```

### 案例2: 权限检查

**❌ 双重否定 - 难以阅读**

```jsx
function AdminPanel() {
  const user = useUser();

  if (!user.isNotAdmin) {
    // "不是非管理员"? 令人困惑
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

**✅ 肯定条件和肯定变量名 - 易于阅读**

```jsx
function AdminPanel() {
  const user = useUser();

  if (user.isAdmin) {
    // "是管理员" - 立即理解
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

### 案例3: 加载状态

**❌ 否定条件 - 难以阅读**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (!isLoading) {
    // "不在加载中" - 双重否定的感觉
    return <List items={data} />;
  }

  return <Spinner />;
}
```

**✅ Early Return - 易于阅读**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  return <List items={data} />;
}
```

## 💡 例外情况: 可以使用否定条件的情况

并非所有否定条件都是不好的。在以下情况下，否定条件更自然。

### 检查null/undefined时

```jsx
function OrderButton({ user, product }) {
  if (!user) {
    return <LoginButton />;
  }

  if (!product) {
    return <NotFound />;
  }

  return <Button onClick={handleCheckout}>주문하기</Button>;
}
```

在先检查 `null` 或 `undefined` 并提前退出的模式中，否定条件反而更清晰易读。

## ⛔️ 应避免的情况: 双重否定

双重否定会给代码阅读者带来不必要的认知负担，并增加误解的可能性。

**❌ 双重否定 - 令人困惑**

```jsx
if (!isNotActive) {
  // "不是不活跃" → "活跃"?
}

if (!product.isNotAvailable) {
  // "不是不可购买" → "可购买"?
}

if (!user.disabled !== false) {
  // 三重否定?! 无法理解
}
```

**✅ 肯定条件 - 清晰明确**

```jsx
if (isActive) {
  // "活跃" - 立即理解
}

if (product.isAvailable) {
  // "可购买" - 立即理解
}

if (user.enabled) {
  // "已启用" - 立即理解
}
```

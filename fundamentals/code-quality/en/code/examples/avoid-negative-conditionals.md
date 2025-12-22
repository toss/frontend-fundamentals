# Avoid Negative Conditionals

<div style="margin-top: 16px">
<Badge type="info" text="Readability" />
</div>

Negative conditionals increase cognitive load because they require an extra mental transformation when reading code.
When double negatives are used, it becomes even harder to understand the code's intent.

## 📝 Code Example

The following code is a component that displays a purchase button based on product stock status.

```tsx
function CheckoutButton({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;

  if (!isOutOfStock) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

This code uses the negative condition `!isOutOfStock`. You have to mentally convert "not out of stock" to "in stock", which makes it harder to read.

## 👃 Detecting Code Smells

### Readability

The negative condition `!isOutOfStock` requires the following mental process:

1. Understand that `isOutOfStock` means "out of stock"
2. Recognize that `!` means "not"
3. Mentally convert "not out of stock" → "in stock"

This extra conversion step disrupts the flow of reading code.

## ✏️ Improvements

### Method 1: Change to Positive Condition

Changing the variable name to a positive form makes it read naturally.

```jsx
function CheckoutButton({ product }) {
  const isAvailable = product.stock > 0;

  if (isAvailable) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

`isAvailable` conveys the meaning "available for purchase" immediately, making the code much easier to read.

### Method 2: Use Early Return

Handling edge cases first allows you to write the main logic more clearly.

```jsx
function CheckoutButton({ product }) {
  const isOutOfStock = product.stock === 0;

  if (isOutOfStock) {
    return <Button disabled>품절</Button>;
  }

  return <Button onClick={handleCheckout}>구매하기</Button>;
}
```

Handle the out-of-stock state first, then express the normal case simply.

## 🔍 More Examples: Common Cases in Real Development

### Case 1: Button Enabled State

**❌ Double Negative - Hard to Read**

```jsx
function SubmitButton({ form }) {
  const isInvalid = !form.email || !form.password;

  return (
    <Button disabled={!isInvalid}>
      {/* "Not not valid"? */}
      Submit
    </Button>
  );
}
```

**✅ Positive Variable Name - Easy to Read**

```jsx
function SubmitButton({ form }) {
  const isValid = form.email && form.password;

  return (
    <Button disabled={!isValid}>
      {/* "Valid" negated → disabled */}
      Submit
    </Button>
  );
}
```

### Case 2: Permission Check

**❌ Double Negative - Hard to Read**

```jsx
function AdminPanel() {
  const user = useUser();

  if (!user.isNotAdmin) {
    // "Not not admin"? Confusing
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

**✅ Positive Condition and Variable Name - Easy to Read**

```jsx
function AdminPanel() {
  const user = useUser();

  if (user.isAdmin) {
    // "Is admin" - immediately understood
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

### Case 3: Loading State

**❌ Negative Condition - Hard to Read**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (!isLoading) {
    // "Not loading" - feels like double negative
    return <List items={data} />;
  }

  return <Spinner />;
}
```

**✅ Early Return - Easy to Read**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  return <List items={data} />;
}
```

## 💡 Exception: When It's Okay to Use Negative Conditions

Not all negative conditions are bad. In the following cases, negative conditions are more natural.

### When Checking for null/undefined

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

In patterns where you check for `null` or `undefined` first and exit early, negative conditions are actually clearer and easier to read.

## ⛔️ What to Avoid: Double Negatives

Double negatives impose unnecessary cognitive load on readers and increase the chance of misunderstanding.

**❌ Double Negative - Confusing**

```jsx
if (!isNotActive) {
  // "Not not active" → "active"?
}

if (!product.isNotAvailable) {
  // "Not not available" → "available"?
}

if (!user.disabled !== false) {
  // Triple negative?! Incomprehensible
}
```

**✅ Positive Condition - Clear**

```jsx
if (isActive) {
  // "Is active" - immediately understood
}

if (product.isAvailable) {
  // "Is available" - immediately understood
}

if (user.enabled) {
  // "Is enabled" - immediately understood
}
```

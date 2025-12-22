# 否定条件文を避ける

<div style="margin-top: 16px">
<Badge type="info" text="可読性" />
</div>

否定条件文は、コードを読むときに頭の中でもう一度変換する必要があるため、認知負荷を高めます。
特に二重否定が使われると、コードの意図を把握することがさらに難しくなります。

## 📝 コード例

次のコードは、商品の在庫状態に応じて購入ボタンを表示するコンポーネントです。

```tsx
function CheckoutButton({ product }: { product: Product }) {
  const isOutOfStock = product.stock === 0;

  if (!isOutOfStock) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

このコードは `!isOutOfStock` という否定条件を使用しています。「在庫切れではない」を頭の中で「在庫がある」に変換する必要があり、読みにくくなっています。

## 👃 コードの臭いを嗅ぎ分ける

### 可読性

否定条件 `!isOutOfStock` は、次のようなプロセスで理解する必要があります。

1. `isOutOfStock` が「在庫切れ」という意味を把握
2. `!` が「ではない」ということを認識
3. 頭の中で「在庫切れではない」→「在庫がある」に変換

このように一度変換するプロセスがコードを読む流れを妨げます。

## ✏️ 改善してみる

### 方法1: 肯定条件に変更する

変数名を肯定形に変えると自然に読めるようになります。

```jsx
function CheckoutButton({ product }) {
  const isAvailable = product.stock > 0;

  if (isAvailable) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

`isAvailable` は「購入可能」という意味がすぐに理解でき、コードがはるかに読みやすくなります。

### 方法2: Early Returnを活用する

例外状況を先に処理すると、メインロジックをより明確に書くことができます。

```jsx
function CheckoutButton({ product }) {
  const isOutOfStock = product.stock === 0;

  if (isOutOfStock) {
    return <Button disabled>품절</Button>;
  }

  return <Button onClick={handleCheckout}>구매하기</Button>;
}
```

在庫切れ状態を先に処理し、正常ケースはシンプルに表現できます。

## 🔍 さらに詳しく: 実際の開発でよく見られる事例

### 事例1: ボタンの有効状態

**❌ 二重否定 - 読みにくい**

```jsx
function SubmitButton({ form }) {
  const isInvalid = !form.email || !form.password;

  return (
    <Button disabled={!isInvalid}>
      {/* "無効ではない"? */}
      送信
    </Button>
  );
}
```

**✅ 肯定的な変数名 - 読みやすい**

```jsx
function SubmitButton({ form }) {
  const isValid = form.email && form.password;

  return (
    <Button disabled={!isValid}>
      {/* "有効"を否定 → disabled */}
      送信
    </Button>
  );
}
```

### 事例2: 権限チェック

**❌ 二重否定 - 読みにくい**

```jsx
function AdminPanel() {
  const user = useUser();

  if (!user.isNotAdmin) {
    // "管理者ではないのではない"? 混乱します
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

**✅ 肯定条件と肯定的な変数名 - 読みやすい**

```jsx
function AdminPanel() {
  const user = useUser();

  if (user.isAdmin) {
    // "管理者である" - すぐに理解できる
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

### 事例3: ローディング状態

**❌ 否定条件 - 読みにくい**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (!isLoading) {
    // "ローディング中ではない" - 二重否定の感じ
    return <List items={data} />;
  }

  return <Spinner />;
}
```

**✅ Early Return - 読みやすい**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  return <List items={data} />;
}
```

## 💡 例外: 否定条件を使っても問題ない場合

すべての否定条件が悪いわけではありません。次のような場合には否定条件がより自然です。

### null/undefinedをチェックする時

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

`null` や `undefined` を先にチェックして終了するパターンでは、否定条件の方がかえって明確で読みやすくなります。

## ⛔️ 避けるべき点: 二重否定

二重否定はコードを読む人に不要な認知負荷を与え、誤解する可能性を高めます。

**❌ 二重否定 - 混乱する**

```jsx
if (!isNotActive) {
  // "非アクティブではない" → "アクティブ"?
}

if (!product.isNotAvailable) {
  // "購入不可能ではない" → "購入可能"?
}

if (!user.disabled !== false) {
  // 三重否定?! 理解不能
}
```

**✅ 肯定条件 - 明確**

```jsx
if (isActive) {
  // "アクティブである" - すぐに理解できる
}

if (product.isAvailable) {
  // "購入可能である" - すぐに理解できる
}

if (user.enabled) {
  // "有効である" - すぐに理解できる
}
```


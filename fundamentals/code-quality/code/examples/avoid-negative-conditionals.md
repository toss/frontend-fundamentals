# 부정 조건문 피하기

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

부정 조건문은 코드를 읽을 때 머릿속에서 한 번 더 변환해야 해서 인지 부하를 높여요.
특히 이중 부정이 사용되면 코드의 의도를 파악하기 더욱 어려워져요.

## 📝 코드 예시

다음 코드는 상품의 재고 상태에 따라 구매 버튼을 표시하는 컴포넌트예요.

```jsx
function CheckoutButton({ product }) {
  const isOutOfStock = product.stock === 0;

  if (!isOutOfStock) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

이 코드는 `!isOutOfStock`이라는 부정 조건을 사용해요. "재고가 없지 않다"를 머릿속에서 "재고가 있다"로 바꿔야 해서 읽기 불편해요.

## 👃 코드 냄새 맡아보기

### 가독성

부정 조건 `!isOutOfStock`은 다음과 같은 과정으로 이해해야 해요.

1. `isOutOfStock`이 "품절"이라는 의미를 파악
2. `!`가 "아니다"라는 것을 인식
3. 머릿속에서 "품절이 아니다" → "재고가 있다"로 변환

이렇게 한 번 더 변환하는 과정이 코드를 읽는 흐름을 방해해요.

## ✏️ 개선해보기

### 방법 1: 긍정 조건으로 변경하기

변수 이름을 긍정형으로 바꾸면 자연스럽게 읽혀요.

```jsx
function CheckoutButton({ product }) {
  const isAvailable = product.stock > 0;

  if (isAvailable) {
    return <Button onClick={handleCheckout}>구매하기</Button>;
  }

  return <Button disabled>품절</Button>;
}
```

`isAvailable`은 "구매 가능하다"라는 의미가 바로 이해되어서, 코드가 훨씬 읽기 편해요.

### 방법 2: Early Return 활용하기

예외 상황을 먼저 처리하면, 메인 로직을 더 명확하게 작성할 수 있어요.

```jsx
function CheckoutButton({ product }) {
  const isOutOfStock = product.stock === 0;

  if (isOutOfStock) {
    return <Button disabled>품절</Button>;
  }

  return <Button onClick={handleCheckout}>구매하기</Button>;
}
```

품절 상태를 먼저 처리하고, 정상 케이스는 간단하게 표현할 수 있어요.

## 🔍 더 알아보기: 실제 개발에서 자주 보는 사례

### 사례 1: 버튼 활성화 상태

**❌ 이중 부정 - 읽기 불편함**

```jsx
function SubmitButton({ form }) {
  const isInvalid = !form.email || !form.password;

  return (
    <Button disabled={!isInvalid}>
      {/* "유효하지 않지 않다"? */}
      제출
    </Button>
  );
}
```

**✅ 긍정 변수명 - 읽기 편함**

```jsx
function SubmitButton({ form }) {
  const isValid = form.email && form.password;

  return (
    <Button disabled={!isValid}>
      {/* "유효하다"를 부정 → disabled */}
      제출
    </Button>
  );
}
```

### 사례 2: 권한 체크

**❌ 이중 부정 - 읽기 불편함**

```jsx
function AdminPanel() {
  const user = useUser();

  if (!user.isNotAdmin) {
    // "관리자가 아닌게 아니다"? 헷갈려요
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

**✅ 긍정 조건 및 긍정 변수명 - 읽기 편함**

```jsx
function AdminPanel() {
  const user = useUser();

  if (user.isAdmin) {
    // "관리자다" - 바로 이해됨
    return <AdminDashboard />;
  }

  return <AccessDenied />;
}
```

### 사례 3: 로딩 상태

**❌ 부정 조건 - 읽기 불편함**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (!isLoading) {
    // "로딩 중이 아니다" - 이중 부정 느낌
    return <List items={data} />;
  }

  return <Spinner />;
}
```

**✅ Early Return - 읽기 편함**

```jsx
function ProductList() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  return <List items={data} />;
}
```

## 💡 예외 상황: 부정 조건을 사용해도 괜찮을 때

모든 부정 조건이 나쁜 것은 아니에요. 다음과 같은 경우에는 부정 조건이 더 자연스러워요.

### null/undefined 체크할 때

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

`null`이나 `undefined`을 먼저 체크하고 종료하는 패턴에서는, 부정 조건이 오히려 더 명확하고 읽기 쉬워요.

## ⛔️ 피해야 할 점: 이중 부정

이중 부정은 코드를 읽는 사람에게 불필요한 인지 부하를 주고, 실수로 잘못 이해할 가능성을 높여요.

**❌ 이중 부정 - 헷갈림**

```jsx
if (!isNotActive) {
  // "활성화되지 않지 않았다" → "활성화되었다"?
}

if (!product.isNotAvailable) {
  // "구매 불가능하지 않다" → "구매 가능하다"?
}

if (!user.disabled !== false) {
  // 삼중 부정?! 이해 불가
}
```

**✅ 긍정 조건 - 명확함**

```jsx
if (isActive) {
  // "활성화되었다" - 바로 이해됨
}

if (product.isAvailable) {
  // "구매 가능하다" - 바로 이해됨
}

if (user.enabled) {
  // "활성화되었다" - 바로 이해됨
}
```

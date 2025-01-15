# 복잡한 조건에 이름 붙이기

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

복잡한 조건식이 특별한 이름 없이 사용되면, 조건이 뜻하는 바를 한눈에 파악하기 어려워요.

## 📝 코드 예시

다음 코드는 상품 중에서 카테고리와 가격 범위가 일치하는 상품만 필터링하는 로직이에요.

```typescript
const result = products.filter((product) =>
  product.categories.some(
    (category) =>
      category.id === targetCategory.id &&
      product.prices.some(
        (price) => price >= minPrice && price <= maxPrice
      )
  )
);
```

## 👃 코드 냄새 맡아보기

### 가독성

이 코드에서는 익명 함수와 조건이 복잡하게 얽혀 있어요. `filter`와 `some`, `&&` 같은 로직이 여러 단계로 중첩되어 있어서 정확한 조건을 파악하기 어려워졌어요.

코드를 읽는 사람이 한 번에 고려해야 하는 맥락이 많아서, 가독성이 떨어져요. [^1]

[^1]: [프로그래머의 뇌](https://www.yes24.com/product/goods/105911017)에 따르면, 사람의 뇌가 한 번에 저장할 수 있는 정보의 숫자는 6개라고 해요.

## ✏️ 개선해보기

다음 코드와 같이 조건에 명시적인 이름을 붙이면, 코드를 읽는 사람이 한 번에 고려해야 할 맥락을 줄일 수 있어요.

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

명시적으로 같은 카테고리 안에 속해 있고, 가격 범위가 맞는 제품들로 필터링한다고 작성함으로써, 복잡한 조건식을 따라가지 않고도 코드의 의도를 명확히 드러낼 수 있어요.

## 🔍 더 알아보기: 조건식에 이름을 붙이는 기준

언제 조건식이나 함수에 이름을 붙이고 분리하는 것이 좋을까요?

### 조건에 이름을 붙이는 것이 좋을 때

- **복잡한 로직을 다룰 때**: 조건문이나 함수에서 복잡한 로직이 여러 줄에 걸쳐 처리되면, 이름을 붙여 함수의 역할을 명확히 드러내는 것이 좋아요. 이렇게 하면 코드 가독성이 높아지고, 유지보수나 코드 리뷰가 더 쉬워져요.

- **재사용성이 필요할 때**: 동일한 로직을 여러 곳에서 반복적으로 사용할 가능성이 있으면, 변수나 함수를 선언해 재사용할 수 있어요. 이를 통해 코드 중복을 줄이고 유지보수가 더 쉬워져요.

- **단위 테스트가 필요할 때**: 함수를 분리하면 독립적으로 단위 테스트를 작성할 수 있어요. 단위 테스트는 함수가 올바르게 동작하는지 쉽게 확인할 수 있어, 복잡한 로직을 테스트할 때 특히 유용해요.

### 조건에 이름을 붙이지 않아도 괜찮을 때

- **로직이 간단할 때**: 로직이 매우 간단하면, 굳이 이름을 붙이지 않아도 돼요. 예를 들어, 배열의 요소를 단순히 두 배로 만드는 `arr.map(x => x * 2)`와 같은 코드는 이름을 붙이지 않아도 직관적이에요.

- **한 번만 사용될 때**: 특정 로직이 코드 내에서 한 번만 사용되며, 그 로직이 복잡하지 않으면 익명 함수에서 직접 로직을 처리하는 것이 더 직관적일 수 있어요.

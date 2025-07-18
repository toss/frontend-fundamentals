# 이미지와 아이콘에 적절한 대체 텍스트 제공하기

이미지나 아이콘을 사용할 때 스크린 리더 사용자를 위해 적절한 대체 텍스트를 제공해야 해요. 그러나 모든 이미지에 대체 텍스트가 필요한 것은 아니에요. 이 문서에서는 언제, 어떻게 대체 텍스트를 제공해야 하는지 알려드려요.

## 대체 텍스트를 제공해야 할 때

이미지나 아이콘이 **정보를 전달하거나 기능을 나타낼 때**는 반드시 의미 있는 대체 텍스트를 제공해야 해요. 이미지나 아이콘만 있을 때 대체 텍스트는 시각 정보를 보완하는 유일한 수단이기 때문에, 텍스트가 없으면 사용자 경험이 크게 저하될 수 있어요.

### ❌ 잘못된 예시: 의미 있는 아이콘에 대체 텍스트 누락

다음과 같이 대체 텍스트를 비워두면 스크린 리더 사용자는 이 버튼이 무슨 기능을 하는지 알 수 없어요.

```html
<button>
  <img src="search-icon.svg" alt="" />
</button>
```

### ✅ 올바른 예시: 의미 있는 아이콘에 대체 텍스트 제공

```html
<button>
  <img src="search-icon.svg" alt="검색" />
</button>
```

## 대체 텍스트를 제공하지 않아도 될 때

### 1. 장식용 이미지

이미지가 단순히 장식용으로, 시각적 효과만을 위해 있다면 빈 대체 텍스트(`alt=""`)를 사용하세요.

#### ❌ 잘못된 예시: 장식용 이미지에 불필요한 대체 텍스트 추가

스크린 리더가 이 텍스트를 읽어서 사용자에게 불필요한 정보와 방해를 주게 돼요.

```html
<img src="divider.png" alt="구분선" />
```

#### ✅ 올바른 예시: 장식용 이미지에 빈 alt 속성

```html
<img src="divider.png" alt="" />
```

### 2. 이미지 주변에 텍스트 설명이 있을 때

이미지 주변에 이미 충분한 설명이 있다면, 이미지에는 빈 대체 텍스트를 사용하세요.

#### ❌ 잘못된 예시: 중복된 대체 텍스트

다음과 같이 이미지 주변에 설명이 있는데 같은 내용을 대체 텍스트로 제공하면 오히려 혼란스러워요. 스크린 리더에서 "신제품 스마트폰 신제품 스마트폰"으로 중복해서 읽기 때문이에요.

```html
<figure>
  <img src="product.jpg" alt="신제품 스마트폰" />
  <figcaption>신제품 스마트폰</figcaption>
</figure>
```

#### ✅ 올바른 예시: 캡션이 있는 이미지에서는 생략

```html
<figure>
  <img src="product.jpg" alt="" />
  <figcaption>신제품 스마트폰</figcaption>
</figure>
```

### 3. 아이콘이 텍스트와 함께 사용될 때

아이콘이 텍스트와 함께 버튼이나 링크에 사용될 때는 빈 대체 텍스트를 사용하세요.

#### ❌ 잘못된 예시: 불필요한 중복 정보

스크린 리더에서 "삭제 아이콘 삭제"로 중복해서 읽어주기 때문에 오히려 혼란스러워요.

```html
<button>
  <img src="trash-icon.svg" alt="삭제 아이콘" />
  삭제
</button>
```

#### ✅ 올바른 예시: 텍스트와 함께 있는 아이콘에서는 생략

```html
<button>
  <img src="trash-icon.svg" alt="" />
  삭제
</button>
```

## 효과적인 대체 텍스트 작성하기

좋은 대체 텍스트는 짧고, 명확하며, 이미지의 목적에 맞게 작성되어야 해요. 아래 원칙들을 참고해 상황에 맞게 작성해보세요.

### 1. 명확하고 구체적으로 작성하기

대체 텍스트는 해당 이미지가 전달하는 의미를 정확하게 설명해야 해요. 너무 포괄적인 단어나 추상적인 표현은 사용자가 이미지를 통해 어떤 정보를 얻어야 하는지 알기 어렵게 만들어요.

| 구분       | 예시                  | 설명 |
|------------|-----------------------|------|
| ❌ 나쁜 예 | "아이콘"            | 아이콘의 용도나 기능에 대한 정보가 전혀 없어요. |
| ✅ 좋은 예 | "검색"              | 아이콘이 무엇을 의미하는지 명확하게 알려줍니다. |
| ❌ 나쁜 예 | "그래프"            | 사용자는 이 그래프가 무엇을 나타내는지 알 수 없어요. |
| ✅ 좋은 예 | "2023년 매출 그래프" | 그래프가 어떤 데이터를 보여주는지 구체적으로 설명해요. |

### 2. 불필요한 단어 제외하기

대체 텍스트는 스크린 리더가 읽는 용도이기 때문에, "아이콘", "버튼" 같은 표현은 보통 중복돼요. 스크린 리더는 이미지가 포함된 요소의 역할(버튼 등)을 이미 알고 있기 때문에,
대체 텍스트에서는 정보만 간결하게 전달하는 것이 좋아요.

| 구분       | 예시             | 설명 |
|------------|------------------|------|
| ✅ 좋은 예 | "검색"         ||
| ❌ 나쁜 예 | "검색 아이콘"  | 스크린 리더가 "검색, 버튼"이라고 읽기 때문에 "아이콘"이라는 단어는 중복이고 불필요해요. |
| ✅ 좋은 예 | "닫기"         ||
| ❌ 나쁜 예 | "닫기 버튼"     | 버튼이라는 역할은 이미 명확하므로 텍스트에서는 생략하는 게 깔끔해요. |

### 3. 이미지의 목적과 맥락 고려하기

같은 이미지라도 사용되는 맥락에 따라 다른 대체 텍스트가 필요할 수 있어요. 다음 코드에서 "화살표"라는 설명은 시각적으로 어떤 이미지인지는 말해주지만, 사용자에게 어떤 동작이 가능한지는 전달하지 않아요.

"이전 페이지로 이동"과 같은 대체 텍스트는 기능을 정확히 설명하고, 사용자의 기대와 실제 행동을 일치시켜 줘요.

```html
<!-- ❌ 잘못된 예시: 맥락을 고려하지 않은 대체 텍스트 -->
<img src="arrow.png" alt="화살표" />
<img src="arrow.png" alt="화살표" />

<!-- ✅ 올바른 예시: 맥락에 맞는 대체 텍스트 -->
<img src="arrow.png" alt="이전 페이지로 이동" />
<img src="arrow.png" alt="다음 페이지로 이동" />
```


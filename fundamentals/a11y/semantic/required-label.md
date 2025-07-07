# 인터랙티브 요소에 이름 붙이기

인터랙티브 요소(입력 필드, 버튼, 선택 상자 등)에는 반드시 사용자에게 그 목적을 명확히 알려주는 이름이 필요해요. 이름이 없거나 불명확한 요소는 스크린 리더 사용자나 음성 지원 사용자에게 큰 불편을 줄 수 있어요.

::: details 인터랙티브 요소 목록
| 요소 | 조건 |
|------|------|
| `<a>` | - |
| `<audio>` | `controls` 속성이 있는 경우 |
| `<button>` | - |
| `<details>` | - |
| `<embed>` | - |
| `<iframe>` | - |
| `<img>` | `usemap` 속성이 있는 경우 |
| `<input>` | `type` 속성이 "hidden" 이 아닌 경우 |
| `<keygen>` | - |
| `<label>` | - |
| `<menu>` | `type` 속성이 toolbar state인 경우 |
| `<object>` | `usemap` 속성이 있는 경우 |
| `<select>` | - |
| `<textarea>` | - |
| `<video>` | `controls` 속성이 있는 경우 |
:::

인터랙티브 요소에 이름을 붙이는 방법은 여러가지가 있는데요. 스크린 리더는 다음 순서대로 이름을 읽습니다:

1. `aria-labelledby` - 스크린 리더가 가장 먼저 읽는 속성
2. `aria-label` - `aria-labelledby`가 없을 경우 읽는 속성
3. `<label>` - ARIA 속성이 없을 경우 읽는 HTML 레이블
4. `placeholder` - 레이블이 없을 경우 읽지만, 레이블 대용으로는 권장하지 않음
5. 요소의 내용 - 위 속성들이 모두 없을 경우 버튼 안의 텍스트 등을 읽음

## 문제: 입력 필드에 이름이 빠져 사용자가 필드 용도를 파악하지 못하는 문제

디자인적인 이유나 간결함을 위해 입력 필드에 레이블을 생략하는 경우가 많아요. 이는 접근성 측면에서 심각한 문제를 일으킬 수 있어요.

### 잘못된 예시 1

다음 입력 필드는 아무런 정보도 제공하지 않아 모든 사용자에게 혼란을 줘요. 스크린 리더 사용자는 이 필드가 무엇인지 전혀 알 수 없어요. 시각 사용자도 이 필드가 무엇을 입력해야 하는지 알 수 없어요.

```html
<input type="text" />
```

### 잘못된 예시 2

다음 입력 필드는 시각적으로는 플레이스 홀더 텍스트로 목적을 알려주고 기술적으로는 작동할 수 있지만, 접근성 관점에서는 충분하지 않아요.

먼저, 일부 구형 스크린 리더는 플레이스 홀더를 인식하지 못해요. 사용자가 입력을 시작하면 플레이스 홀더가 사라져 필드의 목적을 잊을 수 있어요. 게다가 플레이스 홀더 텍스트는 보통 대비가 낮아 저시력 사용자가 읽기 어려워요.

```html
<input type="text" placeholder="이름을 입력하세요" />
```

## ✅ 개선하기

### 1. `<label>` 요소 사용하기

HTML에서 가장 좋은 방법은 `<label>` 요소를 사용해 입력 필드와 연결하는 것이에요.

```html
<label for="user-name">이름</label>
<input id="user-name" type="text" />
```

레이블의 장점은 여러가지가 있어요.

먼저, 스크린 리더 사용자에게 입력 필드의 목적을 분명히 알려줘요. 또 레이블을 클릭해도 연결된 입력 필드에 포커스가 가서, 터치 인터페이스에서 특히 유용해요. 필드에 입력 중에도 항상 표시되어 사용자가 필드 목적을 기억할 수 있고요. 모든 사용자에게 가장 명확한 경험을 제공하는 방식이죠.

### 2. `aria-label` 속성 사용하기

디자인 제약으로 인해 시각적 레이블을 표시할 수 없다면 다음과 같이 `aria-label` 속성을 사용할 수 있어요.

```html
<input 
  type="text" 
  aria-label="이름" 
  placeholder="이름을 입력하세요" 
/>
```

`aria-label`은 시각적으로 보이지는 않지만 스크린 리더에서 요소의 이름으로 읽히게 됩니다. **디자인 상 레이블을 표시할 수 없을 때만 차선책으로 사용하세요.**

### 3. `aria-labelledby` 속성 사용하기

화면에 이미 텍스트가 있고, 그것을 입력 필드의 레이블로 사용하고 싶을 때는 `aria-labelledby`를 사용할 수 있어요.

```html
<h2 id="address-heading">배송 주소</h2>

<input 
  type="text" 
  aria-labelledby="address-heading" 
  placeholder="예: 서울시 강남구" 
/>
```

## 더 알아보기

### 그 외 인터랙티브 요소에도 이름 부여하기

입력 필드 외에도 모든 인터랙티브 요소에는 명확한 이름이 필요해요.

#### 버튼(`<button>`)

```html
<!-- ✅ 올바른 예시: 명확한 텍스트 -->
<button>회원가입</button>

<!-- ⚠️ 개선이 필요한 예시: 시각적 아이콘만 있는 버튼 -->
<button>
  <svg aria-hidden="true">...</svg>
</button>

<!-- ✅ 올바른 예시: 아이콘 버튼에 접근성 추가 -->
<button aria-label="닫기">
  <svg aria-hidden="true">...</svg>
</button>
```

#### 선택 요소(`<select>`)

```html
<!-- ✅ 올바른 예시: 레이블이 있는 선택 상자 -->
<label for="country">국가 선택</label>
<select id="country">
  <option value="kr">대한민국</option>
  <option value="us">미국</option>
</select>

<!-- ❌ 잘못된 예시: 레이블이 없는 선택 상자 -->
<select>
  <option value="kr">대한민국</option>
  <option value="us">미국</option>
</select>
```

### 플레이스 홀더의 올바른 사용법

플레이스 홀더만으로는 접근성을 보장할 수 없어요. 플레이스 홀더를 사용할 때는 레이블의 대체재가 아니라 보조 수단이라는 점을 기억해 주세요. 입력 형식에 대한 힌트를 제공하는 용도로 사용하는 것이 좋아요. 

#### ❌ 잘못된 예시: 플레이스 홀더만 사용

```html
<input 
  type="email" 
  placeholder="이메일" 
/>
```

#### ✅ 올바른 예시: 레이블과 플레이스 홀더 함께 사용

```html
<label for="email">이메일</label>
<input 
  id="email" 
  type="email" 
  placeholder="example@email.com" 
/>
```
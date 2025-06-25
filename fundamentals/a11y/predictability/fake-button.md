# 버튼의 역할과 동작이 일치하게 만들기

일반 HTML 요소에 `cursor: pointer`와 `onClick` 이벤트만 추가하는 것은 진짜 버튼이 아니에요. 이런 방식은 키보드 사용자와 스크린 리더 사용자에게 접근성 문제를 일으킵니다.

::: tip 링크에도 똑같이 적용돼요

`<a>` 태그를 사용하지 않고 하이퍼링크를 구현할 때도 같은 문제가 발생해요.  

링크가 가능한 요소는 반드시 `<a>` 태그를 사용해야 하며, `<button>` 과 달리 block 요소를 자식으로 포함할 수 있으니 대체하여 사용하지 말아주세요.

:::

## 문제: 클릭 이벤트가 추가된 일반 마크업 요소

개발할 때 종종 `<div>`나 `<span>` 같은 일반 마크업 요소에 `cursor: pointer`와 `onClick`만 추가해 **버튼처럼 보이게** 만들곤 해요. 

이런 이 요소는 키보드로 포커스할 수 없고, Enter나 Space 키로 클릭할 수도 없어요. 또한 스크린 리더는 이 요소를 버튼으로 인식하지 못하며, 필요한 ARIA 속성도 누락돼 있어 접근성 측면에서 여러 문제가 발생해요.

### 잘못된 예시

다음과 같은 코드는 위에서 설명한 모든 접근성 문제를 발생시켜요.

```jsx
<div
  className="button-style"
  style={{ cursor: 'pointer' }}
  onClick={() => handleAnything()}
>
  문의하기
</div>
```

## ✅ 개선하기

### 1. `<button>` 요소 사용하기

가장 좋은 방법은 HTML의 시맨틱 요소인 `<button>`을 사용하는 것이에요. 이 요소는 기본적인 접근성 기능을 모두 제공해요.

- 키보드 포커스
- Enter/Space 키로 클릭
- 스크린 리더에서 "버튼"으로 인식
- 적절한 ARIA 속성 자동 제공

```jsx
<button onClick={handleClick}>
  클릭하세요
</button>
```

### 2. `<button>`을 사용할 수 없을 때

내부에 block 요소가 있어서 `<button>`을 사용할 수 없다면  다음처럼 직접 접근성 속성을 명시해줘야 해요.

```jsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  <div>내부 block 요소</div>
</div>
```

- `role="button"`: 스크린 리더에게 이 요소가 버튼임을 알려줍니다.
- `tabIndex={0}`: 키보드로 포커스할 수 있게 합니다.
- `onKeyDown`: 키보드 접근성을 위해 Enter나 Space 키 입력 시 클릭 이벤트를 발생시킵니다.

### 3. `react-aria` 사용하기

[React-Aria](https://react-spectrum.adobe.com/react-aria/index.html) 라이브러리의 [`useButton`](https://react-spectrum.adobe.com/react-aria/useButton.html) 훅을 사용하면 접근성 있는 버튼을 더 쉽게 구현할 수 있어요. 이 훅은 `role`, `tabIndex`, `onKeyDown` 등의 필수 접근성 설정들을 같이 제공해서 접근성 속성을 직접 처리하지 않아도 돼요.

```jsx
import { useButton } from 'react-aria';

const buttonRef = useRef<HTMLDivElement>(null);
const { buttonProps } = useButton(
  {
    elementType: 'div',
    onPress: handleClick
  },
  buttonRef
);

<div
  ref={buttonRef}
  {...buttonProps}
>
  <div>내부 block 요소</div>
</div>
```
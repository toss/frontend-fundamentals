# 주요 규칙 소개

JSX 환경에서 [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)를 사용하면, 접근성 문제를 사전에 발견하고 개선할 수 있어요. 이 문서에서는 주요 규칙과 해결 방법을 소개해요.

## 1. 설정 가이드

### 설치 방법

```bash
yarn add -D eslint-plugin-jsx-a11y
```

### 적용 방법

`.eslintrc` 또는 `eslint.config.js`에 아래와 같이 추가해 주세요.

:::tabs key:bundler-object-entry
== flat config

```js
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      "jsx-a11y/control-has-associated-label": "error"
    }
  }
];
```

== legacy config

```json
{
  "plugins": ["jsx-a11y"],
  "extends": ["plugin:jsx-a11y/recommended"],
  "rules": {
    "jsx-a11y/control-has-associated-label": "error"
  }
}
```

:::

## 2. 주요 규칙 소개 및 해결 방법

### alt-text

`<img />` 에는 반드시 [대체 텍스트(alt)](../alt-text/image-alt.md)가 필요해요. `alt` 속성은 정보를 전달하지 않는 이미지라도 빈값이라도 꼭 있어야 하며, 이미지의 목적과 맥락에 맞게 작성해야 해요.

#### 링크에 이미지만 있을 때

**❌ 잘못된 예시**

```jsx
<a href="/home">
  <img src="home.svg" />
</a>
```

**✅ 올바른 예시**

```jsx
<a href="/home">
  <img src="home.svg" alt="홈" />
</a>
```

#### 정보를 전달하지 않는 이미지

**❌ 잘못된 예시**

```jsx
<img src="divider.png" alt="구분선" />
```

**✅ 올바른 예시**

```jsx
<img src="divider.png" alt="" />
```

#### 텍스트와 함께 있는 아이콘

**❌ 잘못된 예시**

```jsx
<button>
  <img src="trash-icon.svg" alt="삭제 아이콘" />
  삭제
</button>
```

**✅ 올바른 예시**

```jsx
<button>
  <img src="trash-icon.svg" alt="" />
  삭제
</button>
```

### control-has-associated-label

인터랙티브 요소(입력 필드, 버튼, 선택 상자 등)에는 반드시 사용자에게 그 목적을 명확히 알려주는 이름이 필요해요. 이름이 없거나 불명확한 요소는 스크린 리더 사용자나 음성 지원 사용자에게 큰 불편을 줄 수 있어요. 자세한 내용은 [인터랙티브 요소에 이름 넣기](../semantic/required-label) 문서에서 확인해 보세요.

`eslint-plugin-jsx-ally` 의 recommended 룰에 기본적으로 비활성화되어 있으니, 다음과 같이 `rules` 에 직접 추가해서 활성화 해줘야 해요.

:::tabs key:bundler-object-entry
== flat config

```js{7}
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/control-has-associated-label': 'error',
    }
  }
];
```

== legacy config

```js{7}
{
  "plugins": ["jsx-a11y"],
  "extends": [
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "jsx-a11y/control-has-associated-label": "error"
  }
}
```

:::

#### 아이콘 버튼에 레이블이 없는 경우

**❌ 잘못된 예시**

```jsx
<button>
  <img src="close.svg" alt="" />
</button>
```

**✅ 올바른 예시**

```jsx
<button aria-label="닫기">
  <img src="close.svg" alt="" />
</button>
// or
<button>
  <img src="close.svg" alt="닫기" />
</button>
```

### no-noninteractive-element-interactions

인터랙티브 요소가 아닌 (`<div>`, `<span>` 등)에 클릭 이벤트 핸들러를 추가할 때는 반드시 `role` 속성 등으로 상호작용 요소임을 명시해야 해요.

::: details 인터랙티브 요소 목록

| 요소         | 조건                                 |
| ------------ | ------------------------------------ |
| `<a>`        | -                                    |
| `<audio>`    | controls 속성이 있는 경우            |
| `<button>`   | -                                    |
| `<details>`  | -                                    |
| `<embed>`    | -                                    |
| `<iframe>`   | -                                    |
| `<img>`      | usemap 속성이 있는 경우              |
| `<input>`    | type 속성이 Hidden state가 아닌 경우 |
| `<keygen>`   | -                                    |
| `<label>`    | -                                    |
| `<menu>`     | type 속성이 toolbar state인 경우     |
| `<object>`   | usemap 속성이 있는 경우              |
| `<select>`   | -                                    |
| `<textarea>` | -                                    |
| `<video>`    | controls 속성이 있는 경우            |

:::

::: info 왜 `role` 속성이 없는 비상호작용 요소에 클릭 이벤트 핸들러를 추가할 수 없나요?
비상호작용 요소에 클릭 이벤트 핸들러를 추가하면, 스크린 리더 등 보조 기기가 해당 요소를 인식하지 못해 스크린 리더, 키보드 사용자 등에게 혼란을 줄 수 있어요.
:::

**❌ 잘못된 예시**

```jsx
<div onClick={handleClick}>클릭</div>
```

**✅ 올바른 예시**

```jsx
<div role="button" tabIndex={0} onClick={handleClick}>
  클릭
</div>
```

### no-noninteractive-element-to-interactive-role

`<main>`, `<area>`, `<h1>`, `<h2>`, `<img>`, `<li>`, `<ul>`, `<ol>` 등 의미 있는 컨테이너 요소에는 `button`, `link` 와 같은 상호작용 역할(interactive role)을 부여하면 안 돼요. 의미에 맞는 태그를 사용해야 해요.

**❌ 잘못된 예시**

```jsx
<main role="button" onClick={handleClick}>저장</main>
<ul role="button" onClick={handleClick}>리스트</ul>
<img role="button" onClick={handleClick} src="foo.png" />
```

**✅ 올바른 예시**

```jsx
<button onClick={handleClick}>저장</button>
<a href="/list">리스트</a>
```

### no-noninteractive-tabindex

비상호작용 요소에 `tabIndex` 를 부여하면 경고가 발생해요. `tabIndex` 는 상호작용 요소에만 사용해야 해요. 불필요하면 제거하거나 적절한 상호작용 이벤트를 추가해 줘야 해요.

::: info 상호작용 요소에만 tabIndex를 부여해야하는 이유
`tabIndex` 는 키보드 사용자가 Tab 키를 눌러 요소들 사이를 이동할 때 사용되는 속성이에요. 비상호작용 요소에 `tabIndex` 를 부여하면 다음과 같은 문제가 발생해요.

1. 스크린 리더 사용자가 해당 요소가 상호작용 가능하다고 오해할 수 있어요
2. 키보드 사용자가 예상치 못한 요소에 포커스할 수 있어요
3. DOM의 자연스러운 포커스 순서가 깨질 수 있어요

따라서 `tabIndex` 는 `<button>`, `<a>`, `<input>` 혹은 적절한 `role` 속성을 부여한 실제로 상호작용이 가능한 요소에만 사용해야 해요.

:::

**❌ 잘못된 예시**

```jsx
<div tabIndex={0}>텍스트</div>
```

**✅ 올바른 예시**

```jsx
<span>텍스트</span>
// 또는
<div tabIndex={0} role="button">버튼</div>
```

### tabindex-no-positive

`tabIndex`에 1 이상의 값을 쓰면 DOM 순서와 다르게 포커스가 이동해서 동작을 예측하기 어려워져요. `0` 이나 `-1` 만 사용해야 해요.

**❌ 잘못된 예시**

```jsx
<button tabIndex={2}>확인</button>
```

**✅ 올바른 예시**

```jsx
<button tabIndex={0}>확인</button>
```

---

더 많은 규칙과 예시는 공식 문서를 참고해 주세요: [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

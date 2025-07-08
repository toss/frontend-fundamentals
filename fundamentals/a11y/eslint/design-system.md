# 디자인 시스템과 결합하기

많은 조직에서 디자인 시스템을 도입해 `<MyButton>`, `<MyTxt>` 와 같은 자체 컴포넌트를 사용해요. 하지만 `eslint-plugin-jsx-a11y` 는 기본적으로 표준 HTML 태그에만 동작하기 때문에, 디자인 시스템 컴포넌트에도 접근성 규칙을 적용하려면 추가 설정이 필요해요.

## 1. 컴포넌트 매핑하기

예를 들어, `<MyButton>` 컴포넌트가 실제로 `<button>` 을, `<MyTxt>` 가 `<span>` 을 출력한다면, 아래와 같이 eslint 설정의 `settings`에 매핑을 추가해 주세요.

:::tabs key:bundler-object-entry
== flat config
```js{9-16}
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/control-has-associated-label': 'error',
    },
    settings: {
      'jsx-a11y': {
        components: {
          MyButton: 'button',
          MyTxt: 'span'
        },
      },
    }
  }
];
```
== legacy config
```js{9-16}
{
  "plugins": ["jsx-a11y"],
  "extends": [
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "jsx-a11y/control-has-associated-label": "error"
  },
  "settings": {
    "jsx-a11y": {
      "components": {
        "MyButton": "button",
        "MyTxt": "span"
      },
    },
  }
}
```
:::

이렇게 하면 `<MyButton>`, `<MyTxt>` 에도 button, span에 적용되는 접근성 규칙이 동일하게 적용돼요.

## 2. Polymorphic prop(다양한 태그 렌더링) 지원

여러 HTML 태그나 컴포넌트로 유연하게 렌더링되는 컴포넌트에는 as 같은 속성(prop)을 사용하는 경우가 많아요. 이런 컴포넌트를 다형(polymorphic) 컴포넌트라고 불러요.

예를 들어, 버튼 컴포넌트를 `<button>` 태그뿐 아니라 `<a>`, `<div>` 등 다른 태그로도 렌더링하고 싶을 때 아래처럼 as 속성을 사용할 수 있어요.

```jsx
<MyButton as="a" href="/home">홈으로</MyButton>
```

이처럼 as나 비슷한 이름의 prop으로 다형 렌더링을 지원하는 컴포넌트를 문서화할 때에는, 해당 prop의 이름을 `polymorphicPropName` 옵션으로 명시해 주세요. 그래야 접근성 eslint 규칙이 디자인 시스템 컴포넌트에 올바르게 동작하게 돼요.

:::tabs key:bundler-object-entry
== flat config
```js{11}
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/control-has-associated-label': 'error',
    },
    settings: {
      'jsx-a11y': {
        polymorphicPropName: 'as',
        components: {
          MyButton: 'button',
          MyTxt: 'span'
        },
      },
    }
  }
];
```
== legacy config
```js{11}
{
  "plugins": ["jsx-a11y"],
  "extends": [
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "jsx-a11y/control-has-associated-label": "error"
  },
  "settings": {
    "jsx-a11y": {
      "polymorphicPropName": "as",
      "components": {
        "MyButton": "button",
        "MyTxt": "span"
      },
    },
  }
}
```
:::

## 3. control-has-associated-label 커스텀

디자인 시스템 컴포넌트가 children 대신 별도의 prop(예: contents)로 텍스트를 받는 경우, 기본 설정만으로는 `jsx-a11y/control-has-associated-label` 접근성 규칙이 통과되지 않을 수 있어요.

예를 들어 아래와 같이 `contents` 라는 prop으로 텍스트를 전달하면서, 실제로는 `<button>` 요소로 렌더링되는 경우를 생각해 볼 수 있어요.

```jsx
<MyCard contents="카드 내용" />
```

이럴 때, eslint에서 이 요소에 적절한 레이블이 없다고 판단해서 오류를 발생시켜요. 이런 문제를 해결하려면 `labelAttributes` 옵션에 해당 prop 이름을 추가해 주세요.

:::tabs key:bundler-object-entry
== flat config
```js{7-9}
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      'jsx-a11y/control-has-associated-label': [2, {
        'labelAttributes': ['contents']
      }]
    },
    settings: {
      'jsx-a11y': {
        polymorphicPropName: 'as',
        components: {
          MyButton: 'button',
          MyTxt: 'span',
          MyCard: 'button'
        },
      },
    }
  }
];
```
== legacy config
```js{7-9}
{
  "plugins": ["jsx-a11y"],
  "extends": [
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "jsx-a11y/control-has-associated-label": [2, {
      "labelAttributes": ["contents"]
    }]
  },
  "settings": {
    "jsx-a11y": {
      "polymorphicPropName": "as",
      "components": {
        "MyButton": "button",
        "MyTxt": "span",
        "MyCard": "button"
      },
    },
  }
}
```
:::

이렇게 설정하면 `<MyCard contents="카드 내용" />` 에서 `contents` 가 레이블로 인식되어 접근성 오류 없이 사용할 수 있어요.

---

이 외에도 디자인 시스템에서 다양한 컴포넌트와 prop 패턴이 있다면, [eslint-plugin-jsx-a11y 공식 문서](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)에서 settings와 rules 옵션을 참고해 맞춤 설정을 적용해 주세요.


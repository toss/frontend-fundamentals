# デザインシステムと組み合わせる

多くの組織ではデザインシステムを導入し、`<MyButton>`や`<MyTxt>`のような独自コンポーネントを使用しています。しかし`eslint-plugin-jsx-a11y`は基本的に標準の HTMLタグに対してのみ動作するため、デザインシステムのコンポーネントにもアクセシビリティ規則を適用するには追加設定が必要です。

## 1. コンポーネントのマッピング

たとえば`<MyButton>`コンポーネントが実際には`<button>`を、`<MyTxt>`が`<span>`を出力するなら、次のようにESLint設定のsettingsにマッピングを追加してください。

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

こうしておくと、`<MyButton>`・`<MyTxt>`にもbutton・spanに対するアクセシビリティ規則が同様に適用されます。

## 2. Polymorphic prop（多様なタグレンダリング）対応

複数のHTMLタグやコンポーネントに柔軟にレンダリングできるコンポーネントでは、`as`のようなプロパティ（prop）を使うことがよくあります。これを多相（polymorphic）コンポーネントと呼びます。

たとえば、ボタンコンポーネントを`<button>`だけでなく`<a>`や`<div>`など他のタグでもレンダリングしたい場合、次のように`as`を使えます。

```jsx
<MyButton as="a" href="/home">
  ホームへ
</MyButton>
```

このように`as`などのpropで多相レンダリングを提供するコンポーネントを運用する際は、そのprop名を`polymorphicPropName`オプションで明示してください。そうすることで、アクセシビリティのESLint規則がデザインシステムのコンポーネントに正しく適用されます。

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

## 3. control-has-associated-labelのカスタマイズ

デザインシステムのコンポーネントが`children`の代わりに別のprop（例：`contents`）でテキストを受け取る場合、既定設定だけでは `jsx-a11y/control-has-associated-label`が通らないことがあります。

たとえば次のように`contents`というpropでテキストを渡し、実際には`<button>`要素としてレンダリングされるケースを考えます。

```jsx
<MyCard contents="カード内容" />
```

この場合、ESLintは適切なラベルがないと判断してエラーにすることがあります。これを解決するには、`labelAttributes`オプションに該当のprop名を追加してください。

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

この設定により、`<MyCard contents="カード内容" />`の`contents`がラベルとして認識され、アクセシビリティエラーなく利用できます。

---

このほかにも、デザインシステムにはさまざまなコンポーネントや prop パターンが存在します。詳細は[eslint-plugin-jsx-a11y 공식 문서](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)のsettingsとrulesのオプションを参照し、要件に合わせてカスタマイズしてください。

# 主要ルール紹介

JSX 環境で[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)を使うと、アクセシビリティの問題を事前に発見して改善できます。ここでは主要なルールと対処方法を紹介します。

## 1. 設定ガイド

### インストール

```bash
yarn add -D eslint-plugin-jsx-a11y
```

### 適用方法

`.eslintrc`または`eslint.config.js`に次のように追加してください。

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

## 2. 主要ルールと対処法

### alt-text

`<img />`には[代替テキスト(alt)](../alt-text/image-alt.md)が必要です。情報を伝えない画像であっても`alt`属性自体は空でも必ず付け、画像の目的と文脈に合う内容にしましょう。

#### リンク内に画像だけがある場合

**❌ 誤った例**

```jsx
<a href="/home">
  <img src="home.svg" />
</a>
```

**✅ 正しい例**

```jsx
<a href="/home">
  <img src="home.svg" alt="ホーム" />
</a>
```

#### 情報を伝えない画像

**❌ 誤った例**

```jsx
<img src="divider.png" alt="区切り線" />
```

**✅ 正しい例**

```jsx
<img src="divider.png" alt="" />
```

#### テキストと一緒のアイコン

**❌ 誤った例**

```jsx
<button>
  <img src="trash-icon.svg" alt="削除アイコン" />
  削除
</button>
```

**✅ 正しい例**

```jsx
<button>
  <img src="trash-icon.svg" alt="" />
  削除
</button>
```

### control-has-associated-label

インタラクティブ要素（入力フィールド、ボタン、セレクトなど）には、目的をユーザーに明確に伝える名前が必須です。名前がない／不明確な要素は、スクリーンリーダー利用者や音声アシスタント利用者に大きな不便を与えます。詳しくは[インタラクティブ要素に名前を付ける](../semantic/required-label)を参照してください。

`eslint-plugin-jsx-ally`の recommendedではこのルールは既定で無効なので、次のように`rules`に明示的に追加して有効化してください。

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

#### アイコンボタンにラベルがない場合

**❌ 誤った例**

```jsx
<button>
  <img src="close.svg" alt="" />
</button>
```

**✅ 正しい例**

```jsx
<button aria-label="閉じる">
  <img src="close.svg" alt="" />
</button>
// または
<button>
  <img src="close.svg" alt="閉じる" />
</button>
```

### no-noninteractive-element-interactions

非インタラクティブ要素（`<div>`、`<span>`など）にクリックハンドラーを付ける場合は、必ず`role`などでインタラクティブ要素であることを明示してください。

::: details インタラクティブ要素の一覧
| 要素 | 条件 |
|------|------|
| `<a>` | - |
| `<audio>` | controls属性がある場合 |
| `<button>` | - |
| `<details>` | - |
| `<embed>` | - |
| `<iframe>` | - |
| `<img>` | usemap属性がある場合 |
| `<input>` | typeがHidden stateでない場合 |
| `<keygen>` | - |
| `<label>` | - |
| `<menu>` | typeがtoolbar stateの場合 |
| `<object>` | usemap属性がある場合 |
| `<select>` | - |
| `<textarea>` | - |
| `<video>` | controls属性がある場合 |
:::

::: info なぜ`role`のない非インタラクティブ要素にクリックハンドラーを付けてはいけないの？
非インタラクティブ要素にクリックハンドラーだけを付けると、スクリーンリーダーなどの支援技術がその要素を正しく認識できず、スクリーンリーダー利用者やキーボード利用者を混乱させます。
:::

**❌ 誤った例**

```jsx
<div onClick={handleClick}>クリック</div>
```

**✅ 正しい例**

```jsx
<div role="button" tabIndex={0} onClick={handleClick}>
  クリック
</div>
```

### no-noninteractive-element-to-interactive-role

`<main>`, `<area>`, `<h1>`, `<h2>`, `<img>`, `<li>`, `<ul>`, `<ol>`など意味のあるコンテナー要素に、`button`や`link`などの**インタラクティブな役割（role）**を与えてはいけません。意味に合ったタグを使いましょう。

**❌ 誤った例**

```jsx
<main role="button" onClick={handleClick}>保存</main>
<ul role="button" onClick={handleClick}>リスト</ul>
<img role="button" onClick={handleClick} src="foo.png" />
```

**✅ 正しい例**

```jsx
<button onClick={handleClick}>保存</button>
<a href="/list">リスト</a>
```

### no-noninteractive-tabindex

非インタラクティブ要素に`tabIndex`を付けると警告になります。`tabIndex`はインタラクティブ要素にのみ使いましょう。不要なら削除し、必要なら適切なロールやイベントを付けてください。

::: info なぜインタラクティブ要素にだけ`tabIndex`を付けるべき？
`tabIndex`はキーボード利用者がTabで要素間を移動する際に使う属性です。非インタラクティブ要素に付けると次の問題を招きます。

1. スクリーンリーダー利用者が、その要素を操作可能と誤解する
2. キーボード利用者が予期しない要素にフォーカスしてしまう
3. DOM の自然なフォーカス順序が崩れる

したがって`tabIndex`は`<button>`、`<a>`、`<input>`、あるいは適切な`role`を付け実際に操作可能な要素に限定して使いましょう。

:::

**❌ 誤った例**

```jsx
<div tabIndex={0}>テキスト</div>
```

**✅ 正しい例**

```jsx
<span>テキスト</span>
// または
<div tabIndex={0} role="button">ボタン</div>
```

### tabindex-no-positive

`tabIndex`に1以上の値を使うと、DOMの順序と異なるフォーカス移動になり、挙動の予測が難しくなります。0または-1のみを使いましょう。

**❌ 誤った例**

```jsx
<button tabIndex={2}>確認</button>
```

**✅ 正しい例**

```jsx
<button tabIndex={0}>確認</button>
```

---

さらに多くのルールと例は公式ドキュメントを参照してください: [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

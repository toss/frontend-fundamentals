# ボタンの役割と動作を一致させる

## 問題：ボタンではない要素にクリックイベントリスナーを付与している

通常の HTML 要素に`cursor: pointer`と`onclick`イベントだけを追加しても、本当のボタンにはなりません。このやり方だと、キーボード利用者はキーボードでフォーカス移動ができず、スクリーンリーダー利用者もボタンとして認識できない可能性があります。

::: tip リンクにも同じことが当てはまります

`<a>`タグを使わずにハイパーリンクを実装した場合も同じ問題が発生します。

リンク可能な要素には必ず`<a>`タグを使用してください。`<button>`と違って`<a>`はブロック要素を子に含められるため、用途を取り違えて代替として使わないでください。

:::

### 誤った例

次のようなコードは、上で説明したすべてのアクセシビリティ問題を引き起こします。

```jsx
<div class="button-style" style="cursor: pointer" onclick="handleAnything()">
  お問い合わせ
</div>
```

## ✅ 改善方法

### 1. `<button>`要素を使う

最もよい方法は、HTMLのセマンティック要素である`<button>`を使うことです。この要素は基本的なアクセシビリティ機能をすべて提供します。

- キーボードフォーカス
- Enter/Space キーでのクリック
- スクリーンリーダーで「ボタン」として認識
- 適切な ARIA 属性の自動付与

```jsx
<button onClick={handleClick}>문의하기</button>
```

### 2. `<button>`を使えない場合

内部にブロック要素があり`<button>`を使えない場合は、次のようにアクセシビリティ属性を明示する必要があります。

```jsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  <div>内部のブロック要素</div>
</div>
```

- `role="button"`：スクリーンリーダーにこの要素がボタンであることを知らせます。
- `tabIndex={0}`：キーボードでフォーカスできるようにします。
- `onKeyDown`：キーボードアクセシビリティのため、EnterまたはSpaceキー入力時にクリック相当の動作を発生させます。

### 3. `react-aria`を使う

[React-Aria](https://react-spectrum.adobe.com/react-aria/index.html)ライブラリの [`useButton`](https://react-spectrum.adobe.com/react-aria/useButton.html)フックを使うと、アクセシブルなボタンをより簡単に実装できます。このフックは `role`、`tabIndex`、`onKeyDown` などの必須アクセシビリティ設定をまとめて提供してくれるため、個別に扱う必要がありません。

```jsx
import { useButton } from "react-aria";

const buttonRef = useRef < HTMLDivElement > null;
const { buttonProps } = useButton(
  {
    elementType: "div",
    onPress: handleClick
  },
  buttonRef
);

<div ref={buttonRef} {...buttonProps}>
  <div>内部のブロック要素</div>
</div>;
```

# ボタンの中にボタンを入れない

ボタンやリンクのようにユーザーが操作する要素([interactive content](https://www.w3.org/TR/2011/WD-html5-20110405/content-models.html#interactive-content))は、HTML とアクセシビリティ（A11y）の観点で特別な注意が必要です。本ドキュメントでは、ボタンの中に別のボタンやリンクが入るとなぜ問題になるのか、そしてどのように解決すべきかを説明します。

## 問題 1: ボタンのように見えるリンク

### 誤った例

次のように`<a>`タグの中に`<button>`を出力するコンポーネントを入れるのは間違いです。HTMLでは、インタラクティブな要素の中に別のインタラクティブ要素を入れることは許可されていないためです[^1].この構造ではアクセシビリティの問題が発生し、ブラウザで予期しない動作が起きる可能性があります。

[^1]: https://www.w3.org/TR/2011/WD-html5-20110405/text-level-semantics.html#the-a-element
のContent model項目を参考にしてください。

```jsx
<a href="/go-to">
  <Button>確認しました。</Button>
</a>
```

### ✅ 改善方法

Buttonコンポーネントが`<a>`タグをレンダリングできるオプションを提供しましょう。

```jsx
<Button as="a" href="/go-to">
  確認しました。
</Button>
```

## 問題 2: ボタンの中に入った別のボタン

UIの構成上、ボタンのように見えるカードの中に別のボタンを置く必要がある場合があります。このとき構造を誤るとアクセシビリティの問題が発生します。

![カードUIパターンの例](../images/button-inside-button.png)

### 誤った例

ボタンの中にボタンを入れて`stopPropagation()`を使う方法は避けましょう。`stopPropagation()`でイベントの伝播を止めようとしても、HTML構造自体が誤っているためです。このような入れ子構造はスクリーンリーダーを混乱させ、キーボードフォーカスにも問題を引き起こします。

```jsx
<button>
  サービス審査管理
  <button aria-label="삭제" onClick={(event) => event.stopPropagation()}>
    x
  </button>
</button>
```

### ✅ 改善方法

ボタンのコンテナーと子ボタンを実装する際は、アクセシビリティとHTML標準に準拠しつつ、期待する機能を実現できます。

`div`コンテナーと絶対配置を用いて、次のようにボタンをレイヤー化してみましょう。この構造は、全体の領域を仮想的なボタンのようにしつつ、視覚的には見えないボタン（`「詳細を見る」`）を上に重ねる方式です。削除ボタンは別位置に配置され、HTML標準にも違反しません。

```jsx
<div
  style="position: relative; isolation: isolate;"
  className="wrapper"
  role="listitem"
  aria-label="서비스 검토 관리"
>
  <button
    className="detail-button"
    style="position: absolute; inset: 0; opacity: 0"
  >
    詳細を見る
  </button>
  サービス審査管理
  <div style="position: relative; z-index: 2;">
    <button aria-label="삭제">x</button>
  </div>
</div>
```

::: tip フォーカススタイルも忘れずに
上の例で「詳細を見る」ボタンは透明に設定しているため、キーボードフォーカスが当たってもフォーカス表示が見えない場合があります。親要素にCSSの [`:focus-within` 擬似クラス](https://developer.mozilla.org/ko/docs/Web/CSS/:focus-within)を使うと、子要素がフォーカスを受けたときにもスタイルを適用できます。

```css
.wrapper:focus-within {
  outline: 2px solid blue;
}
```

:::

## なぜこの構造が問題になるのか？

ボタンの中にボタンを入れてはいけない理由を詳しく説明します。

### アクセシビリティの観点での問題

#### 1. キーボード探索が混乱する

スクリーンリーダーやキーボード利用者にとって、どのボタンが押されるのか不明確です。外側のボタンと内側のボタンのどちらのイベントが先に処理されるのか予測しづらいです。

#### 2. スクリーンリーダーの読み上げが誤解を招く

スクリーンリーダーが「ボタンの中に別のボタン」といった不自然な読み上げを行い、利用者が混乱する可能性があります。

#### 3. フォーカス順が崩れる

フォーカスがどこへ移動すべきか曖昧になり、意図しない操作につながることがあります。特にモバイルでは、タップで望まないボタンが押されることがあります。

### HTML 標準の観点での問題

[W3C HTML5 명세](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-a-element.html)によると、`<a>`要素は content modelとしてtransparent（実質的に何でも）を含められますが、インタラクティブ要素を含むことはできません

#### インタラクティブ要素の一覧

以下の要素はいずれもインタラクティブ要素です。これらのいずれかを含む要素の中に、さらに別のインタラクティブ要素を入れてはいけません。

| 요소         | 조건                                 |
| ------------ | ------------------------------------ |
| `<a>`        | -                                    |
| `<audio>`    | controls属性がある場合           |
| `<button>`   | -                                    |
| `<details>`  | -                                    |
| `<embed>`    | -                                    |
| `<iframe>`   | -                                    |
| `<img>`      | usemap属性がある場合              |
| `<input>`    | type属性が Hidden state でない場合 |
| `<keygen>`   | -                                    |
| `<label>`    | -                                    |
| `<menu>`     | type属性が toolbar 状態の場合     |
| `<object>`   | usemap属性がある場合              |
| `<select>`   | -                                    |
| `<textarea>` | -                                    |
| `<video>`    | controls属性がある場合            |

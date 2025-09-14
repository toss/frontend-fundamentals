# 同じ名前の要素には説明を付ける

同じ名前のボタンが複数回登場する画面では、ユーザー（特にスクリーンリーダー利用者）が、それぞれのボタンがどの項目に結び付いているのか分かるように配慮する必要があります。

たとえば下のような構成でボタン名がすべて「選択」だと、どの項目を選ぶボタンなのか分かりにくいため、**明確な文脈を合わせて提供する必要があります。**

![重複するボタンの例](../images/duplicate-interactive-element.png)

## 問題：意味を読み取れないスクリーンリーダー

### 誤った例

次のコードは見た目には問題なさそうに見えますが、スクリーンリーダーでは 2 つのボタンがどちらも「選択、ボタン」としか読み上げられません。したがって、利用者は異なるボタンがそれぞれどの項目に対応しているか分かりません。

```html 10,20
<div class="option-list">
  <div>
    <div>
      <div class="paper-icon">📄</div>
      <div>
        <div>紙を使用する場合</div>
        <div>紙にいろいろ書いてみましょう。</div>
      </div>
    </div>
    <button>選択</button>
  </div>
  <div>
    <div>
      <div class="pencil-icon">✏️</div>
      <div>
        <div>鉛筆を使用する場合</div>
        <div>鉛筆をよく削ってみましょう。</div>
      </div>
    </div>
    <button>選択</button>
  </div>
</div>
```

## ✅ 改善方法

### 1. `aria-label`でボタンの説明を追加する

`aria-label`は視覚的には表示されなくても、スクリーンリーダーに読み上げられる説明を提供します。

```html 10,20
<div class="option-list">
  <div>
    <div>
      <div class="paper-icon">📄</div>
      <div>
        <div>紙を使用する場合</div>
        <div>紙にいろいろ書いてみましょう。</div>
      </div>
    </div>
    <button aria-label="紙を使用する場合を選択">選択</button>
  </div>
  <div>
    <div>
      <div class="pencil-icon">✏️</div>
      <div>
        <div>鉛筆を使用する場合</div>
        <div>鉛筆をよく削ってみましょう。</div>
      </div>
    </div>
    <button aria-label="鉛筆を使用する場合を選択">選択</button>
  </div>
</div>
```

::: warning `aria-label`使用時の注意点

`aria-label`を使うと、画面に見えている従来のテキストはスクリーンリーダーに露出しなくなります。したがって、ボタンに「選択」という視覚テキストがあるのに、aria-label="紙を使用する場合"のようにまったく別の文言で置き換えてしまうと、スクリーンリーダー利用者は「選択」という語をまったく聞けなくなります。

可能であれば、視覚テキストを含めた文として`aria-label`を作成してください。たとえば「紙を使用する場合」ではなく「紙を選択」や「選択 − 鉛筆」のようにします。
:::
:::

### 2. リストのマークアップとラベルを関連付ける

`<li>`などのリスト構造に、見出し役のテキストを`aria-labelledby`で結び付け、各項目ごとにどのボタンか区別できるようにします。

```html 2,10,12,20
<ul class="option-list">
  <li aria-labelledby="paper-title">
    <div>
      <div class="paper-icon">📄</div>
      <div>
        <div id="paper-title">紙を使用する場合</div>
        <div>紙にいろいろ書いてみましょう。</div>
      </div>
    </div>
    <button>選択</button>
  </li>
  <li aria-labelledby="pencil-title">
    <div>
      <div class="pencil-icon">✏️</div>
      <div>
        <div id="pencil-title">鉛筆を使用する場合</div>
        <div>鉛筆をよく削ってみましょう。</div>
      </div>
    </div>
    <button>選択</button>
  </li>
</ul>
```

最初のボタンはスクリーンリーダーで「選択、ボタン、紙を使用する場合、グループ（4個中1番目）」のように読み上げられます。

::: warning リストのマークアップ使用時の注意点
最新のスクリーンリーダーはリスト要素の名前まで適切に読み上げますが、**古いバージョンでは正しく読めない場合があります。** 次のセクションでその対処法を説明します。
:::

### 3. ボタンにも`aria-labelledby`を追加する

上の2のようにリスト構造を使いつつ、ボタンにも直接説明を関連付けると、どのスクリーンリーダーでもより明確に動作します。

```html 2,10,12,20
<ul class="option-list">
  <li aria-labelledby="paper-title">
    <div>
      <div class="paper-icon">📄</div>
      <div>
        <div id="paper-title">紙を使用する場合</div>
        <div>紙にいろいろ書いてみましょう。</div>
      </div>
    </div>
    <button id="paper-button" aria-labelledby="paper-title paper-button">
      選択
    </button>
  </li>
  <li aria-labelledby="pencil-title">
    <div>
      <div class="pencil-icon">✏️</div>
      <div>
        <div id="pencil-title">鉛筆を使用する場合</div>
        <div>鉛筆をよく削ってみましょう。</div>
      </div>
    </div>
    <button id="pencil-button" aria-labelledby="pencil-title pencil-button">
      選択
    </button>
  </li>
</ul>
```

`aria-labelledby`には空白区切りで複数の要素IDを並べられます。複数IDを指定すると、該当要素が持つテキストコンテンツを順番に連結してスクリーンリーダーが読み上げます。

たとえば下のコードのように「紙を使用する場合」（paper-title）と「選択」（paper-button）が一緒に読まれ、スクリーンリーダーでは「紙を使用する場合 選択、ボタン」のように聞こえます。

```html
<button id="paper-button" aria-labelledby="paper-title paper-button">
  選択
</button>
```

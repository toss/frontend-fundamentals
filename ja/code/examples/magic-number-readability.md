# マジックナンバーに名前を付ける

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

**マジックナンバー**(Magic Number)とは、正確な意味を説明せずにソースコードの中に直接数字の値を入れることを指します。

例えば、見つからないことを示す HTTP ステータスコードとして`404`の値をそのまま使用することや、
1 日を表す`86400`秒をそのまま使用することがこれに該当します。

（Magic Number）

## 📝 コード例

以下のコードは、いいねボタンを押した時にいいねの数を新しく取得する関数です。

```typescript 3
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}
```

## 👃 コードの不吉な臭いを嗅いでみる

### 可読性

このコードは、`delay`関数に渡された`300`という値がどのようなコンテキストで使われているのかが不明です。
元のコードを書いた開発者でなければ、300ms の待機がどのような目的で行われているのかは分かりません。

- アニメーションが完了するまで待機しているのか？
- いいねを反映させるのに時間がかかって待機しているのか？
- テストコードをうっかり削除し忘れただけなのか？

複数の開発者が 1 つのコードを共同で修正していく中で、その意図が正確に理解できないと、コードが意図しない方向に修正される可能性があります。

::: info

この Hook は[凝集度](./magic-number-cohesion.md)の観点からも考えることができます。

:::

## ✏️ リファクタリングしてみる

数字の`300`というコンテキストを正確に示すために、定数の`ANIMATION_DELAY_MS`として宣言することができます。

```typescript 1,5
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

## 🔍 もっと調べてみる

マジックナンバーは凝集度の観点からも考えることができます。[マジックナンバーを排除する](./magic-number-cohesion.md)のドキュメントも参考にしてみてください。

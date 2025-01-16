# マジックナンバーを排除する

<div style="margin-top: 16px">
<Badge type="info" text="응집도" />
</div>

**マジックナンバー**(Magic Number)とは、正確な意味を説明せずにソースコードの中に直接数字の値を入れることを指します。

例えば、見つからないことを示す HTTP ステータスコードとして`404`の値をそのまま使用することや、
1 日を表す`86400`秒をそのまま使用することがこれに該当します。

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

### 凝集度

`300`という数字がアニメーションの完了を待つために使われている場合、再生するアニメーションを変更した際に、サービスが予期せず壊れるリスクがあります。十分な時間を置かずに、アニメーションが終了する前に次のロジックが始まってしまう可能性もあります。

また、修正が必要なコードの片方だけが変更されることから、凝集度が低いコードとも言えます。

::: info

この Hook は[可読性](./magic-number-readability.md)の観点からも考えることができます。

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

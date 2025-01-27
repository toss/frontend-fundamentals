# 消除魔数

<div style="margin-top: 16px">
<Badge type="info" text="内聚性" />
</div>

**魔数**(Magic Number)指的是缺乏明确说明而直接插入的数值。

例如，直接使用 `404` 来表示未找到（Not Found）的 HTTP 状态码，或者直接使用 `86400` 秒来表示一天的时间。

## 📝 代码示例

下列代码是一个函数，当点击点赞按钮时重新获取点赞数量。

```typescript 3
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}
```

## 👃 闻代码

### 内聚性

如果使用像 `300` 这样的固定时间值来等待动画完成，那么在动画播放的过程中进行更改时，服务可能会悄无声息地出现故障。因为后续的逻辑可能会在动画还未完成时就开始执行。

此外，由于只修改了需要同步更改的代码中的一部分，这段代码的内聚性很低。

::: info

这个 Hook 也可以从 [可读性](./magic-number-readability.md) 的角度来考虑。

:::

## ✏️ 尝试改善

为了更准确的表达数字 `300` 的含义，可以将其声明为常量 `ANIMATION_DELAY_MS` 。

```typescript 1,5
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

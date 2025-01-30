# 为魔数命名

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
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

### 可读性

这段代码中的 `delay` 函数传递了一个值 `300` ，但无法从上下文推测该值的具体用途。
如果不是该代码的编写者，就无法理解 300ms 等待的是什么。

- 是在等待动画完成?
- 是在等待点赞反映时间?
- 是不是忘了删测试代码?

当多名开发者共同修改同一段代码时，可能无法明确原意，从而导致代码被修改成不符合预期的结果。

::: info

这个 Hook 也可以从 [内聚性](./magic-number-cohesion.md) 的角度来考虑。

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

## 🔍 深入了解

魔数也可以从内聚性角度来审视。请参考 [消除魔数提高内聚性](./magic-number-cohesion.md) 一文。

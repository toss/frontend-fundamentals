# Eliminating Magic Numbers

<div style="margin-top: 16px">
<Badge type="info" text="Cohesion" />
</div>

**Magic Number** refers to directly inserting numerical values into the source code without explicitly stating their meaning.

For example, using the value `404` directly as the HTTP status code for Not Found, or using `86400` seconds directly to represent a day.

## 📝 Code Example

The following code is a function that retrieves the new like count when the like button is clicked.

```typescript 3
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}
```

## 👃 Smell the Code

### Cohesion

If you used the number `300` to wait for the animation to complete, there is a risk that the service may quietly break when the animation being played is changed. Additionally, the next logic may start immediately without waiting for a sufficient amount of time for the animation.

From the perspective that only one side of the code that needs to be modified together is modified, it can also be said to be code with low cohesion.

::: info

This function can also be viewed from the perspective of [readability](./magic-number-readability.md).

:::

## ✏️ Work on Improving

To accurately represent the context of the number `300`, you can declare it as a constant `ANIMATION_DELAY_MS`.

```typescript 1,5
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

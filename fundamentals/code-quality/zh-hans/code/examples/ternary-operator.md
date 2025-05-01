# 简化三元运算符

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

复杂地使用三元运算符可能会掩盖条件的结构，从而使代码难以阅读。

## 📝 代码示例

以下代码根据 `条件A` 和 `条件B`，将 `status` 设置为 `"BOTH"`、 `"A"` 、 `"B"` 或 `"NONE"` 中的一个。

```typescript
const status =
  条件A && 条件B ? "BOTH" : 条件A || 条件B ? (条件A ? "A" : "B") : "NONE";
```

## 👃 闻代码

### 可读性

这段代码使用了多个嵌套的三元运算符，很难一眼看出计算值使用了哪个条件。

## ✏️ 尝试改善

如下使用 `if` 语句展开条件，可以简单明了地显示条件。

```typescript
const status = (() => {
  if (条件A && 条件B) return "BOTH";
  if (条件A) return "A";
  if (条件B) return "B";
  return "NONE";
})();
```

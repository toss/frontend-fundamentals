# 揭示隐藏的逻辑

<div style="margin-top: 16px">
<Badge type="info" text="可预测性" />
</div>

如果函数或组件的名称、参数、返回值中存在未明确表达的隐藏逻辑，那么与你合作的同事可能会难以预测其行为。

## 📝 代码示例

下面的代码是一个名为 `fetchBalance` 的函数，用于查询用户的账户余额。每次调用函数时，都会隐式地启动名为 `balance_fetched` 的日志函数。

```typescript 4
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");

  logging.log("balance_fetched");

  return balance;
}
```

## 👃 闻代码

### 可预测性

仅根据 `fetchBalance` 函数的名称和返回类型，无法得知是否会记录名为 `balance_fetched` 的日志。因此，即使在不需要日志记录的地方，也可能会触发日志记录。

另外，如果日志记录逻辑出错，获取账户余额的功能也可能突然失效。

## ✏️ 尝试改善

请仅在实现部分保留可以通过函数名、参数和返回类型来预测的逻辑。

```typescript
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");

  return balance;
}
```

请将日志记录的代码单独分离出来。

```tsx
<Button
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log("balance_fetched");

    await syncBalance(balance);
  }}
>
  更新账户余额
</Button>
```

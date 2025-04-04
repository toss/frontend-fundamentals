# 隠れたロジックを露呈させる

<div style="margin-top: 16px">
<Badge type="info" text="予測可能性" />
</div>

関数やコンポーネントの名前、パラメータ、返り値に明示されていない隠れたロジックがある場合、一緒に開発をしているチームメンバーがその挙動を予測するのが困難になる可能性があります。

## 📝 コード例

次のコードは、ユーザーの口座残高を照会する際に使用できる`fetchBalance`関数です。この関数を呼び出すたびに、暗黙的に `balance_fetched`というロギングが行われています。

```typescript 4
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");

  logging.log("balance_fetched");

  return balance;
}
```

## 👃 コードの不吉な臭いを嗅いでみる

### 予測可能性

`fetchBalance`関数の名前と返り値の型だけでは、`balance_fetched`というロギングが行われるかどうか分かりません。そのため、ロギングを望まない場所でもロギングが行われてしまう可能性があります。

また、ロギングのロジックにエラーが発生した場合、突然口座残高を取得するロジックが壊れてしまう可能性もあるでしょう。

## ✏️ リファクタリングしてみる

関数の名前、パラメータ、返り値の型から予測できるロジックだけを実装部分に残してください。

```typescript
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");

  return balance;
}
```

そして、ロギングを行うコードは別に分離してください。

```tsx
<Button
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log("balance_fetched");

    await syncBalance(balance);
  }}
>
  口座残高を更新する
</Button>
```

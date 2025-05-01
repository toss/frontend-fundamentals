# 同じ種類の関数は返り値の型を揃える

<div style="margin-top: 16px">
<Badge type="info" text="予測可能性" />
</div>

API を叩くのと関連した Hook のように同じ種類の関数やHookがお互い違うタイプの返り値を持っていると、コードの一貫性が損なわれ、一緒に働くチームメンバーがコードを読むのが困難になります。

## 📝 コード例 1: useUser

次の`useUser`と`useServerTime`HookはすべてAPIを叩くのと関連したHookです。

しかし`useUser`は`@tanstack/react-query`の`Query`オブジェクトを返し、`useServerTime`はサーバー時間を持ってきてデータだけを返しています。

```typescript 9,18
import { useQuery } from '@tanstack/react-query';

function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

  return query;
}

function useServerTime() {
  const query = useQuery({
    queryKey: ['serverTime'],
    queryFn: () => fetchServerTime(),
  });

  return query.data;
}
```

### 👃 コードの不吉な臭いを嗅いでみる

#### 予測可能性

サーバーのAPIを叩くHookの返り値のタイプがお互いに違うと、チームメンバーはこのようなHookを使うたびに返り値が何なのか確認しないといけません。`Query`オブジェクトを返すと、`data`を取り出す必要があり、データだけを返してあげればそのまま値を使えますよね。

同じように動くコードが一貫性を持って規則的でないとコードを読むのが難しくなります。

### ✏️ リファクタリングしてみる

次のようにサーバーのAPIを叩くHookは一貫性を持たせて`Query`オブジェクトを返してあげるようにすれば、チームメンバーがコードを予測できる可能性が高まります。

```typescript 9,18
import { useQuery } from '@tanstack/react-query';

function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

  return query;
}

function useServerTime() {
  const query = useQuery({
    queryKey: ['serverTime'],
    queryFn: () => fetchServerTime(),
  });

  return query;
}
```

## 📝 コード例 2: checkIsValid

次の`checkIsNameValid`と`checkIsAgeValid`はすべての名前と年齢が正しいか検証する関数です。

```typescript
/** ユーザーネームは２０字未満でないといけません。 */
function checkIsNameValid(name: string) {
  const isValid = name.length > 0 && name.length < 20;

  return isValid;
}

/**　ユーザーは年齢が１８歳以上９９歳次の自然数でないといけません。 */
function checkIsAgeValid(age: number) {
  if (!Number.isInteger(age)) {
    return {
      ok: false,
      reason: "年齢は整数でないといけません。"
    };
  }

  if (age < 18) {
    return {
      ok: false,
      reason: "年齢は１８歳以上でないといけません。"
    };
  }

  if (age > 99) {
    return {
      ok: false,
      reason: "年齢は９９歳以下でないといけません。"
    };
  }

  return { ok: true };
}
```

### 👃 コードの不吉な臭いを嗅いでみる

#### 予測可能性

検証関数の返り値が違うと、チームメンバーは関数を使うたびに返り値を確認する必要があり、コードリーディングが難しくなってしまいます。

特に[厳密なブールの比較](https://typescript-eslint.io/rules/strict-boolean-expressions/)のような機能を使わない場合、コードにバグが見つかる原因になっていまいます。

```typescript
// このコードは名前が規則を守っているか検証します。
if (checkIsNameValid(name)) {
  // ...
}

// この関数はいつもオブジェクト { ok, ... }を返すので、
// `if`文内にあるコードはいつも信用できます
if (checkIsAgeValid(age)) {
  // ...
}
```

### ✏️ リファクタリングしてみる

次のコードのように検証関数が一貫的に`{ ok, ... }`タイプのオブジェクトを返すようにすることができます。

```typescript
/** ユーザーの名前は２０字未満でないといけません */
function checkIsNameValid(name: string) {
  if (name.length === 0) {
    return {
      ok: false,
      reason: "名前は空の値ではいけません。"
    };
  }

  if (name.length > 20) {
    return {
      ok: false,
      reason: "名前は２０字まで入力できます。"
    };
  }

  return { ok: true };
}

/** ユーザーは年齢が１８歳以上、９９歳次の自然数でなければなりません */
function checkIsAgeValid(age: number) {
  if (!Number.isInteger(age)) {
    return {
      ok: false,
      reason: "年齢は整数でないといけません。"
    };
  }

  if (age < 18) {
    return {
      ok: false,
      reason: "年齢は１８歳以上でないといけません。"
    };
  }

  if (age > 99) {
    return {
      ok: false,
      reason: "年齢は９９歳以下でないといけません。"
    };
  }

  return { ok: true };
}
```

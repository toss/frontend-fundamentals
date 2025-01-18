# 同じ種類の関数は返り値を揃える

<div style="margin-top: 16px">
<Badge type="info" text="예측 가능성" />
</div>

API を叩くのと関連した Hook のように同じ種類の関数や Hook がお互い違うタイプの返り値を持っていると、コードの一貫性が損なわれ、一緒に働くチームメンバーがコードを読むのが困難になります。

## 📝 コード例 1: useUser

以下の `useUser`と`useServerTime`Hook はすべて API を叩くのと関連した Hook です。

しかし`useUser`は`@tanstack/react-query`の`Query`オブジェクトを返し、`useServerTime`はサーバー時間を持ってきてデータだけを返しています。

```typescript 9,18
import { useQuery } from '@tanstack/react-query';

function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser();
  });

  return query;
}

function useServerTime() {
  const query = useQuery({
    queryKey: ['serverTime'],
    queryFn: () => fetchServerTime();
  });

  return query.data;
}
```

## 👃 コードの不吉な臭いを嗅いでみる

#### 予測可能性

サーバーの API を叩く Hook の返り値のタイプがお互いに違うと、チームメンバーはこのような Hook を使うたびに返り値が何なのか確認しないといけません。`Query`オブジェクトを返すと、`data`を取り出す必要があり、データだけを返してあげればそのまま値を使えますよね。

同じように動くコードが一貫性を持って規則的でないとコードを読むのが難しくなります。

### ✏️ リファクタリングしてみる

以下のようにサーバーの API を叩く Hook は一貫性を持たせて`Query`オブジェクトを返してあげるようにすれば、チームメンバーがコードを予測できる可能性が高まります。

```typescript 9,18
import { useQuery } from '@tanstack/react-query';

function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser();
  });

  return query;
}

function useServerTime() {
  const query = useQuery({
    queryKey: ['serverTime'],
    queryFn: () => fetchServerTime();
  });

  return query;
}
```

## 📝 コード例 2: checkIsValid

以下の`checkIsNameValid`と`checkIsAgeValid`はすべての名前と年齢が正しいか検証する関数です。

```typescript
/** ユーザーネームは２０字未満でないといけません。 */
function checkIsNameValid(name: string) {
  const isValid = name.length > 0 && name.length < 20;

  return isValid;
}

/**　ユーザーは年齢が１８歳以上９９歳以下の自然数でないといけません。 */
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

特に[厳密なブールの比較](https://typescript-eslint.io/rules/strict-boolean-expressions/)のような機能を使わない場合、コードにパグが見つかる原因になっていまいます。

```typescript
// このコードは名前が規則を守っているか検証します。
if (checkIsNameValid(name)) {
  // ...
}

// 이 함수는 항상 객체 { ok, ... } 를 반환하기 때문에,
// `if` 문 안에 있는 코드가 항상 실행돼요
if (checkIsAgeValid(age)) {
  // ...
}
```

### ✏️ 개선해보기

다음 코드처럼 유효성 검사 함수가 일관적으로 `{ ok, ... }` 타입의 객체를 반환하게 할 수 있어요.

```typescript
/** 사용자 이름은 20자 미만이어야 해요. */
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

/** ユーザーは年齢が１８歳以上、９９歳以下の自然数でなければなりません */
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

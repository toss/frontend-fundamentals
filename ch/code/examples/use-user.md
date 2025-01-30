# 统一同类函数的返回类型

<div style="margin-top: 16px">
<Badge type="info" text="可预测性" />
</div>

就像与 API 调用相关的 Hook 一样，如果同类函数或 Hook 具有不同的返回类型，代码的一致性就会降低，同事阅读代码时会产生混乱。

## 📝 代码示例 1: useUser

以下 `useUser` 和 `useServerTime` Hook 都与 API 调用相关。

但是 `useUser` 返回的是 `@tanstack/react-query` 的 `Query` 对象，而 `useServerTime` 则是获取服务器时间后仅返回数据本身 。

```typescript 9,18
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser
  });

  return query;
}

function useServerTime() {
  const query = useQuery({
    queryKey: ["serverTime"],
    queryFn: fetchServerTime
  });

  return query.data;
}
```

### 👃 闻代码

#### 可预测性

如果调用服务器 API 的 Hook 返回类型各不相同，则其他同事每次使用这些 Hook 时都需要查看并确认返回类型。如果返回的是 `Query` 对象，那么就需要从中提取出 `data`；如果仅返回数据本身，则可以直接使用返回值。

如果执行同一功能的代码不遵循一贯原则，则阅读和编写代码时会产生混乱。

### ✏️ 尝试改善

像下列代码一样，将调用服务器 API 的 Hook 一致地返回 `Query` 对象，可以提高团队成员对代码的可预测性。

```typescript 9,18
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser
  });

  return query;
}

function useServerTime() {
  const query = useQuery({
    queryKey: ["serverTime"],
    queryFn: fetchServerTime
  });

  return query;
}
```

## 📝 代码示例 2: checkIsValid

下面 `checkIsNameValid` 和 `checkIsAgeValid` 都是用来检验姓名和年龄的有效性的函数。

```typescript
/** 用户名必须少于20个字符。 */
function checkIsNameValid(name: string) {
  const isValid = name.length > 0 && name.length < 20;

  return isValid;
}

/** 用户的年龄必须是18岁至99岁之间的自然数。 */
function checkIsAgeValid(age: number) {
  if (!Number.isInteger(age)) {
    return {
      ok: false,
      reason: "年龄必须是整数。"
    };
  }

  if (age < 18) {
    return {
      ok: false,
      reason: "年龄必须年满18岁。"
    };
  }

  if (age > 99) {
    return {
      ok: false,
      reason: "年龄必须在99岁以下。"
    };
  }

  return { ok: true };
}
```

### 👃 闻代码

#### 可预测性

如果有效性检查函数的返回值各不相同，则同事们在使用这些函数时每次都需要确认返回类型，这很容易造成混淆。

特别是在不使用诸如 [严格布尔表达式](https://typescript-eslint.io/rules/strict-boolean-expressions/) 类似功能的情况下，这很可能成为代码中出错的源头。

```typescript
// 这段代码验证姓名是否符合规则
if (checkIsNameValid(name)) {
  // ...
}

// 该函数只返回一个对象 { ok, ... }，
// `if` 语句内的代码总是会被执行
if (checkIsAgeValid(age)) {
  // ...
}
```

### ✏️ 尝试改善

像下列代码一样，可将有效性检验函数始终返回一个 `{ ok, ... }` 类型的对象。

```typescript
/** 用户名必须少于20个字符。 */
function checkIsNameValid(name: string) {
  if (name.length === 0) {
    return {
      ok: false,
      reason: "姓名不允许为空值。"
    };
  }

  if (name.length >= 20) {
    return {
      ok: false,
      reason: "姓名不能超过20个字符。"
    };
  }

  return { ok: true };
}

/** 用户的年龄必须是18岁至99岁之间的自然数。 */
function checkIsAgeValid(age: number) {
  if (!Number.isInteger(age)) {
    return {
      ok: false,
      reason: "年龄必须是整数。"
    };
  }

  if (age < 18) {
    return {
      ok: false,
      reason: "年龄必须年满18岁。"
    };
  }

  if (age > 99) {
    return {
      ok: false,
      reason: "年龄必须在99岁以下。"
    };
  }

  return { ok: true };
}
```

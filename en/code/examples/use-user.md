# Unifying Return Types for Similar Functions

<div style="margin-top: 16px">
<Badge type="info" text="Predictability" />
</div>

If functions or hooks of the same type, such as API call-related hooks, have different return types, it can reduce the consistency of the code and make it confusing for colleagues to read and understand the code.

## 📝 Code Example 1: useUser

The `useUser` and `useServerTime` hooks are both related to API calls.

However, `useUser` returns a `Query` object from `@tanstack/react-query`, while `useServerTime` fetches the server time and only returns the data.

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

### 👃 Smell the Code

#### Predictability

If hooks that call server APIs return different types, teammates will need to check the return type every time they use these hooks. If a `Query` object is returned, they need to extract the `data`, but if only the data is returned, they can use the value as is.

When code performing the same type of action does not follow consistent rules, it becomes confusing to read and write.

### ✏️ Work on Improving

By making hooks that call server APIs consistently return a `Query` object, as shown in the following example, you can enhance the predictability of the code for your

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

## 📝 Code Example 2: checkIsValid

The functions `checkIsNameValid` and `checkIsAgeValid` are both used to validate whether the name and age are valid.

```typescript
/** User names must be less than 20 characters. */
function checkIsNameValid(name: string) {
  const isValid = name.length > 0 && name.length < 20;

  return isValid;
}

/** User age must be a natural number between 18 and 99, inclusive. */
function checkIsAgeValid(age: number) {
  if (!Number.isInteger(age)) {
    return {
      ok: false,
      reason: "Age must be an integer."
    };
  }

  if (age < 18) {
    return {
      ok: false,
      reason: "Age must be 18 or older."
    };
  }

  if (age > 99) {
    return {
      ok: false,
      reason: "Age must be 99 or younger."
    };
  }

  return { ok: true };
}
```

### 👃 Smell the Code

#### Predictability

If validation functions return different types, teammates will need to check the return type each time they use the function, leading to confusion.

This can especially cause issues when features like [strict boolean expressions](https://typescript-eslint.io/rules/strict-boolean-expressions/) are not enforced, as it might result in errors in the code.

```typescript
// This code correctly validates whether the name follows the rules
if (checkIsNameValid(name)) {
  // ...
}

// Since this function always returns an object `{ ok, ... }`,
// the code inside the `if` statement will always execute
if (checkIsAgeValid(age)) {
  // ...
}
```

### ✏️ Work on Improving

Validation functions can be made to consistently return an object of the `{ ok, ... }` type, as shown in the following code.

```typescript
/** User names must be less than 20 characters. */
function checkIsNameValid(name: string) {
  if (name.length === 0) {
    return {
      ok: false,
      reason: 'Name cannot be empty.',
    };
  } 
  
  if (name.length >= 20) {
    return {
      ok: false,
      reason: 'Name cannot be longer than 20 characters',
    };
  }

  return { ok: true };
}

/** User age must be a natural number between 18 and 99, inclusive. */
function checkIsAgeValid(age: number) {
  if (!Number.isInteger(age)) {
    return {
      ok: false,
      reason: "Age must be an integer."
    };
  }

  if (age < 18) {
    return {
      ok: false,
      reason: "Age must be 18 or older."
    };
  }

  if (age > 99) {
    return {
      ok: false,
      reason: "Age must be 99 or younger."
    };
  }

  return { ok: true };
}
```

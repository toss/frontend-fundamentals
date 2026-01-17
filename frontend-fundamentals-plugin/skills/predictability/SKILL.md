---
name: predictability
description: 코드 리뷰나 작성 시 함수 이름과 동작이 다르거나, 반환 타입이 일관적이지 않거나, 숨은 부수 효과가 있을 때 사용하세요.
---

# 예측 가능성

함수는 이름이 암시하는 대로 동작해야 해요. 숨겨진 동작이 없어야 해요.

## 적용 시점

- `get`이나 `calculate`로 시작하는 함수에 부수 효과가 있을 때
- 같은 종류의 함수가 서로 다른 반환 타입을 가질 때
- 함수 이름이 라이브러리의 이름과 겹칠 때
- 타입 시스템이 잘못된 상태를 허용할 때

## 핵심 패턴: 숨은 로직 드러내기

함수가 이름에서 예상되는 것 이상의 동작을 하면, 협업하는 동료들이 동작을 예측하기 어려워요.

❌ 개선 전:
```tsx
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  logging.log("balance_fetched"); // 숨은 부수 효과!
  return balance;
}
```

✅ 개선 후:
```tsx
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  return balance;
}

// 로깅은 사용하는 곳에서 명시적으로
const balance = await fetchBalance();
logging.log("balance_fetched");
```

## 핵심 패턴: 같은 종류의 함수는 반환 타입 통일하기

유효성 검사 함수의 반환 타입이 다르면, 동료들은 함수를 쓸 때마다 반환 타입을 확인해야 해서 혼란이 생겨요.

❌ 개선 전:
```tsx
function checkIsNameValid(name: string) {
  return name.length > 0 && name.length < 20; // boolean 반환
}

function checkIsAgeValid(age: number) {
  if (age < 18) {
    return { ok: false, reason: "나이는 18세 이상이어야 해요." };
  }
  return { ok: true }; // 객체 반환
}
```

✅ 개선 후:
```tsx
type ValidationResult = { ok: true } | { ok: false; reason: string };

function checkIsNameValid(name: string): ValidationResult {
  if (name.length === 0) {
    return { ok: false, reason: "이름은 빈 값일 수 없어요." };
  }
  return { ok: true };
}

function checkIsAgeValid(age: number): ValidationResult {
  if (age < 18) {
    return { ok: false, reason: "나이는 18세 이상이어야 해요." };
  }
  return { ok: true };
}
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| `getX()`에 부수 효과 | 순수 getter와 명시적 action 함수로 분리 |
| `calculateX()`가 저장함 | `calculateAndSaveX()`로 이름 변경하거나 분리 |
| 같은 종류인데 반환 타입 다름 | Discriminated Union 사용: `{ ok: true } \| { ok: false; reason }` |
| 라이브러리 이름과 동일 | 구분되는 명확한 이름 사용 (예: `http` → `httpService`) |

## 피해야 할 것

- 유용한 부수 효과를 완전히 제거하지 말고, 명시적인 위치로 이동하세요
- 지나치게 복잡한 타입을 만들지 마세요
- 기존 API 계약을 깨지 않도록 주의하세요

참고: https://frontend-fundamentals.com/code-quality/predictable/

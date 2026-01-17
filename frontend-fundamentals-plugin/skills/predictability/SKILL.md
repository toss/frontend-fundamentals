---
name: predictability
description: Use when `getX()`나 `fetchX()`에 숨은 부수 효과가 있거나, 같은 종류의 함수들이 서로 다른 반환 타입을 가지거나, 함수 이름과 실제 동작이 다를 때
---

# 예측 가능성

함수는 이름이 암시하는 대로 동작해야 한다. 숨겨진 동작이 없어야 한다.

## 핵심 패턴

### 숨은 로직 드러내기

❌ fetch 함수에 숨은 부수 효과:
```tsx
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  logging.log("balance_fetched"); // 숨은 부수 효과!
  return balance;
}
```

✅ 부수 효과는 호출부에서 명시적으로:
```tsx
async function fetchBalance(): Promise<number> {
  return await http.get<number>("...");
}

const balance = await fetchBalance();
logging.log("balance_fetched");
```

### 반환 타입 통일

❌ 같은 종류인데 반환 타입 다름:
```tsx
function checkIsNameValid(name: string) {
  return name.length > 0; // boolean
}
function checkIsAgeValid(age: number) {
  if (age < 18) return { ok: false, reason: "18세 이상" };
  return { ok: true }; // 객체
}
```

✅ Discriminated Union으로 통일:
```tsx
type ValidationResult = { ok: true } | { ok: false; reason: string };

function checkIsNameValid(name: string): ValidationResult {
  if (name.length === 0) return { ok: false, reason: "이름 필수" };
  return { ok: true };
}
function checkIsAgeValid(age: number): ValidationResult {
  if (age < 18) return { ok: false, reason: "18세 이상" };
  return { ok: true };
}
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| `getX()`에 부수 효과 | 순수 getter와 action 분리 |
| `calculateX()`가 저장함 | `calculateAndSaveX()`로 이름 변경 또는 분리 |
| 같은 종류인데 반환 타입 다름 | Discriminated Union: `{ ok: true } \| { ok: false; reason }` |
| 라이브러리 이름과 겹침 | 구분되는 이름 사용: `http` → `httpService` |

## 주의사항

- 부수 효과를 제거하지 말고 명시적 위치로 이동
- 지나치게 복잡한 타입 피하기
- 기존 API 계약 유지

참고: https://frontend-fundamentals.com/code-quality/predictable/

---
name: readability
description: Use when 삼항 연산자가 중첩되거나, 복잡한 조건식 `a && !b || c`가 이름 없이 사용되거나, 동시에 실행되지 않는 코드가 한 컴포넌트에 섞여 있을 때
---

# 가독성

코드는 읽기 쉬워야 한다. 읽는 사람이 코드 의도를 빠르게 파악할 수 있어야 한다.

## 핵심 패턴

### 동시에 실행되지 않는 코드 분리

❌ viewer/admin 로직이 한 컴포넌트에 섞임:
```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  useEffect(() => {
    if (isViewer) return;
    showButtonAnimation();
  }, [isViewer]);
  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}
```

✅ 분기별로 분리:
```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}
function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}
function AdminSubmitButton() {
  useEffect(() => { showButtonAnimation(); }, []);
  return <Button type="submit">Submit</Button>;
}
```

### 복잡한 조건에 이름 붙이기

❌ 조건이 무슨 뜻인지 바로 안 보임:
```tsx
if (user.age >= 18 && !user.isBanned && user.emailVerified) { ... }
```

✅ 의도를 이름으로 표현:
```tsx
const canPurchase = user.age >= 18 && !user.isBanned && user.emailVerified;
if (canPurchase) { ... }
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| 중첩된 삼항 연산자 | `if`문이나 early return 사용 |
| 복잡한 조건 `a && !b \|\| c` | 의미있는 이름 붙이기: `const canProceed = ...` |
| 여러 분기가 교차됨 | 분기별로 별도 컴포넌트 분리 |
| 코드 위아래로 왔다갔다 | 조건을 한눈에 볼 수 있는 객체로 관리 |

## 주의사항

- 간단한 로직까지 과도하게 추상화하지 말 것
- 나쁜 코드에 주석 대신 코드 자체를 개선
- "미래 유연성" 위해 깊은 계층 만들지 말 것

참고: https://frontend-fundamentals.com/code-quality/readable/

---
name: readability
description: 코드 리뷰나 작성 시 조건문이 복잡하거나, 매직 넘버가 있거나, 한 번에 이해해야 하는 맥락이 많을 때 사용하세요.
---

# 가독성

코드는 읽기 쉬워야 해요. 읽는 사람이 코드의 의도를 빠르게 파악할 수 있어야 해요.

## 적용 시점

- 동시에 실행되지 않는 코드가 하나의 함수에 섞여 있을 때
- 정확한 뜻을 밝히지 않은 숫자 값(매직 넘버)이 있을 때
- 삼항 연산자가 중첩되어 조건 구조가 명확하지 않을 때
- 복잡한 조건식이 이름 없이 사용될 때
- 코드를 위아래로 왔다갔다 하며 읽어야 할 때

## 핵심 패턴: 같이 실행되지 않는 코드 분리하기

동시에 실행되지 않는 코드가 하나의 컴포넌트에 있으면, 동작을 한눈에 파악하기 어려워요.

❌ 개선 전:
```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  useEffect(() => {
    if (isViewer) {
      return;
    }
    showButtonAnimation();
  }, [isViewer]);

  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}
```

✅ 개선 후:
```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function AdminSubmitButton() {
  useEffect(() => {
    showButtonAnimation();
  }, []);
  return <Button type="submit">Submit</Button>;
}
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| 중첩된 삼항 연산자 | `if` 문이나 early return으로 풀어서 사용 |
| 매직 넘버 `delay(300)` | 이름 있는 상수로 선언 `ANIMATION_DELAY_MS = 300` |
| 복잡한 조건 `a && !b \|\| c` | 명시적인 이름 붙이기 `const canProceed = ...` |
| 여러 분기가 교차됨 | 분기별로 별도 컴포넌트로 분리 |
| 시점 이동이 많음 | 조건을 한눈에 볼 수 있는 객체로 관리 |
| 구현 상세가 노출됨 | HOC나 Wrapper 컴포넌트로 추상화 |

## 피해야 할 것

- 간단한 로직까지 과도하게 추상화하지 마세요
- 나쁜 코드에 주석을 다는 대신, 코드 자체를 개선하세요
- "미래의 유연성"을 위해 깊은 컴포넌트 계층을 만들지 마세요

참고: https://frontend-fundamentals.com/code-quality/readable/

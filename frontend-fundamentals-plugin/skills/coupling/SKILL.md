---
name: coupling
description: Use when props가 3개 이상 컴포넌트 계층을 통과하거나, 하나의 Hook이 5개 이상 값을 반환하거나, A 수정 시 관련 없는 B가 깨질 때
---

# 결합도

코드 변경의 영향 범위를 최소화한다. 한 기능 변경이 다른 기능을 깨뜨리면 안 된다.

## 핵심 패턴

### Props Drilling 제거 (조합 패턴)

❌ props가 계층을 통과:
```tsx
function ItemEditModal({ items, onConfirm, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ItemEditBody items={items} onConfirm={onConfirm} onClose={onClose} />
    </Modal>
  );
}
function ItemEditBody({ items, onConfirm, onClose }) {
  return (
    <>
      <Button onClick={onClose}>닫기</Button>
      <ItemEditList items={items} onConfirm={onConfirm} />
    </>
  );
}
```

✅ children으로 조합:
```tsx
function ItemEditModal({ items, onConfirm, onClose }) {
  return (
    <Modal onClose={onClose}>
      <ItemEditBody onClose={onClose}>
        <ItemEditList items={items} onConfirm={onConfirm} />
      </ItemEditBody>
    </Modal>
  );
}
function ItemEditBody({ children, onClose }) {
  return <><Button onClick={onClose}>닫기</Button>{children}</>;
}
```

### 책임 분리

❌ 모든 것을 관리하는 Hook:
```tsx
function usePageState() {
  const [query] = useQueryParams({
    cardId: NumberParam, dateFrom: DateParam, dateTo: DateParam, statusList: ArrayParam
  });
}
```

✅ 단일 책임 Hook:
```tsx
function useCardIdQueryParam() {
  const [cardId, setCardId] = useQueryParam("cardId", NumberParam);
  return [cardId ?? undefined, setCardId] as const;
}
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| 3개 이상 계층 통과하는 props | 조합 패턴: children 사용 |
| 5개 이상 반환하는 Hook | 단일 책임 Hook으로 분리 |
| A 수정 시 관련 없는 B 깨짐 | 결합 지점 식별 후 인터페이스 도입 |
| 모든 곳에서 import하는 util | 사용처 가까이로 이동 |

## Context가 적절한 경우

진정한 전역 관심사만: 테마, 로케일, 인증 상태, 10개 이상 컴포넌트가 필요한 데이터.

조합 패턴을 피하려고 Context 남용하지 말 것.

## 예외: 중복이 나은 경우

- 페이지마다 동작이 달라질 여지가 있을 때
- 공통 코드 수정 시 모든 의존 코드 테스트 부담이 클 때

참고: https://frontend-fundamentals.com/code-quality/loosely-coupled/

---
name: coupling
description: 코드 리뷰나 작성 시 props가 여러 컴포넌트 계층을 통과하거나, 하나의 Hook이 너무 많은 일을 하거나, 한 기능의 변경이 관련 없는 기능에 영향을 줄 때 사용하세요.
---

# 결합도

코드 변경의 영향 범위를 최소화해야 해요. 한 기능의 변경이 다른 기능을 깨뜨리면 안 돼요.

## 적용 시점

- props가 3개 이상의 컴포넌트 계층을 통과할 때 (Props Drilling)
- 하나의 Hook이 관련 없는 여러 가지 일을 관리할 때
- 한 기능을 수정했는데 관련 없는 기능이 깨질 때
- 컴포넌트가 부모/자식의 구현 세부사항을 너무 많이 알 때

## 핵심 패턴: Props Drilling 지우기

Props Drilling은 부모와 자식 컴포넌트 사이에 결합도가 생겼다는 표시예요.

❌ 개선 전:
```tsx
function ItemEditModal({ items, recommendedItems, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </Modal>
  );
}

function ItemEditBody({ items, recommendedItems, onConfirm, onClose }) {
  return (
    <>
      <Button onClick={onClose}>닫기</Button>
      <ItemEditList
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </>
  );
}
```

✅ 개선 후 (조합 패턴):
```tsx
function ItemEditModal({ items, recommendedItems, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody onClose={onClose}>
        <ItemEditList
          items={items}
          recommendedItems={recommendedItems}
          onConfirm={onConfirm}
        />
      </ItemEditBody>
    </Modal>
  );
}

function ItemEditBody({ children, onClose }) {
  return (
    <>
      <Button onClick={onClose}>닫기</Button>
      {children}
    </>
  );
}
```

## 핵심 패턴: 책임을 하나씩 관리하기

"페이지에 필요한 모든 것을 관리하는" Hook은 수정 시 영향 범위가 급격히 확장돼요.

❌ 개선 전:
```tsx
function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    dateTo: DateParam,
    statusList: ArrayParam
  });
  // ... 모든 쿼리 파라미터 관리
}
```

✅ 개선 후:
```tsx
function useCardIdQueryParam() {
  const [cardId, setCardId] = useQueryParam("cardId", NumberParam);
  return [cardId ?? undefined, setCardId] as const;
}

function useDateRangeQueryParam() {
  // ... 날짜 범위만 관리
}
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| 3개 이상 계층을 통과하는 props | 조합 패턴: 컴포넌트를 props로 전달 |
| 5가지 이상을 반환하는 Hook | 단일 책임 Hook으로 분리 |
| 10개 이상 파일에서 import하는 컴포넌트 | Facade 패턴 또는 배치 개선 |
| A를 수정했는데 관련 없는 B가 깨짐 | 결합 지점 식별 후 인터페이스 도입 |
| 모든 곳에서 import하는 "util" 파일 | 로직을 사용처 가까이로 이동하거나 명시적 API 생성 |

## Context가 적절한 경우

진정한 전역 관심사에 Context를 사용하세요:
- 테마, 로케일, 인증 상태
- 10개 이상의 컴포넌트가 필요로 하는 데이터

조합 패턴을 피하려고 Context를 사용하지 마세요.

## 중복 코드 허용하기

불필요한 결합도를 만들지 않기 위해, 때로는 중복 코드를 허용하는 것이 더 나은 선택이에요.

- 페이지마다 동작이 달라질 여지가 있다면, 공통화 없이 중복을 허용하세요
- 공통 코드를 수정할 때마다 의존하는 모든 코드를 테스트해야 하는 부담을 고려하세요

## 피해야 할 것

- 모든 것을 전역 상태로 만들지 마세요
- 공유되는 "스마트" 컴포넌트를 통해 결합하지 마세요
- 이미 큰 Hook에 더 많은 책임을 추가하지 마세요

참고: https://frontend-fundamentals.com/code-quality/loosely-coupled/

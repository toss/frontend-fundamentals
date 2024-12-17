# 모든 쿼리 파라미터를 한 번에 관리하는 `usePageState()` 쪼개기

<Badge type="info" text="가독성" />
<Badge type="info" text="결합도" />

## 📝 코드 예시

다음 `usePageState()` 훅은 페이지 전체의 쿼리 파라미터를 한 번에 관리하고 있어요.

```typescript
import moment, { Moment } from 'moment';
import { useMemo } from 'react';
import { ArrayParam, DateParam, NumberParam, useQueryParams } from 'use-query-params';

import { StatementStatusType } from '#sappa/types/sap/enum/StatementStatusMap.js';

const defaultDateFrom = moment().subtract(3, 'month');
const defaultDateTo = moment();

export function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    dateTo: DateParam,
    statusList: ArrayParam,
  });

  return useMemo(
    () => ({
      values: {
        cardId: query.cardId ?? undefined,
        statementId: query.statementId ?? undefined,
        dateFrom: query.dateFrom == null ? defaultDateFrom : moment(query.dateFrom),
        dateTo: query.dateTo == null ? defaultDateTo : moment(query.dateTo),
        statusList: query.statusList as StatementStatusType[] | undefined,
      },
      controls: {
        setCardId: (cardId: number) => setQuery({ cardId }, 'replaceIn'),
        setStatementId: (statementId: number) => setQuery({ statementId }, 'replaceIn'),
        setDateFrom: (date?: Moment) => setQuery({ dateFrom: date?.toDate() }, 'replaceIn'),
        setDateTo: (date?: Moment) => setQuery({ dateTo: date?.toDate() }, 'replaceIn'),
        setStatusList: (statusList?: StatementStatusType[]) => setQuery({ statusList }, 'replaceIn'),
      },
    }),
    [query, setQuery],
  );
}
```

## 👃 코드 냄새 맡아보기

### 가독성

이 Hook이 가지고 있는 책임이 "페이지가 필요한 모든 쿼리 파라미터를 관리하는 것" 임을 고려했을 때, 이 Hook이 담당할 책임이 무제한적으로 늘어날 가능성이 있어요. 새로운 쿼리 파라미터가 추가되면, 무의식적으로 이 Hook이 관리하게 되죠.

점점 Hook이 담당하고 있는 영역이 넓어지면서, 구현이 길어지고, 어떤 역할을 하는 Hook인지 파악하기 힘들어져요.

### 결합도

먼저, 이 Hook는 "이 페이지에서 필요한 모든 쿼리 파라미터를 가지고 있어" 라고 하는 넓은 책임을 가져요. 그래서 페이지 안의 컴포넌트나 Hook이 너도나도 이 Hook에 의존하기 시작해서, 코드 수정의 영향범위가 급격히 커질 수 있어요.

점점 이 Hook을 수정하는 부담이 생기고, 건드리지 못하는 Hook이 될 가능성이 있어요.

### 성능

그 외로, 이 Hook을 쓰는 컴포넌트는, 이 Hook이 관리하는 어떤 쿼리 파라미터가 수정되더라도 리렌더링이 발생해요. 예를 들어서, 한 컴포넌트에서 `cardId`만 참고해도, `dateFrom`이나 `dateTo`가 변경되면 리렌더링되는 거죠.

좋은 성능을 위해서는 특정한 상태 값이 업데이트되었을 때 최소한의 부분이 리렌더링되도록 설계해야 해요.

## ✏️ 개선해보기

다음 코드와 같이 각각의 쿼리 파라미터

```typescript
import { useQueryParam } from 'use-query-params';

export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam('cardId', NumberParam);

  const setCardId = useCallback((cardId: number) => {
    setQuery({ cardId }, 'replaceIn');
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

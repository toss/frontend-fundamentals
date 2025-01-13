# 책임을 하나씩 관리하기

<div style="margin-top: 16px">
<Badge type="info" text="Coupling" />
</div>

같은 종류의 작업을 모두 해주는 함수, 컴포넌트, Hook을 만들지 마세요. 한 번에 다루는 맥락의 종류가 많아져서 수정에 따른 영향 범위를 예측하기 어려운 코드가 돼요.

## 📝 Code Example

다음 `usePageState()` Hook은 페이지 전체의 URL 쿼리 파라미터를 한 번에 관리해요.

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

## 👃 Smell the Code

### 결합도

이 Hook는 "이 페이지에서 필요한 모든 쿼리 파라미터를 가지고 있어" 라고 하는 넓은 책임을 가져요. 그래서 페이지 안의 컴포넌트나 Hook이 너도나도 이 Hook에 의존하기 시작해서, 코드 수정의 영향범위가 급격히 커질 수 있어요.

점점 이 Hook을 수정하는 부담이 생기고, 수정하기 어려운 Hook이 될 가능성이 있어요.

::: info

이 Hook은 [가독성](./use-page-state-readability.md) 관점으로도 볼 수 있어요.

:::

## ✏️ Work on Improving

다음 코드와 같이 각각의 쿼리 파라미터별로 별도의 Hook을 작성할 수 있어요.

```typescript
import { useQueryParam } from 'use-query-params';

export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam('cardId', NumberParam);

  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, 'replaceIn');
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

Hook이 담당하는 책임을 분리했기 때문에, 수정에 따른 영향이 갈 범위를 좁힐 수 있어요. 
그래서 Hook을 수정했을 때 예상하지 못한 영향이 생기는 것을 막을 수 있어요.
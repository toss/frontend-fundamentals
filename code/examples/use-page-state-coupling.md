# 책임을 하나씩 관리하기

<div style="margin-top: 16px">
<Badge type="info" text="결합도" />
</div>

Avoid creating functions, components, or hooks that handle all tasks of the same type. Managing too many contexts at once makes it difficult to predict the scope of impact when making changes.

## 📝 Code Example

The following `usePageState()` hook manages the URL query parameters for the entire page at once.

```typescript
import moment, { Moment } from 'moment';
import { useMemo } from 'react';
import { ArrayParam, DateParam, NumberParam, useQueryParams } from 'use-query-params';

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

### Coupling

This hook has a broad responsibility: "managing all the query parameters needed for this page." Because of this, components or other hooks within the page may start depending on it, which can rapidly increase the scope of impact when modifying the code.

Over time, this hook may become burdensome to maintain and could evolve into a difficult-to-modify piece of code.

::: info

This hook can also be analyzed from a [readability](./use-page-state-readability.md) perspective.

:::

## ✏️ Work on Improving

You can create separate hooks for each query parameter, as shown in the following code.

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
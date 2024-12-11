# Splitting Functions Combined By Logic Type

<div style="margin-top: 16px">
<Badge type="info" text="Readability" />
</div>

Avoid separating functions, components, or hooks based on the type of logic, such as query parameters, state, or API calls. This increases the number of contexts handled at once, making the code harder to understand and modify.

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

### Readability

Considering that this hook's responsibility is "managing all the query parameters needed for the page," its responsibilities could grow indefinitely. When new query parameters are added, they are likely to be managed by this hook unconsciously.

As the scope of the hook expands, its implementation becomes longer and harder to understand, making it difficult to grasp what the hook is supposed to do.

### Performance

Any component using this hook will re-render whenever any query parameter managed by the hook is modified. For instance, even if a component only references `cardId`, it will re-render if `dateFrom` or `dateTo` changes.

For optimal performance, the design should ensure that only the minimum necessary part of the UI re-renders when a specific state value is updated.

::: info

This hook can also be analyzed from a [coupling](./use-page-state-coupling.md) perspective.

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

By separating the responsibilities of the hook, it now has a clearer name compared to the original `usePageState()` hook. 

Additionally, narrowing the scope of impact when modifying a hook helps prevent unintended changes.

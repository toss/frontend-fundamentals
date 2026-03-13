# 单独管理责任

<div style="margin-top: 16px">
<Badge type="info" text="耦合性" />
</div>

不要根据逻辑类型（如查询参数、状态、API 调用等）为基准拆分函数。 由于同时涉及多种上下文类型，代码变得即难以理解又难以维护。

## 📝 代码示例

以下 `usePageState()` Hook 可以一次性管理整个页面的 URL 查询参数。

```typescript
import moment, { Moment } from "moment";
import { useMemo } from "react";
import {
  ArrayParam,
  DateParam,
  NumberParam,
  useQueryParams
} from "use-query-params";

const defaultDateFrom = moment().subtract(3, "month");
const defaultDateTo = moment();

export function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    dateTo: DateParam,
    statusList: ArrayParam
  });

  return useMemo(
    () => ({
      values: {
        cardId: query.cardId ?? undefined,
        statementId: query.statementId ?? undefined,
        dateFrom:
          query.dateFrom == null ? defaultDateFrom : moment(query.dateFrom),
        dateTo: query.dateTo == null ? defaultDateTo : moment(query.dateTo),
        statusList: query.statusList as StatementStatusType[] | undefined
      },
      controls: {
        setCardId: (cardId: number) => setQuery({ cardId }, "replaceIn"),
        setStatementId: (statementId: number) =>
          setQuery({ statementId }, "replaceIn"),
        setDateFrom: (date?: Moment) =>
          setQuery({ dateFrom: date?.toDate() }, "replaceIn"),
        setDateTo: (date?: Moment) =>
          setQuery({ dateTo: date?.toDate() }, "replaceIn"),
        setStatusList: (statusList?: StatementStatusType[]) =>
          setQuery({ statusList }, "replaceIn")
      }
    }),
    [query, setQuery]
  );
}
```

## 👃 闻代码

### 耦合性

该 Hook 肩负着“管理此页面所需的所有查询参数”的广泛责任。因此，页面内的组件或其他 Hook 可能会依赖于该 Hook，在修改代码时，影响范围也会急剧扩大。

随着时间的推移，这个 Hook 会变得难以维护，最终演变为难以修改的代码。

::: info

这个 Hook 也可以从 [可读性](./use-page-state-readability.md) 的角度来考虑。

:::

## ✏️ 尝试改善

可以像下列代码一样，将每个查询参数分别编写单独的 Hook。

```typescript
import { useCallback } from "react";
import { 
  NumberParam,
  useQueryParam 
} from "use-query-params";

export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam("cardId", NumberParam);

  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, "replaceIn");
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

由于分离了 Hook 所承担的责任，能够减少修改所带来的影响范围。
因此，在修改 Hook 时， 能够防止产生预料之外的影响。

# 根据逻辑类型拆分合并的函数

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

不要根据逻辑类型（如查询参数、状态、API 调用等）为基准创建函数。 由于同时涉及多种上下文类型，代码变得即难以理解又难以维护。

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

### 可读性

考虑到该 Hook 的责任是“管理页面所需的所有查询参数”，这个 Hook 所承担的责任有可能会无限增大。每当有新的查询参数被加入时，这个 Hook 就会自然而然地承担起管理的责任。

随着 Hook 的责任范围逐渐扩大，实现部分也会变得越来越冗长，导致很难理解它到底扮演着什么角色。

### 性能

使用该 Hook 的组件会在任何查询参数变更时重新渲染。即使一个组件只引用 `cardId`，如果 `dateFrom` 或 `dateTo` 发生变化，它也会重新渲染。

为了提高性能，应该设计系统来确保特定状态值更新时，重新渲染的部分最小。

::: info

这个 Hook 也可以从 [耦合性](./use-page-state-coupling.md) 的角度来考虑。

:::

## ✏️ 尝试改善

可以像下列代码一样，将每个查询参数分别编写单独的 Hook。

```typescript
import { useQueryParam } from "use-query-params";

export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam("cardId", NumberParam);

  const setCardId = useCallback(
    (cardId: number) => {
      _setCardId(cardId, "replaceIn");
    },
    [_setCardId]
  );

  return [cardId ?? undefined, setCardId] as const;
}
```

在分离了 Hook 的职责后，它比原本 `usePageState()` Hook 有着更明确的名称。
同时，通过缩小修改 Hook 时产生的影响范围，能够防止产生预料之外的变化。

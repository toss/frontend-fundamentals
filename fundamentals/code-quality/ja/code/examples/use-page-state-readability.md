# ロジックの種類に応じて一体化している関数を分ける

<div style="margin-top: 16px">
<Badge type="info" text="可読性" />
</div>

クエリパラメータ、状態、APIの呼び出しなどのロジックを種類ごとに関数やコンポーネント、Hookに分けないでください。
一度に扱うコンテキストの種類が増えると、理解しづらく修正が難しいコードになってしまいます。

## 📝 コード例

次の`usePageState()`Hookはページ全体のURLクエリパラメータをすべて管理しています。

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

## 👃 コードの不吉な臭いを嗅いでみる

### 可読性

このHookの責務が「ページで必要なすべてのクエリパラメータを管理すること」となると、責務が無限に増える可能性があります。新しいクエリパラメータを追加する際には、自然とこのHookがそれを管理することになるでしょう。その結果、Hookの担当範囲が広がり、コードが長くなってしまい、どのような役割を果たしているのか理解するのが難しくなります。

### パフォーマンス

このHookを使っているコンポーネントは、このHookが管理しているクエリパラメータが修正されたとしても、再レンダーが発生します。例えば、あるコンポーネントで`cardId`だけを参照しても、`dateFrom`や`dateTo`が変更されると再レンダーされます。
良いパフォーマンスのためには、特定の状態の値が更新された時、最低限な部分だけが再レンダーされるように設計するべきです。

::: info

このHookは[結合度](./use-page-state-coupling.md)の観点からも考えることができます。

:::

### ✏️ リファクタリングしてみる

次のように、各クエリパラメータごとに別々のHookを作成することができます。

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

Hookが担う責任を分離したため、従来の`usePageState()`Hookよりも明確な名前を持っています。
また、Hookを修正した際に影響を及ぼす範囲を狭めることで、予期しない変更が発生するのを防ぐことができます。

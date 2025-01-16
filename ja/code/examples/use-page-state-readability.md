# ロジックの種類に応じて一体化している関数を分ける

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

クエリパラメータ、状態、API の呼び出しなどのロジックを種類に応じて関数やコンポーネント、Hook を分けないでください。
一度に扱うコンテキストの種類が増えると、理解しづらく修正が難しいコードになります。

## 📝 コード例

以下の`usePageState()`Hook はページ全体の URL クエリパラメーターをすべて管理しています。

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

この Hook の責務が「ページで必要なすべてのクエリパラメータを管理すること」と考えると、この Hook の責務が無限に増える可能性があります。新しいクエリパラメータを追加する際には、自然とこの Hook が管理することになるでしょう。その結果、Hook が担当する範囲が広がり、コードが長くなり、どのような役割を果たしている Hook なのか理解するのが難しくなってしまいます。

### パフォーマンス

この Hook を使っているコンポーネントは、この Hook が管理しているクエリパラメーターが修正されたとしても、再レンダーが発生します。例えば、あるコンポーネントで`cardId`だけを参照しても、`dateFrom`や`dateTo`が変更されると再レンダーされます。
良いパフォーマンスのためには、特定の状態の値が更新された時、最低限な部分だけが再レンダーされるように設計するべきです。

::: info

この Hook は[結合度](./use-page-state-coupling.md)の観点からも考えることができます。

:::

## ✏️ リファクタリングしてみる

以下のように、各クエリパラメータごとに別々の Hook を作成することができます。

```typescript
import { useQueryParam } from "use-query-params";

export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam("cardId", NumberParam);

  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, "replaceIn");
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

Hook が担う責任を分離したため、従来の`usePageState()`Hook よりも明確な名前を持っています。
また、Hook を修正した際に影響を及ぼす範囲を狭めることで、予期しない変更が発生するのを防ぐことができます。

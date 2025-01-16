# 責任を一つずつ管理する

<div style="margin-top: 16px">
<Badge type="info" text="결합도" />
</div>

クエリパラメータ、状態、API の呼び出しなどのロジックを種類に応じて関数やコンポーネント、Hook を分けないでください。
一度に扱うコンテキストの種類が増えると、理解しづらく修正が難しいコードになります。

## 📝 코드 예시

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

### 結合度

この Hook は、「このページに必要なすべてのクエリパラメータを管理する」という広範な責任を持っています。そのため、ページ内のコンポーネントや他の Hook がこの Hook に依存することになり、コード修正時に影響範囲が急激に広がる可能性があります。

時間が経つにつれて、この Hook はメンテナンスがますます難しくなり、修正が困難なコードになってしまう可能性があります。

::: info

この Hook は[可読性](./use-page-state-readability.md)の観点からも考えることができます。

:::

## ✏️ リファクタリングしてみる

以下のコードのように、各クエリパラメータごとに別々の Hook を作成することができます。

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

Hook が担う責任を分離したため、修正による影響範囲を狭めることができます。
これにより、Hook を修正した際に予期しない影響が生じるのを防ぐことができます。

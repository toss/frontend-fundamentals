# Props Drillingを解消する

<div style="margin-top: 16px">
<Badge type="info" text="結合度" />
</div>

Props Drillingは親コンポーネントと子コンポーネントの間に結合度が生じていることを示す明確なサインです。もしDrillingされているpropsが変更された場合、そのpropsを参照しているすべてのコンポーネントを修正しなくてはなりません。

## 📝 コード例

次のコードは、ユーザーが`item`を選択する際に使用する`<ItemEditModal />`コンポーネントです。
ユーザーがキーワードを入力してアイテムのリストを検索し、探していたアイテムを選択すると`onConfirm`が呼び出されます。

ユーザーが入力したキーワードは`keyword`、選択可能なアイテムは`items`、推薦アイテムのリストは`recommendedItems`のpropsとして渡されます。

```tsx 2,9-10,12-13,39-42
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  // 他のItemEditModalに関するロジック...

  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody
        items={items}
        keyword={keyword}
        onKeywordChange={setKeyword}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
        onClose={onClose}
      />
      {/* ... 他のItemEditModalコンポーネント ... */}
    </Modal>
  );
}

function ItemEditBody({
  keyword,
  onKeywordChange,
  items,
  recommendedItems,
  onConfirm,
  onClose
}) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>閉じる</Button>
      </div>
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </>
  );
}

// ...
```

## 👃 コードの不吉な臭いを嗅いでみる

### 結合度

このコンポーネントは、親である`ItemEditModal`と子である`ItemEditBody`、`ItemEditList`などが同じ値である`recommendedItems`、`onConfirm`、`keyword`などを props として共有しています。このため、親コンポーネントが props をそのまま子コンポーネントに渡す[Props Drilling](https://kentcdodds.com/blog/prop-drilling)が発生しています。

Props Drillingが発生すると、propsを不必要に参照するコンポーネントの数が増えます。
さらにpropsが変更されると、そのpropsを参照しているすべてのコンポーネントを修正する必要があります。

例えば、アイテムの推薦機能がなくなり、`recommendedItems`を削除する必要になった場合、関連するすべてのコンポーネントからこのpropsを削除しなければなりません。
コードの修正範囲が必要以上に広がり、結合度が高くなります。

## ✏️ リファクタリングしてみる

### A. コンポジション(Composition)パターンの活用

コンポジションパターンを使用することで、親コンポーネントが子コンポーネントにpropsを一つ一つ渡さなければならないProps Drillingの問題を解決できます。
さらに、コンポジションパターンは不必要な中間抽象を取り除くことで、開発者が各コンポーネントの役割や意図をより明確に理解できるようにします。

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody onClose={onClose}>
        <ItemEditList
          keyword={keyword}
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
      <div style="display: flex; justify-content: space-between;">
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>閉じる</Button>
      </div>
      {children}
    </>
  );
}
```

上記の例のように、`children`を使用して必要なコンポーネントを親で作成することで、不必要なProps Drillingを減らすことができます。

しかし、コンポジションパターンだけでは解決できない場合もあり、コンポーネントツリーの構造が深くなると、依然として問題が発生します。
例えば、`ItemEditModal`コンポーネントは、まだ`items`と`recommendedItemsを`Props Drillingしています。

### B. ContextAPIの活用

Context APIを活用することで、データの流れを簡素化し、階層構造全体に簡単に共有することができます。
コンポジションパターンを使用しても、コンポーネントが複雑で深い場合には、ContextAPIを使用することで不必要なProps Drillingを取り除くことができます。

```tsx 1,7,14
function ItemEditModal({ open, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody onClose={onClose}>
        <ItemEditList keyword={keyword} onConfirm={onConfirm} />
      </ItemEditBody>
    </Modal>
  );
}

function ItemEditList({ children, onClose }) {
  const { items, recommendedItems } = useItemEditModalContext();

  return (
    <>
      <div style="display: flex; justify-content: space-between;">
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>閉じる</Button>
      </div>
      {children}
    </>
  );
}
```

::: tip
ContextAPIを使用すると、Props Drillingを非常に簡単に解決できますが、すべての値をContextAPIで管理する必要はありません。

1. コンポーネントはpropsを通じて、どのデータを使用するかを明確に表現します。
コンポーネントの役割や意図を反映したpropsであれば、問題にならないこともあります。

2. ContextAPIを使用する前に、`children`propを利用してコンポーネントを渡すことで深さを減らすことができます。

データを使用しない単純に値を渡すためのコンポーネントは、propsがコンポーネントの役割や意図を示さない場合があります。
このようなケースでは、コンポジションパターンを使用すれば不必要な深さを減らすことができます。

これらの点をまず考慮し、すべてのアプローチが適切でない場合に最終手段としてContextAPIを使用するべきです。
不必要なProps Drillingを取り除くことで、不必要な中間抽象を減らし、開発者がコンポーネントの役割と意図を明確に理解できるようになります。
:::

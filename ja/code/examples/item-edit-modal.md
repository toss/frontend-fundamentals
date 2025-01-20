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

このコンポーネントは、親である`ItemEditModal`と子である`ItemEditBody`、`ItemEditList`などが同じ値である`recommendedItems`、`onConfirm`、`keyword`などをpropsとして共有しています。このため、親コンポーネントがpropsをそのまま子コンポーネントに渡す[Props Drilling](https://kentcdodds.com/blog/prop-drilling)が発生しています。

Props Drillingが発生すると、propsを不必要に参照するコンポーネントの数が増えます。
さらにpropsが変更されると、そのpropsを参照しているすべてのコンポーネントを修正する必要があります。

例えば、アイテムの推薦機能がなくなり、`recommendedItems`を削除する必要になった場合、関連するすべてのコンポーネントからこのpropsを削除しなければなりません。
コードの修正範囲が必要以上に広がり、結合度が高くなります。

## ✏️ リファクタリングしてみる

親コンポーネントが子コンポーネントにそのままpropを渡すProps Drillingを排除する必要があります。次のようにコンポジション(Composition)パターンを活用できます。

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
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
    </Modal>
  );
}
```

# Eliminating Props Drilling

<div style="margin-top: 16px">
<Badge type="info" text="Coupling" />
</div>

Props Drilling is a clear indication that there is coupling between parent and child components. If the drilled prop changes, all components referencing the prop must also change.

## 📝 Code Example

The following code is the `<ItemEditModal />` component used when a user selects an `item`.
The user can enter a keyword to search the item list, and when the desired item is found and selected, `onConfirm` is called.

The keyword entered by the user is passed as the `keyword` prop, the selectable items are passed as the `items` prop, and the list of recommended items is passed as the `recommendedItems` prop.

```tsx 2,9-10,12-13,29-32
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  // Other ItemEditModal logic ...

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
      {/* ... Other ItemEditModal components ... */}
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>Close</Button>
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

## 👃 Smell the Code

### Coupling

This component shares the same values, such as `recommendedItems`, `onConfirm`, and `keyword`, as props between the parent `ItemEditModal` and the child components `ItemEditBody` and `ItemEditList`.
This results in [Props Drilling](https://kentcdodds.com/blog/prop-drilling), where the parent component passes props directly to child components.

When Props Drilling occurs, the number of components unnecessarily referencing the props increases.
If the props change, all components referencing them need to be modified.

For example, if the recommendation feature for items is removed and `recommendedItems` needs to be deleted, it must be removed from all related components.
The scope of code modification becomes unnecessarily wide, and the coupling is high.

## ✏️ Work on Improving

We need to eliminate Props Drilling, where the parent component passes props directly to child components. We can use the Composition pattern as follows.

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>닫기</Button>
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

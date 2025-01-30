# 消除 Props Drilling

<div style="margin-top: 16px">
<Badge type="info" text="耦合性" />
</div>

Props Drilling（属性钻探）是父组件与子组件之间产生耦合的一个明显迹象。如果正在被钻取的属性发生了变化，那么所有引用该属性的组件都需要更新。

## 📝 代码示例

以下代码是用户选择 `item` 时使用的 `<ItemEditModal />` 组件。
用户输入关键词来搜索项目列表，当找到目标项目并选择时， 会调用 `onConfirm` 函数。

用户输入的关键词通过 `keyword` 传递，可供选择的项目通过 `items` 传递，推荐项目列表通过 `recommendedItems` 属性传递。

```tsx 2,9-10,12-13,39-42
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  // 其他 ItemEditModal 逻辑 ...

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
      {/* ... 其他 ItemEditModal 组件 ... */}
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
        <Button onClick={onClose}>关闭</Button>
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

## 👃 闻代码

### 耦合性

该组件与其父组件 `ItemEditModal` 以及子组件 `ItemEditBody` 、 `ItemEditList` 等共享了相同的属性，如`recommendedItems` 、 `onConfirm` 、 `keyword` 等。
正在发生父组件直接将属性传递给子组件的 [Props Drilling](https://kentcdodds.com/blog/prop-drilling) 情况。

Props Drilling 会导致不必要的属性被传递给多个组件。
但是，如果属性发生变化，那么引用该属性的所有组件都必须进行修改。

例如，如果不再需要推荐功能，从而需要删除 `recommendedItems` 属性，那么必须在所有相关的组件中进行删除。
这样一来，代码的修改范围变得过于广泛，耦合性很高。

## ✏️ 尝试改善

需要消除父组件直接向子组件传递属性的 Props Drilling 现象。可以采用组合（Composition） 模式来实现这一点。

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
        <Button onClick={onClose}>关闭</Button>
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

组合（Composition）模式不仅可以减少传递 Props 的问题，还能消除不必要的中间抽象，帮助开发者明确理解组件的角色和意图。

# Props Drilling 지우기

<div style="margin-top: 16px">
<Badge type="info" text="결합도" />
</div>

Props Drilling은 부모 컴포넌트와 자식 컴포넌트 사이에 결합도가 생겼다는 것을 나타내는 명확한 표시예요. 만약에 Drilling되는 프롭이 변경되면, 프롭을 참조하는 모든 컴포넌트가 변경되어야 하죠.

## 📝 코드 예시

다음 코드는 사용자가 `item`을 선택할 때 사용하는 `<ItemEditModal />` 컴포넌트예요.
사용자가 키워드를 입력해서 아이템 목록을 검색하고, 찾고 있었던 아이템을 선택하면 `onConfirm`이 호출돼요.

사용자가 입력한 키워드는 `keyword`, 선택할 수 있는 아이템은 `items`, 추천 아이템의 목록은 `recommendedItems` 프롭으로 전달돼요.

```tsx 2,9-10,12-13,29-32
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  // 다른 ItemEditModal 로직 ...

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
      {/* ... 다른 ItemEditModal 컴포넌트 ... */}
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
        <Button onClick={onClose}>닫기</Button>
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

## 👃 코드 냄새 맡아보기

### 결합도

이 컴포넌트는 부모인 `ItemEditModal`과 자식인 `ItemEditBody`, `ItemEditList` 등이 동일한 값인 `recommendedItems`, `onConfirm`, `keyword` 등을 프롭으로 공유하고 있어요.
부모 컴포넌트가 프롭을 그대로 자식 컴포넌트에게 넘겨주는 [Props Drilling](https://kentcdodds.com/blog/prop-drilling)이 발생하고 있어요.

Props Drilling이 발생하면, 프롭을 불필요하게 참조하는 컴포넌트의 숫자가 많아져요.
그런데 프롭이 변경되면 프롭을 참조하는 모든 컴포넌트가 수정되어야 해요.

예를 들어, 더 이상 아이템에 대한 추천 기능이 사라져서 `recommendedItems` 를 삭제해야 한다면, 연관된 모든 컴포넌트에서 삭제해야 하죠.
코드 수정범위가 필요 이상으로 넓고, 결합도가 높아요.

## ✏️ 개선해보기

부모 컴포넌트가 자식 컴포넌트에게 그대로 프롭을 전달하는 Props Drilling을 제거해야 해요. 다음과 같이 조합(Composition) 패턴을 활용할 수 있어요.

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

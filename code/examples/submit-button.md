# 같이 실행되지 않는 코드 분리하기

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

동시에 실행되지 않는 코드가 하나의 함수 또는 컴포넌트에 있으면, 동작을 한눈에 파악하기 어려워요.
구현 부분에 많은 숫자의 분기가 들어가서, 어떤 역할을 하는지 이해하기 어렵기도 해요.

## 📝 코드 예시

다음 `<SubmitButton />` 컴포넌트는 사용자의 권한에 따라서 다르게 동작해요.

- 사용자의 권한이 보기 전용(`"viewer"`)이면, 초대 버튼은 비활성화되어 있고, 애니메이션도 재생하지 않아요.
- 사용자가 일반 사용자이면, 초대 버튼을 사용할 수 있고, 애니메이션도 재생해요.

```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  useEffect(() => {
    if (isViewer) {
      return;
    }
    showButtonAnimation();
  }, [isViewer]);

  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}
```

## 👃 코드 냄새 맡아보기

### 가독성

`<SubmitButton />` 컴포넌트에서는 사용자가 가질 수 있는 2가지의 권한 상태를 하나의 컴포넌트 안에서 한 번에 처리하고 있어요.
그래서 코드를 읽는 사람이 한 번에 고려해야 하는 맥락이 많아요.

예를 들어, 다음 코드에서 파란색은 사용자가 보기 전용 권한(`'viewer'`)을 가지고 있을 때, 빨간색은 일반 사용자일 때 실행되는 코드예요.
동시에 실행되지 않는 코드가 교차되어서 나타나서 코드를 이해할 때 부담을 줘요.

![](../../images/examples/submit-button.png)

## ✏️ 개선해보기

다음 코드는 사용자가 보기 전용 권한을 가질 때와 일반 사용자일 때를 완전히 나누어서 관리하도록 하는 코드예요.

```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function AdminSubmitButton() {
  useEffect(() => {
    showAnimation();
  }, []);

  return <Button type="submit">Submit</Button>;
}
```

- `<SubmitButton />` 코드 곳곳에 있던 분기가 단 하나로 합쳐지면서, 분기가 줄어들었어요.
- `<ViewerSubmitButton />`과 `<AdminSubmitButton />` 에서는 하나의 분기만 관리하기 때문에, 코드를 읽는 사람이 한 번에 고려해야 할 맥락이 적어요.

# `<FriendInvitation />` 적절하게 추상화하기

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

## 📝 코드 예시

다음 `<FriendInvitation />` 컴포넌트는 클릭하면 사용자에게 동의를 받고 사용자에게 초대를 보내는 페이지 컴포넌트예요.

```tsx 6-27,33
function FriendInvitation() {
  const { data } = useQuery(/* 생략.. */);

  // 이외 이 컴포넌트에 필요한 상태 관리, 이벤트 핸들러 및 비동기 작업 로직...

  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog
        title={`${data.name}님에게 공유해요`}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => close(false)}>
            닫기
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
            확인
          </ConfirmDialog.ConfirmButton>
        }
        /* 중략 */
      />
    ));

    if (canInvite) {
      await sendPush();
    }
  };

  // 이외 이 컴포넌트에 필요한 상태 관리, 이벤트 핸들러 및 비동기 작업 로직...

  return (
    <>
      <Button onClick={handleClick}>초대하기</Button>
      {/* UI를 위한 JSX 마크업... */}
    </>
  );
}
```

## 👃 코드 냄새 맡아보기

### 가독성

가독성을 지키려면 코드가 한 번에 가지고 있는 맥락이 적어야 해요. 하나의 컴포넌트가 가지고 있는 맥락이 다양하면 컴포넌트의 역할을 한눈에 파악하기 어려워져요. 

`<FriendInvitation />` 컴포넌트는 실제로 사용자에게 동의를 받을 때 사용하는 자세한 로직까지 하나의 컴포넌트에 가지고 있어요. 그래서 코드를 읽을 때 따라가야 할 맥락이 많아서 읽기 어려워요.

### 응집도

사용자에게 동의를 받는 로직과 실제로 그 로직을 실행하는 로직인 `<Button />` 사이에 거리가 멀어서, 실제로 어디에서 이 로직을 실행하는지 확인하려면 스크롤을 밑으로 많이 내려야 해요.

그래서 자주 함께 수정되는 코드인 버튼과 클릭 핸들러가 미처 함께 수정되지 못할 가능성이 있어요.

## ✏️ 개선해보기

사용자에게 동의를 받는 로직과 버튼을 `<InviteButton />` 컴포넌트로 추상화했어요. 

```tsx
export function FriendInvitation() {
  const { data } = useQuery(/* 생략.. */);

  // 이외 이 컴포넌트에 필요한 상태 관리, 이벤트 핸들러 및 비동기 작업 로직...

  return (
    <>
      <InviteButton name={data.name} />
      {/* UI를 위한 JSX 마크업 */}
    </>
  );
}

function InviteButton({ name }) {
  return (
    <Button
      onClick={async () => {
        const canInvite = await overlay.openAsync(({ isOpen, close }) => (
          <ConfirmDialog
            title={`${data.name}님에게 공유해요`}
            cancelButton={
              <ConfirmDialog.CancelButton onClick={() => close(false)}>
                닫기
              </ConfirmDialog.CancelButton>
            }
            confirmButton={
              <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
                확인
              </ConfirmDialog.ConfirmButton>
            }
            /* 중략 */
          />
        ));

        if (canInvite) {
          await sendPush();
        }
      }}
    >
      초대하기
    </Button>
  );
}
```

`<InviteButton />` 컴포넌트는 사용자를 초대하는 로직과 UI만 가지고 있으므로, 한 번에 인지해야 하는 내용을 적게 유지해서 가독성을 높일 수 있어요. 또한, 버튼과 클릭 후 실행되는 로직이 아주 가까이에 있어요.
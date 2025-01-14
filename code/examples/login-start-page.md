# 구현 상세 추상화하기

<div style="margin-top: 16px">
<Badge type="info" text="가독성" />
</div>

한 사람이 코드를 읽을 때 동시에 고려할 수 있는 총 맥락의 숫자는 제한되어 있다고 해요.
내 코드를 읽는 사람들이 코드를 쉽게 읽을 수 있도록 하기 위해서 불필요한 맥락을 추상화할 수 있어요.

## 📝 코드 예시 1: LoginStartPage

다음 `<LoginStartPage />` 컴포넌트는 사용자가 로그인되었는지 확인하고, 로그인이 된 경우 홈으로 이동시키는 로직을 가지고 있어요.

```tsx
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }
  });

  /* ... 로그인 관련 로직 ... */

  return <>{/* ... 로그인 관련 컴포넌트 ... */}</>;
}
```

### 👃 코드 냄새 맡아보기

#### 가독성

예시 코드에서는 로그인이 되었는지 확인하고, 사용자를 홈으로 이동시키는 로직이 추상화 없이 노출되어 있어요. 그래서 `useCheckLogin`, `onChecked`, `status`, `"LOGGED_IN"`과 같은 변수나 값을 모두 읽어야 무슨 역할을 하는 코드인지 알 수 있어요.

이 코드와 더불어서, 실제로 로그인과 관련된 코드가 밑에 이어지는데요. 읽는 사람이 `LoginStartPage`가 무슨 역할을 하는지 알기 위해서 한 번에 이해해야 하는 맥락이 많아요.

### ✏️ 개선해보기

사용자가 로그인되었는지 확인하고 이동하는 로직을 **HOC(Higher-Order Component)** 나 Wrapper 컴포넌트로 분리하여, 코드를 읽는 사람이 한 번에 알아야 하는 맥락을 줄여요.
그래서 코드의 가독성을 높일 수 있어요.

또한, 분리된 컴포넌트 안에 있는 로직끼리 참조를 막음으로써, 코드 간의 불필요한 의존 관계가 생겨서 복잡해지는 것을 막을 수 있어요.

#### 옵션 A: Wrapper 컴포넌트 사용하기

```tsx
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }) {
  const status = useCheckLoginStatus();

  useEffect(() => {
    if (status === "LOGGED_IN") {
      location.href = "/home";
    }
  }, [status]);

  return status !== "LOGGED_IN" ? children : null;
}

function LoginStartPage() {
  /* ... 로그인 관련 로직 ... */

  return <>{/* ... 로그인 관련 컴포넌트 ... */}</>;
}
```

#### 옵션 B: HOC(Higher-Order Component) 사용하기

```tsx
function LoginStartPage() {
  /* ... 로그인 관련 로직 ... */

  return <>{/* ... 로그인 관련 컴포넌트 ... */}</>;
}

export default withAuthGuard(LoginStartPage);

// HOC 정의
function withAuthGuard(WrappedComponent) {
  return function AuthGuard(props) {
    const status = useCheckLoginStatus();

    useEffect(() => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }, [status]);

    return status !== "LOGGED_IN" ? <WrappedComponent {...props} /> : null;
  };
}
```

## 📝 코드 예시 2: FriendInvitation

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

### 👃 코드 냄새 맡아보기

#### 가독성

가독성을 지키려면 코드가 한 번에 가지고 있는 맥락이 적어야 해요. 하나의 컴포넌트가 가지고 있는 맥락이 다양하면 컴포넌트의 역할을 한눈에 파악하기 어려워져요.

`<FriendInvitation />` 컴포넌트는 실제로 사용자에게 동의를 받을 때 사용하는 자세한 로직까지 하나의 컴포넌트에 가지고 있어요. 그래서 코드를 읽을 때 따라가야 할 맥락이 많아서 읽기 어려워요.

#### 응집도

사용자에게 동의를 받는 로직과 실제로 그 로직을 실행하는 로직인 `<Button />` 사이에 거리가 멀어서, 실제로 어디에서 이 로직을 실행하는지 확인하려면 스크롤을 밑으로 많이 내려야 해요.

그래서 자주 함께 수정되는 코드인 버튼과 클릭 핸들러가 미처 함께 수정되지 못할 가능성이 있어요.

### ✏️ 개선해보기

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

## 🔍 더 알아보기: 추상화

토스 기술 블로그의 [선언적인 코드 작성하기](https://toss.tech/article/frontend-declarative-code) 문서에서는 코드를 글로 비유해요.

### 글에서 추상화

"왼쪽으로 10걸음 걸어라" 라고 하는 문장이 있어요. 여기에서

- “왼쪽”은 “북쪽을 바라보았을 때 90도 돌아간 위치” 를 추상화한 것이고,
- “90도”는 “한 번의 회전을 360등분한 각의 90배만큼 시초선에 대해 시계 반대 방향으로 돌아간 것” 을 추상화한 것이고,
- “시계 방향” 의 정의는 “북반구에서 해시계의 바늘이 돌아가는 방향” 을 추상화한 것이에요.

비슷하게 "10걸음", "걸어라"와 같은 단어도 보다 구체적으로 표현할 수 있어요. 그래서 추상화 없이 그대로 문장을 나타낸다면, 다음과 같이 나타낼 수 있을 거예요.

> 북쪽을 바라보았을 때 한 번의 회전을 360등분한 각의 90배만큼 북반구에서 해시계의 바늘이 돌아가는 방향으로 돌아서, 동물이 육상에서 다리를 이용해 움직이는 가장 빠른 방법보다 느린, 신체를 한 지점에서 다른 지점으로 옮겨가는 행위를 10번 반복해라

이 문장은 그대로 읽었을 때 어떤 의미인지 정확하게 파악하기 어려워요.

### 코드에서 추상화

비슷하게 코드에서도 구현 상세를 지나치게 드러내는 경우, 이 코드가 어떤 역할을 하는지 정확하게 파악하기 어려워요.
한 번에 6~7개 정도의 맥락을 한 번에 고려해 가면서 읽을 수 있도록, 보다 작은 단위로 추상화하는 것이 필요해요.

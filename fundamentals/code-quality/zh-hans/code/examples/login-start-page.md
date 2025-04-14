# 抽象实现细节

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

一个人在阅读代码时，能够同时考虑的上下文总数有限。
为了让阅读者轻松理解你的代码，可以将不必要的语境进行抽象化处理。

## 📝 代码示例 1: LoginStartPage

以下 `<LoginStartPage />` 组件包含检查用户是否已登录的逻辑，如果已登录，则会将用户重定向到主页。

```tsx
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }
  });

  /* ... 登录相关逻辑 ... */

  return <>{/* ... 登录相关组件 ... */}</>;
}
```

### 👃 闻代码

#### 可读性

在示例代码中，检查用户是否已登录以及将用户重定向到主页的逻辑没有被抽象化，而是直接显露出来。所以，你需要读懂像 `useCheckLogin` 、 `onChecked` 、 `status` 以及 `"LOGGED_IN"` 这样的变量和值，才能明白这段代码的作用。

除了这段代码，下面还紧接着有与实际登录相关的代码。阅读者为了理解 `LoginStartPage` 的作用，需要一次性理解很多上下文信息。

### ✏️ 尝试改善

通过将检查用户是否登录并进行导航的逻辑提取到 **HOC（高阶组件）** 或 Wrapper 组件中，可以减少代码阅读者一次性需要理解的上下文。
从而可以提高代码的可读性。

此外，通过阻止不同组件中的逻辑相互引用，可以避免代码之间产生不必要地依赖关系，防止代码变得过于复杂。

#### 选项 A: 使用 Wrapper 组件

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
  /* ... 登录相关逻辑 ... */

  return <>{/* ... 登录相关组件 ... */}</>;
}
```

#### 选项 B: 使用 HOC（高阶组件）

```tsx
function LoginStartPage() {
  /* ... 登录相关逻辑 ... */

  return <>{/* ... 登录相关组件 ... */}</>;
}

export default withAuthGuard(LoginStartPage);

// 高阶组件的定义
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

## 📝 代码示例 2: FriendInvitation

以下 `<FriendInvitation />` 是一个被点击时，会向用户征求同意，并给用户发送邀请的页面组件。

```tsx 6-27,33
function FriendInvitation() {
  const { data } = useQuery(/* 省略.. */);

  // 该组件需要的状态管理、事件处理程序及异步操作等逻辑...

  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog
        title={`向${data.name}分享`}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => close(false)}>
            关闭
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
            确认
          </ConfirmDialog.ConfirmButton>
        }
        /* 中略 */
      />
    ));

    if (canInvite) {
      await sendPush();
    }
  };

  // 该组件需要的状态管理、事件处理程序及异步操作等逻辑...

  return (
    <>
      <Button onClick={handleClick}>邀请</Button>
      {/* 用于用户界面的 JSX 标记... */}
    </>
  );
}
```

### 👃 闻代码

#### 可读性

为了保持可读性，代码同时承载的上下文越少越好。如果一个组件包含太多的语境，就很难一眼看出该组件的作用。

`<FriendInvitation />` 这一组件内实际上包含了向用户获取同意等详细的逻辑。所以在阅读代码时，需要追踪过多的语境，导致阅读难度高。

#### 内聚性

获取用户同意的逻辑代码与实际执行该逻辑的 `<Button />` 组件之间相隔太远，为了找到逻辑的执行位置，需要不必要地滚动地页面。

因此，按钮及点击处理函数，作为经常需要协同修改的代码，有可能会因为相隔过远而无法及时同步更新。

### ✏️ 尝试改善

将获取用户同意的逻辑和按钮一同抽象为 `<InviteButton />` 组件。

```tsx
export function FriendInvitation() {
  const { data } = useQuery(/* 省略.. */);

  // 该组件需要的状态管理、事件处理程序及异步操作等逻辑...

  return (
    <>
      <InviteButton name={data.name} />
      {/* 用于用户界面的 JSX 标记... */}
    </>
  );
}

function InviteButton({ name }) {
  return (
    <Button
      onClick={async () => {
        const canInvite = await overlay.openAsync(({ isOpen, close }) => (
          <ConfirmDialog
            title={`向${name}分享`}
            cancelButton={
              <ConfirmDialog.CancelButton onClick={() => close(false)}>
                关闭
              </ConfirmDialog.CancelButton>
            }
            confirmButton={
              <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
                确认
              </ConfirmDialog.ConfirmButton>
            }
            /* 中略 */
          />
        ));

        if (canInvite) {
          await sendPush();
        }
      }}
    >
      邀请
    </Button>
  );
}
```

`<InviteButton />` 组件仅包含邀请用户的逻辑和 UI， 因此能够减少需要一次性认知的信息量，提高可读性。而且，按钮与点击后执行的逻辑紧密相连。

## 🔍 深入了解： 抽象化

在 Toss 的技术博客 [编写声明式代码](https://toss.tech/article/frontend-declarative-code) 一文中，将代码比作了文章。

### 文章中的抽象化

有一句话是“向左走十步”。 在这句话里

- ”向左“是”面向北方时旋转 90 度的位置“的抽象概念，
- ”90 度“是”将一个完整的旋转（360 度）等分后，取其中 90 份，即相对于初始线逆时针方向旋转的角度“的抽象概念，
- ”时针方向“的定义是”北半球上日晷的指针转动的方向“的抽象概念。

与此类似，”十步“、”走“这样的词汇也可以更具体的表达。因此，不进行抽象化而直接表述的句子可能会是这样：

> 面朝北方，以 1 次旋转的角度 360 等分后乘于 90 倍的度数，在北半球中沿日晷指针转动的方向转动，然后重复将身体从一点移动到另一点的动作（比动物在陆地上用腿移动的最快方式还慢的行为）10 次。

直接阅读该文章时很难准确理解其真正意图。

### 代码中的抽象化

同样地，编程时如果显露过多实现细节，就很难把握代码的真正用途。
为了让代码阅读时能同时兼顾六到七个不同语境，需要将这些语境抽象为更小的单位。

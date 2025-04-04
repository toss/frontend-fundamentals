# 减少视点转移

<div style="margin-top: 16px">
<Badge type="info" text="可读性" />
</div>

在阅读代码时，反复浏览代码的各个部分，或者在多个文件、函数、变量之间翻看阅读的现象被称为**视点转移**。
随着视点的多次转移，需要理解代码的时间也随之增加，很难把握代码的整体语境。

如果将代码编写成从上到下、在一个函数或文件中就能顺序阅读的方式，代码阅读者可以迅速理解其功能。

## 📝 代码示例

下列代码会根据用户的权限显示不同的按钮。

- 如果用户权限是管理员（Admin），则显示 `Invite` 和 `View` 按钮。
- 如果用户权限是仅查看用户（Viewer），则非激活 `Invite` 按钮，显示 `View` 按钮。

```tsx
function Page() {
  const user = useUser();
  const policy = getPolicyByRole(user.role);

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}

function getPolicyByRole(role) {
  const policy = POLICY_SET[role];

  return {
    canInvite: policy.includes("invite"),
    canView: policy.includes("view")
  };
}

const POLICY_SET = {
  admin: ["invite", "view"],
  viewer: ["view"]
};
```

## 👃 闻代码

### 可读性

为了理解这段代码中为何 `Invite` 按钮被非激活，你需要按照 `policy.canInvite` → `getPolicyByRole(user.role)` → `POLICY_SET` 的顺序，在代码中上下翻阅进行阅读。
在此过程中，发生了三次视点转移，使得代码阅读者很难维持上下文的语境，增加了理解的难度。

虽然使用 `POLICY_SET` 等抽象来按权限管理按钮状态在复杂权限体系中很有用，但在当前简单场景下却增加了阅读者的代码理解难度。

## ✏️ 尝试改善

### A. 展开并明确展示条件

直接在代码中明确展示了基于权限的条件。这样一来，代码中很容易看出 `Invite` 按钮何时会被非激活。
只需阅读代码的上下文，就能一眼看清处理权限的逻辑。

```tsx
function Page() {
  const user = useUser();

  switch (user.role) {
    case "admin":
      return (
        <div>
          <Button disabled={false}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    case "viewer":
      return (
        <div>
          <Button disabled={true}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    default:
      return null;
  }
}
```

### B. 将条件整理成清晰易懂的对象形式

通过以对象的形式在组件内部管理权限逻辑，可以减少不必要的视点转移，一眼看清并修改条件。
只需查看 `Page` 组件，就能确认 `canInvite` 和 `canView` 的条件。

```tsx
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canView: true },
    viewer: { canInvite: false, canView: true }
  }[user.role];

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
```

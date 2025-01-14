# Reducing Eye Movement While Reading Code

<div style="margin-top: 16px">
<Badge type="info" text="Readability" />
</div>

When reading code, moving back and forth between different parts of the code or jumping between multiple files, functions, or variables is called **eye movement**.
The more eye movement occurs, the more time it takes to understand the code, and it can be difficult to grasp the context.

Writing code that can be read from top to bottom within a single function or file allows the reader to quickly understand the operation.

## 📝 Code Example

The following code displays buttons differently based on the user's permission.

- If the user's permission is Administrator (Admin), it displays both `Invite` and `View` buttons.
- If the user's permission is Viewer, it disables the `Invite` button and displays the `View` button.

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
    canRead: policy.includes("view"),
  };
}

const POLICY_SET = {
  admin: ["invite", "view"],
  viewer: ["view"],
};
```

## 👃 Smell the Code

### Readability

To understand why the `Invite` button is disabled in this code, you need to read the code in the order of `policy.canInvite` → `getPolicyByRole(user.role)` → `POLICY_SET`, jumping back and forth between different parts of the code. 
This process involves three eye movements, making it difficult for the reader to maintain context and understand the code.

Using abstractions like `POLICY_SET` to manage button states based on permissions can be useful when the permission system is complex, but in simple cases like this, it makes it harder for the reader to understand the code.

## ✏️ Work on Improving

### A. Exposing Conditions Directly

This approach involves directly exposing the conditions based on permissions in the code. This way, you can directly see in the code when the `Invite` button is disabled. 
By reading the code from top to bottom, you can easily understand the logic for handling permissions.

```tsx
function Page() {
  const user = useUser();

  switch (user.role) {
    case "admin":
      return (
        <div>
          <Button disabled={false}>Invite</Button>
          <Button disabled={false}>Read</Button>
        </div>
      );
    case "viewer":
      return (
        <div>
          <Button disabled={true}>Invite</Button>
          <Button disabled={false}>Read</Button>
        </div>
      );
    default:
      return null;
  }
}
```

### B. Creating an Object to View Conditions at a Glance

By managing the logic for handling permissions within the component as an object, you can modify it to be able to grasp the conditions at a glance without multiple context shifts. 
You can check the conditions for `canInvite` and `canRead` just by looking at the `Page` component.

```tsx
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canRead: true },
    viewer: { canInvite: false, canRead: true },
  }[user.role];

  return (
    <div>
      <Button disabled={policy.canInvite}>Invite</Button>
      <Button disabled={policy.canRead}>Read</Button>
    </div>
  );
}
```
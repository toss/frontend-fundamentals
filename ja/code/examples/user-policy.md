# コードを読む際の視点移動を減らす

<div style="margin-top: 16px">
<Badge type="info" text="可読性" />
</div>
コードを読む際に、コードを上下にスクロールしながら読んだり、色々なファイルや関数、変数を行き来しながら読むことを**視点移動**と言います。
視点が何度も移動すればするほど、コードを把握するのに時間がかかり、コンテキストを理解するのが困難になる可能性があります。

コードを上下に一つの関数やファイルで読めるように書くことで、読む人がコードの内容を瞬時に把握できるようになります。

## 📝 コード例

以下のコードは、ユーザーの権限に応じて異なるボタンを表示します。

- ユーザーの権限が管理者（Admin）であれば、`Invite`と`View` ボタンを表示します。
- ユーザーの権限が閲覧専用（Viewer）であれば、`Invite`ボタンを無効化し、`View`ボタンを表示します。

```typescript
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
    canRead: policy.includes("view")
  };
}

const POLICY_SET = {
  admin: ["invite", "view"],
  viewer: ["view"]
};
```

## 👃 コードの不吉な臭いを嗅いでみる

### 可読性

このコードで`Invite`ボタンが無効化されている理由を理解するには、`policy.canInvite` → `getPolicyByRole(user.role)` → `POLICY_SET`の順でコードを行ったり来たりしながら読まないといけません。
この過程で３回の視点移動が起こるため、コードを読む人がコンテキストを維持しながら読むのが困難になります。

`POLICY_SET`のような抽象化を使って権限によってボタンの状態を管理することは権限の仕様が複雑な場合には有効ですが、今のような簡単な場合には、逆に読む人がコードを理解しにくくしてしまいます。

## ✏️ リファクタリングしてみる

### A. 条件を展開してそのまま表す

権限条件の仕様をそのままコードで表す方法です。このようにすれば`Invite`ボタンが無効化されている場合でもコードですぐに確認することができます。
コードを上から下へ読むだけで一目で権限を扱うロジックについて理解することができるようになります。

```typescript
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

### B. 条件を一目で把握できるオブジェクトにする

権限を扱うロジックをコンポーネントの中でオブジェクトで管理して、何度も視点移動をしなくても一目で条件を把握できるように修正できます。
`canInvite`と`canRead`の条件を`Page`コンポーネントを見れば確認できようになりました。

```tsx
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canRead: true },
    viewer: { canInvite: false, canRead: true }
  }[user.role];

  return (
    <div>
      <Button disabled={policy.canInvite}>Invite</Button>
      <Button disabled={policy.canRead}>Read</Button>
    </div>
  );
}
```

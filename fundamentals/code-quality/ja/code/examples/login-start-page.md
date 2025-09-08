# 実装の詳細を抽象化する

<div style="margin-top: 16px">
<Badge type="info" text="可読性" />
</div>

一人の人がコードを読むときに同時に考慮できるコンテキストの数には限りがあります。そのため、コードを読む人がコードを簡単に理解できるように、不必要なコンテキストを抽象化する必要があります。

## 📝 コード例 1: LoginStartPage

次の`<LoginStartPage />`コンポーネントは、ユーザーがログインしているかを確認し、ログインしている場合はホームに移動させるロジックを持っています。

```tsx
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }
  });

  /* ... ログインに関連するロジック ... */

  return <>{/* ... ログインに関連するコンポーネント ... */}</>;
}
```

### 👃 コードの不吉な臭いを嗅いでみる

#### 可読性

例のコードでは、ログインが行われているかを確認し、ユーザーをホームに移動させるロジックが抽象化されずに露出しています。そのため、`useCheckLogin`、`onChecked、status`、`"LOGGED_IN"`といった変数や値をすべて読まなければ、コードの役割を理解することができません。

さらに、このコードの下には実際にログインに関連するコードが続いているため、読む人は`LoginStartPage`が何をしているのかを理解するために、一度に考慮しなければならないコンテキストが増えてしまいます。

### ✏️ リファクタリングしてみる

ユーザーがログインしているかどうかを確認し、移動するロジックを **HOC（Higher-Order Component）** またはWrapperコンポーネントに分離することで、コードを読む人が一度に知っておくべきコンテキストを減らすことができます。
これにより、コードの可読性を向上させることができます。

さらに、分離されたコンポーネント内のロジック同士の参照を防ぐことで、コード間の不必要な依存関係が生じて複雑になるのを防ぐことができます。

#### オプションA: Wrapperコンポーネントを使う

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
  /* ... ログインに関連するロジック ... */

  return <>{/* ... ログインに関連するコンポーネント ... */}</>;
}
```

#### オプションB: HOC(Higher-Order Component)を使う

```tsx
function LoginStartPage() {
  /* ... ログインに関連するロジック ... */

  return <>{/* ... ログインに関連するコンポーネント ... */}</>;
}

export default withAuthGuard(LoginStartPage);

// HOC定義
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

## 📝 コード例 2: FriendInvitation

次の`<FriendInvitation />`コンポーネントは、クリックするとユーザーに同意を求め、ユーザーに招待を送るページコンポーネントです。

```tsx 6-27,33
function FriendInvitation() {
  const { data } = useQuery(/* 省略.. */);

  // このコンポーネントに必要な状態管理、イベントハンドラー、および非同期作業のロジックなど...

  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog
        title={`${data.name}さんにシェアする`}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => close(false)}>
            閉じる
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
            確認
          </ConfirmDialog.ConfirmButton>
        }
        /* 省略 */
      />
    ));

    if (canInvite) {
      await sendPush();
    }
  };

  // このコンポーネントに必要な状態管理、イベントハンドラー、および非同期作業のロジックなど...

  return (
    <>
      <Button onClick={handleClick}>招待する</Button>
      {/* UI用のJSXマークマップ... */}
    </>
  );
}
```

### 👃 コードの不吉な臭いを嗅いでみる

#### 可読性

可読性を保つためには、コードが一度に持つコンテキストは少ない方が良いです。1つのコンポーネントが多くの異なるコンテキストを持っていると、そのコンポーネントの役割を一目で理解するのが難しくなります。

`<FriendInvitation />`コンポーネントは、実際にユーザーに同意を得る際に使用する詳細なロジックまで1つのコンポーネントに含まれています。そのため、コードを読む際に追うべきコンテキストが多く、読みづらくなっています。

#### 凝集度

ユーザーに同意を得るロジックと、そのロジックを実行する実際の`<Button />`の間に隔たりがあるため、実際にどこでこのロジックが実行されているのかを確認するには、下の方にかなりスクロールをしないといけません。

そのため、頻繁に一緒に修正されるコードであるボタンとクリックハンドラーが、うまく一緒に修正されない可能性があります。

### ✏️ リファクタリングしてみる

ユーザーに同意を得るロジックとボタンを`<InviteButton />`コンポーネントとして抽象化しました。

```tsx
export function FriendInvitation() {
  const { data } = useQuery(/* 省略.. */);

  // このコンポーネントに必要な状態管理、イベントハンドラー、および非同期作業のロジックなど...

  return (
    <>
      <InviteButton name={data.name} />
      {/* UI用のJSXマークマップ... */}
    </>
  );
}

function InviteButton({ name }) {
  return (
    <Button
      onClick={async () => {
        const canInvite = await overlay.openAsync(({ isOpen, close }) => (
          <ConfirmDialog
            title={`${name}さんにシェアする`}
            cancelButton={
              <ConfirmDialog.CancelButton onClick={() => close(false)}>
                閉じる
              </ConfirmDialog.CancelButton>
            }
            confirmButton={
              <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
                確認
              </ConfirmDialog.ConfirmButton>
            }
            /* 省略 */
          />
        ));

        if (canInvite) {
          await sendPush();
        }
      }}
    >
      招待する
    </Button>
  );
}
```

`<InviteButton />`コンポーネントは、ユーザーを招待するロジックとUIだけを持っているため、一度に把握する内容が少なくなり、可読性が向上します。また、ボタンとクリック後の処理が近くにあるため、ロジックの流れも理解しやすくなっています。

## 🔍 もっと調べる: 抽象化

Tossの技術ブログの記事ではコードを文で比喩しています。[宣言的なコードを書く](https://toss.tech/article/frontend-declarative-code)

### 文での抽象化

「左に10歩歩け」という文があります。ここで、

- 「左」は「北を向いたときに90度回転した位置」を抽象化したもので、
- 「90度」は「1回の回転を360等分した角度の90倍だけ基準線に対して反時計回りに回ったこと」を抽象化したものであり、
- 「時計回り」の定義は「北半球で日時計の針が回る方向」を抽象化したものです。

同様に「10歩」や「歩け」といった言葉もより具体的に表現できます。抽象化せずにそのまま文を表すと、次のようになります。

> 北を向いたとき、1回の回転を360等分した角度の90倍だけ北半球で日時計の針が回る方向に回り、動物が陸上で足を使って移動する最も速い方法よりも遅く、身体をある地点から別の地点に移動させる行為を10回繰り返せ。

この文はそのまま読むと、どんな意味なのかを正確に理解するのが難しいです。

### コードでの抽象化

コードにおいても、実装の詳細を過度に明示すると、そのコードが果たす役割を正確に理解するのが難しくなります。
一度に6〜7個のコンテキストを考慮するのではなく、より小さな単位で抽象化することが必要です。

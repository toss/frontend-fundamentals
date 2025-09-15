# フォームの凝集度について考える

<div style="margin-top: 16px">
<Badge type="info" text="凝集度" />
</div>

フロントエンド開発をしていると、ユーザーから値を入力してもらうためにフォームを使用することがよくあります。
フォームを管理する際には、2つの方法で凝集度を保ち、一緒に修正すべきコードが同時に修正されるようにすることができます。

## フィールド単位の凝集度

フィールド単位の凝集度は、個別の入力要素を独立して管理する方法です。
各フィールドが独自の検証ロジックを持つため、変更が必要な範囲が縮小され、特定のフィールドのメンテナンスが容易になります。
フィールド単位の凝集度を考慮して設計すると、各フィールドの検証ロジックが独立しているため、他のフィールドに影響を与えることがありません。

```tsx
import { useForm } from "react-hook-form";

export function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      name: "",
      email: ""
    }
  });

  const onSubmit = handleSubmit((formData) => {
    // フォームデータを送信するロジック
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          {...register("name", {
            validate: (value) =>
              isEmptyStringOrNil(value) ? "名前を入力してください。" : ""
          })}
          placeholder="名前"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            validate: (value) => {
              if (isEmptyStringOrNil(value)) {
                return "メールアドレスを入力してください。";
              }

              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "正しいメールアドレスを入力してください。";
              }

              return "";
            }
          })}
          placeholder="メールアドレス"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">送信</button>
    </form>
  );
}

function isNil(value: unknown): value is null | undefined {
  return value == null;
}

type NullableString = string | null | undefined;

function isEmptyStringOrNil(value: NullableString): boolean {
  return isNil(value) || value.trim() === "";
}
```

## フォーム全体の凝集度

フォーム全体の凝集度とは、すべてのフィールドの検証ロジックがフォームに依存する設計のことです。この設計は、フォーム全体の流れを考慮して行われ、変更がフォーム単位で発生する場合に特に重要です。

フォーム全体の凝集度を高めると、検証が一箇所で管理されるため、ロジックがシンプルになり、状態も中央で管理できるようになります。これにより、フォーム全体の流れを把握しやすくなります。しかし、フィールド間の結合度が高まるため、フォームの再利用性が下がる可能性もあります。

```tsx
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "名前を入力してください。"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください。")
    .email("正しいメールアドレスを入力してください。")
});

export function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      name: "",
      email: ""
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit((formData) => {
    // フォームデータを送信するロジック
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input {...register("name")} placeholder="名前" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="メールアドレス" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">送信</button>
    </form>
  );
}
```

## フィールド単位 vs. フォーム全体の凝集度

凝集度を高めるためには、フィールド単位とフォーム全体単位のどちらが状況に適しているかを選ぶことが大切です。
フィールド単位で分けると再利用性と独立性が高まりますが、フォーム全体単位で管理することで一貫した流れを保つことができます。

変更単位がフィールド単位かフォーム全体単位かによって、設計を調整する必要があります。

### フィールド単位の凝集度を選ぶべき時

- **独立した検証が必要な場合**: フィールドごとに複雑な検証ロジックや非同期検証が必要な場合に適しています。メールアドレスの形式チェックや電話番号の有効性確認、IDの重複チェック、推薦コードの有効性確認など、各フィールドが独立してそれぞれの検証を行う必要があるときに便利です。
- **再利用が必要な場合**: フィールドと検証ロジックが他のフォームでも同様に使用できる場合です。共通の入力フィールドを独立して管理し、再利用したいときに便利です。

### フォーム全体単位の凝集度を選ぶべき時

- **単一機能を示す場合**: すべてのフィールドが密接に関連して、ひとつの完結した機能を構成する時に有用です。決済情報や配送情報のように、すべてのフィールドが一つのビジネスロジックを形成する場合に適しています。
- **段階的な入力が必要な場合**: ウィザードフォームのように、ステップごとに動作する複雑なフォームに適しています。会員登録やアンケートのように、前のステップの入力が次のステップに影響を与える場合に適しています。
- **フィールド間の依存性がある場合**: 複数のフィールドが互いに参照したり影響を与えたりする場合に適しています。パスワード確認や合計計算のように、フィールド間の相互作用が必要な場合に便利です。

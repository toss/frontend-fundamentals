# 考虑表单的内聚性

<div style="margin-top: 16px">
<Badge type="info" text="内聚性" />
</div>

在前端开发中，经常需要用 Form 来获取用户输入的值。
在管理 Form 时，可以通过两种方式来管理其内聚性，确保相关代码能同步修改。

## 字段级别的内聚性

字段级别的内聚是一种独立管理单个输入元素的方式。
每个字段都拥有独立的验证逻辑，因此需要修改的范围会缩小，使得特定字段的维护变得更加容易。
如果考虑字段级别的内聚性进行代码设计，则每个字段的验证逻辑相互独立，互不影响。

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
    // 表单数据提交逻辑
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          {...register("name", {
            validate: (value) =>
              isEmptyStringOrNil(value) ? "请输入您的姓名。" : ""
          })}
          placeholder="姓名"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            validate: (value) => {
              if (isEmptyStringOrNil(value)) {
                return "请输入您的电子邮件。";
              }

              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "请输入有效的电子邮件。";
              }

              return "";
            }
          })}
          placeholder="电子邮件"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">提交</button>
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

## 表单级别的内聚性

表单级别的内聚是一种所有字段的验证逻辑依赖于整个表单的方式。它是根据整个表单的流程来设计的，通常在表单级别发生更改时加以考虑。

提高表单的整体内聚性后，所有验证将统一管理，逻辑更加简单明了，执行集中式状态管理，更容易理解表单的整体流程。然而，字段之间的耦合性会提高，从而降低表单的可重用性。

```tsx
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "请输入您的姓名。"),
  email: z
    .string()
    .min(1, "请输入您的电子邮件。")
    .email("请输入有效的电子邮件。")
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
    // 表单数据提交逻辑
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input {...register("name")} placeholder="姓名" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="电子邮件" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">提交</button>
    </form>
  );
}
```

## 字段级别 vs. 表单级别 内聚性

欲提高内聚性，需要在字段级别和表单级别选择适合场景下的方式。
按字段级别进行划分，可提高可重用性和独立性；但如果以整个表单单位进行管理，则可以保持一致性。

我们需要根据变更的单位时字段级别还是整个表单级别来调整设计。

### 适合选择字段级别内聚性的情况

- **需要独立验证时**：这是指对每个字段进行复杂的验证逻辑，或者需要异步验证的情况。当每个字段需要独立且独特的验证时，例如电子邮件格式检查、电话号码有效性验证、ID 重复确认、推荐码有效验证等，这种方法会十分有用。
- **需要考虑可重用性时**：这是指字段和验证逻辑可以在其他表单中同一使用的情况。若需独立管理公共输入字段，此方案颇为适宜。

### 适合选择表单级别内聚性的情况

- **表示单一功能时**：这是所有字段都紧密相关，共同构成一个完整功能的情况。当所有字段共同构成一个业务逻辑时（如：支付信息、配送信息等），此方案颇为适宜。
- **需要逐步输入时**：比如像 Wizard Form（漏斗表单）一样，分步骤操作的复杂表单的情况。它适用于像会员注册或问卷调查那样，前一阶段的输入值会影响下一阶段的情况。
- **字段之间存在依赖关系时**：适用于多个字段相互引用或相互影响的情况。需要字段间交互时，例如密码确认或总额计算的情况下实用。

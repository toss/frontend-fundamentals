# 폼의 응집도 생각하기

<div style="margin-top: 16px">
<Badge type="info" text="응집도" />
</div>

프론트엔드 개발을 하다 보면 Form으로 사용자에게 값을 입력받아야 하는 경우가 많아요. 
Form을 관리할 때는 2가지의 방법으로 응집도를 관리해서, 함께 수정되어야 할 코드가 함께 수정되도록 할 수 있어요.

## 필드 단위 응집도

필드 단위 응집은 개별 입력 요소를 독립적으로 관리하는 방식이에요. 
각 필드가 고유의 검증 로직을 가지므로 변경이 필요한 범위가 줄어들어 특정 필드의 유지보수가 쉬워져요. 
필드 단위의 응집도를 고려하여 설계하면, 각 필드의 검증 로직이 독립적이어서 다른 필드에 영향을 주지 않아요.

```tsx
import { useForm } from "react-hook-form";

export function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = handleSubmit((formData) => {
    // 폼 데이터 제출 로직
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          {...register("name", {
            validate: (value) =>
              value.trim() === "" ? "이름을 입력해주세요." : ""
          })}
          placeholder="이름"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            validate: (value) => {
              if (value.trim() === "") {
                return "이메일을 입력해주세요.";
              }

              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "유효한 이메일 주소를 입력해주세요.";
              }

              return "";
            },
          })}
          placeholder="이메일"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">제출</button>
    </form>
  );
}
```

## 폼 전체 단위 응집도

폼 전체 응집은 모든 필드의 검증 로직이 폼에 종속되는 방식이에요. 폼 전체에서의 흐름을 고려하여 설계되며, 변경 단위가 폼 단위로 발생할 때 고려해요. 

폼 전체 응집도를 높이면, 폼 전체의 검증이 한 곳에서 관리되어 로직이 간결해지고, 상태가 중앙 집중식으로 관리되므로 폼 전체 흐름을 이해하기 쉬워져요. 필드 간의 결합도가 높아지므로 폼의 재사용성은 떨어질 수 있어요.

```tsx
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일 주소를 입력해주세요"),
});

export function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((formData) => {
    // 폼 데이터 제출 로직
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input {...register("name")} placeholder="이름" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="이메일" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">제출</button>
    </form>
  );
}
```

## 필드 단위 vs. 폼 전체 단위 응집도

응집도를 높이려면 필드 단위와 폼 전체 단위 중 상황에 적합한 방식을 선택해야 해요. 
필드 단위로 나누면 재사용성과 독립성이 높아지지만, 폼 전체 단위로 관리하면 일관된 흐름을 유지할 수 있어요. 

변경의 단위가 필드 단위인지 폼 전체 단위인지에 따라 설계를 조정해야 해요. 

일반적으로, 모든 필드가 밀접하게 관련되어 폼이 단일 기능을 나타내거나, Wizard Form과 같이 스텝별로 동작하는 복잡한 폼에서는 폼 전체 단위 응집도를 우선적으로 고려하고, 
개별 필드의 검증이 매우 복잡하거나, 서로 다른 필드 간의 의존성이 없어 필드 단위로 변경이 주로 일어날 때 필드 단위의 응집도를 더욱 우선시하는 것이 좋아요.
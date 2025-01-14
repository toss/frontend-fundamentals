# Considering Form Cohesion

<div style="margin-top: 16px">
<Badge type="info" text="Cohesion" />
</div>
When developing frontend applications, there are many cases where you need to receive input from users through forms. 
When managing forms, you can manage cohesion in two ways to ensure that code that needs to be modified together is modified together.

## Field-Level Cohesion

Field-level cohesion is a method of managing individual input elements independently.
Each field has its own validation logic, reducing the scope of changes needed and making it easier to maintain specific fields.
By designing with field-level cohesion in mind, the validation logic of each field is independent and does not affect other fields.

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
    // Form data submission logic
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          {...register("name", {
            validate: (value) =>
              value.trim() === "" ? "Please enter your name." : ""
          })}
          placeholder="Name"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            validate: (value) => {
              if (value.trim() === "") {
                return "Please enter your email.";
              }

              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address.";
              }

              return "";
            }
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Form-Level Cohesion

Form-level cohesion means that the validation logic for all fields is dependent on the form. It is designed considering the flow of the entire form and is considered when changes occur at the form level.

By increasing form-level cohesion, the validation of the entire form is managed in one place, making the logic concise and the state centrally managed, making it easier to understand the overall flow of the form. However, the coupling between fields increases, which may reduce the reusability of the form.

```tsx
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address.")
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
    // Form data submission logic
    console.log("Form submitted:", formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input {...register("name")} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Field-Level vs. Form-Level Cohesion

To increase cohesion, you should choose the approach that best fits the situation, whether it's field-level or form-level.
Dividing by field level increases reusability and independence, but managing at the form level maintains a consistent flow.

You need to adjust the design based on whether the unit of change is at the field level or the form level.

Generally, when all fields are closely related and the form represents a single function, or in complex forms like a Wizard Form that operates step-by-step, form-level cohesion should be prioritized.
However, when individual field validation is very complex, or there is no dependency between different fields, and changes mainly occur at the field level, it is better to prioritize field-level cohesion.

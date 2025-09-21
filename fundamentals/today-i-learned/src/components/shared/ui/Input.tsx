import * as React from "react";
import { css, cx } from "@styled-system/css";

type InputVariant = "default" | "ghost";
type InputSize = "sm" | "md" | "lg";

const inputVariants = {
  base: css({
    display: "flex",
    width: "100%",
    border: "0",
    backgroundColor: "transparent",
    fontSize: "16px",
    _placeholder: { color: "gray.400" },
    _focus: { outline: "none" },
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.5"
    }
  }),
  variants: {
    default: css({ color: "gray.900" }),
    ghost: css({ color: "gray.600" })
  },
  sizes: {
    sm: css({ fontSize: "14px", padding: "8px" }),
    md: css({ fontSize: "16px", padding: "12px" }),
    lg: css({ fontSize: "18px", padding: "16px" })
  }
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", size = "md", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cx(
          inputVariants.base,
          variant && inputVariants.variants[variant],
          size && inputVariants.sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <textarea
        className={cx(
          inputVariants.base,
          variant && inputVariants.variants[variant],
          size && inputVariants.sizes[size],
          css({
            minHeight: "80px",
            resize: "none"
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea, inputVariants };

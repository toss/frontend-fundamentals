import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { css, cx } from "@styled-system/css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariants = {
  base: css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    borderRadius: "full",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    border: "none",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "gray.900",
      outlineOffset: "2px"
    },
    _disabled: {
      pointerEvents: "none",
      opacity: "0.5"
    }
  }),
  variants: {
    primary: css({
      backgroundColor: "black",
      color: "white",
      _hover: { backgroundColor: "gray.800" }
    }),
    secondary: css({
      backgroundColor: "gray.100",
      color: "gray.900",
      _hover: { backgroundColor: "gray.200" }
    }),
    outline: css({
      border: "1px solid",
      borderColor: "gray.200",
      backgroundColor: "white",
      color: "gray.900",
      _hover: { backgroundColor: "gray.50" }
    }),
    ghost: css({
      color: "gray.900",
      backgroundColor: "transparent",
      _hover: { backgroundColor: "gray.100" }
    })
  },
  sizes: {
    sm: css({ height: "32px", paddingX: "12px", fontSize: "14px" }),
    md: css({
      height: "40px",
      paddingX: "16px",
      paddingY: "8px",
      fontSize: "14px"
    }),
    lg: css({ height: "48px", paddingX: "24px", fontSize: "16px" })
  },
  fullWidth: {
    true: css({ width: "100%" }),
    false: css({ width: "auto" })
  }
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cx(
          buttonVariants.base,
          variant && buttonVariants.variants[variant],
          size && buttonVariants.sizes[size],
          fullWidth && buttonVariants.fullWidth.true,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

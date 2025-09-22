import * as React from "react";
import { css, cx } from "@styled-system/css";

type CardVariant = "default" | "elevated" | "bordered" | "interactive";
type CardPadding = "none" | "sm" | "md" | "lg";

const cardVariants = {
  base: css({
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "gray.200",
    backgroundColor: "white",
    transition: "all 0.2s ease-in-out"
  }),
  variants: {
    default: css({
      borderColor: "gray.200",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      _hover: {
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }
    }),
    elevated: css({
      borderColor: "rgba(201, 201, 201, 0.5)",
      boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.23)"
    }),
    bordered: css({
      borderColor: "rgba(201, 201, 201, 0.5)",
      boxShadow: "none"
    }),
    interactive: css({
      borderColor: "gray.200",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      cursor: "pointer",
      _hover: {
        boxShadow: "0 0 18px rgba(0, 0, 0, 0.2)"
      }
    })
  },
  padding: {
    none: css({ padding: "0" }),
    sm: css({ padding: "16px" }),
    md: css({ padding: "24px" }),
    lg: css({ padding: "32px" })
  }
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        cardVariants.base,
        variant && cardVariants.variants[variant],
        padding && cardVariants.padding[padding],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      css({
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }),
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cx(
      css({
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: "1.25",
        letterSpacing: "-0.025em"
      }),
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cx(
      css({
        color: "gray.600",
        fontSize: "16px",
        lineHeight: "1.625"
      }),
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      css({
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }),
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(
      css({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingTop: "8px"
      }),
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants
};

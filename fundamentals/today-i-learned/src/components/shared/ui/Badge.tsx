import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center px-5 py-4 text-sm font-bold transition-colors outline-none focus:outline-none focus-visible:outline-none active:outline-none rounded-[200px] tracking-tight leading-tight",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black/60 border border-black/8 hover:bg-gray-50 active:bg-gray-50",
        primary:
          "bg-black/70 text-[#FCFCFC] hover:bg-black/80 active:bg-black/80",
        blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
        red: "bg-red-100 text-red-700 hover:bg-red-200",
        yellow: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        green: "bg-green-100 text-green-700 hover:bg-green-200",
        orange: "bg-orange-100 text-orange-700 hover:bg-orange-200"
      },
      size: {
        sm: "px-4 py-3 text-xs h-[36px]",
        md: "px-5 py-4 text-sm h-[42px]",
        lg: "px-6 py-5 text-base h-[48px]"
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof badgeVariants> {
  asButton?: boolean;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, size, interactive, asButton, ...props }, ref) => {
    if (asButton) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={cn(
            badgeVariants({
              variant,
              size,
              interactive: true
            }),
            className
          )}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        />
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          badgeVariants({
            variant,
            size,
            interactive: interactive || false
          }),
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

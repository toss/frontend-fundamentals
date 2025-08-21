import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full bg-gray-100",
  {
    variants: {
      size: {
        "20": "h-5 w-5",
        "40": "h-10 w-10",
        "60": "h-15 w-15"
      }
    },
    defaultVariants: {
      size: "40"
    }
  }
);

const avatarImageVariants = cva("aspect-square h-full w-full object-cover");

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center bg-gray-100 font-bold text-gray-600",
  {
    variants: {
      size: {
        "20": "text-xs",
        "40": "text-base",
        "60": "text-2xl"
      }
    },
    defaultVariants: {
      size: "40"
    }
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const getInitials = (name?: string) => {
      if (!name) return "U";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className={avatarImageVariants()}
            onError={handleImageError}
          />
        ) : (
          <span className={avatarFallbackVariants({ size })}>
            {fallback || getInitials(alt)}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };

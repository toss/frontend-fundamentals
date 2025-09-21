import * as React from "react";
import { css, cx } from "@styled-system/css";

const avatarBase = {
  position: "relative",
  display: "inline-flex",
  flexShrink: "0",
  overflow: "hidden",
  borderRadius: "9999px",
  backgroundColor: "rgb(243, 244, 246)"
};

const avatarSizes = {
  "20": { height: "20px", width: "20px" },
  "32": { height: "32px", width: "32px" },
  "40": { height: "40px", width: "40px" },
  "48": { height: "48px", width: "48px" },
  "60": { height: "60px", width: "60px" }
};

const avatarImage = {
  aspectRatio: "1",
  height: "100%",
  width: "100%",
  objectFit: "cover"
};

const avatarFallbackBase = {
  display: "flex",
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgb(243, 244, 246)",
  fontWeight: "700",
  color: "rgb(75, 85, 99)"
};

const fallbackTextSizes = {
  "20": { fontSize: "12px" },
  "32": { fontSize: "14px" },
  "40": { fontSize: "16px" },
  "48": { fontSize: "18px" },
  "60": { fontSize: "24px" }
};

type AvatarSize = "20" | "32" | "40" | "48" | "60";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "40", src, alt, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const getInitials = (name?: string) => {
      if (!name) {
        return "U";
      }
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const avatarStyles = {
      ...avatarBase,
      ...avatarSizes[size]
    };

    const fallbackStyles = {
      ...avatarFallbackBase,
      ...fallbackTextSizes[size]
    };

    return (
      <div ref={ref} className={cx(css(avatarStyles), className)} {...props}>
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className={css(avatarImage)}
            onError={handleImageError}
          />
        ) : (
          <span className={css(fallbackStyles)}>
            {fallback || getInitials(alt)}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

import { css, cx } from "@styled-system/css";

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
  text?: string;
}

const sizeStyles = {
  sm: css({ width: "16px", height: "16px" }),
  md: css({ width: "24px", height: "24px" }),
  lg: css({ width: "32px", height: "32px" })
} as const;

const variantStyles = {
  default: css({ color: "gray.500" }),
  primary: css({ color: "#ff8a80" }),
  secondary: css({ color: "gray.400" })
} as const;

export function LoadingSpinner({
  size = "md",
  variant = "default",
  text,
  className
}: LoadingSpinnerProps) {
  return (
    <div className={cx(css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px"
    }), className)}>
      <div
        className={cx(
          css({
            animation: "spin 1s linear infinite",
            borderRadius: "50%",
            border: "2px solid currentColor",
            borderTopColor: "transparent"
          }),
          sizeStyles[size],
          variantStyles[variant]
        )}
        role="status"
        aria-label="로딩 중"
      />
      {text && (
        <span className={cx(
          css({
            fontSize: "14px",
            fontWeight: "500"
          }),
          variantStyles[variant]
        )}>
          {text}
        </span>
      )}
    </div>
  );
}

interface LoadingOverlayProps extends BaseComponentProps {
  isVisible: boolean;
  text?: string;
}

export function LoadingOverlay({
  isVisible,
  text = "로딩 중...",
  className
}: LoadingOverlayProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cx(
        css({
          position: "absolute",
          inset: "0",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "50",
          _dark: {
            backgroundColor: "rgba(17, 24, 39, 0.8)"
          }
        }),
        className
      )}
    >
      <LoadingSpinner variant="primary" text={text} />
    </div>
  );
}

interface LoadingSkeletonProps extends BaseComponentProps {
  lines?: number;
  width?: string;
}

export function LoadingSkeleton({
  lines = 3,
  width = "100%",
  className
}: LoadingSkeletonProps) {
  return (
    <div className={cx(css({
      animation: "pulse 2s infinite",
      "& > * + *": {
        marginTop: "12px"
      }
    }), className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={css({
            height: "16px",
            backgroundColor: "gray.200",
            borderRadius: "4px",
            _dark: {
              backgroundColor: "gray.700"
            }
          })}
          style={{
            width: index === lines - 1 ? "75%" : width
          }}
        />
      ))}
    </div>
  );
}

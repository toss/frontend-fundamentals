import { cn } from "@/libs/utils";
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
  text?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
} as const;

const variantClasses = {
  default: "text-gray-500",
  primary: "text-[#ff8a80]",
  secondary: "text-gray-400"
} as const;

export function LoadingSpinner({
  size = "md",
  variant = "default",
  text,
  className
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent",
          sizeClasses[size],
          variantClasses[variant]
        )}
        role="status"
        aria-label="로딩 중"
      />
      {text && (
        <span className={cn("text-sm font-medium", variantClasses[variant])}>
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
      className={cn(
        "absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
        "flex items-center justify-center z-50",
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
    <div className={cn("animate-pulse space-y-3", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          style={{
            width: index === lines - 1 ? "75%" : width
          }}
        />
      ))}
    </div>
  );
}

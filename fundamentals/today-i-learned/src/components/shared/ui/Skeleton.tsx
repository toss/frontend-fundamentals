import { css, cx } from "@styled-system/css";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cx(css({
        animation: "pulse 2s infinite",
        borderRadius: "6px",
        backgroundColor: "rgba(0, 0, 0, 0.1)"
      }), className)}
      {...props}
    />
  );
}

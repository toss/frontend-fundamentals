import { css } from "@styled-system/css";

export function SprintGridSkeleton() {
  return (
    <div className={skeletonContainer}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={skeletonItemContainer}>
          <div className={skeletonCircle} />
        </div>
      ))}
    </div>
  );
}

const skeletonContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingX: "1.5rem",
  paddingBottom: "0.5rem",
  gap: "10px",
  width: "100%"
});

const skeletonItemContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "0.5rem",
  gap: "0.75rem",
  width: "60px"
});

const skeletonCircle = css({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
});

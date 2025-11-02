import { PostDetail } from "@/components/features/discussions/PostDetail";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { css } from "@styled-system/css";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { Suspense } from "react";

export function PostDetailPage() {
  return (
    <div className={gridLayout}>
      <section className={mainContentColumn}>
        <ErrorBoundary fallback={() => <PostDetailErrorState />}>
          <Suspense fallback={<PostDetailLoadingState />}>
            <PostDetail />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className={sidebarColumn}>
        <ErrorBoundary fallback={() => <WeeklyTop5ErrorState />}>
          <Suspense fallback={<WeeklyTop5LoadingState />}>
            <WeeklyTop5 />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}

function PostDetailLoadingState() {
  return (
    <div className={loadingContainer}>
      <div className={loadingTitle}></div>
      <div className={loadingSubtitle}></div>
      <div className={loadingContent}>
        <div className={loadingLine}></div>
        <div className={loadingLineMedium}></div>
        <div className={loadingLineShort}></div>
      </div>
    </div>
  );
}

function PostDetailErrorState() {
  return <div>포스트를 찾을 수 없습니다.</div>;
}

function WeeklyTop5LoadingState() {
  return (
    <div className={weeklyTop5Container}>
      <div className={headerSection}>
        <h3 className={mainTitle}>주간 TOP 5</h3>
        <p className={subtitle}>{weekText}</p>
      </div>
      <div className={contentSection}>
        {[...new Array(5)].map((_, index) => (
          <div key={index} className={skeletonItem} />
        ))}
      </div>
    </div>
  );
}

function WeeklyTop5ErrorState() {
  return <div>주간 TOP 5를 찾을 수 없습니다.</div>;
}

const gridLayout = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", lg: "5fr 3fr" },
  height: "100%",
  backgroundColor: "white",
  overflow: "hidden"
});

const mainContentColumn = css({
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem",
  borderLeft: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  borderRight: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none"
});

const sidebarColumn = css({
  display: { base: "none", lg: "block" },
  paddingBottom: "2rem",
  overflowY: "auto",
  scrollbarWidth: "none"
});

const loadingContainer = css({
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const loadingTitle = css({
  height: "2rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "75%"
});

const loadingSubtitle = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "50%"
});

const loadingContent = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const loadingLine = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem"
});

const loadingLineMedium = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "83.333333%"
});

const loadingLineShort = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "80%"
});

const weeklyTop5Container = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const headerSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

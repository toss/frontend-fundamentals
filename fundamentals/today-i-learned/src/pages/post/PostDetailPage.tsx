import { PostDetail } from "@/components/features/discussions/PostDetail";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { css } from "@styled-system/css";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { Suspense } from "react";
import {
  PostDetailLoadingState,
  PostDetailErrorState,
  WeeklyTop5LoadingState,
  WeeklyTop5ErrorState
} from "./PostDetailLoadingStates";

export function PostDetailPage() {
  return (
    <div className={gridLayout}>
      <section className={mainContentColumn} data-scroll-container>
        <ErrorBoundary fallback={PostDetailErrorState}>
          <Suspense fallback={<PostDetailLoadingState />}>
            <PostDetail />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className={sidebarColumn}>
        <ErrorBoundary fallback={WeeklyTop5ErrorState}>
          <Suspense fallback={<WeeklyTop5LoadingState />}>
            <WeeklyTop5 />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
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

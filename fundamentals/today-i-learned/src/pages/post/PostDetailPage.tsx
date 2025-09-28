import { useDiscussionDetail } from "@/api/hooks/useDiscussions";
import { PostDetail } from "@/components/features/discussions/PostDetail";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useParams } from "react-router-dom";
import { css } from "@styled-system/css";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: discussion, isLoading, error } = useDiscussionDetail(id || "");

  const { handleLike, handleUpvote } = usePostReactions({
    discussion: discussion || undefined
  });

  return (
    <div className={gridLayout}>
      <section className={mainContentColumn}>
        {(() => {
          if (isLoading) {
            return <LoadingState />;
          }

          if (error || !discussion) {
            return <ErrorState />;
          }

          return (
            <PostDetail
              discussion={discussion as any}
              onLike={handleLike}
              onUpvote={handleUpvote}
              showComments={true}
            />
          );
        })()}
      </section>

      <section className={sidebarColumn}>
        <WeeklyTop5 />
      </section>
    </div>
  );
}

function LoadingState() {
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

function ErrorState() {
  return (
    <div className={errorContainer}>
      <div className={errorMessage}>포스트를 찾을 수 없습니다.</div>
    </div>
  );
}

// Semantic style definitions
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

const errorContainer = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingY: "5rem"
});

const errorMessage = css({
  color: "#6b7280"
});

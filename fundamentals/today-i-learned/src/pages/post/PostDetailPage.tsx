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
    <div className={pageContainer}>
      <div className={mainContent}>
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
      </div>

      {/* 사이드바 */}
      <div className={sidebar}>
        <div className={sidebarContent}>
          <WeeklyTop5 />
        </div>
      </div>
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
const pageContainer = css({
  display: "flex"
});

const mainContent = css({
  flex: "1",
  padding: "24px",
  "@media (min-width: 1024px)": {
    borderLeft: "1px solid #e5e7eb",
    borderRight: "1px solid #e5e7eb"
  }
});

const sidebar = css({
  width: "350px",
  display: "none",
  "@media (min-width: 1024px)": {
    display: "block"
  }
});

const sidebarContent = css({
  position: "sticky",
  top: "120px",
  padding: "24px"
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

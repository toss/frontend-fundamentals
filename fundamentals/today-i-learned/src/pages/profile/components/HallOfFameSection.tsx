import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useUserHallOfFame } from "@/pages/profile/hooks/useUserHallOfFame";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";

import type { BaseComponentProps } from "@/types";
import { css, cx } from "@styled-system/css";

interface HallOfFameSectionProps extends BaseComponentProps {}

export function HallOfFameSection({ className }: HallOfFameSectionProps) {
  const { handleApiError } = useErrorHandler();

  const {
    userProfile,
    displayedPosts,
    isLoading,
    error,
    isExpanded,
    showToggleButton,
    isFetchingNextPage,
    handleToggleExpand,
    refetch
  } = useUserHallOfFame();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={postsGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className={errorContainer}>
          <h3 className={errorTitle}>명예의 전당을 불러올 수 없습니다</h3>
          <p className={errorMessage}>{error.message}</p>
          <button
            onClick={() => {
              refetch().catch((error) =>
                handleApiError(error, "명예의 전당 재시도")
              );
            }}
            className={retryButton}
          >
            다시 시도
          </button>
        </div>
      );
    }

    if (!isLoading && userProfile && displayedPosts.length === 0) {
      return (
        <div className={emptyStateContainer}>
          <p className={emptyStateMessage}>
            아직 명예의 전당에 등록된 글이 없습니다.
          </p>
        </div>
      );
    }

    if (displayedPosts.length > 0) {
      return (
        <>
          <div className={postsGrid}>
            {displayedPosts.map((discussion) => (
              <PostCard
                key={discussion.id}
                discussion={discussion}
                onLike={(postId) => console.log("Like:", postId)}
                onUpvote={(postId) => console.log("Upvote:", postId)}
                currentUserLogin={userProfile?.login}
              />
            ))}
          </div>

          {showToggleButton && (
            <button
              onClick={handleToggleExpand}
              disabled={isFetchingNextPage}
              className={toggleButton}
            >
              <span className={toggleButtonText}>
                {isExpanded ? "접기" : "더보기"}
              </span>
            </button>
          )}

          {isFetchingNextPage && (
            <div className={cx(postsGrid, loadingGrid)}>
              {Array.from({ length: 2 }).map((_, index) => (
                <PostCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}
        </>
      );
    }

    return (
      <div className={emptyStateContainer}>
        <p className={emptyStateMessage}>명예의 전당을 불러오는 중...</p>
      </div>
    );
  };

  return (
    <div className={cx(sectionContainer, className)}>
      <h2 className={sectionTitle}>명예의 전당</h2>

      {renderContent()}
    </div>
  );
}

// Layout Styles
const sectionContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "1rem"
});

const sectionTitle = css({
  fontWeight: "bold",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

// Grid Layout
const postsGrid = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
  gap: "1rem",
  width: "100%"
});

const loadingGrid = css({
  marginTop: "1rem"
});

// Error States
const errorContainer = css({
  textAlign: "center",
  paddingY: "2rem",
  width: "100%"
});

const errorTitle = css({
  fontSize: "18px",
  fontWeight: "semibold",
  color: "rgb(153, 27, 27)",
  marginBottom: "0.5rem"
});

const errorMessage = css({
  color: "rgb(220, 38, 38)",
  marginBottom: "1rem"
});

const retryButton = css({
  paddingX: "1rem",
  paddingY: "0.5rem",
  backgroundColor: "rgb(59, 130, 246)",
  color: "white",
  borderRadius: "0.5rem",
  transition: "background-color 0.2s",
  _hover: {
    backgroundColor: "rgb(37, 99, 235)"
  }
});

// Empty State
const emptyStateContainer = css({
  textAlign: "center",
  paddingY: "3rem",
  width: "100%"
});

const emptyStateMessage = css({
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: "medium"
});

// Toggle Button
const toggleButton = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingX: "1rem",
  paddingY: "18px",
  width: "100%",
  height: "60px",
  border: "1px solid rgba(201, 201, 201, 0.5)",
  borderRadius: "12px",
  backgroundColor: "white",
  transition: "background-color 0.2s",
  boxSizing: "border-box",
  _hover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  _disabled: {
    opacity: 0.5
  }
});

const toggleButtonText = css({
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  color: "#0F0F0F"
});

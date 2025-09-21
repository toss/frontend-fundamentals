import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useUserHallOfFame } from "@/pages/profile/hooks/useUserHallOfFame";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";

import type { BaseComponentProps } from "@/types";
import { css, cx } from "styled-system/css";
import { flex, center, grid } from "styled-system/patterns";

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
        <div className={postGrid}>
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
        <div className={emptyContainer}>
          <p className={emptyText}>아직 명예의 전당에 등록된 글이 없습니다.</p>
        </div>
      );
    }

    if (displayedPosts.length > 0) {
      return (
        <>
          {/* 글 목록 그리드 */}
          <div className={postGrid}>
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

          {/* 더보기/접기 버튼 */}
          {showToggleButton && (
            <button
              onClick={handleToggleExpand}
              disabled={isFetchingNextPage}
              className={toggleButton}
              style={{
                boxSizing: "border-box"
              }}
            >
              <span className={toggleButtonText}>
                {isExpanded ? "접기" : "더보기"}
              </span>
            </button>
          )}

          {/* 추가 로딩 */}
          {isFetchingNextPage && (
            <div className={cx(postGrid, css({ mt: "4" }))}>
              {Array.from({ length: 2 }).map((_, index) => (
                <PostCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}
        </>
      );
    }

    return (
      <div className={loadingMessage}>
        <p className={loadingText}>명예의 전당을 불러오는 중...</p>
      </div>
    );
  };

  return (
    <div className={cx(sectionContainer, className)}>
      {/* 헤더 */}
      <h2 className={sectionTitle}>명예의 전당</h2>

      {renderContent()}
    </div>
  );
}

// 섹션 컨테이너 스타일
const sectionContainer = flex({
  direction: "column",
  alignItems: "flex-start",
  gap: "4"
});

const sectionTitle = css({
  fontWeight: "bold",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

// 그리드 레이아웃
const postGrid = grid({
  columns: 1,
  md: { columns: 2 },
  gap: "4",
  width: "full"
});

// 에러 상태
const errorContainer = center({
  py: "8",
  width: "full"
});

const errorTitle = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "red.800",
  mb: "2",
  _dark: { color: "red.200" }
});

const errorMessage = css({
  color: "red.600",
  mb: "4",
  _dark: { color: "red.400" }
});

const retryButton = css({
  px: "4",
  py: "2",
  bg: "blue.500",
  color: "white",
  borderRadius: "lg",
  transition: "colors",
  _hover: { bg: "blue.600" }
});

// 빈 상태
const emptyContainer = center({
  py: "12",
  width: "full"
});

const emptyText = css({
  color: "black/60",
  fontWeight: "medium"
});

// 더보기/접기 버튼
const toggleButton = flex({
  alignItems: "center",
  justifyContent: "center",
  px: "4",
  py: "18px",
  width: "full",
  height: "60px",
  border: "1px solid rgba(201,201,201,0.5)",
  borderRadius: "xl",
  transition: "colors",
  _hover: { bg: "black/5" },
  _disabled: { opacity: 0.5 }
});

const toggleButtonText = css({
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  color: "#0F0F0F"
});

// 로딩 메시지
const loadingMessage = center({
  py: "12",
  width: "full"
});

const loadingText = css({
  color: "black/60",
  fontWeight: "medium"
});

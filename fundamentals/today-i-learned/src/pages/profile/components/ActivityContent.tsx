import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import type { BaseComponentProps } from "@/types";
import type { GitHubUser } from "@/api/remote/user";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { css } from "styled-system/css";
import { flex, center } from "styled-system/patterns";

interface ActivityContentProps extends BaseComponentProps {
  isLoading: boolean;
  error: Error | null;
  userProfile: GitHubUser | null | undefined;
  userPosts: GitHubDiscussion[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  refetch: () => Promise<any>;
}

export function ActivityContent({
  isLoading,
  error,
  userProfile,
  userPosts,
  hasNextPage,
  isFetchingNextPage,
  elementRef,
  refetch
}: ActivityContentProps) {
  const { handleApiError } = useErrorHandler();

  if (isLoading) {
    return (
      <div className={loadingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={errorContainer}>
        <h3 className={errorTitle}>
          글을 불러올 수 없습니다
        </h3>
        <p className={errorMessage}>{error.message}</p>
        <button
          onClick={() => {
            refetch().catch((error) =>
              handleApiError(error, "활동 목록 재시도")
            );
          }}
          className={retryButton}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!isLoading && userProfile && userPosts.length === 0) {
    return (
      <div className={emptyStateContainer}>
        <p className={emptyStateText}>아직 작성한 글이 없습니다.</p>
      </div>
    );
  }

  if (userPosts.length > 0) {
    return (
      <>
        <div className={contentList}>
          {userPosts.map((discussion) => (
            <PostCard
              key={discussion.id}
              discussion={discussion}
              onLike={(postId) => console.log("Like:", postId)}
              onUpvote={(postId) => console.log("Upvote:", postId)}
              currentUserLogin={userProfile?.login}
            />
          ))}
        </div>

        {hasNextPage && (
          <div
            ref={elementRef}
            className={loadMoreTrigger}
          >
            {isFetchingNextPage && (
              <div className={loadingContainer}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <PostCardSkeleton key={`loading-${index}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {!hasNextPage && userPosts.length > 0 && (
          <div className={endMessage}>
            <p className={endMessageText}>
              모든 글을 불러왔습니다.
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={loadingMessage}>
      <p className={loadingText}>글을 불러오는 중...</p>
    </div>
  );
}

// 상태별 스타일 정의
const loadingContainer = css({
  spaceY: "4"
});

const errorContainer = center({
  py: "8"
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

const emptyStateContainer = center({
  py: "12"
});

const emptyStateText = css({
  color: "black/60",
  fontWeight: "medium"
});

const contentList = css({
  spaceY: "4"
});

const loadMoreTrigger = flex({
  alignItems: "center",
  justifyContent: "center",
  py: "4"
});

const endMessage = center({
  py: "8"
});

const endMessageText = css({
  color: "black/40",
  fontWeight: "medium",
  fontSize: "sm"
});

const loadingMessage = center({
  py: "12"
});

const loadingText = css({
  color: "black/60",
  fontWeight: "medium"
});

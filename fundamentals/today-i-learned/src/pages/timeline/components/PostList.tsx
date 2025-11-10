import { useCallback } from "react";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useUserProfile } from "@/api/hooks/useUser";
import { css } from "@styled-system/css";
import { SortOption } from "../types";
import { useSearchParams } from "react-router-dom";
import { CATEGORY_ID } from "@/constants";

export function PostList() {
  const [searchParams] = useSearchParams({ sort: "newest" });

  const sortOption = searchParams.get("sort") as SortOption;

  const { data: userProfile } = useUserProfile();
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteDiscussions({ ...getPostListProps(sortOption) });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { elementRef } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    onIntersect: handleLoadMore,
    rootMargin: "300px"
  });

  const discussions =
    postsData?.pages.flatMap((page) => page.discussions) || [];

  if (isLoading) {
    return (
      <div className={postListContainer}>
        {[...new Array(3)].map((_, index) => (
          <div
            key={index}
            className={index < 2 ? skeletonItemWithMargin : skeletonItem}
          >
            <PostCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (discussions.length === 0) {
    return (
      <div className={emptyStateContainer}>
        <div className={emptyStateContent}>
          <div className={emptyStateIcon}>
            <span className={emptyStateEmoji}>📝</span>
          </div>
          <h3 className={emptyStateTitle}>아직 포스트가 없습니다</h3>
          <p className={emptyStateDescription}>
            첫 번째 포스트를 작성해서 오늘 배운 내용을 공유해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={postListContainer}>
      {discussions.map((discussion, index) => (
        <div
          key={discussion.id}
          className={
            index < discussions.length - 1 ? postItemWithMargin : postItem
          }
        >
          <PostCard
            discussion={discussion}
            currentUserLogin={userProfile?.login}
          />
        </div>
      ))}

      {hasNextPage && (
        <div ref={elementRef} className={loadMoreContainer}>
          {isFetchingNextPage ? <PostCardSkeleton /> : null}
        </div>
      )}
    </div>
  );
}

const getPostListProps = (sortOption: SortOption) => {
  switch (sortOption) {
    case "newest":
      return {
        categoryId: CATEGORY_ID.TODAY_I_LEARNED,
        sortBy: "latest" as const
      };
    case "realtime":
      return {
        categoryId: CATEGORY_ID.TODAY_I_LEARNED,
        sortBy: "lastActivity" as const
      };
    case "hall-of-fame":
      return {
        categoryId: CATEGORY_ID.TODAY_I_LEARNED,
        sortBy: "latest" as const,
        filterBy: { label: "성지 ⛲" }
      };
    default:
      return {
        categoryId: CATEGORY_ID.TODAY_I_LEARNED,
        sortBy: "latest" as const
      };
  }
};

// Container Styles
const postListContainer = css({
  width: "100%"
});

// Post Item Styles
const postItem = css({
  // Base post item style
});

const postItemWithMargin = css({
  marginBottom: "1.5rem"
});

// Skeleton Styles
const skeletonItem = css({
  // Base skeleton item style
});

const skeletonItemWithMargin = css({
  marginBottom: "1.5rem"
});

// Empty State Styles
const emptyStateContainer = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingY: "3rem",
  paddingX: "1rem"
});

const emptyStateContent = css({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem"
});

const emptyStateIcon = css({
  width: "4rem",
  height: "4rem",
  backgroundColor: "rgb(243, 244, 246)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginX: "auto"
});

const emptyStateEmoji = css({
  fontSize: "24px"
});

const emptyStateTitle = css({
  fontSize: "18px",
  fontWeight: "medium",
  color: "rgb(17, 24, 39)"
});

const emptyStateDescription = css({
  color: "rgb(107, 114, 128)",
  fontSize: "14px",
  maxWidth: "28rem"
});

// Load More Styles
const loadMoreContainer = css({
  width: "100%",
  paddingY: "1rem",
  display: "flex",
  justifyContent: "center"
});

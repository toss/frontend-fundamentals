import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useUserProfile } from "@/api/hooks/useUser";
import { useVirtualInfiniteScroll } from "@/hooks/useVirtualInfiniteScroll";
import { css } from "@styled-system/css";
import { useCallback, useMemo, type RefObject } from "react";
import { SortOption } from "../types";
import { useSearchParams } from "react-router-dom";
import { CATEGORY_ID } from "@/constants";

export function PostList({
  scrollElementRef
}: {
  scrollElementRef: RefObject<HTMLElement>;
}) {
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

  const discussions = useMemo(
    () => postsData?.pages.flatMap((page) => page.discussions) ?? [],
    [postsData?.pages]
  );

  const getVirtualItemKey = useCallback(
    (itemIndex: number) => {
      const discussionItem = discussions[itemIndex];
      return discussionItem?.id ?? `loader-${itemIndex}`;
    },
    [discussions]
  );

  const {
    listContainerRef,
    rowVirtualizer,
    virtualItems,
    scrollMargin,
    isLoaderIndex
  } = useVirtualInfiniteScroll({
    itemCount: discussions.length,
    scrollElementRef,
    getItemKey: getVirtualItemKey,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  });

  const renderVirtualItemContent = (itemIndex: number) => {
    if (isLoaderIndex(itemIndex)) {
      if (!isFetchingNextPage) return null;
      return <PostCardSkeleton />;
    }

    const discussionItem = discussions[itemIndex];
    if (!discussionItem) return null;

    return (
      <PostCard
        discussion={discussionItem}
        currentUserLogin={userProfile?.login}
      />
    );
  };

  if (isLoading) {
    return (
      <div className={postListContainer}>
        {[...new Array(3)].map((_, skeletonIndex) => (
          <div
            key={skeletonIndex}
            className={
              skeletonIndex < 2 ? skeletonItemWithMargin : skeletonItem
            }
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
    <div ref={listContainerRef} className={postListContainer}>
      <div
        className={virtualListContainer}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`
        }}
      >
        {virtualItems.map((virtualItem) => {
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              className={virtualListItem}
              style={{
                transform: `translateY(${virtualItem.start - scrollMargin}px)`
              }}
            >
              {renderVirtualItemContent(virtualItem.index)}
            </div>
          );
        })}
      </div>
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
        filterBy: { label: "성지 ⛲" },
        // GitHub Search API가 discussions 정렬을 지원하지 않아 클라이언트에서 정렬
        // 한 달 기간 제한 + 100건(API 최대치)으로 데이터를 가져온 후 정렬
        pageSize: 100
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

const virtualListContainer = css({
  width: "100%",
  position: "relative"
});

const virtualListItem = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%"
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

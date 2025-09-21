import { useSearchDiscussions } from "@/api/hooks/useSearchDiscussions";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { useUserProfile } from "@/api/hooks/useUser";
import { css } from "@styled-system/css";
import type { DiscussionsResponse } from "@/api/remote/discussions";

interface SearchContentProps {
  query: string;
}

export function SearchContent({ query }: SearchContentProps) {
  const { data: userProfile } = useUserProfile();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useSearchDiscussions({ query });

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

  if (!query) {
    return (
      <div className={emptyStateContainer}>
        <Search className={searchIcon} />
        <h2 className={emptyStateTitle}>검색어를 입력해주세요</h2>
        <p className={emptyStateMessage}>
          검색창에 키워드를 입력하고 Enter를 누르세요
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={searchResultsContainer}>
        <h1 className={searchResultsTitle}>"{query}" 검색 결과</h1>
        <div className={resultsWrapper}>
          {[...new Array(3)].map((_, index) => (
            <div key={index} className={index < 2 ? skeletonWithMargin : ""}>
              <PostCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={emptyStateContainer}>
        <h2 className={errorTitle}>검색 중 오류가 발생했습니다</h2>
        <p className={emptyStateMessage}>잠시 후 다시 시도해주세요</p>
      </div>
    );
  }

  const discussions = data?.pages?.flatMap((page: DiscussionsResponse) => page.discussions) ?? [];

  if (discussions.length === 0) {
    return (
      <div className={emptyStateContainer}>
        <Search className={searchIcon} />
        <h2 className={emptyStateTitle}>검색 결과가 없습니다</h2>
        <p className={emptyStateMessage}>
          "{query}"에 대한 검색 결과를 찾을 수 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className={searchResultsContainer}>
      <h1 className={searchResultsTitle}>
        "{query}" 검색 결과
        <span className={resultCount}>({discussions.length}개)</span>
      </h1>

      <div className={resultsWrapper}>
        {discussions.map((discussion, index) => (
          <div
            key={discussion.id}
            className={index < discussions.length - 1 ? postCardWithMargin : ""}
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
    </div>
  );
}

// Semantic style definitions
const emptyStateContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingY: "4rem",
  paddingX: "1rem"
});

const searchIcon = css({
  width: "4rem",
  height: "4rem",
  color: "#9ca3af",
  marginBottom: "1rem"
});

const emptyStateTitle = css({
  fontSize: "20px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "0.5rem"
});

const emptyStateMessage = css({
  color: "#6b7280"
});

const errorTitle = css({
  fontSize: "20px",
  fontWeight: "600",
  color: "#dc2626",
  marginBottom: "0.5rem"
});

const searchResultsContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  maxWidth: "56rem",
  marginX: "auto"
});

const searchResultsTitle = css({
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "1rem"
});

const resultCount = css({
  fontSize: "18px",
  fontWeight: "400",
  color: "#6b7280",
  marginLeft: "0.5rem"
});

const resultsWrapper = css({
  width: "100%"
});

const skeletonWithMargin = css({
  marginBottom: "1.5rem"
});

const postCardWithMargin = css({
  marginBottom: "1.5rem"
});

const loadMoreContainer = css({
  width: "100%",
  paddingY: "1rem",
  display: "flex",
  justifyContent: "center"
});

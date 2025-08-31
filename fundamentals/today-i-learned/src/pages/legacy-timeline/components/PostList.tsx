import { useCallback } from "react";
import { PostCard } from "@/components/features/discussions/LegacyPostCard";
import { Button } from "@/components/shared/ui/Button";
import { LoadingSpinner } from "@/components/shared/ui/LoadingSpinner";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface PostListProps {
  owner?: string;
  repo?: string;
  categoryName?: string;
  sortBy?: "latest" | "lastActivity" | "created" | "popularity";
  filterBy?: {
    label?: string;
  };
}

export function PostList({
  owner,
  repo,
  categoryName,
  sortBy = "latest",
  filterBy
}: PostListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteDiscussions({ owner, repo, categoryName, sortBy, filterBy });

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

  const handleComment = (id: string) => {
    // TODO: 댓글 페이지로 이동
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSpinner text="게시물을 불러오는 중..." variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          게시물을 불러올 수 없습니다
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
        <Button onClick={() => refetch()} variant="primary">
          다시 시도
        </Button>
      </div>
    );
  }

  const allDiscussions = data?.pages.flatMap((page) => page.discussions) ?? [];

  if (allDiscussions.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          아직 게시물이 없습니다
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          첫 번째 Today I Learned 게시물을 작성해보세요!
        </p>
        <Button variant="primary">새 글 작성하기</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {allDiscussions.map((discussion, index) => (
          <PostCard
            key={discussion.id}
            discussion={discussion}
            onComment={handleComment}
            isLast={index === allDiscussions.length - 1}
            isLoading={isFetchingNextPage}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={elementRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <LoadingSpinner
              text="더 많은 게시물 불러오는 중..."
              variant="primary"
            />
          )}
        </div>
      )}
    </div>
  );
}

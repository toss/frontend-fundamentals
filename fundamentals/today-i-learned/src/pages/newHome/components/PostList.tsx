import * as React from "react";
import { PostCard, PostCardSkeleton } from "./PostCard";
import type { PostListProps } from "../utils/types";

interface ExtendedPostListProps extends PostListProps {
  isLoading?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  onDelete?: (postId: string) => void;
}

export function PostList({
  posts,
  onLike,
  onComment,
  onShare,
  onUpvote,
  isLoading = false,
  hasNextPage = false,
  fetchNextPage,
  isFetchingNextPage = false,
  onDelete
}: ExtendedPostListProps) {
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  React.useEffect(() => {
    if (!hasNextPage || !fetchNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);
  if (isLoading) {
    return (
      <div className="w-full">
        {[...Array(3)].map((_, index) => (
          <div key={index} className={index < 2 ? "mb-6" : ""}>
            <PostCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            아직 포스트가 없습니다
          </h3>
          <p className="text-gray-500 text-sm max-w-md">
            첫 번째 포스트를 작성해서 오늘 배운 내용을 공유해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {posts.map((post, index) => (
        <div key={post.id} className={index < posts.length - 1 ? "mb-6" : ""}>
          <PostCard
            post={post}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
            onUpvote={onUpvote}
            onDelete={onDelete}
          />
        </div>
      ))}
      
      {/* Load more trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="w-full py-4 flex justify-center">
          {isFetchingNextPage ? (
            <PostCardSkeleton />
          ) : (
            <div className="text-gray-500 text-sm">더 보기</div>
          )}
        </div>
      )}
    </div>
  );
}

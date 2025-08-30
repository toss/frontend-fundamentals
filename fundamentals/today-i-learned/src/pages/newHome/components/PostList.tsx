import { useCallback } from "react";
import { PostCard, PostCardSkeleton } from "./PostCard";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { GitHubDiscussion } from "@/api/remote/discussions";

interface PostListProps {
  owner?: string;
  repo?: string;
  categoryName?: string;
  sortBy?: "latest" | "lastActivity" | "created" | "popularity";
  filterBy?: {
    label?: string;
  };
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

// GitHub Discussion을 Post 타입으로 변환하는 함수
function convertGitHubDiscussionToPost(discussion: GitHubDiscussion) {
  return {
    id: discussion.id,
    title: discussion.title,
    content: discussion.body,
    author: {
      id: discussion.author.login,
      name: discussion.author.login,
      username: discussion.author.login,
      avatar: discussion.author.avatarUrl
    },
    createdAt: discussion.createdAt,
    category: discussion.category?.name || "Today I Learned",
    tags: [],
    stats: {
      hearts: discussion.reactions.totalCount,
      comments: discussion.comments.totalCount,
      shares: 0,
      upvotes: discussion.reactions.totalCount
    }
  };
}

export function PostList({
  owner,
  repo,
  categoryName,
  sortBy = "latest",
  filterBy,
  onLike,
  onComment,
  onShare,
  onUpvote,
  onDelete
}: PostListProps) {
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteDiscussions({ 
    owner, 
    repo, 
    categoryName, 
    sortBy, 
    filterBy 
  });

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

  const posts = postsData?.pages.flatMap((page) =>
    page.discussions.map((discussion) =>
      convertGitHubDiscussionToPost(discussion)
    )
  ) || [];
  if (isLoading) {
    return (
      <div className="w-full">
        {[...new Array(3)].map((_, index) => (
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
        <div ref={elementRef} className="w-full py-4 flex justify-center">
          {isFetchingNextPage ? <PostCardSkeleton /> : null}
        </div>
      )}
    </div>
  );
}

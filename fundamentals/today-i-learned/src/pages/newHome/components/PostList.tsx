import * as React from "react";
import { PostCard, PostCardSkeleton } from "./PostCard";
import type { PostListProps } from "../utils/types";

export function PostList({
  posts,
  onLike,
  onComment,
  onShare,
  onUpvote,
  isLoading = false
}: PostListProps & { isLoading?: boolean }) {
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
          />
        </div>
      ))}
    </div>
  );
}

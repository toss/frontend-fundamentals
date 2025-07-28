import { memo, useState, useEffect } from "react";
import { Heart, MessageCircle, Share, Calendar, User } from "lucide-react";
import type { GitHubDiscussion } from "../../types";
import {
  useToggleReaction,
  useUserReactionStatus
} from "../../hooks/useReactions";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

interface PostCardProps {
  discussion: GitHubDiscussion;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  isLast?: boolean;
  isLoading?: boolean;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금";
  }
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분`;
  }
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간`;
  }
  if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}일`;
  }

  return date.toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric"
  });
}

function PostCardComponent({
  discussion,
  onLike,
  onComment,
  isLast = false,
  isLoading = false
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(discussion.reactions.totalCount);
  const { toggleLike, isLoading: isTogglingLike } = useToggleReaction();

  // GitHub API에서 실제 좋아요 상태 확인
  const { data: reactionStatus } = useUserReactionStatus(discussion.id);
  const [isLiked, setIsLiked] = useState(false);

  // API에서 데이터가 로드되면 실제 좋아요 상태로 업데이트
  useEffect(() => {
    if (reactionStatus !== undefined) {
      setIsLiked(reactionStatus.isLiked);
    }
  }, [reactionStatus]);

  const handleLike = async () => {
    // 현재 상태 저장 (롤백용)
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    try {
      // 즉시 낙관적 업데이트
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount(newIsLiked ? previousLikeCount + 1 : previousLikeCount - 1);

      // GitHub API 호출
      await toggleLike(discussion.id, previousIsLiked);

      // 기존 onLike 콜백도 호출 (호환성 유지)
      onLike?.(discussion.id);
    } catch (error) {
      // 실패 시 이전 상태로 정확히 롤백
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      console.error("Failed to toggle like:", error);
    }
  };

  const handleComment = () => {
    onComment?.(discussion.id);
  };

  return (
    <article
      className={cn(
        "group relative rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100/50",
        "p-6 shadow-[0_2px_15px_rgba(0,0,0,0.04)] transition-all duration-300",
        "hover:shadow-[0_8px_30px_rgba(255,138,128,0.1)] hover:border-gray-200/60",
        "hover:bg-white/80 hover:-translate-y-1"
      )}
    >
      <div className="flex items-start space-x-4">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0">
          <img
            src={discussion.author.avatarUrl}
            alt={`${discussion.author.login}님의 프로필`}
            className="h-10 w-10 rounded-full ring-2 ring-gray-200/30 shadow-sm"
            loading="lazy"
          />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="min-w-0 flex-1">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-semibold text-gray-800">
                {discussion.author.login}
              </span>
              <span className="text-gray-300">•</span>
              <time
                className="flex items-center space-x-1 text-gray-500"
                dateTime={discussion.createdAt}
              >
                <Calendar className="h-3 w-3" />
                <span>{formatRelativeTime(discussion.createdAt)}</span>
              </time>
            </div>
            <div className="flex items-center space-x-1 rounded-full bg-gray-100/60 px-3 py-1 text-xs font-medium text-gray-600">
              <span>{discussion.category.name}</span>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="mt-4 space-y-3">
            <h3 className="line-clamp-2 text-lg font-bold leading-6 text-gray-900 group-hover:text-gray-600 transition-colors duration-200">
              {discussion.title}
            </h3>
            {discussion.body && (
              <div className="line-clamp-3 text-sm text-gray-600 leading-[1.7]">
                {discussion.body.length > 200
                  ? `${discussion.body.slice(0, 200)}...`
                  : discussion.body}
              </div>
            )}
          </div>

          {/* 액션 버튼들 */}
          <div className="mt-5 flex items-center justify-between border-t border-gray-100/40 pt-4">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="h-8 px-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 rounded-full transition-all duration-200"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                <span className="text-xs font-medium">
                  {discussion.comments.totalCount}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isTogglingLike}
                className={cn(
                  "h-8 px-3 rounded-full transition-all duration-200",
                  isLiked
                    ? "text-red-500 hover:text-red-600 bg-red-50/50 hover:bg-red-50/80"
                    : "text-gray-500 hover:text-red-500 hover:bg-red-50/50"
                )}
              >
                <Heart
                  className={cn(
                    "mr-1.5 h-4 w-4 transition-all",
                    isLiked && "fill-current"
                  )}
                />
                <span className="text-xs font-medium">{likeCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 rounded-full transition-all duration-200"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-xs text-gray-400">
              <span className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>@{discussion.author.login}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export const PostCard = memo(PostCardComponent);

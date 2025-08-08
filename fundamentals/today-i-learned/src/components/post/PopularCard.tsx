import { memo, useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  Crown
} from "lucide-react";
import type { GitHubDiscussion } from "../../types";
import {
  useToggleReaction,
  useUserReactionStatus
} from "../../hooks/useReactions";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

interface PopularCardProps {
  discussion: GitHubDiscussion;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onClick?: (id: string) => void;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_MONTH = 2592000;

  if (diffInSeconds < SECONDS_IN_MINUTE) {
    return "방금";
  }
  if (diffInSeconds < SECONDS_IN_HOUR) {
    return `${Math.floor(diffInSeconds / SECONDS_IN_MINUTE)}분`;
  }
  if (diffInSeconds < SECONDS_IN_DAY) {
    return `${Math.floor(diffInSeconds / SECONDS_IN_HOUR)}시간`;
  }
  if (diffInSeconds < SECONDS_IN_MONTH) {
    return `${Math.floor(diffInSeconds / SECONDS_IN_DAY)}일`;
  }

  return date.toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric"
  });
}

function PopularCardComponent({
  discussion,
  onLike,
  onComment,
  onClick
}: PopularCardProps) {
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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const previousState = { isLiked, likeCount };
    const willBeLiked = !isLiked;
    const newLikeCount = willBeLiked ? likeCount + 1 : likeCount - 1;

    try {
      setIsLiked(willBeLiked);
      setLikeCount(newLikeCount);

      await toggleLike(discussion.id, previousState.isLiked);
      onLike?.(discussion.id);
    } catch (error) {
      setIsLiked(previousState.isLiked);
      setLikeCount(previousState.likeCount);
      console.error("Failed to toggle like:", error);
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    onComment?.(discussion.id);
  };

  const handleCardClick = () => {
    onClick?.(discussion.id);
  };

  const REACTION_WEIGHT = 2;
  const COMMENT_WEIGHT = 1;

  const reactionCount = discussion.reactions?.totalCount || 0;
  const commentCount = discussion.comments?.totalCount || 0;
  const popularityScore =
    reactionCount * REACTION_WEIGHT + commentCount * COMMENT_WEIGHT;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-md transition-all hover:shadow-lg cursor-pointer",
        "hover:border-primary/30 hover:from-primary/10 hover:to-secondary/10"
      )}
      onClick={handleCardClick}
    >
      {/* 인기 뱃지 */}
      <div className="absolute top-2 right-2 flex items-center space-x-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
        <Crown className="h-3 w-3" />
        <span>인기</span>
      </div>

      <div className="space-y-4">
        {/* 프로필 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={discussion.author.avatarUrl}
              alt={`${discussion.author.login}님의 프로필`}
              className="h-8 w-8 rounded-full ring-2 ring-primary/20"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {discussion.author.login}
              </span>
              <time
                className="flex items-center space-x-1 text-xs text-muted-foreground"
                dateTime={discussion.createdAt}
              >
                <Calendar className="h-3 w-3" />
                <span>{formatRelativeTime(discussion.createdAt)}</span>
              </time>
            </div>
          </div>

          <div className="flex items-center space-x-1 rounded-full bg-primary/15 px-2 py-1 text-xs font-medium text-primary">
            <span>{discussion.category.name}</span>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-base font-bold leading-5 text-foreground group-hover:text-primary transition-colors">
            {discussion.title}
          </h3>
          {discussion.body && (
            <div className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
              {discussion.body.length > 120
                ? `${discussion.body.slice(0, 120)}...`
                : discussion.body}
            </div>
          )}
        </div>

        {/* 액션 버튼들과 인기도 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="h-7 px-2 text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="mr-1 h-3 w-3" />
              <span className="text-xs">{discussion.comments.totalCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isTogglingLike}
              className={cn(
                "h-7 px-2 text-muted-foreground hover:text-foreground",
                isLiked && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart
                className={cn("mr-1 h-3 w-3", isLiked && "fill-current")}
              />
              <span className="text-xs">{likeCount}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 px-2 py-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>인기도 {popularityScore}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export const PopularCard = memo(PopularCardComponent);

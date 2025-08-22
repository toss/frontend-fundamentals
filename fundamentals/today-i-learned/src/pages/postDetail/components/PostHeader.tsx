import { MoreHorizontal } from "lucide-react";
import { Avatar, Button } from "../../newHome/ui";
import type { Post } from "../../newHome/utils/types";

interface PostHeaderProps {
  post: Post;
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Avatar
          size="48"
          src={post.author.avatar || "/api/placeholder/48/48"}
          alt={post.author.name}
          fallback={post.author.name}
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-xl leading-tight tracking-tight text-black/80">
              {post.author.name}
            </h4>
            <span className="font-semibold text-base leading-tight tracking-tight text-black/40">
              @{post.author.username}
            </span>
            <span className="font-semibold text-base leading-tight tracking-tight text-black/40">
              ·
            </span>
            <span className="font-semibold text-base leading-tight tracking-tight text-black/40">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 더보기 메뉴 (본인 글인 경우만) */}
      {post.isOwn && (
        <Button variant="ghost" size="sm" className="shrink-0 p-2">
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </Button>
      )}
    </div>
  );
}

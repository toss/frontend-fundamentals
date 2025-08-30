import { Heart, MessageCircle, Share, ChevronUp } from "lucide-react";
import type { GitHubDiscussionDetail } from "@/api/remote/discussions";

interface PostActionsProps {
  post: GitHubDiscussionDetail;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function PostActions({
  post,
  onLike,
  onComment,
  onShare,
  onUpvote
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-6 py-4 border-t border-gray-100">
      <button
        onClick={() => onUpvote(post.id)}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        <div className="w-6 h-6">
          <ChevronUp className="w-full h-full stroke-black/40 stroke-2" />
        </div>
        <span className="font-semibold text-lg leading-tight tracking-tight text-black/40">
          {formatNumber(post.reactions.totalCount)}
        </span>
      </button>

      <button
        onClick={() => onLike(post.id)}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        <div className="w-6 h-6">
          <Heart className="w-full h-full stroke-black/40 stroke-2 fill-none" />
        </div>
        <span className="font-semibold text-lg leading-tight tracking-tight text-black/40">
          0
        </span>
      </button>

      <button
        onClick={() => onComment(post.id)}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        <div className="w-6 h-6">
          <MessageCircle className="w-full h-full stroke-black/40 stroke-2 fill-none" />
        </div>
        <span className="font-semibold text-lg leading-tight tracking-tight text-black/40">
          {formatNumber(post.comments.totalCount)}
        </span>
      </button>

      <button
        onClick={() => onShare(post.id)}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        <div className="w-6 h-6">
          <Share className="w-full h-full stroke-black/40 stroke-2 fill-none" />
        </div>
        <span className="font-semibold text-lg leading-tight tracking-tight text-black/40">
          0
        </span>
      </button>
    </div>
  );
}

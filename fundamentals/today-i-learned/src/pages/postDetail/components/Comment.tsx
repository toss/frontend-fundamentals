import { useState } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";
import { Avatar } from "../../newHome/ui";
import { CommentInput } from "./CommentInput";
import type { CommentProps } from "../../newHome/utils/types";

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function Comment({ comment, onUpvote, onReply, depth = 0 }: CommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const handleReplySubmit = (content: string) => {
    onReply(comment.id, content);
    setShowReplyInput(false);
  };

  const indentLevel = Math.min(depth, 3);
  const marginLeft = indentLevel * 48;

  return (
    <div style={{ marginLeft: `${marginLeft}px` }}>
      <div className="py-4 border-b border-gray-100 last:border-b-0">
        {/* 댓글 헤더 */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar
            size="32"
            src={comment.author.avatar}
            alt={comment.author.name}
            fallback={comment.author.name}
            className="shrink-0"
          />
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-black/80">
              {comment.author.name}
            </span>
            <span className="font-medium text-sm text-black/40">
              @{comment.author.username}
            </span>
            <span className="font-medium text-sm text-black/40">·</span>
            <span className="font-medium text-sm text-black/40">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
        </div>

        {/* 댓글 내용 */}
        <div className="mb-3 ml-11">
          <p className="text-base leading-relaxed text-black/80 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>

        {/* 댓글 액션 */}
        <div className="flex items-center gap-4 ml-11">
          <button
            onClick={() => onUpvote(comment.id)}
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            <ChevronUp className="w-4 h-4 stroke-black/40 stroke-2" />
            <span className="text-sm font-medium text-black/40">
              {formatNumber(comment.stats.upvotes)}
            </span>
          </button>

          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            <MessageCircle className="w-4 h-4 stroke-black/40 stroke-2" />
            <span className="text-sm font-medium text-black/40">
              {comment.stats.replies > 0 ? formatNumber(comment.stats.replies) : "답글"}
            </span>
          </button>
        </div>

        {/* 답글 입력창 */}
        {showReplyInput && (
          <div className="mt-4 ml-11">
            <CommentInput
              onSubmit={handleReplySubmit}
              placeholder="답글을 작성해보세요..."
              isReply={true}
              parentId={comment.id}
            />
          </div>
        )}
      </div>

      {/* 대댓글들 */}
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onUpvote={onUpvote}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {/* 대댓글 토글 버튼 */}
      {comment.replies && comment.replies.length > 0 && (
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="ml-11 mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {showReplies 
            ? `답글 ${comment.replies.length}개 숨기기` 
            : `답글 ${comment.replies.length}개 보기`
          }
        </button>
      )}
    </div>
  );
}
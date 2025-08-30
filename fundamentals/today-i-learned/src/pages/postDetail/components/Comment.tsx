import { useState } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { CommentInput } from "./CommentInput";
import type { CommentProps } from "../../newHome/utils/types";
import { formatTimeAgo, formatNumber } from "../utils/formatters";
function CommentContainer({ 
  children, 
  depth = 0 
}: { 
  children: React.ReactNode; 
  depth?: number;
}) {
  const indentLevel = Math.min(depth, 3);
  const marginLeft = indentLevel * 48;
  
  return (
    <div style={{ marginLeft: `${marginLeft}px` }}>
      <div className="py-4 border-b border-gray-100 last:border-b-0">
        {children}
      </div>
    </div>
  );
}

function CommentHeader({ comment }: { comment: CommentProps['comment'] }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Avatar
        size="32"
        src={comment.author.avatar || "/api/placeholder/32/32"}
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
  );
}

function CommentBody({ content }: { content: string }) {
  return (
    <div className="mb-3 ml-11">
      <p className="text-base leading-relaxed text-black/80 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}

function CommentActions({ 
  upvotes, 
  replies, 
  onUpvote, 
  onReply 
}: {
  upvotes: number;
  replies: number;
  onUpvote: () => void;
  onReply: () => void;
}) {
  return (
    <div className="flex items-center gap-4 ml-11">
      <button
        onClick={onUpvote}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity"
      >
        <ChevronUp className="w-4 h-4 stroke-black/40 stroke-2" />
        <span className="text-sm font-medium text-black/40">
          {formatNumber(upvotes)}
        </span>
      </button>

      <button
        onClick={onReply}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity"
      >
        <MessageCircle className="w-4 h-4 stroke-black/40 stroke-2" />
        <span className="text-sm font-medium text-black/40">
          {replies > 0 ? formatNumber(replies) : "답글"}
        </span>
      </button>
    </div>
  );
}

function RepliesToggle({ 
  show, 
  count, 
  onToggle 
}: {
  show: boolean;
  count: number;
  onToggle: () => void;
}) {
  if (count === 0) return null;
  
  return (
    <button
      onClick={onToggle}
      className="ml-11 mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
    >
      {show ? `답글 ${count}개 숨기기` : `답글 ${count}개 보기`}
    </button>
  );
}

function useCommentInteraction(commentId: string) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const toggleReplyInput = () => setShowReplyInput(!showReplyInput);
  const toggleReplies = () => setShowReplies(!showReplies);
  const hideReplyInput = () => setShowReplyInput(false);

  return {
    showReplyInput,
    showReplies,
    toggleReplyInput,
    toggleReplies,
    hideReplyInput
  };
}

export function Comment({ comment, onUpvote, onReply, depth = 0 }: CommentProps) {
  const {
    showReplyInput,
    showReplies,
    toggleReplyInput,
    toggleReplies,
    hideReplyInput
  } = useCommentInteraction(comment.id);

  const handleReplySubmit = (content: string) => {
    onReply(comment.id, content);
    hideReplyInput();
  };

  const handleUpvote = () => onUpvote(comment.id);

  return (
    <>
      <CommentContainer depth={depth}>
        <CommentHeader comment={comment} />
        <CommentBody content={comment.content} />
        <CommentActions
          upvotes={comment.stats.upvotes}
          replies={comment.stats.replies}
          onUpvote={handleUpvote}
          onReply={toggleReplyInput}
        />

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
      </CommentContainer>

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

      <RepliesToggle
        show={showReplies}
        count={comment.replies?.length || 0}
        onToggle={toggleReplies}
      />
    </>
  );
}
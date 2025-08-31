import { ChevronUp, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { CommentInput } from "./CommentInput";
import type { GitHubComment } from "@/api/remote/discussions";
import { formatTimeAgo, formatNumber } from "../utils/formatters";

interface CommentProps {
  comment: GitHubComment;
  onUpvote: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
  depth?: number;
}
function CommentContainer({
  children,
  depth = 0,
  hasReplies = false
}: {
  children: React.ReactNode;
  depth?: number;
  hasReplies?: boolean;
}) {
  if (depth === 0) {
    // 최상위 댓글 - 답글이 있으면 세로선 추가
    if (hasReplies) {
      return (
        <div className="flex flex-col items-start px-8 w-full">
          <div className="flex flex-row justify-center items-start p-0 gap-4 w-full max-w-[736px]">
            <div className="flex flex-row items-start pt-4 gap-2.5 w-0 self-stretch min-h-full">
              <div
                className="w-px h-full border-l border-[rgba(201,201,201,0.4)]"
                style={{
                  minHeight: "160px"
                }}
              />
            </div>
            <div className="flex flex-col items-start py-6 gap-6 flex-1 w-full max-w-[720px]">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // 답글이 없는 최상위 댓글
    return (
      <div className="flex flex-col items-start px-8 w-full">{children}</div>
    );
  }

  // 대댓글 - Comment with nested structure
  return (
    <div className="flex flex-col items-start px-8 w-full">
      <div className="flex flex-row justify-center items-start p-0 gap-4 w-full max-w-[736px]">
        <div className="flex flex-row items-start pt-4 gap-2.5 w-0 self-stretch min-h-full">
          <div
            className="w-px h-full border-l border-[rgba(201,201,201,0.4)]"
            style={{
              minHeight: "160px"
            }}
          />
        </div>
        <div className="flex flex-col items-start py-6 gap-6 flex-1 w-full max-w-[720px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function CommentHeader({ comment }: { comment: CommentProps["comment"] }) {
  return (
    <div className="flex flex-row items-center gap-4 w-full h-10">
      {/* Profile Info */}
      <div className="flex flex-row items-center gap-3">
        <Avatar
          size="40"
          src={comment.author.avatarUrl || "/api/placeholder/40/40"}
          alt={comment.author.login}
          fallback={comment.author.login}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex flex-row items-center gap-2">
          <span className="font-bold text-xl leading-[130%] tracking-tight text-black/80">
            {comment.author.login}
          </span>
          <div className="flex flex-row items-start gap-1">
            <span className="font-semibold text-base leading-[130%] tracking-tight text-black/40">
              @{comment.author.login}
            </span>
            <span className="font-semibold text-base leading-[130%] tracking-tight text-black/40">
              ·
            </span>
            <span className="font-semibold text-base leading-[130%] tracking-tight text-black/40">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentBody({ content }: { content: string }) {
  return (
    <div className="w-full">
      <p className="font-medium text-base leading-[160%] tracking-tight text-black/80 whitespace-pre-wrap">
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
    <div className="flex flex-row items-start py-2 gap-4 w-[180px] h-9">
      <button
        onClick={onUpvote}
        className="flex flex-row items-center gap-1.5 hover:opacity-70 transition-opacity"
      >
        <div className="w-5 h-5">
          <ChevronUp className="w-3 h-3 stroke-black/40 stroke-2" />
        </div>
        <span className="font-semibold text-base leading-[130%] tracking-tight text-black/40">
          {formatNumber(upvotes)}
        </span>
      </button>

      <button
        onClick={onReply}
        className="flex flex-row items-center gap-1.5 hover:opacity-70 transition-opacity"
      >
        <div className="w-5 h-5">
          <MessageCircle className="w-4 h-4 stroke-black/40 stroke-2" />
        </div>
        <span className="font-semibold text-base leading-[130%] tracking-tight text-black/40">
          {replies > 0 ? formatNumber(replies) : 0}
        </span>
      </button>
    </div>
  );
}

function useCommentInteraction() {
  const hideReplyInput = () => {};

  return {
    hideReplyInput
  };
}

export function Comment({
  comment,
  onUpvote,
  onReply,
  depth = 0
}: CommentProps) {
  const { hideReplyInput } = useCommentInteraction();

  const handleReplySubmit = (content: string) => {
    onReply(comment.id, content);
    hideReplyInput();
  };

  const handleUpvote = () => onUpvote(comment.id);

  if (depth === 0) {
    return (
      <>
        <CommentContainer 
          depth={depth} 
          hasReplies={!!(comment.replies?.nodes && comment.replies.nodes.length > 0)}
        >
          <div className="flex flex-row items-center p-0 gap-4 w-full h-10">
            <CommentHeader comment={comment} />
          </div>

          <div className="flex flex-col items-start py-6 gap-6 w-full">
            <CommentBody content={comment.body} />
            <CommentActions
              upvotes={comment.reactions.totalCount}
              replies={comment.replies?.totalCount || 0}
              onUpvote={handleUpvote}
              onReply={() => {}}
            />
          </div>
        </CommentContainer>
        {comment.replies?.nodes && comment.replies.nodes.length > 0 && (
          <div>
            {comment.replies.nodes.map((reply) => (
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
      </>
    );
  }

  // 대댓글
  return (
    <>
      <CommentContainer depth={depth}>
        <CommentHeader comment={comment} />
        <CommentBody content={comment.body} />
        <CommentActions
          upvotes={comment.reactions.totalCount}
          replies={comment.replies?.totalCount || 0}
          onUpvote={handleUpvote}
          onReply={() => {}}
        />
      </CommentContainer>

      {comment.replies?.nodes && comment.replies.nodes.length > 0 && (
        <div>
          {comment.replies.nodes.map((reply) => (
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

      <div className="mt-4">
        <CommentInput
          onSubmit={handleReplySubmit}
          placeholder="댓글을 작성해보세요..."
          isReply={true}
          parentId={comment.id}
        />
      </div>
    </>
  );
}

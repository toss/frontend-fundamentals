import { ChevronUp, MessageCircle, Heart } from "lucide-react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { CommentInput } from "./CommentInput";
import type { GitHubComment } from "@/api/remote/discussions";
import { formatNumber, formatTimeAgo } from "../utils/formatters";
import {
  getHeartAndUpvoteCounts,
  getUserReactionStates
} from "@/utils/reactions";
import { useAuth } from "@/contexts/AuthContext";

interface CommentProps {
  comment: GitHubComment;
  onUpvote: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
  depth?: number;
}

function CommentContainer({
  children,
  depth = 0
}: {
  children: React.ReactNode;
  depth?: number;
}) {
  if (depth === 0) {
    return (
      <div className="flex flex-col items-start px-8 py-6 w-full pl-4">
        {children}
      </div>
    );
  }

  // 대댓글 - 동일한 패딩에 border만 추가
  return (
    <div className="flex flex-col items-start px-8 py-6 w-full ml-8 pl-4 border-l-2 border-gray-200">
      {children}
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
      <MarkdownRenderer
        content={content}
        className="font-medium text-base leading-[160%] tracking-tight text-black/80"
      />
    </div>
  );
}

function CommentActions({
  upvotes,
  likes,
  replies,
  onUpvote,
  onLike,
  onReply,
  hasUserUpvoted,
  hasUserLiked,
  depth = 0
}: {
  upvotes: number;
  likes: number;
  replies: number;
  onUpvote: () => void;
  onLike: () => void;
  onReply: () => void;
  hasUserUpvoted?: boolean;
  hasUserLiked?: boolean;
  depth?: number;
}) {
  return (
    <div
      className={`flex flex-row items-start py-2 gap-4 h-9 ${depth === 0 ? "w-[250px]" : "w-[180px]"}`}
    >
      {depth === 0 && (
        <button
          onClick={onUpvote}
          className={`flex flex-row items-center gap-1.5 hover:opacity-70 transition-all ${
            hasUserUpvoted ? "text-gray-600" : ""
          }`}
        >
          <div className="w-5 h-5">
            <ChevronUp
              className={`w-full h-full stroke-[1.67px] ${
                hasUserUpvoted ? "stroke-[#979797]" : "stroke-black/40"
              }`}
            />
          </div>
          <span
            className={`font-semibold text-base leading-[130%] tracking-tight ${
              hasUserUpvoted ? "text-[#979797]" : "text-black/40"
            }`}
          >
            {formatNumber(upvotes)}
          </span>
        </button>
      )}

      <button
        onClick={onLike}
        className={`flex flex-row items-center gap-1.5 hover:opacity-70 transition-all ${
          hasUserLiked ? "text-gray-600" : ""
        }`}
      >
        <div className="w-5 h-5">
          <Heart
            className={`w-full h-full stroke-[1.67px] ${
              hasUserLiked
                ? "stroke-[#979797] fill-[#656565]"
                : "stroke-black/40 fill-none"
            }`}
          />
        </div>
        <span
          className={`font-semibold text-base leading-[130%] tracking-tight ${
            hasUserLiked ? "text-[#979797]" : "text-black/40"
          }`}
        >
          {formatNumber(likes)}
        </span>
      </button>

      <button
        onClick={onReply}
        className="flex flex-row items-center gap-1.5 hover:opacity-70 transition-opacity"
      >
        <div className="w-5 h-5">
          <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
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
  onLike,
  onReply,
  depth = 0
}: CommentProps) {
  const { hideReplyInput } = useCommentInteraction();
  const { user } = useAuth();

  const handleReplySubmit = (content: string) => {
    onReply(comment.id, content);
    hideReplyInput();
  };

  const handleUpvote = () => onUpvote(comment.id);
  const handleLike = () => onLike(comment.id);

  // Use utility functions to get reaction counts and user states
  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(
    comment.reactions
  );
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } =
    getUserReactionStates(comment.reactions, user?.login);

  if (depth === 0) {
    return (
      <>
        <CommentContainer depth={depth}>
          <div className="flex flex-row items-center p-0 gap-4 w-full h-10">
            <CommentHeader comment={comment} />
          </div>

          <div className="flex flex-col items-start py-6 gap-6 w-full">
            <CommentBody content={comment.body} />
            <CommentActions
              upvotes={upvoteCount}
              likes={heartCount}
              replies={comment.replies?.totalCount || 0}
              onUpvote={handleUpvote}
              onLike={handleLike}
              onReply={() => {}}
              hasUserUpvoted={hasUserUpvoted}
              hasUserLiked={hasUserLiked}
              depth={depth}
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
                onLike={onLike}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}

        {depth === 0 && (
          <div className="mt-4">
            <CommentInput
              onSubmit={handleReplySubmit}
              placeholder="답글을 작성해보세요..."
              isReply={true}
              parentId={comment.id}
            />
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
        <div className="flex flex-col items-start py-6 gap-6 w-full">
          <CommentBody content={comment.body} />
          <CommentActions
            upvotes={upvoteCount}
            likes={heartCount}
            replies={comment.replies?.totalCount || 0}
            onUpvote={handleUpvote}
            onLike={handleLike}
            onReply={() => {}}
            hasUserUpvoted={hasUserUpvoted}
            hasUserLiked={hasUserLiked}
            depth={depth}
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
              onLike={onLike}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
}

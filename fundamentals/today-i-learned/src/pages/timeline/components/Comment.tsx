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
import { css } from "@styled-system/css";
import { cx } from "@styled-system/css";

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
    return <div className={commentContainerBase}>{children}</div>;
  }

  // 대댓글 - 동일한 패딩에 border만 추가
  return (
    <div className={cx(commentContainerBase, commentContainerReply)}>
      {children}
    </div>
  );
}

function CommentHeader({ comment }: { comment: CommentProps["comment"] }) {
  return (
    <div className={headerContainer}>
      {/* Profile Info */}
      <div className={profileInfoContainer}>
        <Avatar
          size="40"
          src={comment.author.avatarUrl || "/api/placeholder/40/40"}
          alt={comment.author.login}
          fallback={comment.author.login}
          className={avatarStyle}
        />
        <div className={userInfoContainer}>
          <span className={userName}>{comment.author.login}</span>
          <div className={userMetaContainer}>
            <span className={userHandle}>@{comment.author.login}</span>
            <span className={separator}>·</span>
            <span className={timeStamp}>
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
    <div className={bodyContainer}>
      <MarkdownRenderer content={content} className={markdownContent} />
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
      className={cx(
        actionsContainer,
        depth === 0 ? actionsContainerMain : actionsContainerReply
      )}
    >
      {depth === 0 && (
        <button
          onClick={onUpvote}
          className={cx(actionButton, hasUserUpvoted && actionButtonActive)}
        >
          <div className={iconContainer}>
            <ChevronUp
              className={cx(
                upvoteIcon,
                hasUserUpvoted ? upvoteIconActive : upvoteIconDefault
              )}
            />
          </div>
          <span
            className={cx(
              actionText,
              hasUserUpvoted ? actionTextActive : actionTextDefault
            )}
          >
            {formatNumber(upvotes)}
          </span>
        </button>
      )}

      <button
        onClick={onLike}
        className={cx(actionButton, hasUserLiked && actionButtonActive)}
      >
        <div className={iconContainer}>
          <Heart
            className={cx(
              heartIcon,
              hasUserLiked ? heartIconActive : heartIconDefault
            )}
          />
        </div>
        <span
          className={cx(
            actionText,
            hasUserLiked ? actionTextActive : actionTextDefault
          )}
        >
          {formatNumber(likes)}
        </span>
      </button>

      <button onClick={onReply} className={replyButton}>
        <div className={iconContainer}>
          <MessageCircle className={replyIcon} />
        </div>
        <span className={replyText}>
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
          <div className={commentHeaderWrapper}>
            <CommentHeader comment={comment} />
          </div>

          <div className={commentContentWrapper}>
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
          <div className={commentInputWrapper}>
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
        <div className={commentContentWrapper}>
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

// Semantic style definitions
const commentContainerBase = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingX: "2rem",
  paddingY: "1.5rem",
  width: "100%",
  paddingLeft: "1rem"
});

const commentContainerReply = css({
  marginLeft: "2rem",
  paddingLeft: "1rem",
  borderLeft: "2px solid #e5e7eb"
});

const headerContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  height: "2.5rem"
});

const profileInfoContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.75rem"
});

const avatarStyle = css({
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "50%",
  flexShrink: "0"
});

const userInfoContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem"
});

const userName = css({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "130%",
  letterSpacing: "-0.025em",
  color: "rgba(0, 0, 0, 0.8)"
});

const userMetaContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "0.25rem"
});

const userHandle = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.025em",
  color: "rgba(0, 0, 0, 0.4)"
});

const separator = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.025em",
  color: "rgba(0, 0, 0, 0.4)"
});

const timeStamp = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.025em",
  color: "rgba(0, 0, 0, 0.4)"
});

const bodyContainer = css({
  width: "100%"
});

const markdownContent = css({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.025em",
  color: "rgba(0, 0, 0, 0.8)"
});

const actionsContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  paddingY: "0.5rem",
  gap: "1rem",
  height: "2.25rem"
});

const actionsContainerMain = css({
  width: "250px"
});

const actionsContainerReply = css({
  width: "180px"
});

const actionButton = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.375rem",
  transition: "opacity 0.2s ease-in-out",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  _hover: {
    opacity: "0.7"
  }
});

const actionButtonActive = css({
  color: "#6b7280"
});

const iconContainer = css({
  width: "1.25rem",
  height: "1.25rem"
});

const upvoteIcon = css({
  width: "100%",
  height: "100%",
  strokeWidth: "1.67px"
});

const upvoteIconActive = css({
  stroke: "#979797"
});

const upvoteIconDefault = css({
  stroke: "rgba(0, 0, 0, 0.4)"
});

const heartIcon = css({
  width: "100%",
  height: "100%",
  strokeWidth: "1.67px"
});

const heartIconActive = css({
  stroke: "#979797",
  fill: "#656565"
});

const heartIconDefault = css({
  stroke: "rgba(0, 0, 0, 0.4)",
  fill: "none"
});

const actionText = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.025em"
});

const actionTextActive = css({
  color: "#979797"
});

const actionTextDefault = css({
  color: "rgba(0, 0, 0, 0.4)"
});

const replyButton = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.375rem",
  transition: "opacity 0.2s ease-in-out",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  _hover: {
    opacity: "0.7"
  }
});

const replyIcon = css({
  width: "100%",
  height: "100%",
  stroke: "rgba(0, 0, 0, 0.4)",
  strokeWidth: "1.67px",
  fill: "none"
});

const replyText = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.025em",
  color: "rgba(0, 0, 0, 0.4)"
});

const commentHeaderWrapper = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0",
  gap: "1rem",
  width: "100%",
  height: "2.5rem"
});

const commentContentWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingY: "1.5rem",
  gap: "1.5rem",
  width: "100%"
});

const commentInputWrapper = css({
  marginTop: "1rem"
});

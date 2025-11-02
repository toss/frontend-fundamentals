import {
  useAddDiscussionCommentReply,
  useToggleDiscussionReaction
} from "@/api/hooks/useDiscussions";
import { Comment } from "./Comment";
import type { GitHubComment } from "@/api/remote/discussions";
import { css } from "@styled-system/css";
import { hasUserReacted } from "@/utils/reactions";
import { useAuth } from "@/contexts/AuthContext";

interface CommentListProps {
  comments: GitHubComment[];
  discussionId: string;
  // onUpvote: (commentId: string) => void;
  // onLike: (commentId: string) => void;
  // onReply: (commentId: string, content: string) => void;
}

// FIXME: suspense 적용 + errorboundary 적용 + 내부로 함수 다 불러오기
export function CommentList({
  comments,
  discussionId
  // onUpvote,
  // onLike,
  // onReply
}: CommentListProps) {
  const { user } = useAuth();
  if (comments.length === 0) {
    return (
      <div className={emptyState}>
        <p className={emptyMessage}>
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </p>
      </div>
    );
  }

  const addCommentReplyMutation = useAddDiscussionCommentReply();
  const toggleReactionMutation = useToggleDiscussionReaction();

  const handleCommentUpvote = async (commentId: string) => {
    if (!user?.accessToken || !user?.login) {
      return;
    }

    try {
      const comment = findCommentById(comments, commentId);
      const isCurrentlyReacted = comment
        ? hasUserReacted(comment.reactions, user.login, "THUMBS_UP")
        : false;

      await toggleReactionMutation.mutateAsync({
        subjectId: commentId,
        isReacted: isCurrentlyReacted,
        content: "THUMBS_UP"
      });
    } catch (error) {
      console.error("댓글 업보트 실패:", error);
    }
  };

  const handleCommentReply = async (commentId: string, content: string) => {
    if (!user?.accessToken) {
      return;
    }

    try {
      await addCommentReplyMutation.mutateAsync({
        discussionId,
        replyToId: commentId,
        body: content
      });
    } catch (error) {
      console.error("댓글 답글 실패:", error);
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (!user?.accessToken || !user?.login) {
      return;
    }

    try {
      const comment = findCommentById(comments, commentId);
      const isCurrentlyReacted = comment
        ? hasUserReacted(comment.reactions, user.login, "HEART")
        : false;

      await toggleReactionMutation.mutateAsync({
        subjectId: commentId,
        isReacted: isCurrentlyReacted,
        content: "HEART"
      });
    } catch (error) {
      console.error("댓글 좋아요 실패:", error);
    }
  };

  return (
    <div className={commentListContainer}>
      {comments.map((comment, index) => (
        <div key={comment.id} className={commentItemContainer}>
          <Comment
            comment={comment}
            onUpvote={handleCommentUpvote}
            onLike={handleCommentLike}
            onReply={handleCommentReply}
          />

          {/* Border - 댓글 사이 경계선 */}
          {index < comments.length - 1 && (
            <div className={dividerContainer}>
              <div className={dividerLine} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const findCommentById = (
  comments: GitHubComment[],
  id: string
): GitHubComment | null => {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    if (comment.replies?.nodes) {
      const found = findCommentById(comment.replies.nodes, id);
      if (found) return found;
    }
  }
  return null;
};

// Semantic style definitions
const emptyState = css({
  textAlign: "center",
  paddingY: "2rem"
});

const emptyMessage = css({
  fontSize: "16px",
  color: "rgba(0, 0, 0, 0.6)"
});

const commentListContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  gap: "1.5rem",
  width: "100%",
  maxWidth: "800px"
});

const commentItemContainer = css({
  width: "100%"
});

const dividerContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingY: "1rem",
  gap: "0.625rem",
  width: "100%"
});

const dividerLine = css({
  width: "100%",
  height: "1px",
  backgroundColor: "rgba(201, 201, 201, 0.5)"
});

import { ChevronUp, MessageCircle, Heart } from "lucide-react";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { CommentInput } from "./CommentInput";
import { PostMoreMenu } from "@/components/features/discussions/PostMoreMenu";
import { useEditCommentModal } from "../hooks/useEditCommentModal";
import type { GitHubComment } from "@/api/remote/discussions";
import { formatNumber, formatTimeAgo } from "../utils/formatters";
import {
  getHeartAndUpvoteCounts,
  getUserReactionStates,
  hasUserReacted
} from "@/utils/reactions";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import {
  useAddDiscussionCommentReply,
  useToggleDiscussionReaction,
  useUpdateDiscussionComment,
  useDeleteDiscussionComment
} from "@/api/hooks/useDiscussions";
import { css, cx } from "@styled-system/css";

interface CommentProps {
  comment: GitHubComment;
  discussionId: string;
  depth?: number;
}

export function Comment({ comment, discussionId, depth = 0 }: CommentProps) {
  const { user } = useAuth();
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  // Mutations
  const addCommentReplyMutation = useAddDiscussionCommentReply();
  const toggleReactionMutation = useToggleDiscussionReaction();
  const updateCommentMutation = useUpdateDiscussionComment();
  const deleteCommentMutation = useDeleteDiscussionComment();

  // 본인 댓글인지 확인
  const canEdit = Boolean(user?.login && comment.author.login === user.login);

  // 수정 모달
  const { openModal, EditCommentModal } = useEditCommentModal({
    onSubmit: async (content) => {
      if (!user?.accessToken) return;
      try {
        await updateCommentMutation.mutateAsync({
          commentId: comment.id,
          body: content
        });
        showSuccessToast("수정 완료", "댓글이 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("댓글 수정 실패:", error);
        showErrorToast("수정 실패", "댓글 수정에 실패했습니다.");
      }
    },
    initialContent: comment.body
  });

  const handleReplySubmit = async (content: string) => {
    if (!user?.accessToken) return;
    try {
      await addCommentReplyMutation.mutateAsync({
        discussionId,
        replyToId: comment.id,
        body: content
      });
    } catch (error) {
      console.error("댓글 답글 실패:", error);
    }
  };

  const handleUpvote = async () => {
    if (!user?.accessToken || !user?.login) return;
    try {
      const isCurrentlyReacted = hasUserReacted(
        comment.reactions,
        user.login,
        "THUMBS_UP"
      );
      await toggleReactionMutation.mutateAsync({
        subjectId: comment.id,
        isReacted: isCurrentlyReacted,
        content: "THUMBS_UP"
      });
    } catch (error) {
      console.error("댓글 업보트 실패:", error);
    }
  };

  const handleLike = async () => {
    if (!user?.accessToken || !user?.login) return;
    try {
      const isCurrentlyReacted = hasUserReacted(
        comment.reactions,
        user.login,
        "HEART"
      );
      await toggleReactionMutation.mutateAsync({
        subjectId: comment.id,
        isReacted: isCurrentlyReacted,
        content: "HEART"
      });
    } catch (error) {
      console.error("댓글 좋아요 실패:", error);
    }
  };

  const handleDelete = async () => {
    if (!user?.accessToken) return;
    try {
      await deleteCommentMutation.mutateAsync({
        commentId: comment.id
      });
      showSuccessToast("삭제 완료", "댓글이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      showErrorToast("삭제 실패", "댓글 삭제에 실패했습니다.");
    }
  };

  const isEditing = updateCommentMutation.isPending;
  const isDeleting = deleteCommentMutation.isPending;
  const isDeleteError = deleteCommentMutation.isError;

  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(
    comment.reactions
  );
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } =
    getUserReactionStates(comment.reactions, user?.login);

  const isReply = depth > 0;

  return (
    <>
      {/* 댓글 컨테이너 */}
      <div className={cx(styles.container, isReply && styles.containerReply)}>
        {/* 헤더: 프로필 + 더보기 메뉴 */}
        <div className={styles.header}>
          <div className={styles.profileInfo}>
            <UserAvatar
              size="40"
              username={comment.author.login}
              avatarUrl={comment.author.avatarUrl}
              linkToProfile={true}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{comment.author.login}</span>
              <div className={styles.userMeta}>
                <span className={styles.userHandle}>
                  @{comment.author.login}
                </span>
                <span className={styles.separator}>·</span>
                <span className={styles.timeStamp}>
                  {formatTimeAgo(comment.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {canEdit && (
            <PostMoreMenu
              onEdit={openModal}
              onDelete={handleDelete}
              isLoading={isEditing || isDeleting}
              isDeleteError={isDeleteError}
              deleteDialogTitle="댓글을 삭제하시겠습니까?"
              deleteDialogDescription="반응도 함께 삭제됩니다."
            />
          )}
        </div>

        {/* 본문 + 액션 버튼 */}
        <div className={styles.content}>
          <div className={styles.body}>
            <MarkdownRenderer
              content={comment.body}
              className={styles.markdown}
            />
          </div>

          <div
            className={cx(
              styles.actions,
              isReply ? styles.actionsReply : styles.actionsMain
            )}
          >
            {/* 업보트 (메인 댓글만) */}
            {!isReply && (
              <button
                onClick={handleUpvote}
                className={cx(
                  styles.actionButton,
                  hasUserUpvoted && styles.actionButtonActive
                )}
              >
                <div className={styles.iconContainer}>
                  <ChevronUp
                    className={cx(
                      styles.upvoteIcon,
                      hasUserUpvoted
                        ? styles.upvoteIconActive
                        : styles.upvoteIconDefault
                    )}
                  />
                </div>
                <span
                  className={cx(
                    styles.actionText,
                    hasUserUpvoted
                      ? styles.actionTextActive
                      : styles.actionTextDefault
                  )}
                >
                  {formatNumber(upvoteCount)}
                </span>
              </button>
            )}

            {/* 좋아요 */}
            <button
              onClick={handleLike}
              className={cx(
                styles.actionButton,
                hasUserLiked && styles.actionButtonActive
              )}
            >
              <div className={styles.iconContainer}>
                <Heart
                  className={cx(
                    styles.heartIcon,
                    hasUserLiked
                      ? styles.heartIconActive
                      : styles.heartIconDefault
                  )}
                />
              </div>
              <span
                className={cx(
                  styles.actionText,
                  hasUserLiked
                    ? styles.actionTextActive
                    : styles.actionTextDefault
                )}
              >
                {formatNumber(heartCount)}
              </span>
            </button>

            {/* 답글 */}
            <button className={styles.replyButton}>
              <div className={styles.iconContainer}>
                <MessageCircle className={styles.replyIcon} />
              </div>
              <span className={styles.replyText}>
                {formatNumber(comment.replies?.totalCount || 0)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 대댓글 목록 (재귀) */}
      {comment.replies?.nodes && comment.replies.nodes.length > 0 && (
        <div>
          {comment.replies.nodes.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              discussionId={discussionId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      {/* 답글 입력창 (메인 댓글에만) */}
      {!isReply && (
        <div className={styles.inputWrapper}>
          <CommentInput
            onSubmit={handleReplySubmit}
            placeholder="답글을 작성해보세요..."
            isReply={true}
            parentId={comment.id}
          />
        </div>
      )}

      {EditCommentModal}
    </>
  );
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingX: "2rem",
    paddingY: "1.5rem",
    width: "100%",
    paddingLeft: "1rem"
  }),
  containerReply: css({
    marginLeft: "2rem",
    paddingLeft: "1rem",
    borderLeft: "2px solid #e5e7eb"
  }),
  header: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    width: "100%",
    height: "2.5rem"
  }),
  profileInfo: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.75rem"
  }),
  avatar: css({
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    flexShrink: "0"
  }),
  userInfo: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem"
  }),
  userName: css({
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "130%",
    letterSpacing: "-0.025em",
    color: "rgba(0, 0, 0, 0.8)"
  }),
  userMeta: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "0.25rem"
  }),
  userHandle: css({
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "130%",
    letterSpacing: "-0.025em",
    color: "rgba(0, 0, 0, 0.4)"
  }),
  separator: css({
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "130%",
    letterSpacing: "-0.025em",
    color: "rgba(0, 0, 0, 0.4)"
  }),
  timeStamp: css({
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "130%",
    letterSpacing: "-0.025em",
    color: "rgba(0, 0, 0, 0.4)"
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingY: "1.5rem",
    gap: "1.5rem",
    width: "100%"
  }),
  body: css({
    width: "100%"
  }),
  markdown: css({
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "160%",
    letterSpacing: "-0.025em",
    color: "rgba(0, 0, 0, 0.8)"
  }),
  actions: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingY: "0.5rem",
    gap: "1rem",
    height: "2.25rem"
  }),
  actionsMain: css({
    width: "250px"
  }),
  actionsReply: css({
    width: "180px"
  }),
  actionButton: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.375rem",
    transition: "opacity 0.2s ease-in-out",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    _hover: { opacity: "0.7" }
  }),
  actionButtonActive: css({
    color: "#6b7280"
  }),
  iconContainer: css({
    width: "1.25rem",
    height: "1.25rem"
  }),
  upvoteIcon: css({
    width: "100%",
    height: "100%",
    strokeWidth: "1.67px"
  }),
  upvoteIconActive: css({
    stroke: "#979797"
  }),
  upvoteIconDefault: css({
    stroke: "rgba(0, 0, 0, 0.4)"
  }),
  heartIcon: css({
    width: "100%",
    height: "100%",
    strokeWidth: "1.67px"
  }),
  heartIconActive: css({
    stroke: "#979797",
    fill: "#656565"
  }),
  heartIconDefault: css({
    stroke: "rgba(0, 0, 0, 0.4)",
    fill: "none"
  }),
  actionText: css({
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "130%",
    letterSpacing: "-0.025em"
  }),
  actionTextActive: css({
    color: "#979797"
  }),
  actionTextDefault: css({
    color: "rgba(0, 0, 0, 0.4)"
  }),
  replyButton: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.375rem",
    transition: "opacity 0.2s ease-in-out",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    _hover: { opacity: "0.7" }
  }),
  replyIcon: css({
    width: "100%",
    height: "100%",
    stroke: "rgba(0, 0, 0, 0.4)",
    strokeWidth: "1.67px",
    fill: "none"
  }),
  replyText: css({
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "130%",
    letterSpacing: "-0.025em",
    color: "rgba(0, 0, 0, 0.4)"
  }),
  inputWrapper: css({
    marginTop: "1rem"
  })
};

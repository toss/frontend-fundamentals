import { useState } from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { InteractionButtons } from "@/components/shared/ui/InteractionButtons";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import {
  useDiscussionDetail,
  useAddDiscussionComment,
  useAddDiscussionCommentReply,
  useToggleDiscussionReaction
} from "@/api/hooks/useDiscussions";
import { useAuth } from "@/contexts/AuthContext";
import { CommentList } from "@/pages/timeline/components/CommentList";
import { hasUserReacted, getHeartAndUpvoteCounts, getUserReactionStates } from "@/libs/reactions";
import type { GitHubComment } from "@/api/remote/discussions";
import { css } from "@styled-system/css";

interface PostDetailProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onUpvote?: (postId: string) => void;
  showComments?: boolean;
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  }
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  }
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export function PostDetail({
  discussion,
  onLike,
  onUpvote,
  showComments = true
}: PostDetailProps) {
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();

  // GitHub API 훅들
  const { data: discussionDetail, isLoading: isDetailLoading } =
    useDiscussionDetail(discussion.id);
  const addCommentMutation = useAddDiscussionComment();
  const addCommentReplyMutation = useAddDiscussionCommentReply();
  const toggleReactionMutation = useToggleDiscussionReaction();

  const actualDiscussion = discussionDetail || discussion;
  const comments = discussionDetail?.comments?.nodes || [];

  // Helper function to find comment by ID (including nested replies)
  const findCommentById = (comments: GitHubComment[], id: string): GitHubComment | null => {
    for (const comment of comments) {
      if (comment.id === id) return comment;
      if (comment.replies?.nodes) {
        const found = findCommentById(comment.replies.nodes, id);
        if (found) return found;
      }
    }
    return null;
  };

  const authorInfo = {
    src: actualDiscussion.author.avatarUrl,
    alt: actualDiscussion.author.login,
    fallback: actualDiscussion.author.login,
    name: actualDiscussion.author.login,
    username: actualDiscussion.author.login
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() && user?.accessToken) {
      try {
        await addCommentMutation.mutateAsync({
          discussionId: discussion.id,
          body: commentText
        });
        setCommentText("");
      } catch (error) {
        console.error("댓글 작성 실패:", error);
      }
    }
  };

  const handleReaction = async (type: "like" | "upvote") => {
    if (!user?.accessToken || !user?.login) {
      return;
    }

    try {
      const reactionContent = type === "like" ? "HEART" : "THUMBS_UP";
      
      // 클릭 시점의 현재 UI 상태를 기준으로 토글 여부 결정
      const { hasLiked: currentHasLiked, hasUpvoted: currentHasUpvoted } = getUserReactionStates(actualDiscussion.reactions, user.login);
      const isCurrentlyReacted = type === "like" ? currentHasLiked : currentHasUpvoted;

      await toggleReactionMutation.mutateAsync({
        subjectId: discussion.id,
        isReacted: isCurrentlyReacted,
        content: reactionContent
      });

      // 기존 콜백도 호출 (UI 업데이트용)
      if (type === "like" && onLike) {
        onLike(discussion.id);
      }
      if (type === "upvote" && onUpvote) {
        onUpvote(discussion.id);
      }
    } catch (error) {
      console.error("반응 처리 실패:", error);
    }
  };

  const handleCommentUpvote = async (commentId: string) => {
    if (!user?.accessToken || !user?.login) {
      return;
    }

    try {
      const comment = findCommentById(comments, commentId);
      const isCurrentlyReacted = comment ? hasUserReacted(comment.reactions, user.login, "THUMBS_UP") : false;

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
        discussionId: discussion.id,
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
      const isCurrentlyReacted = comment ? hasUserReacted(comment.reactions, user.login, "HEART") : false;

      await toggleReactionMutation.mutateAsync({
        subjectId: commentId,
        isReacted: isCurrentlyReacted,
        content: "HEART"
      });
    } catch (error) {
      console.error("댓글 좋아요 실패:", error);
    }
  };

  // 현재 사용자의 반응 상태와 개수 계산
  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(actualDiscussion.reactions);
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } = getUserReactionStates(actualDiscussion.reactions, user?.login);
  return (
    <div className={postContainer}>
      {/* 헤더: 사용자 정보 */}
      <div className={headerSection}>
        <Avatar
          size="40"
          src={authorInfo.src}
          alt={authorInfo.alt}
          fallback={authorInfo.fallback}
          className={avatarStyles}
        />
        <div className={authorInfoContainer}>
          <h4 className={authorName}>
            {authorInfo.name}
          </h4>
          <div className={authorMeta}>
            <span className={authorHandle}>
              @{authorInfo.username}
            </span>
            <span className={separator}>
              ·
            </span>
            <span className={timeStamp}>
              {formatTimeAgo(actualDiscussion.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className={contentSection}>
        {/* 제목 */}
        <h2 className={postTitle}>
          {actualDiscussion.title}
        </h2>

        {/* 내용 */}
        <div className={contentContainer}>
          <MarkdownRenderer
            content={actualDiscussion.body}
            className={markdownContent}
          />
        </div>
      </div>

      <InteractionButtons
        discussion={actualDiscussion}
        onLike={() => handleReaction("like")}
        onUpvote={() => handleReaction("upvote")}
        hasUserLiked={hasUserLiked}
        hasUserUpvoted={hasUserUpvoted}
        heartCount={heartCount}
        upvoteCount={upvoteCount}
        variant="detail"
      />

      {/* 구분선 */}
      {showComments && (
        <div className={dividerContainer}>
          <div className={dividerLine} />
        </div>
      )}

      {/* 댓글 입력 */}
      {showComments && user && (
        <div className={commentInputSection}>
          <div className={commentInputContainer}>
            <Avatar
              size="40"
              src={user.avatar_url}
              alt={user.login}
              fallback={user.login}
              className={avatarStyles}
            />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 작성해주세요"
              className={commentTextarea}
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
          </div>
          <div className={submitButtonContainer}>
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim() || addCommentMutation.isPending}
              className={submitButton}
            >
              {addCommentMutation.isPending ? "작성중..." : "작성하기"}
            </button>

            {/* 에러 메시지 */}
            {addCommentMutation.isError && (
              <p className={errorMessage}>
                댓글 작성에 실패했습니다. 네트워크 상태를 확인해주세요.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 구분선 */}
      {showComments && (
        <div className={dividerContainerSmall}>
          <div className={dividerLine} />
        </div>
      )}

      {/* 댓글들 */}
      {showComments && (
        <div className={commentsSection}>
          {isDetailLoading ? (
            <div className={loadingCommentsContainer}>
              <p className={loadingCommentsText}>
                댓글을 불러오는 중...
              </p>
            </div>
          ) : (
            <CommentList
              comments={comments}
              onUpvote={handleCommentUpvote}
              onLike={handleCommentLike}
              onReply={handleCommentReply}
            />
          )}
        </div>
      )}
    </div>
  );
}

// Semantic style definitions
const postContainer = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
});

const headerSection = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
});

const avatarStyles = css({
  flexShrink: '0'
});

const authorInfoContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
});

const authorName = css({
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.8)'
});

const authorMeta = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem'
});

const authorHandle = css({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.4)'
});

const separator = css({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.4)'
});

const timeStamp = css({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.4)'
});

const contentSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
});

const postTitle = css({
  fontWeight: '700',
  fontSize: '22px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: '#0F0F0F'
});

const contentContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
});

const markdownContent = css({
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '160%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.8)'
});

const dividerContainer = css({
  paddingY: '1rem'
});

const dividerContainerSmall = css({
  paddingY: '0.5rem'
});

const dividerLine = css({
  width: '100%',
  height: '0',
  borderTop: '1px solid rgba(201, 201, 201, 0.4)'
});

const commentInputSection = css({
  paddingX: '2rem',
  paddingBottom: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
});

const commentInputContainer = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
});

const commentTextarea = css({
  flex: '1',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '160%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.8)',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  resize: 'none',
  minHeight: '24px',
  maxHeight: '120px',
  _placeholder: {
    color: 'rgba(0, 0, 0, 0.2)'
  }
});

const submitButtonContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.5rem'
});

const submitButton = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: '1.5rem',
  paddingY: '18px',
  gap: '10px',
  width: '6rem',
  height: '46px',
  backgroundColor: '#0F0F0F',
  borderRadius: '200px',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: '#FCFCFC',
  transition: 'colors 0.15s ease-in-out',
  border: 'none',
  cursor: 'pointer',
  _hover: {
    backgroundColor: '#333333'
  },
  _disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    cursor: 'not-allowed'
  }
});

const errorMessage = css({
  color: '#ef4444',
  fontSize: '14px',
  fontWeight: '500'
});

const commentsSection = css({
  display: 'flex',
  flexDirection: 'column'
});

const loadingCommentsContainer = css({
  paddingX: '2rem',
  paddingY: '1rem'
});

const loadingCommentsText = css({
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '160%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.4)'
});

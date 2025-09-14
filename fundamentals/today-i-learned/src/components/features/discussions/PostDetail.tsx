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
import { hasUserReacted, getHeartAndUpvoteCounts, getUserReactionStates } from "@/utils/reactions";
import type { GitHubComment } from "@/api/remote/discussions";

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
    <div className="w-full flex flex-col gap-8">
      {/* 헤더: 사용자 정보 */}
      <div className="flex items-center gap-3">
        <Avatar
          size="40"
          src={authorInfo.src}
          alt={authorInfo.alt}
          fallback={authorInfo.fallback}
          className="shrink-0"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80">
            {authorInfo.name}
          </h4>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              @{authorInfo.username}
            </span>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              ·
            </span>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatTimeAgo(actualDiscussion.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex flex-col gap-8">
        {/* 제목 */}
        <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
          {actualDiscussion.title}
        </h2>

        {/* 내용 */}
        <div className="flex flex-col gap-6">
          <MarkdownRenderer
            content={actualDiscussion.body}
            className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80"
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
        <div className="py-4">
          <div className="w-full h-0 border-t border-[rgba(201,201,201,0.4)]" />
        </div>
      )}

      {/* 댓글 입력 */}
      {showComments && user && (
        <div className="px-8 pb-3 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Avatar
              size="40"
              src={user.avatar_url}
              alt={user.login}
              fallback={user.login}
              className="shrink-0"
            />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 작성해주세요"
              className="flex-1 font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 placeholder:text-black/20 bg-transparent border-none outline-none resize-none min-h-[24px] max-h-[120px]"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim() || addCommentMutation.isPending}
              className="flex justify-center items-center px-6 py-[18px] gap-[10px] w-24 h-[46px] bg-[#0F0F0F] hover:bg-[#333333] disabled:bg-black/20 disabled:cursor-not-allowed rounded-[200px] font-bold text-[14px] leading-[130%] tracking-[-0.4px] text-[#FCFCFC] transition-colors"
            >
              {addCommentMutation.isPending ? "작성중..." : "작성하기"}
            </button>

            {/* 에러 메시지 */}
            {addCommentMutation.isError && (
              <p className="text-red-500 text-sm font-medium">
                댓글 작성에 실패했습니다. 네트워크 상태를 확인해주세요.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 구분선 */}
      {showComments && (
        <div className="py-2">
          <div className="w-full h-0 border-t border-[rgba(201,201,201,0.4)]" />
        </div>
      )}

      {/* 댓글들 */}
      {showComments && (
        <div className="flex flex-col">
          {isDetailLoading ? (
            <div className="px-8 py-4">
              <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/40">
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

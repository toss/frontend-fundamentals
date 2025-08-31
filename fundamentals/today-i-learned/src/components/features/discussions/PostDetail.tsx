import { Heart, MessageCircle, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import {
  useDiscussionDetail,
  useAddDiscussionComment,
  useToggleDiscussionReaction
} from "@/api/hooks/useDiscussions";
import { useAuth } from "@/contexts/AuthContext";
import { CommentList } from "@/pages/timeline/components/CommentList";

interface PostDetailProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onUpvote?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  showComments?: boolean;
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
  onComment,
  onUpvote,
  showComments = true
}: PostDetailProps) {
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();

  // GitHub API 훅들
  const { data: discussionDetail, isLoading: isDetailLoading } =
    useDiscussionDetail(discussion.id);
  const addCommentMutation = useAddDiscussionComment();
  const toggleReactionMutation = useToggleDiscussionReaction();

  const actualDiscussion = discussionDetail || discussion;
  const comments = discussionDetail?.comments?.nodes || [];

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
    if (!user?.accessToken) {
      return;
    }

    try {
      const reactionContent = type === "like" ? "HEART" : "THUMBS_UP";
      // TODO: 현재 반응 상태를 확인하는 로직 필요
      const isReacted = false; // 임시값

      await toggleReactionMutation.mutateAsync({
        subjectId: discussion.id,
        isReacted,
        content: reactionContent as any
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
    if (!user?.accessToken) {
      return;
    }

    try {
      await toggleReactionMutation.mutateAsync({
        subjectId: commentId,
        isReacted: false, // TODO: 현재 반응 상태 확인
        content: "THUMBS_UP" as any
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
      await addCommentMutation.mutateAsync({
        discussionId: discussion.id,
        body: content
      });
    } catch (error) {
      console.error("댓글 답글 실패:", error);
    }
  };
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
          <div className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 whitespace-pre-wrap">
            {actualDiscussion.body}
          </div>
        </div>
      </div>

      {/* 상호작용 버튼들 */}
      <div className="flex items-start gap-4 py-2">
        <button
          onClick={() => handleReaction("upvote")}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          disabled={toggleReactionMutation.isPending}
        >
          <div className="w-5 h-5">
            <ChevronUp className="w-full h-full stroke-black/40 stroke-[1.67px]" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(actualDiscussion.reactions.totalCount)}
          </span>
        </button>

        <button
          onClick={() => handleReaction("like")}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          disabled={toggleReactionMutation.isPending}
        >
          <div className="w-5 h-5">
            <Heart className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(actualDiscussion.reactions.totalCount)}
          </span>
        </button>

        <button
          onClick={() => onComment?.(discussion.id)}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
        >
          <div className="w-5 h-5">
            <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(actualDiscussion.comments.totalCount)}
          </span>
        </button>
      </div>

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
          <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim() || addCommentMutation.isPending}
              className="flex justify-center items-center px-6 py-[18px] gap-[10px] w-24 h-[46px] bg-[#0F0F0F] hover:bg-[#333333] disabled:bg-black/20 disabled:cursor-not-allowed rounded-[200px] font-bold text-[14px] leading-[130%] tracking-[-0.4px] text-[#FCFCFC] transition-colors"
            >
              {addCommentMutation.isPending ? "작성중..." : "작성하기"}
            </button>
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
              onReply={handleCommentReply}
            />
          )}
        </div>
      )}
    </div>
  );
}

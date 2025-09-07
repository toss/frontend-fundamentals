import {
  Heart,
  MessageCircle,
  ChevronUp,
  Share,
  Link,
  Linkedin,
  Instagram,
  Facebook
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Card } from "@/components/shared/ui/Card";
import { useWritePostModal } from "@/pages/timeline/hooks/useWritePostModal";
import { PostMoreMenu } from "./PostMoreMenu";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { PostDetailModal } from "@/components/features/discussions/PostDetailModal";
import { formatNumber, formatTimeAgo } from "@/pages/timeline/utils/formatters";
import { usePostActions } from "@/hooks/usePostActions";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useAuth } from "@/contexts/AuthContext";

interface PostCardProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onUpvote?: (postId: string) => void;
  currentUserLogin?: string;
}

export function PostCardSkeleton() {
  return <div className="w-full h-[322px] bg-black/[0.03] rounded-2xl" />;
}

export function PostCard({
  discussion,
  onLike,
  onComment,
  onUpvote,
  currentUserLogin
}: PostCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const { user } = useAuth();

  // Check if current user has reacted
  const hasUserLiked =
    user?.login &&
    discussion.reactions.nodes?.some(
      (reaction) =>
        reaction.user.login === user.login && reaction.content === "HEART"
    );

  const hasUserUpvoted =
    user?.login &&
    discussion.reactions.nodes?.some(
      (reaction) =>
        reaction.user.login === user.login && reaction.content === "THUMBS_UP"
    );

  // Calculate individual reaction counts
  const getReactionCount = (content: string) => {
    return (
      discussion.reactions.nodes?.filter(
        (reaction) => reaction.content === content
      ).length || 0
    );
  };

  const heartCount = getReactionCount("HEART");
  const upvoteCount = getReactionCount("THUMBS_UP");

  // Post actions 훅 사용
  const {
    handleEdit,
    handleDelete,
    canEditPost,
    isUpdating,
    isDeleting,
    isDeleteError
  } = usePostActions({ currentUserLogin });

  // Post reactions 훅 사용
  const {
    handleLike: defaultHandleLike,
    handleComment: defaultHandleComment,
    handleUpvote: defaultHandleUpvote
  } = usePostReactions({ discussion });

  const { openModal, WritePostModal, isOpen } = useWritePostModal({
    onSubmit: async (title, content) => {
      await handleEdit(discussion, { title, body: content });
    },
    isEdit: true,
    initialTitle: discussion.title,
    initialContent: discussion.body
  });

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 수정 모달이 열려있으면 상세 모달을 열지 않음
    if (!isOpen) {
      setIsDetailModalOpen(true);
    }
  };
  return (
    <Card
      variant="bordered"
      padding="none"
      className="w-full cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="flex flex-col p-6 gap-6">
        {/* 헤더: 사용자 정보 */}
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar
              size="40"
              src={discussion.author.avatarUrl}
              alt={discussion.author.login}
              fallback={discussion.author.login}
              className="shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80 truncate">
                  {discussion.author.login}
                </h4>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
                  @{discussion.author.login}
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
                  ·
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
                  {formatTimeAgo(discussion.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* 더보기 메뉴 (본인 글인 경우만) */}
          {canEditPost(discussion) && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostMoreMenu
                onEdit={openModal}
                onDelete={() => handleDelete(discussion)}
                isLoading={isUpdating || isDeleting}
                isDeleteError={isDeleteError}
              />
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-5">
          {/* 제목과 내용 */}
          <div className="flex flex-col gap-5">
            {/* 제목 */}
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] hover:text-gray-700 transition-colors">
              {discussion.title}
            </h2>

            {/* 내용 미리보기 */}
            <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 line-clamp-2 hover:text-black/60 transition-colors">
              {discussion.body}
            </p>
          </div>
        </div>

        {/* 상호작용 버튼들 */}
        <div className="flex items-start gap-4 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onUpvote) {
                onUpvote(discussion.id);
              } else {
                defaultHandleUpvote();
              }
            }}
            className={`flex items-center gap-[6px] hover:opacity-70 transition-all ${
              hasUserUpvoted ? "text-gray-600" : ""
            }`}
          >
            <div className="w-5 h-5">
              <ChevronUp
                className={`w-full h-full stroke-[1.67px] ${
                  hasUserUpvoted ? "stroke-[#979797]" : "stroke-[#979797]"
                }`}
              />
            </div>
            <span
              className={`text-[16px] leading-[130%] tracking-[-0.4px] font-bold ${
                hasUserUpvoted ? "text-[#979797]" : "text-[#979797]"
              }`}
            >
              {formatNumber(upvoteCount)}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onLike) {
                onLike(discussion.id);
              } else {
                defaultHandleLike();
              }
            }}
            className={`flex items-center gap-[6px] hover:opacity-70 transition-all ${
              hasUserLiked ? "text-gray-600" : ""
            }`}
          >
            <div className="w-5 h-5">
              <Heart
                className={`w-full h-full stroke-[1.67px] ${
                  hasUserLiked
                    ? "stroke-[#979797] fill-[#656565]"
                    : "stroke-[#979797] fill-none"
                }`}
              />
            </div>
            <span
              className={`text-[16px] leading-[130%] tracking-[-0.4px] font-semibold ${
                hasUserLiked ? "text-[#979797]" : "text-[#979797]"
              }`}
            >
              {formatNumber(heartCount)}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onComment) {
                onComment(discussion.id);
              } else {
                defaultHandleComment();
              }
            }}
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <MessageCircle className="w-full h-full stroke-[#979797] stroke-[1.67px] fill-none" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
              {formatNumber(discussion.comments.totalCount)}
            </span>
          </button>

          <div
            className="relative"
            onMouseEnter={() => setIsShareMenuOpen(true)}
            onMouseLeave={() => setIsShareMenuOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsShareMenuOpen(!isShareMenuOpen);
              }}
              className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
            >
              <div className="w-5 h-5">
                <Share className="w-full h-full stroke-[#979797] stroke-[1.67px] fill-none" />
              </div>
            </button>

            {/* 공유 드롭다운 메뉴 */}
            {isShareMenuOpen && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex flex-row items-start p-4 gap-2 w-[364px] h-[106px] bg-white rounded-2xl z-50"
                style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)" }}
              >
                {/* 링크 복사 */}
                <div
                  className="flex flex-col items-center p-2 gap-[10px] w-[64px] h-[74px] rounded-xl cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(
                      `${window.location.origin}/discussion/${discussion.id}`
                    );
                    setIsShareMenuOpen(false);
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-[#0F0F0F] rounded-full">
                    <Link className="w-5 h-5 stroke-white stroke-[1.67px]" />
                  </div>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.004em] text-black/80 text-center whitespace-nowrap">
                    링크 복사
                  </span>
                </div>

                {/* 링크드인 */}
                <div className="flex flex-col items-center p-2 gap-[10px] w-[64px] h-[74px] rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#2867B2] rounded-full">
                    <Linkedin className="w-5 h-5 fill-white stroke-none" />
                  </div>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.004em] text-black/80 text-center whitespace-nowrap">
                    링크드인
                  </span>
                </div>

                {/* 카카오톡 */}
                <div className="flex flex-col items-center p-2 gap-[10px] w-[64px] h-[74px] rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#FAE100] rounded-full">
                    <div className="w-5 h-5 bg-[#3C1E1E] rounded-sm flex items-center justify-center text-[#FAE100] font-bold text-xs">
                      톡
                    </div>
                  </div>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.004em] text-black/80 text-center whitespace-nowrap">
                    카카오톡
                  </span>
                </div>

                {/* 인스타그램 */}
                <div className="flex flex-col items-center p-2 gap-[10px] w-[72px] h-[74px] rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-tr from-[#E4405F] via-[#F77737] to-[#FFDC80] rounded-full">
                    <Instagram className="w-5 h-5 stroke-white stroke-[1.67px] fill-none" />
                  </div>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.004em] text-black/80 text-center whitespace-nowrap">
                    인스타그램
                  </span>
                </div>

                {/* 페이스북 */}
                <div className="flex flex-col items-center p-2 gap-[10px] w-[64px] h-[74px] rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#1877F2] rounded-full">
                    <Facebook className="w-5 h-5 fill-white stroke-none" />
                  </div>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.004em] text-black/80 text-center whitespace-nowrap">
                    페이스북
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {WritePostModal}

      <PostDetailModal
        discussion={discussion}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onLike={onLike || (() => defaultHandleLike())}
        onComment={onComment || (() => defaultHandleComment())}
        onUpvote={onUpvote || (() => defaultHandleUpvote())}
      />
    </Card>
  );
}

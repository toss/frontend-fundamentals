import { Heart, MessageCircle, ChevronUp } from "lucide-react";
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

  // Post actions 훅 사용
  const { handleEdit, handleDelete, canEditPost, isUpdating, isDeleting } =
    usePostActions({ currentUserLogin });

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
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  @{discussion.author.login}
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  ·
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
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
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <ChevronUp className="w-full h-full stroke-black/40 stroke-[1.67px]" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(discussion.reactions.totalCount)}
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
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <Heart className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(discussion.reactions.totalCount)}
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
              <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(discussion.comments.totalCount)}
            </span>
          </button>
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

import {
  Heart,
  MessageCircle,
  Share,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card } from "../ui";
import { AlertDialog } from "../ui/AlertDialog";
import { useWritePostModal } from "../hooks/useWritePostModal";
import { PostMoreMenu } from "./PostMoreMenu";
import { PostDetail } from "./PostDetail";
import type { Post } from "../utils/types";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onDelete?: (postId: string) => void;
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

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export function PostCardSkeleton() {
  return <div className="w-full h-[322px] bg-black/[0.03] rounded-2xl" />;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onUpvote,
  onDelete
}: PostCardProps) {
  const navigate = useNavigate();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { openModal, WritePostModal } = useWritePostModal({
    onSubmit: (content) => {
      console.log("Submitting post:", content);
      // 실제로는 API 호출
    }
  });

  const handlePostClick = () => {
    setIsDetailModalOpen(true);
  };
  return (
    <Card variant="bordered" padding="none" className="w-full cursor-pointer" onClick={handlePostClick}>
      <div className="flex flex-col p-6 gap-6">
        {/* 헤더: 사용자 정보 */}
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar
              size="40"
              src={post.author.avatar}
              alt={post.author.name}
              fallback={post.author.name}
              className="shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80 truncate">
                  {post.author.name}
                </h4>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  @{post.author.username}
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  ·
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  {formatTimeAgo(post.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* 더보기 메뉴 (본인 글인 경우만) */}
          {post.isOwn && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostMoreMenu
                onEdit={openModal}
                onDelete={() => onDelete?.(post.id)}
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
              {post.title}
            </h2>

            {/* 내용 미리보기 */}
            <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 line-clamp-2 hover:text-black/60 transition-colors">
              {post.content}
            </p>
          </div>
        </div>

        {/* 상호작용 버튼들 */}
        <div className="flex items-start gap-4 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(post.id);
            }}
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <ChevronUp className="w-full h-full stroke-black/40 stroke-[1.67px]" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(post.stats.upvotes)}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <Heart className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(post.stats.hearts)}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onComment(post.id);
            }}
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(post.stats.comments)}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(post.id);
            }}
            className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
          >
            <div className="w-5 h-5">
              <Share className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
            </div>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatNumber(post.stats.shares)}
            </span>
          </button>
        </div>
      </div>
      {WritePostModal}
      
      {/* 글 상세 모달 */}
      <AlertDialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <AlertDialog.Content 
          showCloseButton
          className="w-[800px] h-[1080px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center px-6 pb-6 pt-0 overflow-hidden"
        >
          <div className="w-full h-full overflow-y-auto py-6">
            <PostDetail
              post={post}
              onLike={onLike}
              onComment={onComment}
              onShare={onShare}
              onUpvote={onUpvote}
              onDelete={onDelete}
              onEdit={openModal}
              showComments={true}
            />
          </div>
        </AlertDialog.Content>
      </AlertDialog>
    </Card>
  );
}

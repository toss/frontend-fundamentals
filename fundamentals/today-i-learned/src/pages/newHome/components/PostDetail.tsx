import {
  Heart,
  MessageCircle,
  Share,
  ChevronUp
} from "lucide-react";
import { Avatar } from "../ui";
import { PostMoreMenu } from "./PostMoreMenu";
import type { Post } from "../utils/types";

interface PostDetailProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: () => void;
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

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export function PostDetail({
  post,
  onLike,
  onComment,
  onShare,
  onUpvote,
  onDelete,
  onEdit,
  showComments = true
}: PostDetailProps) {
  return (
    <div className="w-full flex flex-col gap-6">
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
        {post.isOwn && onEdit && (
          <PostMoreMenu
            onEdit={onEdit}
            onDelete={() => onDelete?.(post.id)}
          />
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-col gap-5">
        {/* 제목 */}
        <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
          {post.title}
        </h2>

        {/* 전체 내용 */}
        <div className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* 상호작용 버튼들 */}
      <div className="flex items-start gap-4 pt-2">
        <button
          onClick={() => onUpvote(post.id)}
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
          onClick={() => onLike(post.id)}
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
          onClick={() => onComment(post.id)}
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
          onClick={() => onShare(post.id)}
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

      {/* 댓글 섹션 */}
      {showComments && (
        <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-[18px] leading-[130%] tracking-[-0.4px] text-black">
            댓글 {formatNumber(post.stats.comments)}
          </h3>
          
          {/* 댓글 입력 */}
          <div className="flex gap-3">
            <Avatar
              size="32"
              src="/default-avatar.png"
              alt="User"
              fallback="U"
              className="shrink-0"
            />
            <div className="flex-1">
              <textarea
                placeholder="댓글을 작성하세요..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none font-medium text-[14px] leading-[160%] tracking-[-0.4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-black text-white rounded-lg font-bold text-[14px] hover:bg-black/90 transition-colors">
                  댓글달기
                </button>
              </div>
            </div>
          </div>

          {/* 기존 댓글들 (예시) */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Avatar
                size="32"
                src="/default-avatar.png"
                alt="User Han"
                fallback="UH"
                className="shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-[14px] leading-[130%] tracking-[-0.4px] text-black/80">
                    User Han
                  </span>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.4px] text-black/40">
                    @user1234
                  </span>
                  <span className="font-semibold text-[12px] leading-[130%] tracking-[-0.4px] text-black/40">
                    22시간 전
                  </span>
                </div>
                <p className="font-medium text-[14px] leading-[160%] tracking-[-0.4px] text-black/80">
                  정말 도움이 되는 글이네요! 감사합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
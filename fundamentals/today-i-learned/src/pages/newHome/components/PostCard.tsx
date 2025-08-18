import {
  Heart,
  MessageCircle,
  Share,
  ChevronUp,
  MoreHorizontal
} from "lucide-react";
import { Avatar, Button, Card } from "../ui";
import type { Post } from "../utils/types";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
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
  return (
    <div className="w-full h-[322px] bg-black/[0.03] rounded-2xl" />
  );
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onUpvote
}: PostCardProps) {
  return (
    <Card variant="bordered" padding="none" className="w-full">
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
            <Button variant="ghost" size="sm" className="shrink-0 p-2">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </Button>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-5">
          {/* 태그들 */}
          <div className="flex items-center gap-[6px] flex-wrap">
            <div className="inline-flex items-center justify-center px-[14px] py-[10px] bg-black/5 rounded-[200px]">
              <span className="font-bold text-[14px] leading-[160%] tracking-[-0.4px] text-black/40">
                {post.category}
              </span>
            </div>
            {post.tags.map((tag) => {
              // 태그별 색상 매핑
              const getTagStyle = (tagName: string) => {
                if (tagName.includes("성지"))
                  return "bg-[rgba(188,233,233,0.4)] text-[#58C7C7]";
                if (tagName.includes("Ongoing"))
                  return "bg-[rgba(237,204,248,0.4)] text-[#DA9BEF]";
                if (tagName.includes("가독성"))
                  return "bg-[rgba(255,212,214,0.4)] text-[#FB8890]";
                if (tagName.includes("결합도"))
                  return "bg-green-100 text-green-700";
                if (tagName.includes("기여") || tagName.includes("설계"))
                  return "bg-orange-100 text-orange-700";
                if (tagName.includes("Changes"))
                  return "bg-yellow-100 text-yellow-700";
                return "bg-gray-100 text-gray-600";
              };

              return (
                <div
                  key={tag}
                  className={`inline-flex items-center justify-center px-[10px] py-[10px] rounded-[8px] ${getTagStyle(tag)}`}
                >
                  <span className="font-bold text-[14px] leading-[130%] tracking-[-0.4px]">
                    {tag}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 제목과 내용 */}
          <div className="flex flex-col gap-5">
            {/* 제목 */}
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
              {post.title}
            </h2>

            {/* 내용 미리보기 */}
            <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 line-clamp-2">
              {post.content}
            </p>
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
      </div>
    </Card>
  );
}

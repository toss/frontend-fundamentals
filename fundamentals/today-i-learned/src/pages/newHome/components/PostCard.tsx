import {
  Heart,
  MessageCircle,
  Share,
  ChevronUp,
  MoreHorizontal,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Button, Card } from "../ui";
import { AlertDialog } from "../ui/AlertDialog";
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
  return <div className="w-full h-[322px] bg-black/[0.03] rounded-2xl" />;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onUpvote
}: PostCardProps) {
  const navigate = useNavigate();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [content, setContent] = useState("");

  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      console.log("Submitting post:", content);
      // 실제로는 API 호출
      setContent("");
      setIsWriteModalOpen(false);
    }
  };
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
            <AlertDialog
              open={isWriteModalOpen}
              onOpenChange={setIsWriteModalOpen}
            >
              <AlertDialog.Trigger asChild>
                <Button variant="ghost" size="sm" className="shrink-0 p-2">
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </Button>
              </AlertDialog.Trigger>

              <AlertDialog.Content className="flex flex-col max-w-[800px]">
                {/* Header with close button */}
                <div className="flex justify-end p-6 pb-0">
                  <AlertDialog.Cancel asChild>
                    <button className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors">
                      <X className="w-[14.72px] h-[14.72px]" />
                    </button>
                  </AlertDialog.Cancel>
                </div>

                {/* Main content */}
                <div className="flex px-6 pb-6 gap-6 flex-1 min-h-0">
                  {/* Profile Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-[60px] h-[60px] rounded-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face)"
                      }}
                    />
                  </div>

                  {/* Content area */}
                  <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <div className="mb-6">
                      <AlertDialog.Title className="text-[22px] font-bold leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
                        오늘 배운 내용을 기록해 보세요
                      </AlertDialog.Title>
                    </div>

                    {/* Text area */}
                    <div className="flex-1 mb-6">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="## 오늘 한 일&#10;- [X] 블로그 초안 쓰기&#10;- [ ] 커밋 푸시하기&#10;&#10;오늘 이만큼이나 했어요! 짱이죠?"
                        className="w-full h-full resize-none border-none outline-none text-[16px] font-medium leading-[160%] tracking-[-0.4px] text-[#0F0F0F] placeholder:text-[#0F0F0F]/40 bg-transparent"
                        style={{
                          fontFamily:
                            "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                        }}
                      />
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-end">
                      <AlertDialog.Action asChild>
                        <button
                          onClick={handleSubmit}
                          disabled={!content.trim()}
                          className="flex items-center justify-center px-6 py-[18px] bg-black/20 hover:bg-black/30 disabled:bg-black/10 disabled:cursor-not-allowed rounded-full transition-colors"
                        >
                          <span className="text-[14px] font-bold leading-[130%] tracking-[-0.4px] text-[#FCFCFC]">
                            작성하기
                          </span>
                        </button>
                      </AlertDialog.Action>
                    </div>
                  </div>
                </div>
              </AlertDialog.Content>
            </AlertDialog>
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
          <div
            className="flex flex-col gap-5 cursor-pointer"
            onClick={handlePostClick}
          >
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

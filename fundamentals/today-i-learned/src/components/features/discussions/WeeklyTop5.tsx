import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ExternalLink } from "lucide-react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { useWeeklyTopDiscussions } from "@/api/hooks/useDiscussions";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { PostDetail } from "@/pages/newHome/components/PostDetail";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";

interface WeeklyTop5Props {
  onPostClick?: (postId: string) => void;
}

function getWeekLabel(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - daysToSubtract);

  const month = weekStart.getMonth() + 1;
  const weekOfMonth = Math.ceil(weekStart.getDate() / 7);

  return `${month}월 ${weekOfMonth}째주 인기글`;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}


function PopularPostItem({
  post,
  rank,
  onPostClick
}: {
  post: any;
  rank: number;
  onPostClick: (postId: string, discussion: GitHubDiscussion) => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    onPostClick(post.id, post);
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center pt-2.5">
        <span className="text-lg font-extrabold text-black/40 tracking-tight leading-tight">
          {rank}
        </span>
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="flex-1 flex flex-col justify-end py-5 px-6 bg-white border border-gray-300/50 rounded-2xl transition-all duration-200 text-left group min-h-[136px] relative"
      >
        <button
          onClick={handleExternalClick}
          className="absolute top-3 right-3 p-1 text-black/40 hover:text-black/60 transition-colors"
        >
          <ExternalLink size={14} />
        </button>

        <div className="flex items-center gap-1.5 mb-3">
          <Avatar
            size="20"
            src={post.author.avatarUrl}
            alt={post.author.login}
            fallback={post.author.login}
            className="shrink-0"
          />
          <span className="text-base font-bold text-black/60 tracking-tight truncate">
            {post.author.login}
          </span>
        </div>

        <h4 className="font-bold text-lg text-[#0F0F0F] leading-tight tracking-tight group-hover:text-gray-700 transition-colors line-clamp-1 mb-3">
          {post.title}
        </h4>

        <p className="text-base font-medium text-black/80 leading-relaxed tracking-tight line-clamp-1">
          {truncateText(post.body.replace(/[#*`\n]/g, " ").trim(), 100)}
        </p>
      </button>
    </div>
  );
}

export function WeeklyTop5({ onPostClick }: WeeklyTop5Props) {
  const [selectedPost, setSelectedPost] = useState<GitHubDiscussion | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: discussions, isLoading } = useWeeklyTopDiscussions({
    limit: 5
  });

  const weekText = getWeekLabel();

  const handlePostClick = (postId: string, discussion: GitHubDiscussion) => {
    setSelectedPost(discussion);
    setIsDetailModalOpen(true);
    onPostClick?.(postId);
  };

  const handleLike = (postId: string) => {
    console.log("Like post:", postId);
  };

  const handleComment = (postId: string) => {
    console.log("Comment on post:", postId);
  };


  const handleUpvote = (postId: string) => {
    console.log("Upvote post:", postId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-black tracking-tight">
            주간 Top 5
          </h3>
          <p className="text-base font-semibold text-black/60 tracking-tight">
            {weekText}
          </p>
        </div>
        <div className="space-y-4">
          {[...new Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-[136px] bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!discussions?.length) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-black tracking-tight">
            주간 Top 5
          </h3>
          <p className="text-base font-semibold text-black/60 tracking-tight">
            {weekText}
          </p>
        </div>
        <div className="text-center py-8 text-gray-500">
          이번주 인기글이 없습니다
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-black tracking-tight">
            주간 Top 5
          </h3>
          <p className="text-base font-semibold text-black/60 tracking-tight">
            {weekText}
          </p>
        </div>

        <div className="space-y-4">
          {discussions.map((discussion, index) => (
            <PopularPostItem
              key={discussion.id}
              post={discussion}
              rank={index + 1}
              onPostClick={handlePostClick}
            />
          ))}
        </div>
      </div>

      {/* 글 상세 모달 */}
      {selectedPost && (
        <AlertDialog
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        >
          <AlertDialog.Content className="w-[800px] h-[1080px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center pt-0 px-0 pb-6 overflow-hidden isolate">
            {/* Header with buttons */}
            <div className="flex flex-row justify-end items-start p-6 gap-4 w-[800px] h-[68px] bg-[#FCFCFC] flex-none">
              {/* 상세 페이지로 이동 버튼 */}
              <button
                className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/post/${selectedPost.id}`, "_blank");
                }}
              >
                <ExternalLink className="w-[14.72px] h-[14.72px]" />
              </button>

              {/* X 닫기 버튼 */}
              <button
                className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDetailModalOpen(false);
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* 본문 영역 */}
            <div className="w-[800px] h-[696px] px-6 z-[1] overflow-y-auto">
              <PostDetail
                discussion={selectedPost}
                onLike={handleLike}
                onComment={handleComment}
                onUpvote={handleUpvote}
                showComments={true}
              />
            </div>
          </AlertDialog.Content>
        </AlertDialog>
      )}
    </>
  );
}

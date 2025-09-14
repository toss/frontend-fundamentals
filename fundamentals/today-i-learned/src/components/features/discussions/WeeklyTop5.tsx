import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/shared/ui/Avatar";
import { useWeeklyTopDiscussions } from "@/api/hooks/useDiscussions";

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

function PopularPostItem({ post, rank }: { post: any; rank: number }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center pt-2.5">
        <span className="text-lg font-bold text-black/40 tracking-tight leading-tight">
          {rank}
        </span>
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="flex-1 flex flex-col justify-end py-5 px-6 bg-white border border-gray-300/50 rounded-2xl transition-all duration-200 text-left group min-h-[136px] relative"
      >
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

export function WeeklyTop5() {
  const { data: discussions, isLoading } = useWeeklyTopDiscussions({
    limit: 5
  });

  const weekText = getWeekLabel();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-black tracking-tight">
            주간 TOP 5
          </h3>
          <p className="text-base font-semibold text-black/60 tracking-tight">
            {weekText}
          </p>
        </div>
        <div className="space-y-4">
          {[...new Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-[136px] bg-gray-100 rounded-2xl animate-pulse w-full"
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
          <h3 className="text-2xl font-bold text-black tracking-tight">
            주간 TOP 5
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
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-black tracking-tight">
          주간 TOP 5
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
          />
        ))}
      </div>
    </div>
  );
}

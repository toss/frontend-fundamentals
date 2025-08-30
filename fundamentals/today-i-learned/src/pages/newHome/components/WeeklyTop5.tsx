import { useNavigate } from "react-router-dom";
import { getCurrentWeekInfo } from "../../../libs/date";
import { Avatar } from "../ui";
import type { PopularPost, WeeklyTop5Props } from "../utils/types";

function PopularPostItem({
  post,
  rank
}: {
  post: PopularPost;
  rank: number;
  onPostClick: (postId: string) => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="flex items-start gap-3">
      {/* 순위 - 왼쪽에 별도 배치 */}
      <div className="flex items-center pt-2.5">
        <span className="text-lg font-extrabold text-black/40 tracking-tight leading-tight">
          {rank}
        </span>
      </div>

      {/* 카드 콘텐츠 */}
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 flex flex-col justify-end py-5 px-6 bg-white border border-gray-300/50 rounded-2xl transition-all duration-200 text-left group min-h-[136px]"
      >
        {/* 사용자 정보 */}
        <div className="flex items-center gap-1.5 mb-3">
          <Avatar
            size="20"
            src={post.author.avatar}
            alt={post.author.name}
            fallback={post.author.name}
            className="shrink-0"
          />
          <span className="text-base font-bold text-black/60 tracking-tight truncate">
            {post.author.name}
          </span>
        </div>

        {/* 제목 */}
        <h4 className="font-bold text-lg text-[#0F0F0F] leading-tight tracking-tight group-hover:text-gray-700 transition-colors line-clamp-1 mb-3">
          {post.title}
        </h4>

        {/* 요약 */}
        <p className="text-base font-medium text-black/80 leading-relaxed tracking-tight line-clamp-1">
          {post.excerpt}
        </p>
      </button>
    </div>
  );
}

export function WeeklyTop5({ posts, onPostClick }: WeeklyTop5Props) {
  const weekText = getCurrentWeekInfo();

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold text-black tracking-tight">
          주간 Top 5
        </h3>
        <p className="text-base font-semibold text-black/60 tracking-tight">
          {weekText} 인기글
        </p>
      </div>

      {/* 포스트 리스트 */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PopularPostItem
            key={post.id}
            post={post}
            rank={post.rank}
            onPostClick={onPostClick}
          />
        ))}
      </div>
    </div>
  );
}

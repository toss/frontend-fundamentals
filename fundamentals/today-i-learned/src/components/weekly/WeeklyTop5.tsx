import { useWeeklyTopDiscussions } from "@/api/hooks/useDiscussions";

interface CardProps {
  children: React.ReactNode;
}

interface HeaderProps {
  title: string;
  subtitle: string;
}

interface SkeletonItemProps {
  index: number;
}

interface PostItemProps {
  post: {
    id: string;
    rank: number;
    author: string;
    title: string;
    description: string;
    avatarUrl: string;
    reactionsCount: number;
    commentsCount: number;
  };
}

// 기본 카드 컨테이너
function Card({ children }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
      {children}
    </div>
  );
}

// 헤더 컴포넌트
function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </span>
    </div>
  );
}

// 로딩 스켈레톤 아이템
function SkeletonItem({ index }: SkeletonItemProps) {
  return (
    <div key={index} className="flex items-start gap-2">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
      <div className="flex-1 min-w-0">
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-1"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-1"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
      </div>
    </div>
  );
}

// 순위 뱃지
function RankBadge({ rank }: { rank: number }) {
  return (
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
        {rank}
      </span>
    </div>
  );
}

// 사용자 정보
function UserInfo({
  avatarUrl,
  author,
  reactionsCount,
  commentsCount
}: {
  avatarUrl: string;
  author: string;
  reactionsCount: number;
  commentsCount: number;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-0.5">
      <img src={avatarUrl} alt={author} className="w-3 h-3 rounded-full" />
      <span className="text-xs text-gray-600 dark:text-gray-400">{author}</span>
      {(reactionsCount > 0 || commentsCount > 0) && (
        <span className="text-xs text-gray-400 dark:text-gray-500">
          👍 {reactionsCount} 💬 {commentsCount}
        </span>
      )}
    </div>
  );
}

// 포스트 제목
function PostTitle({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight mb-0.5">
      {title}
    </h3>
  );
}

// 포스트 설명
function PostDescription({ description }: { description: string }) {
  return (
    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 leading-tight">
      {description}
    </p>
  );
}

// 포스트 아이템
function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-start gap-2">
      <RankBadge rank={post.rank} />
      <div className="flex-1 min-w-0">
        <UserInfo
          avatarUrl={post.avatarUrl}
          author={post.author}
          reactionsCount={post.reactionsCount}
          commentsCount={post.commentsCount}
        />
        <PostTitle title={post.title} />
        <PostDescription description={post.description} />
      </div>
    </div>
  );
}

// 빈 상태
function EmptyState() {
  return (
    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
      이번주 인기글이 없습니다
    </div>
  );
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

export function WeeklyTop5() {
  const {
    data: discussions,
    isLoading,
    error
  } = useWeeklyTopDiscussions({ limit: 5 });

  if (isLoading) {
    return (
      <Card>
        <Header title="Weekly Top 5" subtitle={getWeekLabel()} />
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <SkeletonItem key={index} index={index} />
          ))}
        </div>
      </Card>
    );
  }

  if (error || !discussions?.length) {
    return (
      <Card>
        <Header title="Weekly Top 5" subtitle={getWeekLabel()} />
        <EmptyState />
      </Card>
    );
  }

  const weeklyTopPosts = discussions.map((discussion, index) => ({
    id: discussion.id,
    rank: index + 1,
    author: discussion.author.login,
    title: discussion.title,
    description: truncateText(
      discussion.body.replace(/[#*`\n]/g, " ").trim(),
      50
    ),
    avatarUrl: discussion.author.avatarUrl,
    reactionsCount: discussion.reactions.totalCount,
    commentsCount: discussion.comments.totalCount
  }));

  return (
    <Card>
      <Header title="Weekly Top 5" subtitle={getWeekLabel()} />
      <div className="space-y-2">
        {weeklyTopPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </Card>
  );
}

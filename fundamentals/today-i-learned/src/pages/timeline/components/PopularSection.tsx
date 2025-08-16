import { useState, useEffect } from "react";
import { usePopularDiscussions } from "@/api/hooks/useDiscussions";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { useToggleReaction } from "@/api/hooks/useReactions";
import { cn } from "@/lib/utils";

interface PopularSectionProps {
  onCardClick?: (id: string) => void;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

function PopularSectionError() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 text-center">
          <p className="text-red-600 dark:text-red-400">
            인기 게시물을 불러오는데 실패했습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function PopularSectionLoading() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#ff8a80] border-t-transparent"></div>
            <span className="text-gray-600 dark:text-gray-400">
              인기 게시물 불러오는중...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularSectionEmpty() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            아직 인기 게시물이 없습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function PopularCarousel({
  discussions,
  onCardClick,
  onLike,
  onComment
}: {
  discussions: GitHubDiscussion[];
  onCardClick?: (id: string) => void;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toggleLike } = useToggleReaction();

  const currentDiscussion = discussions[currentIndex];

  const AUTO_SLIDE_INTERVAL = 7000; // 7초

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? discussions.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === discussions.length - 1 ? 0 : prev + 1));
  };

  // 자동 슬라이드 기능
  useEffect(() => {
    if (discussions.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [discussions.length]);

  const handleLike = async () => {
    if (!currentDiscussion) return;

    try {
      await toggleLike(currentDiscussion.id, false); // 일단 false로 고정
      onLike?.(currentDiscussion.id);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  if (!currentDiscussion) return null;

  return (
    <div className="relative">
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 shadow-md hover:bg-white hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
        onClick={goToPrevious}
        aria-label="이전 인기 게시물"
      >
        ❮
      </button>

      <div
        className="cursor-pointer rounded-lg bg-gradient-to-r from-[#ff8a80]/5 to-[#ff5722]/5 border border-[#ff8a80]/20 dark:border-[#ff8a80]/30 p-6 transition-all hover:shadow-lg hover:scale-[1.02]"
        onClick={() => onCardClick?.(currentDiscussion.id)}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src={currentDiscussion.author.avatarUrl}
              alt={`${currentDiscussion.author.login}님의 프로필`}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-medium text-gray-900 dark:text-white">
              {currentDiscussion.author.login}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {currentDiscussion.category.name}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {currentDiscussion.title}
          </h3>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-[#ff8a80] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onComment?.(currentDiscussion.id);
              }}
            >
              <span>💬</span>
              <span className="text-sm">
                {currentDiscussion.comments.totalCount}
              </span>
            </button>
            <button
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              <span>🤍</span>
              <span className="text-sm">
                {currentDiscussion.reactions.totalCount}
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {discussions.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === currentIndex
                  ? "bg-[#ff8a80] w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400 shadow-md hover:bg-white hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
        onClick={goToNext}
        aria-label="다음 인기 게시물"
      >
        ❯
      </button>
    </div>
  );
}

export function PopularSection({
  onCardClick,
  onLike,
  onComment
}: PopularSectionProps) {
  const { data: discussions, isLoading, error } = usePopularDiscussions();

  if (error) {
    return <PopularSectionError />;
  }

  if (isLoading) {
    return <PopularSectionLoading />;
  }

  const hasNoDiscussions = !discussions || discussions.length === 0;
  if (hasNoDiscussions) {
    return <PopularSectionEmpty />;
  }

  return (
    <section className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          인기 게시글
        </h3>
        <PopularCarousel
          discussions={discussions}
          onCardClick={onCardClick}
          onLike={onLike}
          onComment={onComment}
        />
      </div>
    </section>
  );
}

import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useUserHallOfFame } from "@/pages/profile/hooks/useUserHallOfFame";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";

import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";

interface HallOfFameSectionProps extends BaseComponentProps {}

export function HallOfFameSection({ className }: HallOfFameSectionProps) {
  const { handleApiError } = useErrorHandler();

  const {
    userProfile,
    displayedPosts,
    isLoading,
    error,
    isExpanded,
    showToggleButton,
    isFetchingNextPage,
    handleToggleExpand,
    refetch
  } = useUserHallOfFame();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8 w-full">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            명예의 전당을 불러올 수 없습니다
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
          <button
            onClick={() => {
              refetch().catch((error) =>
                handleApiError(error, "명예의 전당 재시도")
              );
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      );
    }

    if (!isLoading && userProfile && displayedPosts.length === 0) {
      return (
        <div className="text-center py-12 w-full">
          <p className="text-black/60 font-medium">
            아직 명예의 전당에 등록된 글이 없습니다.
          </p>
        </div>
      );
    }

    if (displayedPosts.length > 0) {
      return (
        <>
          {/* 글 목록 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {displayedPosts.map((discussion) => (
              <PostCard
                key={discussion.id}
                discussion={discussion}
                onLike={(postId) => console.log("Like:", postId)}
                onUpvote={(postId) => console.log("Upvote:", postId)}
                currentUserLogin={userProfile?.login}
              />
            ))}
          </div>

          {/* 더보기/접기 버튼 */}
          {showToggleButton && (
            <button
              onClick={handleToggleExpand}
              disabled={isFetchingNextPage}
              className="flex items-center justify-center px-4 py-[18px] w-full h-[60px] border border-[rgba(201,201,201,0.5)] rounded-xl hover:bg-black/5 transition-colors disabled:opacity-50"
              style={{
                boxSizing: "border-box"
              }}
            >
              <span className="font-bold text-[18px] leading-[22px] text-[#0F0F0F]">
                {isExpanded ? "접기" : "더보기"}
              </span>
            </button>
          )}

          {/* 추가 로딩 */}
          {isFetchingNextPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
              {Array.from({ length: 2 }).map((_, index) => (
                <PostCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}
        </>
      );
    }

    return (
      <div className="text-center py-12 w-full">
        <p className="text-black/60 font-medium">
          명예의 전당을 불러오는 중...
        </p>
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col items-start gap-4", className)}>
      {/* 헤더 */}
      <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
        명예의 전당
      </h2>

      {renderContent()}
    </div>
  );
}

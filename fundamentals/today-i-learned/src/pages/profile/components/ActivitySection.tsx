import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useUserActivity } from "../hooks/useUserActivity";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { ChevronDown } from "lucide-react";
import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";

interface ActivitySectionProps extends BaseComponentProps {}

export function ActivitySection({ className }: ActivitySectionProps) {
  const { handleApiError } = useErrorHandler();

  const {
    userProfile,
    userPosts,
    isLoading,
    error,
    sortFilter,
    hasNextPage,
    isFetchingNextPage,
    elementRef,
    handleFilterToggle,
    handleComment,
    refetch
  } = useUserActivity();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            글을 불러올 수 없습니다
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
          <button
            onClick={() => {
              refetch().catch((error) =>
                handleApiError(error, "활동 목록 재시도")
              );
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      );
    }

    if (!isLoading && userProfile && userPosts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-black/60 font-medium">
            아직 작성한 글이 없습니다.
          </p>
        </div>
      );
    }

    if (userPosts.length > 0) {
      return (
        <>
          <div className="space-y-4">
            {userPosts.map((discussion) => (
              <PostCard
                key={discussion.id}
                discussion={discussion}
                onLike={(postId) => console.log("Like:", postId)}
                onComment={handleComment}
                onUpvote={(postId) => console.log("Upvote:", postId)}
                onDelete={(postId) => console.log("Delete:", postId)}
                currentUserLogin={userProfile?.login}
              />
            ))}
          </div>

          {hasNextPage && (
            <div
              ref={elementRef}
              className="flex items-center justify-center py-4"
            >
              {isFetchingNextPage && (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <PostCardSkeleton key={`loading-${index}`} />
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasNextPage && userPosts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-black/40 font-medium text-sm">
                모든 글을 불러왔습니다.
              </p>
            </div>
          )}
        </>
      );
    }

    return (
      <div className="text-center py-12">
        <p className="text-black/60 font-medium">글을 불러오는 중...</p>
      </div>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* 헤더와 필터 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
              활동
            </h2>
          </div>

          {/* 필터 버튼 */}
          <button
            onClick={handleFilterToggle}
            className="flex items-center justify-center gap-[6px] h-10 border border-black/8 rounded-lg text-sm font-semibold transition-colors bg-white text-black/60 hover:bg-black/5"
            style={{
              boxSizing: "border-box",
              paddingLeft: "15px",
              paddingRight: "18px",
              paddingTop: "12px",
              paddingBottom: "12px",
              minWidth: sortFilter === "created" ? "117px" : "140px"
            }}
          >
            <ChevronDown className="w-4 h-4" />
            {sortFilter === "created" ? "새로 올라온" : "새로 업데이트됨"}
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

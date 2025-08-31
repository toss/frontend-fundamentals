import { useState, useMemo, useEffect } from "react";
import { useUserProfile } from "@/api/hooks/useUser";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { ChevronDown } from "lucide-react";
import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";
import { PAGE_SIZE } from "@/constants/github";

interface ActivitySectionProps extends BaseComponentProps {}

type SortFilter = "created" | "lastActivity";

export function ActivitySection({ className }: ActivitySectionProps) {
  const { data: userProfile } = useUserProfile();
  const [sortFilter, setSortFilter] = useState<SortFilter>("created");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteDiscussions({
    categoryName: "Today I Learned",
    pageSize: PAGE_SIZE.DEFAULT
  });

  const { elementRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const userPosts = useMemo(() => {
    if (!userProfile?.login || !data) {
      return [];
    }

    const allDiscussions = data.pages.flatMap((page) => page.discussions);
    const filteredPosts = allDiscussions.filter(
      (discussion) => discussion.author.login === userProfile.login
    );

    // 클라이언트에서 정렬 처리
    return filteredPosts.sort((a, b) => {
      if (sortFilter === "created") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    });
  }, [data, userProfile?.login, sortFilter]);

  // 디버깅을 위한 콘솔 로그
  console.log("ActivitySection Debug:", {
    userProfile: userProfile?.login,
    data: data?.pages?.length,
    totalDiscussions:
      data?.pages?.reduce((acc, page) => acc + page.discussions.length, 0) || 0,
    userPosts: userPosts.length,
    isLoading,
    error: error?.message
  });

  const handleFilterToggle = () => {
    const newFilter = sortFilter === "created" ? "lastActivity" : "created";
    setSortFilter(newFilter);
  };

  const handleComment = () => {
    // TODO: 댓글 페이지로 이동 또는 댓글 모달 열기
  };

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
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      );
    }

    if (!isLoading && data && userProfile && userPosts.length === 0) {
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

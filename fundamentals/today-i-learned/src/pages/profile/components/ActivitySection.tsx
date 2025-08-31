import { useState, useMemo, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { ChevronDown } from "lucide-react";
import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";

interface ActivitySectionProps extends BaseComponentProps {}

type SortFilter = "created" | "lastActivity";

export function ActivitySection({ className }: ActivitySectionProps) {
  const { user } = useAuth();
  const [sortFilter, setSortFilter] = useState<SortFilter>("created");
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteDiscussions({
      pageSize: 10,
      sortBy: sortFilter === "created" ? "created" : "lastActivity",
      enabled: !!user?.login
    });

  // 로그인한 사용자의 글만 필터링
  const userPosts = useMemo(() => {
    if (!data?.pages || !user?.login) return [];

    return data.pages
      .flatMap((page) => page.discussions)
      .filter((discussion) => discussion.author.login === user.login);
  }, [data?.pages, user?.login]);

  // 무한스크롤 observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleFilterChange = (filter: SortFilter) => {
    setSortFilter(filter);
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* 헤더 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </span>
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
              활동
            </h2>
          </div>
        </div>

        {/* 스켈레톤 */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

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

          {/* 필터 버튼들 */}
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange("created")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                sortFilter === "created"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/60 hover:bg-black/10"
              )}
            >
              <ChevronDown className="w-4 h-4" />
              새로 추가됨
            </button>
            <button
              onClick={() => handleFilterChange("lastActivity")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                sortFilter === "lastActivity"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/60 hover:bg-black/10"
              )}
            >
              <ChevronDown className="w-4 h-4" />
              새로 업데이트됨
            </button>
          </div>
        </div>
      </div>

      {userPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-black/60 font-medium">
            아직 작성한 글이 없습니다.
          </p>
        </div>
      ) : (
        <>
          {/* 글 목록 */}
          <div className="space-y-4">
            {userPosts.map((discussion) => (
              <PostCard
                key={discussion.id}
                discussion={discussion}
                onLike={(postId) => console.log("Like:", postId)}
                onComment={(postId) => console.log("Comment:", postId)}
                onUpvote={(postId) => console.log("Upvote:", postId)}
                onDelete={(postId) => console.log("Delete:", postId)}
              />
            ))}
          </div>

          {/* 무한스크롤 트리거 */}
          <div ref={observerRef} className="h-4" />

          {/* 로딩 스켈레톤 */}
          {isFetchingNextPage && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <PostCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}

          {/* 더 이상 불러올 글이 없을 때 */}
          {!hasNextPage && userPosts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-black/40 font-medium text-sm">
                모든 글을 불러왔습니다.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

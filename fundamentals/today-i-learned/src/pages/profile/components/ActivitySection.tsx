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
import { mockActivityPosts } from "./__mockdata__/ActivityMockData";

interface ActivitySectionProps extends BaseComponentProps {}

type SortFilter = "created" | "lastActivity";

export function ActivitySection({ className }: ActivitySectionProps) {
  const { user } = useAuth();
  const [sortFilter, setSortFilter] = useState<SortFilter>("created");
  const observerRef = useRef<HTMLDivElement>(null);

  // 임시로 Mock 데이터 사용을 위해 주석 처리
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteDiscussions({
  //     pageSize: 10,
  //     sortBy: sortFilter === "created" ? "created" : "lastActivity",
  //     enabled: !!user?.login
  //   });

  // Mock 데이터 사용을 위한 임시 값들
  const isLoading = false;
  const isFetchingNextPage = false;
  const hasNextPage = mockActivityPosts.length > 10;
  const fetchNextPage = () => {};

  // 로그인한 사용자의 글만 필터링 (임시로 Mock 데이터 사용)
  const userPosts = useMemo(() => {
    // 정렬에 따라 Mock 데이터 정렬
    const sortedPosts = [...mockActivityPosts].sort((a, b) => {
      if (sortFilter === "created") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        console.log(`새로 추가됨 정렬: ${a.title.substring(0, 20)}... (${a.createdAt}) vs ${b.title.substring(0, 20)}... (${b.createdAt})`);
        return dateB - dateA; // 최신순
      } else {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        console.log(`새로 업데이트됨 정렬: ${a.title.substring(0, 20)}... (${a.updatedAt}) vs ${b.title.substring(0, 20)}... (${b.updatedAt})`);
        return dateB - dateA; // 최신순
      }
    });
    
    console.log(`정렬 결과 (${sortFilter}):`, sortedPosts.slice(0, 3).map(p => ({ title: p.title, date: sortFilter === "created" ? p.createdAt : p.updatedAt })));
    return sortedPosts;
    
    // 실제 API 사용 시 주석 해제
    // if (!data?.pages || !user?.login) return [];
    // return data.pages
    //   .flatMap((page) => page.discussions)
    //   .filter((discussion) => discussion.author.login === user.login);
  }, [sortFilter]);

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

  const handleFilterToggle = () => {
    const newFilter = sortFilter === "created" ? "lastActivity" : "created";
    console.log(`필터 변경: ${newFilter === "created" ? "새로 추가됨" : "새로 업데이트됨"}`);
    setSortFilter(newFilter);
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

          {/* 필터 버튼 */}
          <button
            onClick={handleFilterToggle}
            className="flex items-center justify-center gap-[6px] h-10 border border-black/8 rounded-lg text-sm font-semibold transition-colors bg-white text-black/60 hover:bg-black/5"
            style={{ 
              boxSizing: 'border-box',
              paddingLeft: '15px', 
              paddingRight: '18px',
              paddingTop: '12px',
              paddingBottom: '12px',
              minWidth: sortFilter === "created" ? '117px' : '140px'
            }}
          >
            <ChevronDown className="w-4 h-4" />
            {sortFilter === "created" ? "새로 올라온" : "새로 업데이트됨"}
          </button>
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

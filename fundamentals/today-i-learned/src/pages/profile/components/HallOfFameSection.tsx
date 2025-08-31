import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";
import { mockHallOfFamePosts } from "./__mockdata__/HallOfFameMockData";

interface HallOfFameSectionProps extends BaseComponentProps {}

const INITIAL_DISPLAY_COUNT = 6;

export function HallOfFameSection({ className }: HallOfFameSectionProps) {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteDiscussions({
      filterBy: { label: "성지 ⛲" },
      pageSize: 20,
      enabled: !!user?.login
    });

  // 로그인한 사용자의 글만 필터링 (임시로 Mock 데이터 사용)
  const userHallOfFamePosts = useMemo(() => {
    // 임시로 Mock 데이터 사용
    return mockHallOfFamePosts;

    // 실제 API 사용 시 주석 해제
    // if (!data?.pages || !user?.login) return [];
    // return data.pages
    //   .flatMap((page) => page.discussions)
    //   .filter((discussion) => discussion.author.login === user.login);
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    // 더보기를 눌렀을 때 더 많은 데이터가 필요하면 추가 로드
    if (
      !isExpanded &&
      hasNextPage &&
      userHallOfFamePosts.length <= INITIAL_DISPLAY_COUNT
    ) {
      fetchNextPage();
    }
  };

  const displayedPosts = isExpanded
    ? userHallOfFamePosts
    : userHallOfFamePosts.slice(0, INITIAL_DISPLAY_COUNT);

  const showToggleButton = userHallOfFamePosts.length > INITIAL_DISPLAY_COUNT;

  if (isLoading) {
    return (
      <div className={cn("flex flex-col items-start px-6 gap-4", className)}>
        {/* 헤더 */}
        <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
          명예의 전당
        </h2>

        {/* 스켈레톤 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-start gap-4", className)}>
      {/* 헤더 */}
      <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
        명예의 전당
      </h2>

      {userHallOfFamePosts.length === 0 ? (
        <div className="text-center py-12 w-full">
          <p className="text-black/60 font-medium">
            아직 명예의 전당에 등록된 글이 없습니다.
          </p>
        </div>
      ) : (
        <>
          {/* 글 목록 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {displayedPosts.map((discussion) => (
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

          {/* 더보기/접기 버튼 */}
          {showToggleButton && (
            <button
              onClick={handleToggleExpand}
              disabled={isFetchingNextPage}
              className="flex items-center justify-center px-4 py-[18px] w-full h-[60px] border border-[rgba(201,201,201,0.5)] rounded-xl hover:bg-black/5 transition-colors disabled:opacity-50"
              style={{ 
                boxSizing: 'border-box'
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
      )}
    </div>
  );
}

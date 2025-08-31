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

  // 로그인한 사용자의 글만 필터링
  const userHallOfFamePosts = useMemo(() => {
    if (!data?.pages || !user?.login) return [];

    return data.pages
      .flatMap((page) => page.discussions)
      .filter((discussion) => discussion.author.login === user.login);
  }, [data?.pages, user?.login]);

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
      <div className={cn("space-y-6", className)}>
        {/* 헤더 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
              명예의 전당
            </h2>
          </div>
        </div>

        {/* 스켈레톤 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* 헤더 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
            명예의 전당
          </h2>
        </div>
      </div>

      {userHallOfFamePosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-black/60 font-medium">
            아직 명예의 전당에 등록된 글이 없습니다.
          </p>
        </div>
      ) : (
        <>
          {/* 글 목록 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex justify-center pt-2">
              <button
                onClick={handleToggleExpand}
                disabled={isFetchingNextPage}
                className="flex items-center gap-2 px-6 py-3 bg-black/5 hover:bg-black/10 rounded-full transition-colors disabled:opacity-50"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 text-black/60" />
                    <span className="font-semibold text-sm text-black/60">
                      접기
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 text-black/60" />
                    <span className="font-semibold text-sm text-black/60">
                      더보기 (
                      {userHallOfFamePosts.length - INITIAL_DISPLAY_COUNT}개 더)
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* 추가 로딩 */}
          {isFetchingNextPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

import { useSearchDiscussions } from "@/api/hooks/useSearchDiscussions";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PostCard, PostCardSkeleton } from "@/components/features/discussions/PostCard";
import { useUserProfile } from "@/api/hooks/useUser";

interface SearchContentProps {
  query: string;
}

export function SearchContent({ query }: SearchContentProps) {
  const { data: userProfile } = useUserProfile();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useSearchDiscussions({ query });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { elementRef } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    onIntersect: handleLoadMore,
    rootMargin: "300px"
  });


  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Search className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          검색어를 입력해주세요
        </h2>
        <p className="text-gray-500">
          검색창에 키워드를 입력하고 Enter를 누르세요
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">"{query}" 검색 결과</h1>
        <div className="w-full">
          {[...new Array(3)].map((_, index) => (
            <div key={index} className={index < 2 ? "mb-6" : ""}>
              <PostCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          검색 중 오류가 발생했습니다
        </h2>
        <p className="text-gray-500">잠시 후 다시 시도해주세요</p>
      </div>
    );
  }

  const discussions = data?.pages.flatMap((page) => page.discussions) || [];

  if (discussions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Search className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          검색 결과가 없습니다
        </h2>
        <p className="text-gray-500">
          "{query}"에 대한 검색 결과를 찾을 수 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        "{query}" 검색 결과
        <span className="text-lg font-normal text-gray-500 ml-2">
          ({discussions.length}개)
        </span>
      </h1>

      <div className="w-full">
        {discussions.map((discussion, index) => (
          <div
            key={discussion.id}
            className={index < discussions.length - 1 ? "mb-6" : ""}
          >
            <PostCard
              discussion={discussion}
              currentUserLogin={userProfile?.login}
            />
          </div>
        ))}

        {hasNextPage && (
          <div ref={elementRef} className="w-full py-4 flex justify-center">
            {isFetchingNextPage ? <PostCardSkeleton /> : null}
          </div>
        )}
      </div>
    </div>
  );
}

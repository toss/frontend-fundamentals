import { useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useInfiniteDiscussions } from "../../hooks/useInfiniteDiscussions";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { PostCard } from "../post/PostCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Button } from "../ui/Button";
import { PAGE_SIZE } from "../../constants/github";
import type { BaseComponentProps } from "@/types";
import { FileText, Calendar, Heart } from "lucide-react";

interface MyPostListProps extends BaseComponentProps {}

export function MyPostList({ className }: MyPostListProps) {
  const { userProfile } = useUserProfile();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteDiscussions({
    pageSize: PAGE_SIZE.DEFAULT // 충분한 수로 설정
  });

  const { elementRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage
  });

  // 무한스크롤 트리거
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 현재 사용자가 작성한 포스트만 필터링
  const myPosts = useMemo(() => {
    if (!userProfile?.login || !data) return [];

    const allDiscussions = data.pages.flatMap((page) => page.discussions);
    return allDiscussions.filter(
      (discussion) => discussion.author.login === userProfile.login
    );
  }, [data, userProfile?.login]);

  // 통계 계산
  const stats = useMemo(() => {
    const totalPosts = myPosts.length;
    const totalLikes = myPosts.reduce(
      (sum, post) => sum + post.reactions.totalCount,
      0
    );
    const totalComments = myPosts.reduce(
      (sum, post) => sum + post.comments.totalCount,
      0
    );

    // 최근 30일 포스트 수
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentPosts = myPosts.filter(
      (post) => new Date(post.createdAt) >= thirtyDaysAgo
    ).length;

    return {
      totalPosts,
      totalLikes,
      totalComments,
      recentPosts
    };
  }, [myPosts]);

  const handleComment = (id: string) => {
    console.log("Comment clicked:", id);
    // TODO: 댓글 페이지로 이동 또는 댓글 모달 열기
  };

  // 콘텐츠 렌더링 함수
  const renderContent = () => {
    // 로딩 상태
    if (isLoading) {
      return (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner text="내 글을 불러오는 중..." variant="primary" />
        </div>
      );
    }

    // 에러 상태
    if (error) {
      return (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            글을 불러올 수 없습니다
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
          <Button onClick={() => refetch()} variant="default">
            다시 시도
          </Button>
        </div>
      );
    }

    // 빈 상태 - 로딩이 완료되고, 데이터와 사용자 프로필이 있는데도 게시물이 없을 때
    if (!isLoading && data && userProfile && myPosts.length === 0) {
      return (
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            아직 게시물이 없습니다
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            첫 번째 Today I Learned 게시물을 작성해보세요!
          </p>
          <Button variant="default">새 글 작성하기</Button>
        </div>
      );
    }

    // 포스트 목록
    if (myPosts.length > 0) {
      return (
        <div className="space-y-4">
          {myPosts.map((post, index) => (
            <PostCard
              key={post.id}
              discussion={post}
              onComment={handleComment}
              isLast={index === myPosts.length - 1}
            />
          ))}

          {/* 무한스크롤 트리거 및 로딩 상태 */}
          {hasNextPage && (
            <div
              ref={elementRef}
              className="flex items-center justify-center py-4"
            >
              {isFetchingNextPage && (
                <LoadingSpinner
                  text="더 많은 글을 불러오는 중..."
                  variant="secondary"
                />
              )}
            </div>
          )}

          {/* 더 이상 불러올 글이 없을 때 */}
          {!hasNextPage && myPosts.length > 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
              모든 글을 불러왔습니다.
            </div>
          )}
        </div>
      );
    }

    // 데이터 로딩 중이거나 사용자 프로필이 없는 경우
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingSpinner text="내 글을 불러오는 중..." variant="primary" />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r p-4 shadow-sm",
        "from-[#ff8a80]/5 to-[#369870]/5",
        "dark:from-[#ff8a80]/10 dark:to-[#369870]/10 dark:border-[#ff8a80]/30",
        className
      )}
    >
      {/* Header with Statistics - 항상 표시 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
          내가 작성한 글
        </h2>
        {/* 통계는 항상 표시 - 로딩 중에는 0으로, 데이터 로드 후 실제 값으로 */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>총 {isLoading || error ? 0 : stats.totalPosts}개</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{isLoading || error ? 0 : stats.totalLikes}개</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              최근 30일 {isLoading || error ? 0 : stats.recentPosts}개
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
}

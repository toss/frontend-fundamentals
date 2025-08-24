import * as React from "react";
import {
  PostInput,
  FilterSection,
  PostList,
  MonthlyChallenge,
  WeeklyTop5
} from "./components";
import {
  mockPosts,
  mockChallenge,
  mockPopularPosts,
  currentUser
} from "./utils/mockData";
import type { SortOption } from "./utils/types";

export function NewHomePage() {
  const [posts] = React.useState(mockPosts);
  const [sortOption, setSortOption] = React.useState<SortOption>("newest");

  // TODO: @tanstack/react-query로 변경 필요
  // const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
  const [isLoading] = React.useState(false);

  const handlePostSubmit = (data: { title: string; content: string }) => {
    console.log("New post:", data);
    // Here you would typically make an API call
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    // Here you would typically re-fetch or re-sort posts
  };

  const handleLike = (postId: string) => {
    console.log("Like post:", postId);
  };

  const handleComment = (postId: string) => {
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId: string) => {
    console.log("Share post:", postId);
  };

  const handleUpvote = (postId: string) => {
    console.log("Upvote post:", postId);
  };

  const handleDayClick = (day: number) => {
    console.log("Challenge day clicked:", day);
  };

  const handlePopularPostClick = (postId: string) => {
    console.log("Popular post clicked:", postId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto lg:px-8">
        {/* 메인 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-8">
          {/* 왼쪽 컬럼: 메인 피드 */}
          <div className="flex flex-col lg:border-l lg:border-r border-[rgba(201,201,201,0.4)]">
            {/* 포스트 입력 */}
            <div className="lg:px-6 pt-6 pb-0">
              <PostInput user={currentUser} onSubmit={handlePostSubmit} />
            </div>

            {/* 구분선 */}
            <div className="flex flex-col items-start py-4 px-0">
              <div className="w-full h-0 border-b border-[rgba(201,201,201,0.4)]" />
            </div>

            {/* 필터 섹션 */}
            <div className="lg:px-6 pb-4">
              <FilterSection
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </div>

            {/* 포스트 리스트 */}
            <div className="lg:px-6 pb-0">
              <PostList
                posts={posts}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onUpvote={handleUpvote}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* 오른쪽 컬럼: 사이드바 (1024px 이상에서만 표시) */}
          <div className="hidden lg:block mt-[24px]">
            {/* 주간 Top 5 */}
            <WeeklyTop5
              posts={mockPopularPosts}
              weekInfo="8월 첫째주 인기글"
              onPostClick={handlePopularPostClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

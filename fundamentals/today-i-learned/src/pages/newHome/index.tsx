import * as React from "react";
import {
  PostInput,
  FilterSection,
  PostList,
  MonthlyChallenge,
  WeeklyTop5,
  SprintChallenge
} from "./components";
import {
  mockChallenge,
  currentUser
} from "./utils/mockData";
import type { SortOption, Post, PopularPost } from "./utils/types";
import { 
  useInfiniteDiscussions, 
  useWeeklyTopDiscussions, 
  useCreateDiscussion 
} from "@/api/hooks/useDiscussions";
import type { GitHubDiscussion } from "@/api/remote/discussions";

// GitHub Discussion을 Post 타입으로 변환하는 함수
function convertGitHubDiscussionToPost(discussion: GitHubDiscussion): Post {
  return {
    id: discussion.id,
    title: discussion.title,
    content: discussion.body,
    author: {
      id: discussion.author.login, // User 타입의 id 속성 추가
      name: discussion.author.login,
      username: discussion.author.login,
      avatar: discussion.author.avatarUrl
    },
    createdAt: discussion.createdAt,
    category: discussion.category?.name || "Today I Learned", // 카테고리 추가
    tags: [], // GitHub Discussions에는 직접적인 태그 필드가 없음
    stats: {
      hearts: discussion.reactions.totalCount,
      comments: discussion.comments.totalCount,
      shares: 0, // GitHub Discussions에는 공유 기능이 없음
      upvotes: discussion.reactions.totalCount
    }
  };
}

// GitHub Discussion을 PopularPost 타입으로 변환하는 함수
function convertGitHubDiscussionToPopularPost(discussion: GitHubDiscussion, rank: number): PopularPost {
  return {
    id: discussion.id,
    title: discussion.title,
    excerpt: discussion.body.slice(0, 100) + (discussion.body.length > 100 ? "..." : ""),
    author: {
      id: discussion.author.login,
      name: discussion.author.login,
      username: discussion.author.login,
      avatar: discussion.author.avatarUrl
    },
    rank
  };
}

export function NewHomePage() {
  const [sortOption, setSortOption] = React.useState<SortOption>("newest");

  // sortOption에 따른 API 파라미터 계산
  const getApiParams = () => {
    switch (sortOption) {
      case "newest":
        return { sortBy: "latest" as const };
      case "realtime":
        return { sortBy: "lastActivity" as const };
      case "hall-of-fame":
        return {
          sortBy: "latest" as const,
          filterBy: { label: "성지 ⛲" }
        };
      default:
        return { sortBy: "latest" as const };
    }
  };

  // 실제 API 연동
  const { 
    data: postsData, 
    fetchNextPage, 
    hasNextPage, 
    isLoading, 
    isFetchingNextPage 
  } = useInfiniteDiscussions({
    categoryName: "Today I Learned",
    ...getApiParams(),
    pageSize: 10
  });

  const { 
    data: weeklyTopPosts, 
    isLoading: isLoadingWeeklyTop 
  } = useWeeklyTopDiscussions({ limit: 5 });

  const createPostMutation = useCreateDiscussion();

  // Flatten infinite pages into single array and convert to Post type
  const posts = React.useMemo(() => {
    if (!postsData) return [];
    return postsData.pages.flatMap(page => 
      page.discussions.map(discussion => convertGitHubDiscussionToPost(discussion))
    );
  }, [postsData]);

  // Convert weekly top posts to PopularPost type
  const popularPosts = React.useMemo(() => {
    if (!weeklyTopPosts) return [];
    return weeklyTopPosts.map((discussion, index) => 
      convertGitHubDiscussionToPopularPost(discussion, index + 1)
    );
  }, [weeklyTopPosts]);

  const handlePostSubmit = async (data: { title: string; content: string }) => {
    try {
      await createPostMutation.mutateAsync({
        title: data.title,
        body: data.content
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
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
            {/* 3일 스프린트 챌린지 */}
            <div className="pt-6 pb-0">
              <SprintChallenge />
            </div>

            {/* 구분선 */}
            <div className="flex flex-col items-start py-4 px-0">
              <div className="w-full h-0 border-b border-[rgba(201,201,201,0.4)]" />
            </div>

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
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          </div>

          {/* 오른쪽 컬럼: 사이드바 (1024px 이상에서만 표시) */}
          <div className="hidden lg:block mt-[24px]">
            {/* 주간 Top 5 */}
            <WeeklyTop5
              posts={popularPosts}
              weekInfo="8월 첫째주 인기글"
              onPostClick={handlePopularPostClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

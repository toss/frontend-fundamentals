import * as React from "react";
import { PostInput } from "./components/PostInput";
import { FilterSection } from "./components/FilterSection";
import { PostList } from "./components/PostList";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { SprintChallenge } from "./components/SprintChallenge";
import { useAuth } from "@/contexts/AuthContext";
import type { SortOption } from "@/types";
import {
  useCreateDiscussion,
  useToggleDiscussionReaction
} from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/components/shared/ui/Toast";

export function TimelinePage() {
  const { user } = useAuth();
  const [sortOption, setSortOption] = React.useState<SortOption>("newest");

  const createPostMutation = useCreateDiscussion();
  const { handleApiError } = useErrorHandler();
  const { success: showSuccessToast } = useToast();

  // sortOption에 따른 API 파라미터 계산
  const getPostListProps = () => {
    switch (sortOption) {
      case "newest":
        return {
          categoryName: "Today I Learned",
          sortBy: "latest" as const
        };
      case "realtime":
        return {
          categoryName: "Today I Learned",
          sortBy: "lastActivity" as const
        };
      case "hall-of-fame":
        return {
          categoryName: "Today I Learned",
          sortBy: "latest" as const,
          filterBy: { label: "성지 ⛲" }
        };
      default:
        return {
          categoryName: "Today I Learned",
          sortBy: "latest" as const
        };
    }
  };

  const handlePostSubmit = async (data: { title: string; content: string }) => {
    try {
      await createPostMutation.mutateAsync({
        title: data.title,
        body: data.content
      });
      showSuccessToast(
        "포스트 작성 완료",
        "오늘 배운 내용이 성공적으로 게시되었습니다."
      );
    } catch (error) {
      handleApiError(error, "포스트 작성");
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  const toggleReactionMutation = useToggleDiscussionReaction();

  const handleLike = async (postId: string) => {
    if (!user?.accessToken) return;

    try {
      await toggleReactionMutation.mutateAsync({
        subjectId: postId,
        isReacted: false, // TODO: 현재 반응 상태 확인 로직 필요
        content: "HEART"
      });
    } catch (error) {
      handleApiError(error, "좋아요");
    }
  };

  const handleComment = (postId: string) => {
    // TODO: 댓글 모달 또는 댓글 입력 영역으로 이동
    console.log("Comment on post:", postId);
  };

  const handleUpvote = async (postId: string) => {
    if (!user?.accessToken) return;

    try {
      await toggleReactionMutation.mutateAsync({
        subjectId: postId,
        isReacted: false, // TODO: 현재 반응 상태 확인 로직 필요
        content: "THUMBS_UP"
      });
    } catch (error) {
      handleApiError(error, "업보트");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto lg:px-8">
        {/* 메인 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-8">
          {/* 왼쪽 컬럼: 메인 피드 */}
          <div className="flex flex-col lg:border-l lg:border-r border-[rgba(201,201,201,0.4)] lg:min-w-[820px]">
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
              {user ? (
                <PostInput
                  user={{
                    login: user.login,
                    avatarUrl: user.avatar_url
                  }}
                  onSubmit={handlePostSubmit}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  로그인이 필요합니다.
                </div>
              )}
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
                {...getPostListProps()}
                onLike={handleLike}
                onComment={handleComment}
                onUpvote={handleUpvote}
                onDelete={(postId) => {
                  // TODO: 삭제 기능 구현
                  console.log("Delete post:", postId);
                }}
              />
            </div>
          </div>

          {/* 오른쪽 컬럼: 사이드바 (1024px 이상에서만 표시) */}
          <div className="hidden lg:block mt-[24px] lg:min-w-[490px]">
            <div className="sticky top-4">
              <WeeklyTop5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

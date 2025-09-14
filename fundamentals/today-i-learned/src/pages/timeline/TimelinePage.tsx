import * as React from "react";
import { PostInput } from "./components/PostInput";
import { FilterSection } from "./components/FilterSection";
import { PostList } from "./components/PostList";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { SprintChallenge } from "./components/SprintChallenge";
import { UnauthenticatedState } from "@/components/features/auth/UnauthenticatedState";
import { useAuth } from "@/contexts/AuthContext";
import type { SortOption } from "@/types";
import { useCreateDiscussion } from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/contexts/ToastContext";

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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto lg:px-8">
        {/* 메인 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-8">
          {/* 왼쪽 컬럼: 메인 피드 */}
          <div className="flex flex-col lg:border-l lg:border-r border-[rgba(201,201,201,0.4)] lg:min-w-[820px]">
            {user ? (
              <>
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
                  <PostInput
                    user={{
                      login: user.login,
                      avatarUrl: user.avatar_url
                    }}
                    onSubmit={handlePostSubmit}
                    isError={createPostMutation.isError}
                  />
                </div>

                {/* 구분선 */}
                <div className="flex flex-col items-start py-4 px-0">
                  <div className="w-full h-0 border-b border-[rgba(201,201,201,0.4)]" />
                </div>
              </>
            ) : (
              <>
                {/* 로그인 안된 상태 */}
                <div className="pt-6 pb-4 px-6">
                  <UnauthenticatedState />
                </div>

                {/* 구분선 */}
                <div className="flex flex-col items-start py-4 px-0">
                  <div className="w-full h-0 border-b border-[rgba(201,201,201,0.4)]" />
                </div>
              </>
            )}

            {/* 필터 섹션 */}
            <div className="lg:px-6 pb-4">
              <FilterSection
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </div>

            {/* 포스트 리스트 */}
            <div className="lg:px-6 pb-0">
              <PostList {...getPostListProps()} />
            </div>
          </div>

          {/* 오른쪽 컬럼: 사이드바 (1024px 이상에서만 표시) */}
          <div className="hidden lg:block mt-[24px] lg:min-w-[490px]">
            <div className="fixed top-[140px] bottom-4 pr-8 w-[490px] overflow-y-auto">
              <WeeklyTop5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

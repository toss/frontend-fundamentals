import * as React from "react";
import { useNavigate } from "react-router-dom";
import { PostInput } from "./components/PostInput";
import { FilterSection } from "./components/FilterSection";
import { PostList } from "./components/PostList";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { SprintChallenge } from "./components/SprintChallenge";
import { UnauthenticatedState } from "@/components/features/auth/UnauthenticatedState";
import { useAuth } from "@/contexts/AuthContext";
import type { SortOption } from "./types";
import { useCreateDiscussion } from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/contexts/ToastContext";
import { css } from "@styled-system/css";

export function TimelinePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      const newPost = await createPostMutation.mutateAsync({
        title: data.title,
        body: data.content
      });
      showSuccessToast("포스트 작성 완료", "성공적으로 게시되었습니다.", {
        label: "보러가기",
        onClick: () => navigate(`/post/${newPost.id}`)
      });
    } catch (error) {
      handleApiError(error, "포스트 작성");
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <div className={pageContainer}>
      <div className={contentWrapper}>
        <div className={mainGridLayout}>
          <div className={mainContentColumn}>
            {user ? (
              <>
                <div className={sprintChallengeSection}>
                  <SprintChallenge />
                </div>
                <SectionDivider />
                <div className={postInputSection}>
                  <PostInput
                    user={{
                      login: user.login,
                      avatarUrl: user.avatar_url
                    }}
                    onSubmit={handlePostSubmit}
                    isError={createPostMutation.isError}
                    isLoading={createPostMutation.isPending}
                  />
                </div>
                <SectionDivider />
              </>
            ) : (
              <>
                <div className={unauthenticatedSection}>
                  <UnauthenticatedState />
                </div>
                <SectionDivider />
              </>
            )}

            <div className={filterSection}>
              <FilterSection
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </div>

            <div className={postListSection}>
              <PostList {...getPostListProps()} />
            </div>
          </div>

          <div className={sidebarColumn}>
            <div className={sidebarContent}>
              <WeeklyTop5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page Layout Styles
const pageContainer = css({
  minHeight: "100vh",
  backgroundColor: "white"
});

const contentWrapper = css({
  maxWidth: "1440px",
  margin: "0 auto",
  paddingX: { base: 0, lg: "2rem" }
});

const mainGridLayout = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", lg: "5fr 3fr" },
  gap: "2rem"
});

// Main Content Column
const mainContentColumn = css({
  display: "flex",
  flexDirection: "column",
  borderLeft: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  borderRight: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  minWidth: { lg: "820px" }
});

// Content Sections
const sprintChallengeSection = css({
  paddingTop: "12px",
  paddingBottom: 0
});

const postInputSection = css({
  paddingX: { lg: "1.5rem" }
});

const unauthenticatedSection = css({
  paddingTop: "1.5rem",
  paddingBottom: "1rem",
  paddingX: "1.5rem"
});

const filterSection = css({
  paddingY: "24px",
  paddingX: "12px"
});

const postListSection = css({
  paddingX: { lg: "1.5rem" },
  paddingBottom: 0
});

// Sidebar Column
const sidebarColumn = css({
  display: { base: "none", lg: "block" },
  marginTop: "24px",
  minWidth: { lg: "490px" }
});

const sidebarContent = css({
  position: "fixed",
  top: "100px",
  bottom: "1rem",
  paddingRight: "2rem",
  width: "490px",
  overflowY: "auto"
});

// Section Divider Component
function SectionDivider() {
  return <div className={sectionDivider} />;
}

const sectionDivider = css({
  width: "100%",
  height: 0,
  borderBottom: "1px solid rgba(201, 201, 201, 0.4)",
  marginTop: { base: 0, lg: "1rem" }
});

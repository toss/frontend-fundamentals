import { css } from "@styled-system/css";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDiscussion } from "@/api/hooks/useDiscussions";
import { UnauthenticatedState } from "@/components/features/auth/UnauthenticatedState";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { FilterSection } from "./components/FilterSection";
import { PostInput } from "./components/PostInput";
import { PostList } from "./components/PostList";
import { SprintChallenge } from "./components/SprintChallenge";
import type { SortOption } from "./types";

export function TimelinePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = React.useState<SortOption>("newest");

  const createPostMutation = useCreateDiscussion();
  const { handleApiError } = useErrorHandler();
  const { success: showSuccessToast } = useToast();

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
    <div className={gridLayout}>
      <section className={mainContentColumn}>
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
          </>
        ) : (
          <UnauthenticatedState />
        )}

        <SectionDivider />

        <div className={filterSection}>
          <FilterSection
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>

        <div className={postListSection}>
          <PostList {...getPostListProps()} />
        </div>
      </section>

      <section className={sidebarColumn}>
        <WeeklyTop5 />
      </section>
    </div>
  );
}

const gridLayout = css({
  display: "grid",
  gridTemplateColumns: { base: "1fr", lg: "5fr 3fr" },
  height: "100%",
  backgroundColor: "white",
  overflow: "hidden"
});

const mainContentColumn = css({
  display: "flex",
  flexDirection: "column",
  borderLeft: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  borderRight: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none"
});

const sprintChallengeSection = css({
  paddingY: "1rem"
});

const postInputSection = css({
  paddingX: "1rem"
});

const filterSection = css({
  paddingY: "0.5rem",
  paddingX: "1.5rem"
});

const postListSection = css({
  paddingX: { base: "1rem", lg: "1.5rem" },
  paddingBottom: 0
});

const sidebarColumn = css({
  display: { base: "none", lg: "block" },
  paddingBottom: "2rem",
  overflowY: "auto",
  scrollbarWidth: "none"
});

function SectionDivider() {
  return <div className={sectionDivider} />;
}

const sectionDivider = css({
  width: "100%",
  height: 0,
  borderBottom: "1px solid rgba(201, 201, 201, 0.4)"
});

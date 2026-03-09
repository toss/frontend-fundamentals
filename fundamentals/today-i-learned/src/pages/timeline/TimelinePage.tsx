import { css } from "@styled-system/css";

import { GoToLogin } from "@/components/features/auth/UnauthenticatedState";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { useAuth } from "@/contexts/AuthContext";
import { FilterSection } from "./components/FilterSection";
import { PostWriteSection } from "./components/PostInput";
import { PostList } from "./components/PostList";
import { SprintChallenge } from "./components/SprintChallenge";

export function TimelinePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={gridLayout}>
      <section className={mainContentColumn} data-scroll-container>
        {isAuthenticated ? (
          <>
            <div className={sprintChallengeSection}>
              <SprintChallenge />
            </div>
            <SectionDivider />
            <div className={postInputSection}>
              <PostWriteSection />
            </div>
          </>
        ) : (
          <GoToLogin />
        )}

        <SectionDivider />

        <div className={filterSection}>
          <FilterSection />
        </div>

        <div className={postListSection}>
          <PostList />
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

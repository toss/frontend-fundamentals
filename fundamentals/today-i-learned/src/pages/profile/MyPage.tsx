import { ProfileHeader } from "./components/ProfileHeader";
import { HallOfFameSection } from "./components/HallOfFameSection";
import { ActivitySection } from "./components/ActivitySection";
import { MonthlyChallenge } from "@/pages/timeline/components/MonthlyChallenge";
import { css } from "@styled-system/css";

export function MyPage() {
  return (
    <div className={pageContainer}>
      <div className={contentWrapper}>
        <div className={mainGridLayout}>
          <div className={mainContentColumn}>
            <div className={profileSection}>
              <ProfileHeader />
            </div>

            <SectionDivider />

            <div className={hallOfFameSection}>
              <HallOfFameSection />
            </div>

            <SectionDivider />

            <div className={activitySection}>
              <ActivitySection />
            </div>
          </div>

          <div className={sidebarColumn}>
            <div className={sidebarContent}>
              <MonthlyChallenge />
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

const profileSection = css({
  paddingX: { lg: "1.5rem" },
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem"
});

const hallOfFameSection = css({
  paddingX: { lg: "1.5rem" },
  paddingBottom: "2rem"
});

const activitySection = css({
  paddingX: { lg: "1.5rem" },
  paddingBottom: "2rem"
});

// Sidebar Column
const sidebarColumn = css({
  display: { base: "none", lg: "block" },
  marginTop: "1.5rem",
  minWidth: { lg: "490px" }
});

const sidebarContent = css({
  position: "sticky",
  top: "1rem"
});

// Section Divider Component
function SectionDivider() {
  return (
    <div className={sectionDividerContainer}>
      <div className={sectionDividerLine} />
    </div>
  );
}

const sectionDividerContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingY: "1rem",
  paddingX: 0
});

const sectionDividerLine = css({
  width: "100%",
  height: 0,
  borderBottom: "1px solid rgba(201, 201, 201, 0.4)"
});

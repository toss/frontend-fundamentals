import { ProfileHeader } from "./components/ProfileHeader";
import { HallOfFameSection } from "./components/HallOfFameSection";
import { ActivitySection } from "./components/ActivitySection";
import { MonthlyChallenge } from "@/components/features/challenge/MonthlyChallenge";
import { css } from "@styled-system/css";

export function MyPage() {
  return (
    <div className={gridLayout}>
      <section className={leftContent}>
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
      </section>

      <section className={rightContent}>
        <MonthlyChallenge />
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

const leftContent = css({
  display: "flex",
  flexDirection: "column",
  borderLeft: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  borderRight: { lg: "1px solid rgba(201, 201, 201, 0.4)" },
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none"
});

const profileSection = css({
  paddingY: "2rem"
});

const hallOfFameSection = css({
  padding: "1rem",
  paddingBottom: "2rem"
});

const activitySection = css({
  padding: "1rem",
  paddingBottom: "2rem"
});

const rightContent = css({
  display: { base: "none", lg: "block" },
  paddingBottom: "2rem",
  overflowY: "auto",
  scrollbarWidth: "none"
});

// Section Divider Component
function SectionDivider() {
  return <div className={sectionDividerLine} />;
}

const sectionDividerLine = css({
  width: "100%",
  height: 0,
  borderBottom: "1px solid rgba(201, 201, 201, 0.4)"
});

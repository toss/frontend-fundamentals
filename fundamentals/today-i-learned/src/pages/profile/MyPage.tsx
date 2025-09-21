import { ProfileHeader } from "./components/ProfileHeader";
import { HallOfFameSection } from "./components/HallOfFameSection";
import { ActivitySection } from "./components/ActivitySection";
import { MonthlyChallenge } from "@/pages/timeline/components/MonthlyChallenge";
import { css } from "styled-system/css";
import { flex, grid } from "styled-system/patterns";

export function MyPage() {
  return (
    <div className={pageContainer}>
      <div className={pageWrapper}>
        {/* 메인 그리드 레이아웃 */}
        <div className={mainGrid}>
          {/* 왼쪽 컬럼: 메인 컨텐츠 */}
          <div className={contentColumn}>
            {/* 프로필 헤더 */}
            <div className={sectionWrapper}>
              <ProfileHeader />
            </div>

            {/* 구분선 */}
            <div className={dividerWrapper}>
              <div className={divider} />
            </div>

            {/* 명예의 전당 섹션 */}
            <div className={css({ lg: { px: "6" }, pb: "8" })}>
              <HallOfFameSection />
            </div>

            {/* 구분선 */}
            <div className={dividerWrapper}>
              <div className={divider} />
            </div>

            {/* 활동 섹션 */}
            <div className={css({ lg: { px: "6" }, pb: "8" })}>
              <ActivitySection />
            </div>
          </div>

          {/* 오른쪽 컬럼: 사이드바 (1024px 이상에서만 표시) */}
          <div className={sidebarColumn}>
            <div className={stickyContainer}>
              <MonthlyChallenge />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 페이지 스타일 정의
const pageContainer = css({
  minHeight: "100vh",
  bg: "white"
});

const pageWrapper = css({
  maxWidth: "1440px",
  mx: "auto",
  lg: { px: "8" }
});

const mainGrid = grid({
  columns: 1,
  lg: { columns: "5fr 3fr" },
  gap: "8"
});

const contentColumn = flex({
  direction: "column",
  lg: {
    borderLeft: "1px solid token(colors.border.default)",
    borderRight: "1px solid token(colors.border.default)",
    minWidth: "820px"
  }
});

const sectionWrapper = css({
  lg: { px: "6" },
  pt: "6",
  pb: "6"
});

const dividerWrapper = flex({
  direction: "column",
  alignItems: "flex-start",
  py: "4",
  px: "0"
});

const divider = css({
  width: "full",
  height: "0",
  borderBottom: "1px solid token(colors.border.divider)"
});

const sidebarColumn = css({
  display: "none",
  lg: {
    display: "block",
    minWidth: "490px"
  },
  mt: "24px"
});

const stickyContainer = css({
  position: "sticky",
  top: "4"
});

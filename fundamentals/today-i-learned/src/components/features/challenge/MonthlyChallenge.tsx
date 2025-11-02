import type { MonthlyChallenge } from "./types";
import { ChallengeHeader } from "./ChallengeHeader";
import { ChallengeCalendar } from "./ChallengeCalendar";
import { useMonthlyCalendar } from "./useMonthlyCalendar";
import { challengeContainer } from "@/pages/profile/MyPage";
import { css } from "@styled-system/css";

export function MonthlyChallenge() {
  const { calendarData } = useMonthlyCalendar();

  return (
    <div className={challengeContainer}>
      <ChallengeHeader year={calendarData.year} month={calendarData.month} />
      <ChallengeCalendar days={calendarData.days} />
    </div>
  );
}

// Loading 컴포넌트
MonthlyChallenge.Loading = function () {
  const now = new Date();
  return (
    <div className={challengeContainer}>
      <ChallengeHeader year={now.getFullYear()} month={now.getMonth() + 1} />
      <div className={challengeCalendarSkeleton}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={challengeDaySkeleton}>
            <div />
            <div />
          </div>
        ))}
      </div>
    </div>
  );
};

// Error 컴포넌트
MonthlyChallenge.Error = function () {
  const now = new Date();
  return (
    <div className={challengeContainer}>
      <ChallengeHeader year={now.getFullYear()} month={now.getMonth() + 1} />
      <div className={errorState}>
        <h3>월간 기록을 불러올 수 없습니다</h3>
      </div>
    </div>
  );
};

// Loading 스타일
const challengeCalendarSkeleton = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.75rem",
  maxWidth: "32rem",
  padding: "1rem",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  animation: "pulse 2s infinite"
});

const challengeDaySkeleton = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  "& > div:first-child": {
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: "#e5e7eb",
    borderRadius: "50%"
  },
  "& > div:last-child": {
    width: "24px",
    height: "16px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px"
  }
});

const errorState = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "2rem",
  textAlign: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  backgroundColor: "rgba(249, 250, 251, 0.5)",
  "& h3": {
    fontWeight: "600",
    fontSize: "14px",
    color: "#ef4444"
  }
});

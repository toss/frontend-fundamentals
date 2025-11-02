import { css } from "@styled-system/css";

interface ChallengeHeaderProps {
  year: number;
  month: number;
}

const MONTH_NAMES = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월"
];

export function ChallengeHeader({ year, month }: ChallengeHeaderProps) {
  const monthName = MONTH_NAMES[month - 1];

  return (
    <div className={headerSection}>
      <h3 className={mainTitle}>월간 기록</h3>
      <p className={subtitle}>
        {year}년 {monthName} 한 달 기록
      </p>
    </div>
  );
}

const headerSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginTop: "1.25rem"
});

const mainTitle = css({
  fontSize: "24px",
  fontWeight: "extrabold",
  color: "black",
  letterSpacing: "-0.025em"
});

const subtitle = css({
  fontSize: "16px",
  fontWeight: "semibold",
  color: "rgba(0, 0, 0, 0.6)",
  letterSpacing: "-0.025em"
});

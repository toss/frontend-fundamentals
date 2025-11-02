import { css, cx } from "@styled-system/css";
import type { ChallengeDay } from "./types";
import { Check } from "lucide-react";

interface ChallengeDayItemProps {
  day: ChallengeDay;
}

const COLORS = [
  css({
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "rgba(0, 0, 0, 0.4)"
  }),
  css({
    backgroundColor: "rgba(188, 233, 233, 0.2)",
    color: "#58C7C7"
  }),
  css({
    backgroundColor: "rgba(237, 204, 248, 0.4)",
    color: "#DA9BEF"
  }),
  css({
    backgroundColor: "rgba(255, 239, 191, 0.6)",
    color: "#FFC342"
  }),
  css({
    backgroundColor: "rgba(255, 212, 214, 0.2)",
    color: "#FB8890"
  }),
  css({
    backgroundColor: "rgba(188, 233, 233, 0.2)",
    color: "#58C7C7"
  }),
  css({
    backgroundColor: "rgba(188, 233, 233, 0.2)",
    color: "#58C7C7"
  }),
  css({
    backgroundColor: "rgba(255, 212, 214, 0.2)",
    color: "#FB8890"
  }),
  css({
    backgroundColor: "rgba(255, 239, 191, 0.6)",
    color: "#FFC342"
  }),
  css({
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "rgba(0, 0, 0, 0.4)"
  })
];

export function ChallengeDayItem({ day }: ChallengeDayItemProps) {
  const getDayStyle = () => {
    switch (day.status) {
      case "completed":
        const colorIndex = (day.day - 1) % COLORS.length;
        return COLORS[colorIndex];
      case "posted":
        return postedDayStyle;
      case "today":
        return todayStyle;
      default:
        return pendingDayStyle;
    }
  };

  const getStreakLabel = () => {
    if (day.status === "completed" && day.streak) {
      return `${day.streak}일차`;
    }
    if (day.status === "posted") {
      return <Check size={20} strokeWidth={3} />;
    }
    if (day.status === "today") {
      return "오늘";
    }
    return null;
  };

  return (
    <div className={dayItemContainer}>
      <div className={cx(dayCircle, getDayStyle())}>{getStreakLabel()}</div>
      <span className={dayLabel}>{day.day}일</span>
    </div>
  );
}

const dayItemContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem"
});

const dayCircle = css({
  minWidth: "1.5rem",
  minHeight: "1.5rem",
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "bold"
});

const dayLabel = css({
  fontSize: "14px",
  fontWeight: "medium",
  color: "rgb(75, 85, 99)"
});

const postedDayStyle = css({
  backgroundColor: "rgba(198, 218, 255, 0.6)",
  color: "#6B9AFF"
});

const todayStyle = css({
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#FCFCFC"
});

const pendingDayStyle = css({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  color: "rgba(0, 0, 0, 0.6)"
});
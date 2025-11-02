import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { SprintDay } from "./types";
import { css } from "@styled-system/css";

interface SprintDayItemProps {
  day: SprintDay;
}

type DayStatus =
  | "future"
  | "today-with-contribution"
  | "today-without-contribution"
  | "past-with-contribution"
  | "past-without-contribution";

function getDayStatus(day: SprintDay): DayStatus {
  if (day.isFuture) {
    return "future";
  }
  if (day.isToday) {
    return day.hasContribution
      ? "today-with-contribution"
      : "today-without-contribution";
  }
  return day.hasContribution
    ? "past-with-contribution"
    : "past-without-contribution";
}

function getDisplayText(day: SprintDay): string {
  if (day.isToday) {
    return "오늘";
  }
  return format(day.date, "E", { locale: ko });
}

export function SprintDayItem({ day }: SprintDayItemProps) {
  const status = getDayStatus(day);
  const showCheckIcon = day.hasContribution;
  const displayText = getDisplayText(day);

  return (
    <div className={css(containerStyle)}>
      <div className={css([circleBaseStyle, getCircleStyle(status)])}>
        {showCheckIcon ? (
          <CheckIcon />
        ) : (
          <span className={css([dayTextStyle, getTextStyle(status)])}>
            {displayText}
          </span>
        )}
      </div>

      <span className={css([labelTextStyle, getLabelStyle(status)])}>
        {day.dayOfWeek}
      </span>
    </div>
  );
}
const CheckIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    className={css(checkIconStyle)}
  >
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "8px",
  gap: "12px",
  width: "60px"
};

const circleBaseStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "60px",
  height: "60px"
};

function getCircleStyle(status: DayStatus) {
  switch (status) {
    case "future":
      return { backgroundColor: "rgba(0, 0, 0, 0.05)" };
    case "today-with-contribution":
    case "past-with-contribution":
      return { backgroundColor: "rgba(0, 0, 0, 0.20)" };
    case "today-without-contribution":
      return { backgroundColor: "rgba(0, 0, 0, 0.05)" };
    case "past-without-contribution":
      return { backgroundColor: "rgba(0, 0, 0, 0.1)" };
  }
}

const dayTextStyle = {
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "160%",
  letterSpacing: "-0.4px"
};

function getTextStyle(status: DayStatus) {
  switch (status) {
    case "future":
      return { color: "rgba(0, 0, 0, 0.3)" };
    case "today-with-contribution":
    case "today-without-contribution":
    case "past-with-contribution":
      return { color: "white" };
    case "past-without-contribution":
      return { color: "#FCFCFC" };
  }
}

const checkIconStyle = {
  color: "rgb(103, 164, 255)"
};

const labelTextStyle = {
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "160%",
  letterSpacing: "-0.4px"
};

function getLabelStyle(status: DayStatus) {
  switch (status) {
    case "future":
      return { color: "rgba(0, 0, 0, 0.15)" };
    case "today-with-contribution":
    case "past-with-contribution":
      return { color: "rgb(103, 164, 255)" };
    case "today-without-contribution":
    case "past-without-contribution":
      return { color: "rgba(0, 0, 0, 0.2)" };
  }
}

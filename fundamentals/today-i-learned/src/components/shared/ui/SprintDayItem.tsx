import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { SprintDay } from "@/types/sprint";
import { css } from "@styled-system/css";

const containerBase = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "8px",
  gap: "12px"
};

const containerSmall = {
  ...containerBase,
  width: "60px"
};

const containerLarge = {
  ...containerBase,
  width: "80px"
};

const circleBase = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "9999px"
};

const circleSmall = {
  ...circleBase,
  width: "60px",
  height: "60px"
};

const circleLarge = {
  ...circleBase,
  width: "80px",
  height: "80px"
};

const circleStyleMap = {
  future: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  todayWithContribution: {
    backgroundColor: "rgba(198, 218, 255, 0.6)"
  },
  todayWithoutContribution: {
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  pastWithContribution: {
    backgroundColor: "rgba(198, 218, 255, 0.6)"
  },
  pastWithoutContribution: {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
};

const dayText = {
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "160%",
  letterSpacing: "-0.4px"
};

const textStyleMap = {
  future: {
    ...dayText,
    color: "rgba(0, 0, 0, 0.3)"
  },
  contribution: {
    ...dayText,
    color: "white"
  },
  today: {
    ...dayText,
    color: "white"
  },
  default: {
    ...dayText,
    color: "#FCFCFC"
  }
};

const checkIcon = {
  color: "rgb(103, 164, 255)"
};

const labelText = {
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "160%",
  letterSpacing: "-0.4px"
};

const labelStyleMap = {
  contribution: {
    ...labelText,
    color: "rgb(103, 164, 255)"
  },
  future: {
    ...labelText,
    color: "rgba(0, 0, 0, 0.15)"
  },
  default: {
    ...labelText,
    color: "rgba(0, 0, 0, 0.2)"
  }
};

interface SprintDayItemProps {
  day: SprintDay;
  size?: "small" | "large";
}

export function SprintDayItem({ day, size = "small" }: SprintDayItemProps) {
  const containerStyle = size === "large" ? containerLarge : containerSmall;
  const circleStyle = size === "large" ? circleLarge : circleSmall;

  const getCircleStyles = () => {
    if (day.isFuture) return circleStyleMap.future;
    if (day.isToday) {
      return day.hasContribution 
        ? circleStyleMap.todayWithContribution 
        : circleStyleMap.todayWithoutContribution;
    }
    return day.hasContribution 
      ? circleStyleMap.pastWithContribution 
      : circleStyleMap.pastWithoutContribution;
  };

  const getTextStyles = () => {
    if (day.isFuture) return textStyleMap.future;
    if (day.hasContribution || day.isToday) return textStyleMap.contribution;
    return textStyleMap.default;
  };

  const getLabelStyles = () => {
    if (day.hasContribution) return labelStyleMap.contribution;
    if (day.isFuture) return labelStyleMap.future;
    return labelStyleMap.default;
  };

  const combinedCircleStyle = {
    ...circleStyle,
    ...getCircleStyles()
  };

  return (
    <div className={css(containerStyle)}>
      <div className={css(combinedCircleStyle)}>
        {day.hasContribution ? (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            className={css(checkIcon)}
          >
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <span className={css(getTextStyles())}>
            {day.isFuture
              ? format(day.date, "E", { locale: ko })
              : day.isToday
                ? "오늘"
                : format(day.date, "E", { locale: ko })
            }
          </span>
        )}
      </div>

      <span className={css(getLabelStyles())}>
        {day.dayOfWeek}
      </span>
    </div>
  );
}
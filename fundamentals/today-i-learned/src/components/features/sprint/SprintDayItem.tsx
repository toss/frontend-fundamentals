import type { SprintDay } from "./types";
import { css } from "@styled-system/css";

interface SprintDayItemProps {
  day: SprintDay;
}

/**
 * 원 안에 표시되는 텍스트 (1일차, 2일차, 3일차, 완료!)
 */
function getCircleText(day: SprintDay): string {
  // 3일차이고 기여가 있으면 "완료!" 표시
  if (day.dayIndex === 3 && day.hasContribution) {
    return "완료!";
  }
  // 기여가 있으면 항상 "N일차"로 표시
  if (day.hasContribution) {
    return `${day.dayIndex}일차`;
  }
  // 기여가 없고 오늘이면 "오늘"
  if (day.isToday) {
    return "오늘";
  }
  return `${day.dayIndex}일차`;
}

// 완료된 날 파란색
const COMPLETED_COLOR = "#67A4FF";

export function SprintDayItem({ day }: SprintDayItemProps) {
  const circleText = getCircleText(day);

  // 배경색 결정: 기여가 있으면 연한 파란색, 없으면 회색
  const backgroundColor = day.hasContribution
    ? "rgb(227, 238, 255)"
    : day.dayIndex === 1
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(0, 0, 0, 0.1)";

  // 텍스트 색상: 기여가 있으면 파란색, 없으면 흰색
  const textColor = day.hasContribution ? COMPLETED_COLOR : "#FCFCFC";
  // 라벨 색상: 기여가 있으면 파란색, 없으면 회색
  const labelColor = day.hasContribution
    ? COMPLETED_COLOR
    : "rgba(0, 0, 0, 0.2)";

  return (
    <div className={css(containerStyle)}>
      <div className={css(circleBaseStyle)} style={{ backgroundColor }}>
        <span className={css(dayTextStyle)} style={{ color: textColor }}>
          {circleText}
        </span>
      </div>

      <span className={css(labelTextStyle)} style={{ color: labelColor }}>
        {`${day.dayOfMonth}일`}
      </span>
    </div>
  );
}

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

const dayTextStyle = {
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "160%",
  letterSpacing: "-0.4px"
};

const labelTextStyle = {
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "160%",
  letterSpacing: "-0.4px"
};

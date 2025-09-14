import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { SprintDay } from "@/types/sprint";

interface SprintDayItemProps {
  day: SprintDay;
  size?: "small" | "large";
}

export function SprintDayItem({ day, size = "small" }: SprintDayItemProps) {
  const circleSize = size === "large" ? "w-[80px] h-[80px]" : "w-[60px] h-[60px]";
  const containerWidth = size === "large" ? "w-[80px]" : "w-[60px]";

  const circleStyles = day.isFuture
    ? "bg-black/5"
    : day.isToday
      ? day.hasContribution
        ? "bg-[#C6DAFF99]"
        : "bg-black/20"
      : day.hasContribution
        ? "bg-[#C6DAFF99]"
        : "bg-black/10";

  const textStyles = day.isFuture
    ? "text-black/30"
    : day.hasContribution || day.isToday
      ? "text-white"
      : "text-[#FCFCFC]";

  const labelStyles = day.hasContribution
    ? "text-[#67A4FF]"
    : day.isFuture
      ? "text-black/15"
      : "text-black/20";

  return (
    <div className={`flex flex-col items-center pb-2 gap-3 ${containerWidth}`}>
      <div className={`flex flex-col justify-center items-center ${circleSize} rounded-full ${circleStyles}`}>
        {day.hasContribution ? (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#67A4FF]"
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
          <span className={`text-[14px] font-bold leading-[160%] tracking-[-0.4px] ${textStyles}`}>
            {day.isFuture
              ? format(day.date, "E", { locale: ko })
              : day.isToday
                ? "오늘"
                : format(day.date, "E", { locale: ko })
            }
          </span>
        )}
      </div>

      <span className={`text-[14px] font-[600] leading-[160%] tracking-[-0.4px] ${labelStyles}`}>
        {day.dayOfWeek}
      </span>
    </div>
  );
}
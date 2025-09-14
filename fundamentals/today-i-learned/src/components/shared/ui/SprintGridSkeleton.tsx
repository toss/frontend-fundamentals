import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import { ko } from "date-fns/locale";

export function SprintGridSkeleton() {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <>
      {weekDays.map((date, index) => (
        <div
          key={index}
          className="flex flex-col items-center pb-2 gap-3 w-[60px]"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-black/5 animate-pulse" />
          <span className="text-[14px] font-[600] leading-[160%] tracking-[-0.4px] text-black/20">
            {format(date, "EEEE", { locale: ko })}
          </span>
        </div>
      ))}
    </>
  );
}
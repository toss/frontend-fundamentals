import type { SprintDay } from "@/types/sprint";
import { SprintDayItem } from "./SprintDayItem";

interface SprintGridProps {
  days: SprintDay[];
  isLoading?: boolean;
}

export function SprintGrid({ days }: SprintGridProps) {
  return (
    <div className="flex flex-row justify-center items-start px-6 pb-2 gap-[10px] w-full">
      <div className="flex flex-row items-center gap-4">
        {days.map((day, index) => (
          <SprintDayItem key={index} day={day} size="small" />
        ))}
      </div>
    </div>
  );
}

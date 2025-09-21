import type { SprintDay } from "@/types/sprint";
import { SprintDayItem } from "./SprintDayItem";
import { css } from "@styled-system/css";

interface SprintGridProps {
  days: SprintDay[];
  isLoading?: boolean;
}

export function SprintGrid({ days }: SprintGridProps) {
  return (
    <div className={gridContainer}>
      <div className={daysContainer}>
        {days.map((day, index) => (
          <SprintDayItem key={index} day={day} size="small" />
        ))}
      </div>
    </div>
  );
}

const gridContainer = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingX: '1.5rem',
  paddingBottom: '0.5rem',
  gap: '10px',
  width: '100%'
});

const daysContainer = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem'
});

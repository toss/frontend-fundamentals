import { Card } from "@/components/shared/ui/Card";
import { css } from "@styled-system/css";
import type { ChallengeDay } from "./types";
import { ChallengeDayItem } from "./ChallengeDayItem";

interface ChallengeCalendarProps {
  days: ChallengeDay[];
  isLoading?: boolean;
}

export function ChallengeCalendar({ days, isLoading }: ChallengeCalendarProps) {
  if (isLoading) {
    return (
      <Card variant="bordered" padding="md" className="w-full">
        <div className={cardContent}>
          <div className={calendarGrid}>
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className={skeletonDay} />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="bordered" padding="md" className={cardContainer}>
      <div className={cardContent}>
        {days.map((day) => (
          <ChallengeDayItem key={day.day} day={day} />
        ))}
      </div>
    </Card>
  );
}

const cardContainer = css({
  maxWidth: "32rem"
});

const cardContent = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.75rem"
});

const calendarGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "1rem",
  justifyItems: "center"
});

const skeletonDay = css({
  width: "3.5rem",
  height: "3.5rem",
  backgroundColor: "rgb(243, 244, 246)",
  borderRadius: "50%",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
});
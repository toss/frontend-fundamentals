import type { MonthlyChallenge } from "./types";
import { ChallengeHeader } from "./ChallengeHeader";
import { ChallengeCalendar } from "./ChallengeCalendar";
import { useMonthlyCalendar } from "./useMonthlyCalendar";
import { challengeContainer } from "@/pages/profile/MyPage";

export function MonthlyChallenge() {
  const { calendarData } = useMonthlyCalendar();

  return (
    <div className={challengeContainer}>
      <ChallengeHeader year={calendarData.year} month={calendarData.month} />
      <ChallengeCalendar days={calendarData.days} />
    </div>
  );
}

import { useMemo } from "react";
import { useSuspendedMyContributions } from "@/api/hooks/useDiscussions";
import { useAuth } from "@/contexts/AuthContext";
import type { ChallengeDay, MonthlyChallenge } from "./types";

export function useMonthlyCalendar() {
  const { user } = useAuth();
  const { data: contributions } = useSuspendedMyContributions();

  const calendarData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const days: ChallengeDay[] = [];

    const contributionsByDate = new Map<string, number>();
    contributions.forEach((contribution) => {
      const date = new Date(contribution.createdAt);
      if (
        date.getFullYear() === currentYear &&
        date.getMonth() + 1 === currentMonth
      ) {
        const dateKey = date.getDate().toString();
        contributionsByDate.set(
          dateKey,
          (contributionsByDate.get(dateKey) || 0) + 1
        );
      }
    });

    for (let day = 1; day <= daysInMonth; day++) {
      const today = now.getDate();
      const hasPost = contributionsByDate.has(day.toString());

      let status: ChallengeDay["status"] = "pending";
      if (day === today && hasPost) {
        status = "posted";
      } else if (day === today) {
        status = "today";
      } else if (hasPost) {
        status = "posted";
      } else if (day < today) {
        status = "pending";
      }

      days.push({
        day,
        status,
        streak: hasPost ? contributionsByDate.get(day.toString()) : undefined
      });
    }

    return {
      year: currentYear,
      month: currentMonth,
      days
    } as MonthlyChallenge;
  }, [contributions]);

  return {
    calendarData
  };
}

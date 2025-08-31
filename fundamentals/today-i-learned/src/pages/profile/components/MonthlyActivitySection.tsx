import { useMemo } from "react";
import { useTILContributions } from "@/hooks/useTILContributions";
import { MonthlyChallenge } from "@/pages/timeline/components/MonthlyChallenge";
import type { MonthlyChallenge as MonthlyChallengeType, ChallengeDay } from "@/types";
import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";

interface MonthlyActivitySectionProps extends BaseComponentProps {}

export function MonthlyActivitySection({ className }: MonthlyActivitySectionProps) {
  const { contributions } = useTILContributions();

  const monthlyChallenge = useMemo((): MonthlyChallengeType => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    // 현재 월의 시작일과 마지막일 계산
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0);
    const daysInMonth = endDate.getDate();

    const challengeDays: ChallengeDay[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth - 1, day);
      const dateStr = currentDate.toISOString().split("T")[0];
      
      // contributions에서 해당 날짜 찾기
      const contribution = contributions.find(c => c.date === dateStr);
      
      const isToday = currentDate.toDateString() === now.toDateString();
      const hasActivity = contribution?.hasActivity || false;
      
      let status: "completed" | "today" | "pending";
      let streak: number | undefined;
      
      if (isToday) {
        status = "today";
      } else if (hasActivity) {
        status = "completed";
        streak = contribution?.postCount || 0;
      } else {
        status = "pending";
      }

      challengeDays.push({
        day,
        date: dateStr,
        status,
        streak
      });
    }

    return {
      year: currentYear,
      month: currentMonth,
      days: challengeDays
    };
  }, [contributions]);

  return (
    <div className={cn("", className)}>
      <MonthlyChallenge challenge={monthlyChallenge} />
    </div>
  );
}
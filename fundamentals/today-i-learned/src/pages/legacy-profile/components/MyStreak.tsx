import { useMemo } from "react";
import { cn, getStreakColor, getStreakEmoji } from "@/libs/utils";
import { calculateStreaks, getThisWeekActivity } from "@/libs/streaks";
import type { BaseComponentProps } from "@/types";
import { useMyContributions } from "@/api/hooks/useDiscussions";
import { useAuth } from "@/contexts/AuthContext";

interface MyStreakProps extends BaseComponentProps {}

// 이번주 요일 배열 (월화수목금토일)
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export function MyStreak({ className }: MyStreakProps) {
  const { user } = useAuth();
  const { data: contributions = [], isLoading } = useMyContributions({
    enabled: !!user?.accessToken
  });

  const streakData = useMemo(() => {
    if (isLoading || !contributions.length) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        postsThisWeek: 0,
        weekActivity: Array(7).fill(false)
      };
    }

    const { currentStreak, longestStreak } = calculateStreaks(contributions);
    const weekActivity = getThisWeekActivity(contributions);
    const postsThisWeek = weekActivity.filter(Boolean).length;

    return {
      currentStreak,
      longestStreak,
      postsThisWeek,
      weekActivity
    };
  }, [contributions, isLoading]);

  const { currentStreak, longestStreak, postsThisWeek, weekActivity } =
    streakData;

  const dayTooltip = useMemo(() => {
    return (dayIndex: number) => {
      const dayNames = [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일"
      ];
      const hasActivity = weekActivity[dayIndex];
      return `${dayNames[dayIndex]} ${hasActivity ? "게시글 작성함" : "활동없음"}`;
    };
  }, [weekActivity]);

  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r p-4 shadow-sm",
        "from-[#ff8a80]/5 to-[#369870]/5",
        "dark:from-[#ff8a80]/10 dark:to-[#369870]/10 dark:border-[#ff8a80]/30",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Main streak display */}
        <div className="flex items-center gap-3">
          <div className="text-3xl" role="img" aria-label="Streak emoji">
            {getStreakEmoji(currentStreak)}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className={cn(
                  "text-2xl font-bold",
                  getStreakColor(currentStreak)
                )}
                aria-label={`${currentStreak}일 연속 학습`}
              >
                {currentStreak}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                일 연속
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {longestStreak > 0 ? `최장 ${longestStreak}일 • ` : ""}이번 주{" "}
              {postsThisWeek}개
            </div>
          </div>
        </div>

        {/* This week activity visualization */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1" role="group" aria-label="이번주 활동">
            {WEEKDAYS.map((day, index) => (
              <div
                key={`day-${index}`}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {day}
                </span>
                <div
                  className={cn(
                    "h-3 w-3 rounded-sm transition-opacity hover:opacity-80",
                    weekActivity[index]
                      ? "bg-[#ff8a80]"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}
                  title={dayTooltip(index)}
                  aria-label={dayTooltip(index)}
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">이번주</span>
        </div>
      </div>
    </div>
  );
}

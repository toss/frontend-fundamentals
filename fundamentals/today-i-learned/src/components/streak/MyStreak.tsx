import { useMemo } from "react";
import { cn, getStreakColor, getStreakEmoji, generateRecentActivity } from "@/lib/utils";
import type { StreakData, BaseComponentProps } from "@/types";
import { APP_CONSTANTS } from "@/constants";

interface MyStreakProps extends BaseComponentProps { }

// Mock data - should be replaced with API call
const mockStreakData: StreakData = {
  currentStreak: 7,
  longestStreak: 23,
  postsThisWeek: 5,
  totalPosts: 142,
  recentActivity: generateRecentActivity()
};

export function MyStreak({ className }: MyStreakProps) {
  const { currentStreak, longestStreak, postsThisWeek, recentActivity } = mockStreakData;

  const activityTooltip = useMemo(() => {
    return (dayIndex: number) => {
      const activity = recentActivity[dayIndex];
      const daysAgo = APP_CONSTANTS.RECENT_ACTIVITY_DAYS - dayIndex;
      const dayText = daysAgo === 1 ? "어제" : daysAgo === 0 ? "오늘" : `${daysAgo}일 전`;
      return `${dayText} ${activity.hasActivity ? "활동함" : "활동없음"}`;
    };
  }, [recentActivity]);

  return (
    <div className={cn(
      "rounded-lg bg-gradient-to-r p-4 shadow-sm",
      "from-[#ff8a80]/5 to-[#369870]/5",
      "dark:from-[#ff8a80]/10 dark:to-[#369870]/10 dark:border-[#ff8a80]/30",
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Main streak display */}
        <div className="flex items-center gap-3">
          <div className="text-3xl" role="img" aria-label="Streak emoji">
            {getStreakEmoji(currentStreak)}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className={cn("text-2xl font-bold", getStreakColor(currentStreak))}
                aria-label={`${currentStreak}일 연속 학습`}
              >
                {currentStreak}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                일 연속
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              최장 {longestStreak}일 • 이번 주 {postsThisWeek}개
            </div>
          </div>
        </div>

        {/* Recent activity visualization */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1" role="group" aria-label="최근 7일 활동">
            {recentActivity.map((activity, index) => (
              <div
                key={`activity-${activity.date}`}
                className={cn(
                  "h-2 w-2 rounded-sm transition-opacity hover:opacity-80",
                  activity.hasActivity
                    ? "bg-[#ff8a80]"
                    : "bg-gray-200 dark:bg-gray-700"
                )}
                title={activityTooltip(index)}
                aria-label={activityTooltip(index)}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">
            {APP_CONSTANTS.RECENT_ACTIVITY_DAYS}일
          </span>
        </div>
      </div>
    </div>
  );
}
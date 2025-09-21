import { getThisWeekRange } from "./date";
import { APP_CONSTANTS, STREAK_CONFIG } from "@/constants";
import type { ActivityDay } from "@/components/features/profile/types";

export const calculateStreaks = (discussions: any[]) => {
  if (!discussions || discussions.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dateGroups = new Map<string, number>();
  discussions.forEach((discussion) => {
    const date = new Date(discussion.createdAt);
    const dateKey = date.toISOString().split("T")[0];
    dateGroups.set(dateKey, (dateGroups.get(dateKey) || 0) + 1);
  });

  const sortedDates = Array.from(dateGroups.keys()).sort();

  if (sortedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let currentStreak = 0;
  const today = new Date();
  const todayDateKey = today.toISOString().split("T")[0];
  let currentDateKey = todayDateKey;

  while (true) {
    if (dateGroups.has(currentDateKey)) {
      currentStreak++;
      const date = new Date(currentDateKey + "T00:00:00Z");
      date.setUTCDate(date.getUTCDate() - 1);
      currentDateKey = date.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return { currentStreak, longestStreak };
};

export const getThisWeekActivity = (discussions: any[]) => {
  const { monday } = getThisWeekRange();
  const weekActivity = Array(7).fill(false);

  if (!discussions || discussions.length === 0) {
    return weekActivity;
  }

  discussions.forEach((discussion) => {
    const postDate = new Date(discussion.createdAt);
    const daysSinceMonday = Math.floor(
      (postDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceMonday >= 0 && daysSinceMonday < 7) {
      weekActivity[daysSinceMonday] = true;
    }
  });

  return weekActivity;
};

export const getStreakLevel = (
  streak: number
): keyof typeof STREAK_CONFIG.EMOJIS => {
  if (streak >= STREAK_CONFIG.EMOJI_THRESHOLDS.LEGENDARY) {
    return "LEGENDARY";
  }
  if (streak >= STREAK_CONFIG.EMOJI_THRESHOLDS.MASTER) {
    return "MASTER";
  }
  if (streak >= STREAK_CONFIG.EMOJI_THRESHOLDS.APPRENTICE) {
    return "APPRENTICE";
  }
  return "BEGINNER";
};

export const getStreakColor = (streak: number): string => {
  const level = getStreakLevel(streak);
  return STREAK_CONFIG.COLORS[level];
};

export const getStreakEmoji = (streak: number): string => {
  const level = getStreakLevel(streak);
  return STREAK_CONFIG.EMOJIS[level];
};

export const generateRecentActivity = (
  days: number = APP_CONSTANTS.RECENT_ACTIVITY_DAYS
): ActivityDay[] => {
  const today = new Date();
  const activities: ActivityDay[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    activities.push({
      date: date.toISOString().split("T")[0],
      hasActivity: Math.random() > 0.3,
      postCount: Math.floor(Math.random() * 3) + 1
    });
  }

  return activities;
};

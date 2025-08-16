import { getThisWeekRange } from "./date";

/**
 * discussions 데이터를 기반으로 현재 streak와 최장 streak 계산
 */
export const calculateStreaks = (discussions: any[]) => {
  if (!discussions || discussions.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // 날짜별로 그룹화 (UTC 기준으로 날짜만 추출)
  const dateGroups = new Map<string, number>();
  discussions.forEach((discussion) => {
    const date = new Date(discussion.createdAt);
    const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD
    dateGroups.set(dateKey, (dateGroups.get(dateKey) || 0) + 1);
  });

  const sortedDates = Array.from(dateGroups.keys()).sort();

  if (sortedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // 현재 streak 계산 (오늘부터 역순으로)
  let currentStreak = 0;
  const today = new Date();
  
  // UTC 기준으로 오늘 날짜 문자열 생성 (타임존 문제 방지)
  const todayDateKey = today.toISOString().split("T")[0];
  let currentDateKey = todayDateKey;

  while (true) {
    if (dateGroups.has(currentDateKey)) {
      currentStreak++;
      // 다음 날짜로 이동 (YYYY-MM-DD 형태에서 하루씩 빼기)
      const date = new Date(currentDateKey + "T00:00:00Z");
      date.setUTCDate(date.getUTCDate() - 1);
      currentDateKey = date.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  // 최장 streak 계산
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

/**
 * 이번주 활동 데이터 생성 (월요일부터 일요일까지)
 */
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

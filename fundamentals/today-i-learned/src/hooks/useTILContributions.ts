import { useMemo } from "react";
import type { ActivityDay } from "@/types";
import type { ContributionData } from "@/api/remote/discussions";
import { useMyContributions } from "@/api/hooks/useDiscussions";

// 기여도 레벨 계산 상수
const CONTRIBUTION_LEVELS = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  VERY_HIGH: 4
} as const;

export interface ContributionDay extends ActivityDay {
  level: 0 | 1 | 2 | 3 | 4;
}

interface TILContributionsData {
  contributions: ContributionDay[];
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  thisWeekCount: number;
  thisMonthCount: number;
}

// 기여도 레벨 계산 함수
const calculateContributionLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) {
    return CONTRIBUTION_LEVELS.NONE;
  }
  if (count === 1) {
    return CONTRIBUTION_LEVELS.LOW;
  }
  if (count <= 3) {
    return CONTRIBUTION_LEVELS.MEDIUM;
  }
  if (count <= 5) {
    return CONTRIBUTION_LEVELS.HIGH;
  }
  return CONTRIBUTION_LEVELS.VERY_HIGH;
};

// 1년간 날짜 배열 생성
const generateYearDates = (endDate: Date = new Date()): string[] => {
  const dates: string[] = [];
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 1);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// 연속 기록 계산
const calculateStreaks = (
  contributions: ContributionDay[]
): { current: number; longest: number } => {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // 최근 날짜부터 역순으로 현재 연속 기록 계산
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].hasActivity) {
      currentStreak++;
    } else {
      break;
    }
  }

  // 전체 기간에서 가장 긴 연속 기록 계산
  for (const contribution of contributions) {
    if (contribution.hasActivity) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { current: currentStreak, longest: longestStreak };
};

// 주간/월간 기여도 계산
const calculatePeriodCounts = (
  contributions: ContributionDay[]
): { week: number; month: number } => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let weekCount = 0;
  let monthCount = 0;

  for (const contribution of contributions) {
    const date = new Date(contribution.date);
    if (date >= weekAgo && contribution.hasActivity) {
      weekCount += contribution.postCount;
    }
    if (date >= monthAgo && contribution.hasActivity) {
      monthCount += contribution.postCount;
    }
  }

  return { week: weekCount, month: monthCount };
};

export function useTILContributions(): TILContributionsData {
  // 내가 작성한 TIL 포스트 데이터 가져오기 (경량화된 쿼리 사용)
  const { data: contributionsData } = useMyContributions();

  const processedData = useMemo(() => {
    const allContributions = contributionsData ?? [];
    const yearDates = generateYearDates();

    // 각 날짜별로 작성된 포스트 개수 계산
    const contributionsByDate = allContributions.reduce(
      (acc, contribution: ContributionData) => {
        const date = new Date(contribution.createdAt)
          .toISOString()
          .split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 기여도 데이터 생성
    const contributions: ContributionDay[] = yearDates.map((date) => {
      const postCount = contributionsByDate[date] || 0;
      return {
        date,
        hasActivity: postCount > 0,
        postCount,
        level: calculateContributionLevel(postCount)
      };
    });

    // 통계 계산
    const totalContributions = contributions.reduce(
      (sum, day) => sum + day.postCount,
      0
    );
    const streaks = calculateStreaks(contributions);
    const periodCounts = calculatePeriodCounts(contributions);

    return {
      contributions,
      totalContributions,
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
      thisWeekCount: periodCounts.week,
      thisMonthCount: periodCounts.month
    };
  }, [contributionsData]);

  return processedData;
}

import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  format,
  getDate,
  getWeekOfMonth
} from "date-fns";
import { ko } from "date-fns/locale";
import type { ContributionData } from "@/api/remote/discussions";
import type {
  SprintDay,
  StreakInfo,
  SprintData,
  SprintType
} from "@/components/features/sprint/types";

/**
 * 현재 연속 기록 일수를 계산합니다.
 */
export function calculateStreak(
  contributions: ContributionData[],
  today: Date
): StreakInfo {
  let currentStreak = 0;
  let streakStartDate = new Date(today);

  // 오늘부터 거꾸로 가면서 연속 일수 계산
  for (let i = 0; i >= -30; i--) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);

    const hasContribution = contributions.some((contribution) => {
      const contributionDate = new Date(contribution.createdAt);
      return isSameDay(contributionDate, checkDate);
    });

    if (hasContribution) {
      currentStreak++;
      streakStartDate = new Date(checkDate);
    } else {
      break;
    }
  }

  return { currentStreak, streakStartDate };
}

/**
 * 스프린트 타입을 결정합니다.
 */
export function determineSprintType(streakInfo: StreakInfo): SprintType {
  return streakInfo.currentStreak >= 3 ? "weekly" : "3-day";
}

/**
 * 스프린트 타입에 따른 제목을 생성합니다.
 */
export function getSprintTitle(type: SprintType, today: Date): string {
  if (type === "3-day") {
    return "3일 챌린지";
  }

  const currentMonth = today.getMonth() + 1;
  const weekOfMonth = getWeekOfMonth(today, { locale: ko });
  return `${currentMonth}월 ${weekOfMonth}주차 스프린트`;
}

/**
 * 스프린트 타입과 streak에 따른 메시지를 생성합니다.
 */
export function getSprintMessage(type: SprintType): string {
  if (type === "weekly") {
    return "매일의 작은 기록이, 성장의 시작이에요";
  }

  return "매일 한 줄이면 충분해요, 가볍게 도전해보세요!";
}

/**
 * 3일 챌린지용 날짜 배열을 생성합니다.
 */
function create3DayDates(streakInfo: StreakInfo, today: Date): Date[] {
  const days: Date[] = [];
  const streakLength = Math.min(streakInfo.currentStreak, 3);

  if (streakLength === 0) {
    // 연속 기록 없음: 오늘부터 3일
    for (let i = 0; i < 3; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }
  } else if (streakLength < 3) {
    // 연속 기록이 3일 미만: 기존 연속일 + 미래일
    for (let i = streakLength - 1; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      days.push(day);
    }

    const remainingDays = 3 - streakLength;
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }
  } else {
    // 3일 이상: 최근 3일
    for (let i = 2; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      days.push(day);
    }
  }

  return days;
}

/**
 * 일주일 챌린지용 날짜 배열을 생성합니다.
 */
function createWeeklyDates(today: Date): Date[] {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
}

/**
 * 날짜 배열을 SprintDay 배열로 변환합니다.
 */
function createSprintDays(
  dates: Date[],
  contributions: ContributionData[],
  today: Date
): SprintDay[] {
  return dates.map((date) => {
    const hasContribution = contributions.some((contribution) => {
      const contributionDate = new Date(contribution.createdAt);
      return isSameDay(contributionDate, date);
    });

    const isToday = isSameDay(date, today);
    const isFuture = date > today;

    return {
      date,
      dayOfWeek: format(date, "EEEE", { locale: ko }),
      dayOfMonth: getDate(date),
      hasContribution: isFuture ? false : hasContribution,
      isToday,
      isFuture
    };
  });
}

/**
 * 기여도 데이터로부터 완전한 스프린트 데이터를 생성합니다.
 */
export function createSprintData(
  contributions: ContributionData[],
  today: Date
): SprintData {
  const streakInfo = calculateStreak(contributions, today);
  const type = determineSprintType(streakInfo);
  const title = getSprintTitle(type, today);
  const message = getSprintMessage(type);

  const dates =
    type === "3-day"
      ? create3DayDates(streakInfo, today)
      : createWeeklyDates(today);

  const days = createSprintDays(dates, contributions, today);

  return {
    type,
    title,
    message,
    days
  };
}

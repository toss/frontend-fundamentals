export interface SprintDay {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: number;
  dayIndex: number; // 1일차, 2일차, 3일차 등
  hasContribution: boolean;
  isToday: boolean;
  isFuture?: boolean;
}

export interface StreakInfo {
  currentStreak: number;
  streakStartDate: Date;
}

export type SprintType = "3-day" | "weekly";

export interface SprintData {
  type: SprintType;
  title: string;
  message: string;
  days: SprintDay[];
  isCompleted: boolean;
}

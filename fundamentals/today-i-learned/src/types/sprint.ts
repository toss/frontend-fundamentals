export interface SprintDay {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: number;
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
}
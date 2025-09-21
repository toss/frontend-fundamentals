export interface ChallengeDay {
  day: number;
  date?: string;
  status: "completed" | "today" | "pending" | "posted";
  streak?: number;
}

export interface MonthlyChallenge {
  year: number;
  month: number;
  days: ChallengeDay[];
}
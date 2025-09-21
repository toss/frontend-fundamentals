// === Streak & Activity Types ===

export interface ActivityDay {
  date: string;
  hasActivity: boolean;
  postCount: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  postsThisWeek: number;
  totalPosts: number;
  recentActivity: ActivityDay[];
}
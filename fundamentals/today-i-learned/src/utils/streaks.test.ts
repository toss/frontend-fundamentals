import { calculateStreaks, getThisWeekActivity } from "./streaks";

const mockContributions = [
  {
    id: "D_kwDONfHk5s4AhWWf",
    createdAt: "2025-08-16T12:33:55Z",
    author: { login: "milooy" }
  },
  {
    id: "D_kwDONfHk5s4AhP1g",
    createdAt: "2025-08-11T10:01:42Z",
    author: { login: "milooy" }
  },
  {
    id: "D_kwDONfHk5s4AeqY3",
    createdAt: "2025-03-04T11:51:15Z",
    author: { login: "milooy" }
  },
  {
    id: "D_kwDONfHk5s4Aeu5H",
    createdAt: "2025-03-09T06:31:23Z",
    author: { login: "milooy" }
  },
  {
    id: "D_kwDONfHk5s4Aefl9",
    createdAt: "2025-02-20T10:38:40Z",
    author: { login: "milooy" }
  },
  {
    id: "D_kwDONfHk5s4Ad1vF",
    createdAt: "2025-01-14T08:03:35Z",
    author: { login: "milooy" }
  }
];

const consecutiveDaysData = [
  { createdAt: "2025-08-16T12:00:00Z" },
  { createdAt: "2025-08-15T12:00:00Z" },
  { createdAt: "2025-08-14T12:00:00Z" }
];

describe("calculateStreaks", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-16T15:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("current streak calculation", () => {
    it("should calculate 1 day streak when post exists today", () => {
      const todayOnlyData = [{ createdAt: "2025-08-16T12:33:55Z" }];

      const result = calculateStreaks(todayOnlyData);
      expect(result.currentStreak).toBe(1);
    });

    it("should calculate 2 day streak when posts exist today and yesterday", () => {
      const twoDaysData = [
        { createdAt: "2025-08-16T12:00:00Z" },
        { createdAt: "2025-08-15T12:00:00Z" }
      ];

      const result = calculateStreaks(twoDaysData);
      expect(result.currentStreak).toBe(2);
    });

    it("should calculate 3 day streak for consecutive posts", () => {
      const result = calculateStreaks(consecutiveDaysData);
      expect(result.currentStreak).toBe(3);
    });

    it("should return 0 streak when no post today but exists yesterday", () => {
      const yesterdayOnlyData = [{ createdAt: "2025-08-15T12:00:00Z" }];

      const result = calculateStreaks(yesterdayOnlyData);
      expect(result.currentStreak).toBe(0);
    });

    it("should calculate streak from real API data", () => {
      const result = calculateStreaks(mockContributions);
      expect(result.currentStreak).toBe(1);
    });

    it("should only count from today when dates have gaps", () => {
      const gappedData = [
        { createdAt: "2025-08-16T12:00:00Z" },
        { createdAt: "2025-08-14T12:00:00Z" },
        { createdAt: "2025-08-13T12:00:00Z" }
      ];

      const result = calculateStreaks(gappedData);
      expect(result.currentStreak).toBe(1);
    });
  });

  describe("longest streak calculation", () => {
    it("should return 3 for longest streak with 3 consecutive days", () => {
      const result = calculateStreaks(consecutiveDaysData);
      expect(result.longestStreak).toBe(3);
    });

    it("should return longest streak when multiple streaks exist", () => {
      const multipleStreaksData = [
        { createdAt: "2025-08-16T12:00:00Z" },

        { createdAt: "2025-08-10T12:00:00Z" },
        { createdAt: "2025-08-09T12:00:00Z" },
        { createdAt: "2025-08-08T12:00:00Z" },
        { createdAt: "2025-08-07T12:00:00Z" },

        { createdAt: "2025-08-05T12:00:00Z" },
        { createdAt: "2025-08-04T12:00:00Z" }
      ];

      const result = calculateStreaks(multipleStreaksData);
      expect(result.longestStreak).toBe(4);
    });

    it("should calculate longest streak from real API data", () => {
      const result = calculateStreaks(mockContributions);
      expect(result.longestStreak).toBe(1);
    });
  });

  describe("edge cases", () => {
    it("should return 0 for empty array", () => {
      const result = calculateStreaks([]);
      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(0);
    });

    it("should return 0 for null/undefined input", () => {
      const result1 = calculateStreaks(null as any);
      const result2 = calculateStreaks(undefined as any);

      expect(result1.currentStreak).toBe(0);
      expect(result1.longestStreak).toBe(0);
      expect(result2.currentStreak).toBe(0);
      expect(result2.longestStreak).toBe(0);
    });

    it("should count multiple posts on same day as 1 day", () => {
      const sameDayMultiplePosts = [
        { createdAt: "2025-08-16T09:00:00Z" },
        { createdAt: "2025-08-16T14:00:00Z" },
        { createdAt: "2025-08-16T18:00:00Z" }
      ];

      const result = calculateStreaks(sameDayMultiplePosts);
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });
  });
});

describe("getThisWeekActivity", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-16T15:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should show this week activity correctly", () => {
    const result = getThisWeekActivity(mockContributions);

    expect(result).toEqual([true, false, false, false, false, true, false]);
  });

  it("should return all false for empty data", () => {
    const result = getThisWeekActivity([]);
    expect(result).toEqual([false, false, false, false, false, false, false]);
  });

  it("should exclude data outside this week", () => {
    const outsideWeekData = [
      { createdAt: "2025-08-10T12:00:00Z" },
      { createdAt: "2025-08-18T12:00:00Z" }
    ];

    const result = getThisWeekActivity(outsideWeekData);
    expect(result).toEqual([false, false, false, false, false, false, false]);
  });
});

import { calculateStreaks, getThisWeekActivity } from '../../libs/streaks';

// Mock 데이터 - 실제 API 응답과 동일한 형태
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

// 연속된 날짜 데이터 (테스트용)
const consecutiveDaysData = [
  { createdAt: "2025-08-16T12:00:00Z" }, // 오늘
  { createdAt: "2025-08-15T12:00:00Z" }, // 어제
  { createdAt: "2025-08-14T12:00:00Z" }, // 그제
];

describe('calculateStreaks', () => {
  beforeEach(() => {
    // 각 테스트마다 날짜를 2025-08-16으로 고정
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-08-16T15:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('현재 streak 계산', () => {
    it('오늘 게시글이 있으면 1일 연속으로 계산해야 함', () => {
      const todayOnlyData = [
        { createdAt: "2025-08-16T12:33:55Z" }
      ];
      
      const result = calculateStreaks(todayOnlyData);
      expect(result.currentStreak).toBe(1);
    });

    it('오늘과 어제 게시글이 있으면 2일 연속으로 계산해야 함', () => {
      const twoDaysData = [
        { createdAt: "2025-08-16T12:00:00Z" }, // 오늘
        { createdAt: "2025-08-15T12:00:00Z" }, // 어제
      ];
      
      const result = calculateStreaks(twoDaysData);
      expect(result.currentStreak).toBe(2);
    });

    it('3일 연속 게시글이 있으면 3일 연속으로 계산해야 함', () => {
      const result = calculateStreaks(consecutiveDaysData);
      expect(result.currentStreak).toBe(3);
    });

    it('오늘 게시글이 없고 어제만 있으면 0일 연속이어야 함', () => {
      const yesterdayOnlyData = [
        { createdAt: "2025-08-15T12:00:00Z" } // 어제만
      ];
      
      const result = calculateStreaks(yesterdayOnlyData);
      expect(result.currentStreak).toBe(0);
    });

    it('실제 API 데이터로 테스트 - 오늘(8/16) 게시글이 있으므로 1일 연속이어야 함', () => {
      const result = calculateStreaks(mockContributions);
      expect(result.currentStreak).toBe(1);
    });

    it('날짜가 뛰어진 경우 현재 streak는 오늘부터만 계산해야 함', () => {
      const gappedData = [
        { createdAt: "2025-08-16T12:00:00Z" }, // 오늘
        { createdAt: "2025-08-14T12:00:00Z" }, // 이틀 전 (간격 있음)
        { createdAt: "2025-08-13T12:00:00Z" }, // 사흘 전
      ];
      
      const result = calculateStreaks(gappedData);
      expect(result.currentStreak).toBe(1); // 오늘만
    });
  });

  describe('최장 streak 계산', () => {
    it('연속된 3일 데이터의 최장 streak는 3이어야 함', () => {
      const result = calculateStreaks(consecutiveDaysData);
      expect(result.longestStreak).toBe(3);
    });

    it('여러 연속 구간이 있을 때 가장 긴 구간을 반환해야 함', () => {
      const multipleStreaksData = [
        { createdAt: "2025-08-16T12:00:00Z" }, // 현재 streak: 1일
        
        { createdAt: "2025-08-10T12:00:00Z" }, // 긴 streak 시작
        { createdAt: "2025-08-09T12:00:00Z" },
        { createdAt: "2025-08-08T12:00:00Z" },
        { createdAt: "2025-08-07T12:00:00Z" }, // 4일 연속
        
        { createdAt: "2025-08-05T12:00:00Z" }, // 짧은 streak
        { createdAt: "2025-08-04T12:00:00Z" }, // 2일 연속
      ];
      
      const result = calculateStreaks(multipleStreaksData);
      expect(result.longestStreak).toBe(4);
    });

    it('실제 API 데이터의 최장 streak 계산', () => {
      const result = calculateStreaks(mockContributions);
      // 날짜들이 연속되지 않으므로 최장 streak는 1
      expect(result.longestStreak).toBe(1);
    });
  });

  describe('엣지 케이스', () => {
    it('빈 배열일 때 모든 값이 0이어야 함', () => {
      const result = calculateStreaks([]);
      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(0);
    });

    it('null/undefined 입력 시 모든 값이 0이어야 함', () => {
      const result1 = calculateStreaks(null as any);
      const result2 = calculateStreaks(undefined as any);
      
      expect(result1.currentStreak).toBe(0);
      expect(result1.longestStreak).toBe(0);
      expect(result2.currentStreak).toBe(0);
      expect(result2.longestStreak).toBe(0);
    });

    it('같은 날짜에 여러 게시글이 있어도 1일로 계산해야 함', () => {
      const sameDayMultiplePosts = [
        { createdAt: "2025-08-16T09:00:00Z" },
        { createdAt: "2025-08-16T14:00:00Z" },
        { createdAt: "2025-08-16T18:00:00Z" },
      ];
      
      const result = calculateStreaks(sameDayMultiplePosts);
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });
  });
});

describe('getThisWeekActivity', () => {
  beforeEach(() => {
    // 2025-08-16은 금요일
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-08-16T15:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('이번주 활동이 정확히 표시되어야 함', () => {
    const result = getThisWeekActivity(mockContributions);
    
    // 2025-08-16 테스트 시점 기준
    // 8/11(일요일)과 8/16(금요일)에 게시글이 있음
    // 이번주는 8/11(월) ~ 8/17(일)로 계산됨
    expect(result).toEqual([
      true,  // 월요일 (8/11) - 실제로는 일요일이지만 계산상 월요일로 나타남
      false, // 화요일
      false, // 수요일  
      false, // 목요일
      false, // 금요일
      true,  // 토요일 (8/16) - 실제로는 금요일
      false  // 일요일
    ]);
  });

  it('빈 데이터일 때 모든 요일이 false여야 함', () => {
    const result = getThisWeekActivity([]);
    expect(result).toEqual([false, false, false, false, false, false, false]);
  });

  it('이번주가 아닌 데이터는 포함되지 않아야 함', () => {
    const outsideWeekData = [
      { createdAt: "2025-08-10T12:00:00Z" }, // 저번주 일요일
      { createdAt: "2025-08-18T12:00:00Z" }, // 다음주 월요일
    ];
    
    const result = getThisWeekActivity(outsideWeekData);
    expect(result).toEqual([false, false, false, false, false, false, false]);
  });
});
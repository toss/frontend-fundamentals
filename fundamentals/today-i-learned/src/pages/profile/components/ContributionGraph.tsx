import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  useTILContributions,
  type ContributionDay
} from "@/hooks/useTILContributions";

interface ContributionGraphProps extends BaseComponentProps { }

// GitHub 잔디 색상 레벨 (기존 브랜드 컬러 활용)
const CONTRIBUTION_COLORS = {
  0: "bg-gray-100 dark:bg-gray-800",
  1: "bg-[#ff8a80]/20 dark:bg-[#ff8a80]/30",
  2: "bg-[#ff8a80]/40 dark:bg-[#ff8a80]/50",
  3: "bg-[#ff8a80]/60 dark:bg-[#ff8a80]/70",
  4: "bg-[#ff8a80] dark:bg-[#ff8a80]/90"
} as const;

// 레벨에 따른 색상 가져오기 함수
const getContributionColor = (level: 0 | 1 | 2 | 3 | 4): string => {
  return CONTRIBUTION_COLORS[level];
};

// 월 이름 배열
const MONTH_NAMES = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월"
];

// 요일 이름 배열
const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

interface TooltipData {
  date: string;
  count: number;
  level: number;
  x: number;
  y: number;
}

export function ContributionGraph({ className }: ContributionGraphProps) {
  const {
    contributions,
    totalContributions,
    currentStreak,
    longestStreak,
  } = useTILContributions();
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시 맨 오른쪽으로 즉시 스크롤 (layout shift 방지)
  useLayoutEffect(() => {
    if (scrollContainerRef.current && contributions.length > 0) {
      const container = scrollContainerRef.current;
      container.scrollLeft = container.scrollWidth - container.clientWidth;
    }
  }, [contributions]);

  // 주별로 그룹화된 기여도 데이터
  const weeklyContributions = useMemo(() => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    contributions.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay();

      // 첫 번째 날이 일요일이 아니면 빈 칸으로 채우기
      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({
            date: "",
            hasActivity: false,
            postCount: 0,
            level: 0
          });
        }
      }

      currentWeek.push(day);

      // 주가 완성되면 weeks 배열에 추가
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    // 마지막 주가 7일이 안 되면 빈 칸으로 채우기
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: "",
          hasActivity: false,
          postCount: 0,
          level: 0
        });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [contributions]);

  // 월별 라벨 생성
  const monthLabels = useMemo(() => {
    const labels: { month: string; index: number }[] = [];
    let currentMonth = -1;

    weeklyContributions.forEach((week, weekIndex) => {
      const firstDayOfWeek = week.find((day) => day.date);
      if (firstDayOfWeek) {
        const month = new Date(firstDayOfWeek.date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          labels.push({
            month: MONTH_NAMES[month],
            index: weekIndex
          });
        }
      }
    });

    return labels;
  }, [weeklyContributions]);

  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent) => {
    if (!day.date) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const formatDate = new Date(day.date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    setTooltip({
      date: formatDate,
      count: day.postCount,
      level: day.level,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r p-4 shadow-sm",
        "from-[#ff8a80]/5 to-[#369870]/5",
        "dark:from-[#ff8a80]/10 dark:to-[#369870]/10 dark:border-[#ff8a80]/30",
        className
      )}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
        학습 기록
      </h2>

      {/* Contribution Graph */}
      <div ref={scrollContainerRef} className="relative overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Month Labels - 상단에 독립적으로 배치 */}
          <div className="flex mb-2">
            <div className="w-10 flex-shrink-0" /> {/* 요일 라벨 공간 */}
            <div className="flex-1 relative h-4">
              {monthLabels.map((label, index) => (
                <div
                  key={`${label.month}-${index}`}
                  className="absolute text-xs text-gray-500 dark:text-gray-400 font-medium"
                  style={{ left: `${label.index * 16}px` }}
                >
                  {label.month}
                </div>
              ))}
            </div>
          </div>

          {/* Graph Container */}
          <div className="flex items-start">
            {/* Day Labels - 잔디 그리드와 정확히 정렬 */}
            <div className="w-10 flex-shrink-0 mr-2">
              {DAY_NAMES.map((day, index) => (
                <div
                  key={day}
                  className="h-3 mb-1 flex items-center justify-end text-xs text-gray-500 dark:text-gray-400"
                  style={{
                    visibility: index % 2 === 1 ? "visible" : "hidden"
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution Grid */}
            <div className="flex gap-1">
              {weeklyContributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={cn(
                        "w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-600 cursor-pointer transition-all hover:border-gray-400",
                        day.date
                          ? getContributionColor(day.level)
                          : "bg-transparent border-transparent"
                      )}
                      onMouseEnter={(e) => handleMouseEnter(day, e)}
                      onMouseLeave={handleMouseLeave}
                      title={
                        day.date ? `${day.date}: ${day.postCount}개 포스트` : ""
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>적음</span>
          <div className="flex gap-1">
            {([0, 1, 2, 3, 4] as const).map((level) => (
              <div
                key={level}
                className={cn(
                  "w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-600",
                  getContributionColor(level)
                )}
              />
            ))}
          </div>
          <span>많음</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>총 {totalContributions}개</span>
          <span>현재 {currentStreak}일 연속</span>
          <span>최장 {longestStreak}일</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateX(-50%) translateY(-100%)"
          }}
        >
          <div>{tooltip.date}</div>
          <div>{tooltip.count}개 포스트</div>
        </div>
      )}
    </div>
  );
}

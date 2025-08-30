import { Card } from "@/components/shared/ui/Card";
import { cn } from "@/libs/cn";
import type { MonthlyChallengeProps, ChallengeDay } from "../utils/types";

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

function ChallengeDayItem({ day }: { day: ChallengeDay }) {
  const getDayStyle = () => {
    switch (day.status) {
      case "completed":
        // 완료된 날들의 다양한 색상 (피그마 디자인 매치)
        const colors = [
          "bg-black/10 text-black/40", // 1일차
          "bg-[rgba(188,233,233,0.2)] text-[#58C7C7]", // 2일차
          "bg-[rgba(237,204,248,0.4)] text-[#DA9BEF]", // 3일차
          "bg-[rgba(255,239,191,0.6)] text-[#FFC342]", // 4일차
          "bg-[rgba(255,212,214,0.2)] text-[#FB8890]", // 5일차
          "bg-[rgba(188,233,233,0.2)] text-[#58C7C7]", // 6일차
          "bg-[rgba(188,233,233,0.2)] text-[#58C7C7]", // 7일차
          "bg-[rgba(255,212,214,0.2)] text-[#FB8890]", // 8일차
          "bg-[rgba(255,239,191,0.6)] text-[#FFC342]", // 9일차
          "bg-black/10 text-black/40" // 10일차
        ];
        const colorIndex = (day.day - 1) % colors.length;
        return colors[colorIndex];
      case "today":
        return "bg-black/70 text-[#FCFCFC]";
      default:
        return "bg-black/5 text-black/60";
    }
  };

  const getStreakLabel = () => {
    if (day.status === "completed" && day.streak) {
      return `${day.streak}일차`;
    }
    if (day.status === "today") {
      return "오늘";
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold",
          getDayStyle()
        )}
      >
        {getStreakLabel()}
      </div>
      <span className="text-sm font-medium text-gray-600">{day.day}일</span>
    </div>
  );
}

export function MonthlyChallenge({ challenge }: MonthlyChallengeProps) {
  const monthName = MONTH_NAMES[challenge.month - 1];

  // 7x5 그리드로 배치 (주단위)
  const weeks = [];
  for (let i = 0; i < challenge.days.length; i += 7) {
    weeks.push(challenge.days.slice(i, i + 7));
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="space-y-2 mt-5">
        <h3 className="text-2xl font-extrabold text-black tracking-tight">
          Monthly Challenge
        </h3>
        <p className="text-base font-semibold text-black/60 tracking-tight">
          {challenge.year}년 {monthName} 한 달 기록
        </p>
      </div>
      <Card variant="bordered" padding="md" className="w-full">
        {/* 캘린더 그리드 */}
        <div className="space-y-4">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 gap-4 justify-items-center"
            >
              {week.map((day) => (
                <ChallengeDayItem key={day.day} day={day} />
              ))}
              {/* 빈 칸 채우기 (마지막 주가 7일 미만인 경우) */}
              {week.length < 7 &&
                Array.from({ length: 7 - week.length }).map((_, emptyIndex) => (
                  <div key={`empty-${emptyIndex}`} className="w-14 h-14" />
                ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

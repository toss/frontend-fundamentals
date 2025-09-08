import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchMyContributions } from "@/api/remote/discussions";
import type { ContributionData } from "@/api/remote/discussions";
import { ENV_CONFIG } from "@/libs/env";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  getWeekOfMonth,
  format,
  getDate
} from "date-fns";
import { ko } from "date-fns/locale";

export function SprintChallenge({
  onContributionsLoaded
}: {
  onContributionsLoaded?: () => void;
} = {}) {
  const { user } = useAuth();
  const [sprintDays, setSprintDays] = useState<SprintDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const weekOfMonth = getWeekOfMonth(today, { locale: ko });

  const loadContributions = async () => {
    if (!user?.accessToken || !user?.login) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const contributions = await fetchMyContributions({
        owner: ENV_CONFIG.GITHUB_OWNER,
        repo: ENV_CONFIG.GITHUB_REPO,
        accessToken: user.accessToken,
        authorLogin: user.login
      });

      const days = createSprintDays(contributions, today);
      setSprintDays(days);
      onContributionsLoaded?.();
    } catch (error) {
      console.error("Failed to load contributions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContributions();
  }, [user]);

  // 외부에서 refetch를 트리거할 수 있도록 함수 노출
  useEffect(() => {
    const handleRefetch = () => loadContributions();
    window.addEventListener("refetchContributions", handleRefetch);
    return () =>
      window.removeEventListener("refetchContributions", handleRefetch);
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-start px-6 gap-[10px] w-full">
      <div className="flex flex-col items-start p-6 gap-2 w-full bg-white border border-[rgba(201,201,201,0.5)] rounded-2xl">
        <SprintHeader title={`${currentMonth}월 ${weekOfMonth}주차 스프린트`} />
        <SprintDaysGrid sprintDays={sprintDays} isLoading={isLoading} />
      </div>
    </div>
  );
}

interface SprintDay {
  date: Date;
  dayOfWeek: string;
  dayOfMonth: number;
  hasContribution: boolean;
  isToday: boolean;
}

function createSprintDays(
  contributions: ContributionData[],
  today: Date
): SprintDay[] {
  // 월요일부터 시작하는 주의 모든 날짜 가져오기
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 1 = Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return weekDays.map((date) => {
    const hasContribution = contributions.some((contribution) => {
      const contributionDate = new Date(contribution.createdAt);
      return isSameDay(contributionDate, date);
    });

    return {
      date,
      dayOfWeek: format(date, "EEEE", { locale: ko }),
      dayOfMonth: getDate(date),
      hasContribution,
      isToday: isSameDay(date, today)
    };
  });
}

function SprintHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-row justify-center items-start px-6 pb-6 w-full">
      <div className="flex flex-col items-center pt-2">
        <div className="flex flex-row justify-center items-center pb-5 gap-[10px]">
          <h2 className="text-[24px] font-[800] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
            {title}
          </h2>
        </div>
        <p className="text-[16px] font-[600] leading-[130%] tracking-[-0.4px] text-black/60">
          매일의 작은 기록이, 성장의 시작이예요.
        </p>
      </div>
    </div>
  );
}

function SprintDayItem({ day }: { day: SprintDay }) {
  const circleStyles = day.isToday
    ? day.hasContribution
      ? "bg-black"
      : "bg-black/20"
    : day.hasContribution
      ? "bg-black/60"
      : "bg-black/10";

  const textStyles =
    day.hasContribution || day.isToday ? "text-white" : "text-[#FCFCFC]";

  return (
    <div className="flex flex-col items-center pb-2 gap-3 w-[60px]">
      <div
        className={`flex flex-col justify-center items-center w-[60px] h-[60px] rounded-full ${circleStyles}`}
      >
        <span
          className={`text-[14px] font-bold leading-[160%] tracking-[-0.4px] ${textStyles}`}
        >
          {day.isToday ? "오늘" : format(day.date, "E", { locale: ko })}
        </span>
      </div>
      <span className="text-[14px] font-[600] leading-[160%] tracking-[-0.4px] text-black/20">
        {day.dayOfWeek}
      </span>
    </div>
  );
}

function SprintDaysSkeleton() {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex flex-row items-center gap-4">
      {weekDays.map((date, index) => (
        <div
          key={index}
          className="flex flex-col items-center pb-2 gap-3 w-[60px]"
        >
          <div className="w-[60px] h-[60px] rounded-full bg-black/5 animate-pulse" />
          <span className="text-[14px] font-[600] leading-[160%] tracking-[-0.4px] text-black/20">
            {format(date, "EEEE", { locale: ko })}
          </span>
        </div>
      ))}
    </div>
  );
}

function SprintDaysGrid({
  sprintDays,
  isLoading
}: {
  sprintDays: SprintDay[];
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-row justify-center items-start px-6 pb-2 gap-[10px] w-full">
      <div className="flex flex-row items-center gap-4">
        {isLoading ? (
          <SprintDaysSkeleton />
        ) : (
          sprintDays.map((day, index) => (
            <SprintDayItem key={index} day={day} />
          ))
        )}
      </div>
    </div>
  );
}

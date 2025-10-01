import { Card } from "@/components/shared/ui/Card";
import { css, cx } from "@styled-system/css";
import type { ChallengeDay, MonthlyChallenge } from "./types";
import { useMyContributions } from "@/api/hooks/useDiscussions";
import { useMemo } from "react";
import { Check } from "lucide-react";

interface MonthlyChallengeProps {
  challenge?: MonthlyChallenge;
  onDayClick?: (day: number) => void;
}

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
        const colors = [
          css({
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "rgba(0, 0, 0, 0.4)"
          }),
          css({
            backgroundColor: "rgba(188, 233, 233, 0.2)",
            color: "#58C7C7"
          }),
          css({
            backgroundColor: "rgba(237, 204, 248, 0.4)",
            color: "#DA9BEF"
          }),
          css({
            backgroundColor: "rgba(255, 239, 191, 0.6)",
            color: "#FFC342"
          }),
          css({
            backgroundColor: "rgba(255, 212, 214, 0.2)",
            color: "#FB8890"
          }),
          css({
            backgroundColor: "rgba(188, 233, 233, 0.2)",
            color: "#58C7C7"
          }),
          css({
            backgroundColor: "rgba(188, 233, 233, 0.2)",
            color: "#58C7C7"
          }),
          css({
            backgroundColor: "rgba(255, 212, 214, 0.2)",
            color: "#FB8890"
          }),
          css({
            backgroundColor: "rgba(255, 239, 191, 0.6)",
            color: "#FFC342"
          }),
          css({
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "rgba(0, 0, 0, 0.4)"
          })
        ];
        const colorIndex = (day.day - 1) % colors.length;
        return colors[colorIndex];
      case "posted":
        return postedDayStyle;
      case "today":
        return todayStyle;
      default:
        return pendingDayStyle;
    }
  };

  const getStreakLabel = () => {
    if (day.status === "completed" && day.streak) {
      return `${day.streak}일차`;
    }
    if (day.status === "posted") {
      return <Check size={20} strokeWidth={3} />;
    }
    if (day.status === "today") {
      return "오늘";
    }
    return null;
  };

  return (
    <div className={dayItemContainer}>
      <div className={cx(dayCircle, getDayStyle())}>{getStreakLabel()}</div>
      <span className={dayLabel}>{day.day}일</span>
    </div>
  );
}

export function MonthlyChallenge({ challenge }: MonthlyChallengeProps) {
  const { data: contributions, isLoading } = useMyContributions();

  // 현재 년월 계산
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // API 데이터를 기반으로 캘린더 생성
  const calendarData = useMemo(() => {
    if (!contributions) {
      return null;
    }

    // 현재 월의 일수 계산
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const days: ChallengeDay[] = [];

    // 기여도 데이터를 날짜별로 그룹화
    const contributionsByDate = new Map<string, number>();
    contributions.forEach((contribution) => {
      const date = new Date(contribution.createdAt);
      if (
        date.getFullYear() === currentYear &&
        date.getMonth() + 1 === currentMonth
      ) {
        const dateKey = date.getDate().toString();
        contributionsByDate.set(
          dateKey,
          (contributionsByDate.get(dateKey) || 0) + 1
        );
      }
    });

    // 각 날짜에 대한 상태 결정
    for (let day = 1; day <= daysInMonth; day++) {
      const today = now.getDate();
      const hasPost = contributionsByDate.has(day.toString());

      let status: ChallengeDay["status"] = "pending";
      if (day === today && hasPost) {
        // 오늘이면서 글도 작성한 경우 - posted로 표시 (오늘 작성했다는 의미)
        status = "posted";
      } else if (day === today) {
        // 오늘이지만 글 작성 안한 경우
        status = "today";
      } else if (hasPost) {
        // 오늘이 아니지만 글 작성한 경우
        status = "posted";
      } else if (day < today) {
        // 지나간 날이지만 글 작성 안한 경우
        status = "pending";
      }

      days.push({
        day,
        status,
        streak: hasPost ? contributionsByDate.get(day.toString()) : undefined
      });
    }

    return {
      year: currentYear,
      month: currentMonth,
      days
    };
  }, [contributions, currentYear, currentMonth]);

  const monthName = MONTH_NAMES[currentMonth - 1];
  const displayData = calendarData || challenge;

  if (isLoading || !displayData) {
    return (
      <div className={challengeContainer}>
        <div className={headerSection}>
          <h3 className={mainTitle}>월간 기록</h3>
          <p className={subtitle}>
            {currentYear}년 {monthName} 한 달 기록
          </p>
        </div>
        <Card variant="bordered" padding="md" className="w-full">
          <div className={cardContent}>
            <div className={calendarGrid}>
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className={skeletonDay} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={challengeContainer}>
      <div className={headerSection}>
        <h3 className={mainTitle}>월간 기록</h3>
        <p className={subtitle}>
          {displayData.year}년 {monthName} 한 달 기록
        </p>
      </div>
      <Card variant="bordered" padding="md" className="w-full">
        <div className={cardContent}>
          {displayData.days.map((day) => (
            <ChallengeDayItem key={day.day} day={day} />
          ))}
        </div>
      </Card>
    </div>
  );
}

// Layout Styles
const challengeContainer = css({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  gap: "1.5rem"
});

const headerSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginTop: "1.25rem"
});

const mainTitle = css({
  fontSize: "24px",
  fontWeight: "extrabold",
  color: "black",
  letterSpacing: "-0.025em"
});

const subtitle = css({
  fontSize: "16px",
  fontWeight: "semibold",
  color: "rgba(0, 0, 0, 0.6)",
  letterSpacing: "-0.025em"
});

const cardContent = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "1rem"
});

const calendarGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "1rem",
  justifyItems: "center"
});

// Day Item Styles
const dayItemContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem"
});

const dayCircle = css({
  minWidth: "1.5rem",
  minHeight: "1.5rem",
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "bold"
});

const dayLabel = css({
  fontSize: "14px",
  fontWeight: "medium",
  color: "rgb(75, 85, 99)"
});

// Day Status Styles
const postedDayStyle = css({
  backgroundColor: "rgba(198, 218, 255, 0.6)",
  color: "#6B9AFF"
});

const todayStyle = css({
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#FCFCFC"
});

const pendingDayStyle = css({
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  color: "rgba(0, 0, 0, 0.6)"
});

// Skeleton and Empty Styles
const skeletonDay = css({
  width: "3.5rem",
  height: "3.5rem",
  backgroundColor: "rgb(243, 244, 246)",
  borderRadius: "50%",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
});

const emptyCell = css({
  width: "3.5rem",
  height: "3.5rem"
});

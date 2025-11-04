import { useMyContributions } from "@/api/hooks/useDiscussions";
import { SprintGridSkeleton } from "@/components/features/sprint/SprintGridSkeleton";
import { createSprintData } from "@/utils/sprintCalculator";
import { useMemo } from "react";
import { css } from "@styled-system/css";
import { SprintDayItem } from "@/components/features/sprint/SprintDayItem";

export function SprintChallenge() {
  const { data: contributions, isLoading } = useMyContributions();

  const sprintData = useMemo(() => {
    if (!contributions) {
      return null;
    }
    return createSprintData(contributions, new Date());
  }, [contributions]);

  return (
    <div className={challengeContainer}>
      <div className={challengeCard}>
        {(() => {
          if (isLoading || !sprintData) {
            return <SprintGridSkeleton />;
          }
          return (
            <>
              <div className={headerContainer}>
                <div className={contentContainer}>
                  <div className={titleContainer}>
                    <h2 className={titleText}>{sprintData.title}</h2>
                  </div>
                  <p className={messageText}>{sprintData.message}</p>
                </div>
              </div>
              <div className={gridContainer}>
                <div className={daysContainer}>
                  {sprintData.days.map((day, index) => (
                    <SprintDayItem key={index} day={day} />
                  ))}
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}

const headerContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingX: "1.5rem",
  paddingBottom: "1.5rem",
  width: "100%"
});

const contentContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "0.5rem"
});

const titleContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem"
});

const titleText = css({
  fontSize: "20px",
  fontWeight: "800",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const messageText = css({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.6)"
});

const gridContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingX: "1.5rem",
  paddingBottom: "0.5rem",
  gap: "10px",
  width: "100%"
});

const daysContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem"
});

// Container Styles
const challengeContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingX: "12px",
  gap: "10px",
  width: "100%"
});

const challengeCard = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1.5rem",
  gap: "0.5rem",
  width: "100%",
  backgroundColor: "white",
  border: "1px solid rgba(201, 201, 201, 0.5)",
  borderRadius: "1rem"
});

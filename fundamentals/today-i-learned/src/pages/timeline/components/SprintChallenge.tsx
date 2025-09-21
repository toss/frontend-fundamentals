import { useMyContributions } from "@/api/hooks/useDiscussions";
import { SprintGrid } from "@/components/features/sprint/SprintGrid";
import { SprintGridSkeleton } from "@/components/features/sprint/SprintGridSkeleton";
import { SprintHeader } from "@/components/features/sprint/SprintHeader";
import { createSprintData } from "@/libs/sprintCalculator";
import { useMemo } from "react";
import { css } from "@styled-system/css";

export function SprintChallenge() {
  const { data: contributions, isLoading } = useMyContributions();

  const sprintData = useMemo(() => {
    if (!contributions) return null;
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
              <SprintHeader
                title={sprintData.title}
                message={sprintData.message}
              />
              <SprintGrid days={sprintData.days} isLoading={isLoading} />
            </>
          );
        })()}
      </div>
    </div>
  );
}

// Container Styles
const challengeContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingX: '12px',
  gap: '10px',
  width: '100%'
});

const challengeCard = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1.5rem',
  gap: '0.5rem',
  width: '100%',
  backgroundColor: 'white',
  border: '1px solid rgba(201, 201, 201, 0.5)',
  borderRadius: '1rem'
});

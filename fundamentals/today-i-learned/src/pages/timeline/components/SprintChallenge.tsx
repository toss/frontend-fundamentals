import { useMyContributions } from "@/api/hooks/useDiscussions";
import { SprintGrid } from "@/components/shared/ui/SprintGrid";
import { SprintGridSkeleton } from "@/components/shared/ui/SprintGridSkeleton";
import { SprintHeader } from "@/components/shared/ui/SprintHeader";
import { createSprintData } from "@/utils/sprintCalculator";
import { useMemo } from "react";

export function SprintChallenge() {
  const { data: contributions, isLoading } = useMyContributions();

  const sprintData = useMemo(() => {
    if (!contributions) return null;
    return createSprintData(contributions, new Date());
  }, [contributions]);

  return (
    <div className="flex flex-col items-start px-[12px] gap-[10px] w-full">
      <div className="flex flex-col items-start p-6 gap-2 w-full bg-white border border-[rgba(201,201,201,0.5)] rounded-2xl">
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

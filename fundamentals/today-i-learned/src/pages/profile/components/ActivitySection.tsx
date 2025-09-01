import { useUserActivity } from "@/pages/profile/hooks/useUserActivity";
import { ActivityContent } from "./ActivityContent";
import { ChevronDown } from "lucide-react";
import type { BaseComponentProps } from "@/types";
import { cn } from "@/libs/utils";

interface ActivitySectionProps extends BaseComponentProps {}

export function ActivitySection({ className }: ActivitySectionProps) {
  const {
    userProfile,
    userPosts,
    isLoading,
    error,
    sortFilter,
    hasNextPage,
    isFetchingNextPage,
    elementRef,
    handleFilterToggle,
    handleComment,
    refetch
  } = useUserActivity();

  return (
    <div className={cn("space-y-6", className)}>
      {/* 헤더와 필터 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
              활동
            </h2>
          </div>

          {/* 필터 버튼 */}
          <button
            onClick={handleFilterToggle}
            className="flex items-center justify-center gap-[6px] h-10 border border-black/8 rounded-lg text-sm font-semibold transition-colors bg-white text-black/60 hover:bg-black/5"
            style={{
              boxSizing: "border-box",
              paddingLeft: "15px",
              paddingRight: "18px",
              paddingTop: "12px",
              paddingBottom: "12px",
              minWidth: sortFilter === "created" ? "117px" : "140px"
            }}
          >
            <ChevronDown className="w-4 h-4" />
            {sortFilter === "created" ? "새로 올라온" : "새로 업데이트됨"}
          </button>
        </div>
      </div>

      <ActivityContent
        isLoading={isLoading}
        error={error}
        userProfile={userProfile}
        userPosts={userPosts}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        elementRef={elementRef}
        handleComment={handleComment}
        refetch={refetch}
      />
    </div>
  );
}

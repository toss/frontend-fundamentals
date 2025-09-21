import { useUserActivity } from "@/pages/profile/hooks/useUserActivity";
import { ActivityContent } from "./ActivityContent";
import { ChevronDown } from "lucide-react";
import type { BaseComponentProps } from "@/types";
import { css, cx } from "styled-system/css";
import { flex } from "styled-system/patterns";

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
    refetch
  } = useUserActivity();

  return (
    <div className={cx(sectionContainer, className)}>
      {/* 헤더와 필터 */}
      <div className={headerContainer}>
        <div className={headerRow}>
          <div className={titleGroup}>
            <h2 className={sectionTitle}>
              활동
            </h2>
          </div>

          {/* 필터 버튼 */}
          <button
            onClick={handleFilterToggle}
            className={filterButton}
            style={{
              boxSizing: "border-box",
              paddingLeft: "15px",
              paddingRight: "18px",
              paddingTop: "12px",
              paddingBottom: "12px",
              minWidth: sortFilter === "created" ? "117px" : "140px"
            }}
          >
            <ChevronDown className={chevronIcon} />
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
        refetch={refetch}
      />
    </div>
  );
}

// 섹션 스타일
const sectionContainer = css({
  spaceY: "6"
});

const headerContainer = css({
  spaceY: "4"
});

const headerRow = flex({
  alignItems: "center",
  justifyContent: "space-between"
});

const titleGroup = flex({
  alignItems: "center",
  gap: "2"
});

const sectionTitle = css({
  fontWeight: "bold",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const filterButton = flex({
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  height: "10",
  border: "1px solid",
  borderColor: "black/8",
  borderRadius: "lg",
  fontSize: "sm",
  fontWeight: "semibold",
  transition: "colors",
  bg: "white",
  color: "black/60",
  _hover: { bg: "black/5" }
});

const chevronIcon = css({
  width: "4",
  height: "4"
});
import { ActivityContent } from "./ActivityContent";
import { ChevronDown } from "lucide-react";
import { PAGE_SIZE } from "@/constants/github";

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
import { css, cx } from "@styled-system/css";
import { useSuspendedUserProfile } from "@/api/hooks/useUser";
import { useEffect, useMemo, useState } from "react";
import { useSuspendedInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { processUserPosts } from "@/utils/postFilters";

type SortFilter = "created" | "lastActivity";

interface ActivitySectionProps extends BaseComponentProps {}

export function ActivitySection({ className }: ActivitySectionProps) {
  const { data: userProfile } = useSuspendedUserProfile();
  const [sortFilter, setSortFilter] = useState<SortFilter>("created");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspendedInfiniteDiscussions({
      categoryName: "Today I Learned",
      pageSize: PAGE_SIZE.DEFAULT
    });

  const { elementRef, isIntersecting } = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const userPosts = useMemo(() => {
    if (!userProfile?.login || !data) {
      return [];
    }

    return processUserPosts(data.pages, userProfile.login, sortFilter);
  }, [data, userProfile?.login, sortFilter]);

  const handleFilterToggle = () => {
    const newFilter = sortFilter === "created" ? "lastActivity" : "created";
    setSortFilter(newFilter);
  };

  return (
    <div className={cx(sectionContainer, className)}>
      <div className={headerContainer}>
        <div className={headerContent}>
          <div className={titleWrapper}>
            <h2 className={sectionTitle}>활동</h2>
          </div>

          <button
            onClick={handleFilterToggle}
            className={filterButton}
            style={{
              minWidth: sortFilter === "created" ? "117px" : "140px"
            }}
          >
            <ChevronDown className={chevronIcon} />
            {sortFilter === "created" ? "새로 올라온" : "새로 업데이트됨"}
          </button>
        </div>
      </div>

      <ActivityContent
        userProfile={userProfile}
        userPosts={userPosts}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        elementRef={elementRef}
      />
    </div>
  );
}

// Layout Styles
const sectionContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const headerContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const headerContent = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

const titleWrapper = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem"
});

const sectionTitle = css({
  fontWeight: "bold",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

// Filter Button
const filterButton = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  height: "2.5rem",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  borderRadius: "0.5rem",
  fontSize: "14px",
  fontWeight: "semibold",
  backgroundColor: "white",
  color: "rgba(0, 0, 0, 0.6)",
  paddingLeft: "15px",
  paddingRight: "18px",
  paddingTop: "12px",
  paddingBottom: "12px",
  boxSizing: "border-box",
  transition: "background-color 0.2s",
  _hover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  }
});

const chevronIcon = css({
  width: "1rem",
  height: "1rem"
});

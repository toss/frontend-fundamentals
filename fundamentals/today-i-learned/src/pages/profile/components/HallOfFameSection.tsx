import { useState, useMemo } from "react";
import { useSuspendedUserProfile } from "@/api/hooks/useUser";
import { useSuspendedInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { filterUserPosts } from "@/utils/postFilters";
import { PAGE_SIZE } from "@/constants/github";

import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";

import { css, cx } from "@styled-system/css";

const INITIAL_DISPLAY_COUNT = 6;

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface HallOfFameSectionProps extends BaseComponentProps {}

export function HallOfFameSection({ className }: HallOfFameSectionProps) {
  const { data: userProfile } = useSuspendedUserProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspendedInfiniteDiscussions({
      categoryName: "Today I Learned",
      filterBy: { label: "성지 ⛲" },
      pageSize: PAGE_SIZE.DEFAULT
    });

  const userHallOfFamePosts = useMemo(() => {
    if (!userProfile?.login || !data) {
      return [];
    }

    const allDiscussions = data.pages.flatMap((page) => page.discussions);
    return filterUserPosts(allDiscussions, userProfile.login);
  }, [data, userProfile?.login]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    // 더보기를 눌렀을 때 더 많은 데이터가 필요하면 추가 로드
    if (
      !isExpanded &&
      hasNextPage &&
      userHallOfFamePosts.length <= INITIAL_DISPLAY_COUNT
    ) {
      fetchNextPage();
    }
  };

  const displayedPosts = isExpanded
    ? userHallOfFamePosts
    : userHallOfFamePosts.slice(0, INITIAL_DISPLAY_COUNT);

  const showToggleButton = userHallOfFamePosts.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className={cx(sectionContainer, className)}>
      <div className={headerSection}>
        <h2 className={sectionTitle}>명예의 전당</h2>
      </div>

      {displayedPosts.length === 0 ? (
        <div className={emptyState}>
          <p className={emptyStateText}>
            아직 명예의 전당에 올라간 글이 없습니다.
          </p>
        </div>
      ) : (
        <>
          <div className={postsGrid}>
            {displayedPosts.map((discussion) => (
              <PostCard
                key={discussion.id}
                discussion={discussion}
                onLike={(postId) => console.log("Like:", postId)}
                onUpvote={(postId) => console.log("Upvote:", postId)}
                currentUserLogin={userProfile?.login}
              />
            ))}
          </div>

          {isFetchingNextPage && (
            <div className={loadingSkeletonGrid}>
              {Array.from({ length: 3 }).map((_, index) => (
                <PostCardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}

          {showToggleButton && (
            <div className={toggleButtonContainer}>
              <button
                onClick={handleToggleExpand}
                disabled={isFetchingNextPage}
                className={toggleButton}
              >
                {isExpanded ? "간략히 보기" : "더 보기"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Layout Styles
const sectionContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const headerSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const sectionTitle = css({
  fontWeight: "bold",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const postsGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem"
});

const emptyState = css({
  textAlign: "center",
  paddingY: "3rem"
});

const emptyStateText = css({
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: "500"
});

const toggleButtonContainer = css({
  display: "flex",
  justifyContent: "center",
  paddingTop: "1rem"
});

const loadingSkeletonGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem",
  marginTop: "1rem"
});

const toggleButton = css({
  paddingX: "2rem",
  paddingY: "0.75rem",
  backgroundColor: "#0F0F0F",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.2s",
  _hover: {
    backgroundColor: "#333333"
  },
  _disabled: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    cursor: "not-allowed"
  }
});

import { useState, useMemo } from "react";
import { useUserProfile } from "@/api/hooks/useUser";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { filterUserPosts } from "@/utils/postFilters";
import { PAGE_SIZE } from "@/constants/github";

const INITIAL_DISPLAY_COUNT = 6;

export function useUserHallOfFame() {
  const { data: userProfile } = useUserProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch
  } = useInfiniteDiscussions({
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

  return {
    userProfile,
    displayedPosts,
    isLoading,
    error,
    isExpanded,
    showToggleButton,
    isFetchingNextPage,
    handleToggleExpand,
    refetch
  };
}

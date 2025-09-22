import { useState, useMemo, useEffect } from "react";
import { useUserProfile } from "@/api/hooks/useUser";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { processUserPosts } from "@/utils/postFilters";
import { PAGE_SIZE } from "@/constants/github";

type SortFilter = "created" | "lastActivity";

export function useUserActivity() {
  const { data: userProfile } = useUserProfile();
  const [sortFilter, setSortFilter] = useState<SortFilter>("created");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteDiscussions({
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

  const handleComment = () => {
    console.log("Comment action not implemented yet");
  };

  return {
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
  };
}

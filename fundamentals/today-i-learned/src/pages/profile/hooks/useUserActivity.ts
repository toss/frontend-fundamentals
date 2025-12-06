import { useState, useMemo, useEffect } from "react";
import { usePublicUserProfile } from "@/api/hooks/useUser";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { processUserPosts } from "@/utils/postFilters";
import { PAGE_SIZE } from "@/constants/github";
import { CATEGORY_ID } from "@/constants";

type SortFilter = "created" | "lastActivity";

interface UseUserActivityOptions {
  username: string;
}

export function useUserActivity({ username }: UseUserActivityOptions) {
  const { data: userProfile } = usePublicUserProfile(username);
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
    categoryId: CATEGORY_ID.TODAY_I_LEARNED,
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
    if (!data) {
      return [];
    }

    return processUserPosts(data.pages, username, sortFilter);
  }, [data, username, sortFilter]);

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

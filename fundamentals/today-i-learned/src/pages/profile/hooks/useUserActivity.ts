import { useState, useMemo, useEffect } from "react";
import { useUserProfile } from "@/api/hooks/useUser";
import { useInfiniteDiscussions } from "@/api/hooks/useDiscussions";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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

    const allDiscussions = data.pages.flatMap((page) => page.discussions);
    const filteredPosts = allDiscussions.filter(
      (discussion) => discussion.author.login === userProfile.login
    );

    // 클라이언트에서 정렬 처리
    return filteredPosts.sort((a, b) => {
      if (sortFilter === "created") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
    });
  }, [data, userProfile?.login, sortFilter]);

  const handleFilterToggle = () => {
    const newFilter = sortFilter === "created" ? "lastActivity" : "created";
    setSortFilter(newFilter);
  };

  const handleComment = () => {
    // TODO: 댓글 페이지로 이동 또는 댓글 모달 열기
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

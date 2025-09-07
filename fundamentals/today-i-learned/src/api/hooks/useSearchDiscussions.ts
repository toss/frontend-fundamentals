import { useInfiniteQuery } from "@tanstack/react-query";
import { searchDiscussions } from "@/api/remote/discussions";
import { ENV_CONFIG } from "@/libs/env";
import { useAuth } from "@/contexts/AuthContext";

interface UseSearchDiscussionsParams {
  query: string;
  enabled?: boolean;
}

export function useSearchDiscussions({
  query,
  enabled = true
}: UseSearchDiscussionsParams) {
  const { user } = useAuth();

  return useInfiniteQuery({
    queryKey: ["searchDiscussions", query],
    queryFn: ({ pageParam }) =>
      searchDiscussions({
        query,
        owner: ENV_CONFIG.GITHUB_OWNER,
        repo: ENV_CONFIG.GITHUB_REPO,
        after: pageParam,
        accessToken: user?.accessToken
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    enabled: enabled && !!query.trim()
  });
}

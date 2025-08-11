import { useInfiniteQuery } from "@tanstack/react-query";
import type { GitHubDiscussion } from "../types";
import { graphqlRequest } from "../lib/api";
import { PAGE_SIZE } from "../constants/github";

interface DiscussionsResponse {
  discussions: GitHubDiscussion[];
  hasNextPage: boolean;
  endCursor: string | null;
}

interface UseInfiniteDiscussionsParams {
  owner?: string;
  repo?: string;
  categoryName?: string;
  pageSize?: number;
}

const DISCUSSIONS_QUERY = `
  query GetDiscussions($owner: String!, $repo: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $repo) {
      discussions(
        first: $first
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          body
          createdAt
          updatedAt
          author {
            login
            avatarUrl
          }
          reactions {
            totalCount
          }
          comments {
            totalCount
          }
          category {
            name
          }
        }
      }
    }
  }
`;

// GitHub API를 사용한 실제 데이터 페치
async function fetchRealDiscussionsPage({
  owner,
  repo,
  pageSize,
  pageParam
}: {
  owner: string;
  repo: string;
  pageSize: number;
  pageParam?: string;
}): Promise<DiscussionsResponse> {
  const data = await graphqlRequest(DISCUSSIONS_QUERY, {
    owner,
    repo,
    first: pageSize,
    after: pageParam || null
  });

  const discussionsData = data.data?.repository?.discussions;
  const allDiscussions = discussionsData?.nodes || [];

  return {
    discussions: allDiscussions,
    hasNextPage: discussionsData?.pageInfo?.hasNextPage || false,
    endCursor: discussionsData?.pageInfo?.endCursor || null
  };
}

export function useInfiniteDiscussions({
  owner = "toss",
  repo = "frontend-fundamentals",
  pageSize = PAGE_SIZE.INFINITE_SCROLL
}: UseInfiniteDiscussionsParams = {}) {
  return useInfiniteQuery({
    queryKey: [
      "discussions",
      owner,
      repo,
    ],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => {
      return fetchRealDiscussionsPage({
        owner,
        repo,
        pageSize,
        pageParam
      });
    },
    getNextPageParam: (lastPage: DiscussionsResponse) => {
      return lastPage.hasNextPage ? lastPage.endCursor : undefined;
    },
    initialPageParam: undefined as string | undefined,
    staleTime: 1000 * 60 * 5 // 5분
  });
}

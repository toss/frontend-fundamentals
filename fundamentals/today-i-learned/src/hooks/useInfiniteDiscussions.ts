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
  sortBy?: "latest" | "lastActivity" | "created" | "popularity";
  filterBy?: {
    label?: string;
  };
}

const DISCUSSIONS_QUERY = `
  query GetDiscussions($owner: String!, $repo: String!, $first: Int!, $after: String, $orderBy: DiscussionOrder) {
    repository(owner: $owner, name: $repo) {
      discussions(
        first: $first
        after: $after
        orderBy: $orderBy
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
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

const SEARCH_DISCUSSIONS_QUERY = `
  query SearchDiscussions($query: String!, $first: Int!, $after: String) {
    search(
      query: $query
      type: DISCUSSION
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Discussion {
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
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

// GitHub API를 사용한 실제 데이터 페치
async function fetchDiscussions({
  owner,
  repo,
  pageSize,
  pageParam,
  sortBy = "latest",
  filterBy
}: {
  owner: string;
  repo: string;
  pageSize: number;
  pageParam?: string;
  sortBy?: "latest" | "lastActivity" | "created" | "popularity";
  filterBy?: {
    label?: string;
  };
}): Promise<DiscussionsResponse> {
  // Search API를 사용해야 하는 경우: 라벨 필터링 또는 popularity 정렬
  if (filterBy?.label || sortBy === "popularity") {
    const getSortQuery = (sort: string) => {
      switch (sort) {
        case "lastActivity":
          return "sort:updated-desc";
        case "created":
          return "sort:created-asc";
        case "popularity":
          return "sort:interactions-desc";
        case "latest":
        default:
          return "sort:created-desc";
      }
    };

    // 라벨 필터가 있는 경우와 없는 경우 구분
    const labelFilter = filterBy?.label ? `label:"${filterBy.label}"` : "";
    const searchQuery = `repo:${owner}/${repo} is:discussion ${labelFilter} ${getSortQuery(sortBy)}`.trim();

    console.log("Search query:", searchQuery);
    console.log("sortBy:", sortBy, "filterBy:", filterBy);

    const data = await graphqlRequest(SEARCH_DISCUSSIONS_QUERY, {
      query: searchQuery,
      first: pageSize,
      after: pageParam || null
    });

    console.log("Search API response:", data);

    const searchData = data.data?.search;
    const allDiscussions = searchData?.nodes || [];

    return {
      discussions: allDiscussions,
      hasNextPage: searchData?.pageInfo?.hasNextPage || false,
      endCursor: searchData?.pageInfo?.endCursor || null
    };
  }

  // 라벨 필터링이 없는 경우 기존 discussions API 사용
  const getOrderBy = (sort: string) => {
    switch (sort) {
      case "lastActivity":
        return { field: "UPDATED_AT", direction: "DESC" };
      case "created":
        return { field: "CREATED_AT", direction: "ASC" };
      case "latest":
      default:
        return { field: "CREATED_AT", direction: "DESC" };
    }
  };

  const data = await graphqlRequest(DISCUSSIONS_QUERY, {
    owner,
    repo,
    first: pageSize,
    after: pageParam || null,
    orderBy: getOrderBy(sortBy)
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
  pageSize = PAGE_SIZE.INFINITE_SCROLL,
  sortBy = "latest",
  filterBy
}: UseInfiniteDiscussionsParams = {}) {
  return useInfiniteQuery({
    queryKey: ["discussions", owner, repo, sortBy, filterBy],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => {
      console.log("페치", { filterBy });
      return fetchDiscussions({
        owner,
        repo,
        pageSize,
        pageParam,
        sortBy,
        filterBy
      });
    },
    getNextPageParam: (lastPage: DiscussionsResponse) => {
      return lastPage.hasNextPage ? lastPage.endCursor : undefined;
    },
    initialPageParam: undefined as string | undefined,
    staleTime: 1000 * 60 * 5 // 5분
  });
}

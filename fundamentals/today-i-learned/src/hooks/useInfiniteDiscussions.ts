import { useInfiniteQuery } from "@tanstack/react-query";
import type { GitHubDiscussion } from "../types";
import { allMockDiscussions } from "../data/mockData";
import { fetchGithub, handleGraphQLResponse } from "../utils/github";
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

// 목업 데이터를 사용한 페이지네이션 시뮬레이션
async function fetchMockDiscussionsPage({
  pageSize,
  pageParam
}: {
  pageSize: number;
  pageParam?: string;
}): Promise<DiscussionsResponse> {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 600));

  // cursor에서 페이지 번호 추출
  const page = pageParam
    ? Number.parseInt(pageParam.split("-")[1]) / pageSize
    : 0;
  const start = page * pageSize;
  const end = start + pageSize;

  const discussions = allMockDiscussions.slice(start, end);

  return {
    discussions,
    hasNextPage: end < allMockDiscussions.length,
    endCursor: discussions.length > 0 ? `cursor-${end}` : null
  };
}

// GitHub API를 사용한 실제 데이터 페치
async function fetchRealDiscussionsPage({
  owner,
  repo,
  categoryName,
  pageSize,
  pageParam
}: {
  owner: string;
  repo: string;
  categoryName: string;
  pageSize: number;
  pageParam?: string;
}): Promise<DiscussionsResponse> {
  const response = await fetchGithub(DISCUSSIONS_QUERY, {
    owner,
    repo,
    first: pageSize,
    after: pageParam || null
  });

  const data = await handleGraphQLResponse(
    response,
    "Failed to fetch discussions"
  );

  const discussionsData = data.data?.repository?.discussions;
  const allDiscussions = discussionsData?.nodes || [];

  // 클라이언트 사이드에서 카테고리 필터링
  const filteredDiscussions = categoryName
    ? allDiscussions.filter(
        (discussion: any) => discussion.category?.name === categoryName
      )
    : allDiscussions;

  return {
    discussions: filteredDiscussions,
    hasNextPage: discussionsData?.pageInfo?.hasNextPage || false,
    endCursor: discussionsData?.pageInfo?.endCursor || null
  };
}

export function useInfiniteDiscussions({
  owner = import.meta.env.VITE_GITHUB_OWNER || "toss",
  repo = import.meta.env.VITE_GITHUB_REPO || "frontend-fundamentals",
  categoryName = import.meta.env.VITE_GITHUB_CATEGORY || "Today I Learned",
  pageSize = PAGE_SIZE.INFINITE_SCROLL
}: UseInfiniteDiscussionsParams = {}) {
  // 환경변수에서 목업 데이터 사용 여부 확인
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

  return useInfiniteQuery({
    queryKey: [
      "discussions",
      owner,
      repo,
      categoryName,
      useMockData ? "mock" : "real"
    ],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => {
      if (useMockData) {
        return fetchMockDiscussionsPage({
          pageSize,
          pageParam
        });
      }
      return fetchRealDiscussionsPage({
        owner,
        repo,
        categoryName,
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

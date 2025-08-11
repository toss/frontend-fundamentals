import { useQuery } from "@tanstack/react-query";
import type { GitHubDiscussion } from "../types";
import { graphqlRequest } from "../lib/api";
import { PAGE_SIZE } from "../constants/github";
import { useAuth } from "../contexts/AuthContext";
import { ENV_CONFIG } from "../lib/env";

// 기존 정상 작동하는 쿼리 구조 사용 (useInfiniteDiscussions와 동일)
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

interface UseAllDiscussionsParams {
  owner?: string;
  repo?: string;
  categoryName?: string;
}


// 모든 페이지를 자동으로 가져오는 함수 (실제 API)
async function fetchRealAllDiscussions({
  owner,
  repo,
  categoryName,
  accessToken
}: {
  owner: string;
  repo: string;
  categoryName?: string;
  accessToken?: string;
}): Promise<GitHubDiscussion[]> {
  const allDiscussions: GitHubDiscussion[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  // 성능을 위해 적절한 페이지 사이즈 사용
  const pageSize = PAGE_SIZE.DEFAULT; // 50개씩 가져오기

  while (hasNextPage) {
    try {
      const data = await graphqlRequest(DISCUSSIONS_QUERY, {
        owner,
        repo,
        first: pageSize,
        after: cursor
      }, accessToken);

      const discussionsData = data.data?.repository?.discussions;

      if (!discussionsData) {
        break;
      }

      const pageDiscussions = discussionsData.nodes || [];

      // 클라이언트 사이드에서 카테고리 필터링
      const filteredDiscussions = categoryName
        ? pageDiscussions.filter(
            (discussion: any) => discussion.category?.name === categoryName
          )
        : pageDiscussions;

      // 현재 페이지의 데이터 추가
      allDiscussions.push(...filteredDiscussions);

      // 다음 페이지 정보 업데이트
      hasNextPage = discussionsData.pageInfo?.hasNextPage || false;
      cursor = discussionsData.pageInfo?.endCursor || null;

      // 안전장치: 너무 많은 데이터 방지 (최대 1000개)
      if (allDiscussions.length >= 1000) {
        break;
      }
    } catch (error) {
      break;
    }
  }

  return allDiscussions;
}

export function useAllDiscussions({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  categoryName = ENV_CONFIG.GITHUB_CATEGORY
}: UseAllDiscussionsParams = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: [
      "all-discussions",
      owner,
      repo,
      categoryName,
      user?.access_token ? "authenticated" : "anonymous"
    ],
    queryFn: () => {
      return fetchRealAllDiscussions({ owner, repo, categoryName, accessToken: user?.access_token });
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    gcTime: 1000 * 60 * 30, // 30분간 가비지 컬렉션 방지
    retry: 2,
    retryDelay: 1000
  });
}

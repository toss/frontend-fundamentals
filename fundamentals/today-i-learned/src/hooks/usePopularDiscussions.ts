import { useQuery } from "@tanstack/react-query";
import type { GitHubDiscussion } from "../types";
import { allMockDiscussions } from "../data/mockData";
import { graphqlRequest } from "../lib/api";
import { PAGE_SIZE } from "../constants/github";

interface UsePopularDiscussionsParams {
  owner?: string;
  repo?: string;
  categoryName?: string;
  limit?: number;
}

const POPULAR_DISCUSSIONS_QUERY = `
  query GetPopularDiscussions($owner: String!, $repo: String!, $first: Int!) {
    repository(owner: $owner, name: $repo) {
      discussions(
        first: $first
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
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

// 목업 데이터에서 인기글 가져오기
async function fetchMockPopularDiscussions({
  categoryName,
  limit
}: {
  categoryName?: string;
  limit: number;
}): Promise<GitHubDiscussion[]> {
  const API_SIMULATION_DELAY_MS = 300;
  await new Promise((resolve) => setTimeout(resolve, API_SIMULATION_DELAY_MS));

  let discussions = allMockDiscussions;

  // 카테고리 필터링
  if (categoryName) {
    discussions = discussions.filter(
      (discussion) => discussion.category?.name === categoryName
    );
  }

  const REACTIONS_WEIGHT = 2;
  const COMMENTS_WEIGHT = 1;

  const calculatePopularityScore = (discussion: GitHubDiscussion) => {
    const reactionsCount = discussion.reactions?.totalCount || 0;
    const commentsCount = discussion.comments?.totalCount || 0;
    return reactionsCount * REACTIONS_WEIGHT + commentsCount * COMMENTS_WEIGHT;
  };

  const MIN_POPULARITY_THRESHOLD = 1; // 최소 1개의 반응(좋아요 또는 댓글)이 있어야 함

  const sortedDiscussions = discussions
    .map((discussion) => ({
      ...discussion,
      popularityScore: calculatePopularityScore(discussion)
    }))
    .filter(
      (discussion) => discussion.popularityScore >= MIN_POPULARITY_THRESHOLD
    )
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);

  return sortedDiscussions;
}

// GitHub API를 사용한 실제 인기글 데이터 페치
async function fetchRealPopularDiscussions({
  owner,
  repo,
  categoryName,
  limit
}: {
  owner: string;
  repo: string;
  categoryName?: string;
  limit: number;
}): Promise<GitHubDiscussion[]> {
  const FETCH_MULTIPLIER = 5;

  const fetchCount = Math.min(limit * FETCH_MULTIPLIER, PAGE_SIZE.DEFAULT);
  const data = await graphqlRequest(POPULAR_DISCUSSIONS_QUERY, {
    owner,
    repo,
    first: fetchCount
  });

  const discussionsData = data.data?.repository?.discussions;
  let allDiscussions = discussionsData?.nodes || [];

  // 클라이언트 사이드에서 카테고리 필터링
  if (categoryName) {
    allDiscussions = allDiscussions.filter(
      (discussion: any) => discussion.category?.name === categoryName
    );
  }

  const REACTIONS_WEIGHT = 2;
  const COMMENTS_WEIGHT = 1;

  const calculatePopularityScore = (discussion: any) => {
    const reactionsCount = discussion.reactions?.totalCount || 0;
    const commentsCount = discussion.comments?.totalCount || 0;
    return reactionsCount * REACTIONS_WEIGHT + commentsCount * COMMENTS_WEIGHT;
  };

  const MIN_POPULARITY_THRESHOLD = 1; // 최소 1개의 반응(좋아요 또는 댓글)이 있어야 함

  const sortedDiscussions = allDiscussions
    .map((discussion: any) => ({
      ...discussion,
      popularityScore: calculatePopularityScore(discussion)
    }))
    .filter(
      (discussion: any) =>
        discussion.popularityScore >= MIN_POPULARITY_THRESHOLD
    )
    .sort((a: any, b: any) => b.popularityScore - a.popularityScore)
    .slice(0, limit);

  return sortedDiscussions;
}

const DEFAULT_LIMIT = 4;
const STALE_TIME_MS = 1000 * 60 * 10; // 10분
const GC_TIME_MS = 1000 * 60 * 30; // 30분

export function usePopularDiscussions({
  owner = import.meta.env.VITE_GITHUB_OWNER,
  repo = import.meta.env.VITE_GITHUB_REPO,
  categoryName = import.meta.env.VITE_GITHUB_CATEGORY,
  limit = DEFAULT_LIMIT
}: UsePopularDiscussionsParams = {}) {
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";
  const dataSource = useMockData ? "mock" : "real";

  const queryKey = [
    "popular-discussions",
    owner,
    repo,
    categoryName,
    limit,
    dataSource
  ];

  const queryFn = () => {
    if (useMockData) {
      return fetchMockPopularDiscussions({ categoryName, limit });
    }
    return fetchRealPopularDiscussions({ owner, repo, categoryName, limit });
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: STALE_TIME_MS,
    gcTime: GC_TIME_MS
  });
}

import { graphqlRequest } from "@/api/client";
import { PAGE_SIZE } from "@/constants/github";
import { CATEGORY_ID } from "@/constants";
import {
  GET_DISCUSSIONS_QUERY,
  CREATE_DISCUSSION_MUTATION,
  UPDATE_DISCUSSION_MUTATION,
  DELETE_DISCUSSION_MUTATION,
  GET_REPOSITORY_INFO_QUERY,
  GET_INFINITE_DISCUSSIONS_QUERY,
  SEARCH_DISCUSSIONS_QUERY,
  GET_MY_CONTRIBUTIONS_QUERY,
  GET_DISCUSSION_DETAIL_QUERY,
  ADD_DISCUSSION_COMMENT_MUTATION,
  ADD_DISCUSSION_COMMENT_REPLY_MUTATION,
  ADD_DISCUSSION_REACTION_MUTATION,
  REMOVE_DISCUSSION_REACTION_MUTATION
} from "@/api/graphql/discussions";

export interface GitHubAuthor {
  login: string;
  avatarUrl: string;
}

// Discussion 관련 타입들
export interface GitHubDiscussion {
  id: string;
  title: string;
  body: string;
  author: GitHubAuthor;
  createdAt: string;
  updatedAt: string;
  reactions: {
    totalCount: number;
    nodes: Array<{
      content: string;
      user: {
        login: string;
      };
    }>;
  };
  comments: {
    totalCount: number;
    nodes?: Array<{
      id: string;
      body: string;
      createdAt: string;
      author: GitHubAuthor;
    }>;
  };
  category: {
    name: string;
  };
}

export interface CreatePostRequest {
  title: string;
  body: string;
}

export interface CreatePostResponse extends GitHubDiscussion {}

// Discussions API 서비스 인터페이스
export interface DiscussionsApiParams {
  owner: string;
  repo: string;
  categoryId?: string;
  accessToken?: string;
}

export interface PaginatedDiscussionsParams extends DiscussionsApiParams {
  first?: number;
  after?: string | null;
  categoryId?: string;
}

export interface CreateDiscussionParams {
  repositoryId: string;
  title: string;
  body: string;
  categoryId: string;
  accessToken: string;
}

export interface UpdateDiscussionParams {
  discussionId: string;
  title: string;
  body: string;
  accessToken: string;
}

export interface DeleteDiscussionParams {
  discussionId: string;
  accessToken: string;
}

export interface InfiniteDiscussionsParams extends DiscussionsApiParams {
  first?: number;
  after?: string | null;
  sortBy?: "latest" | "lastActivity" | "created" | "popularity";
  filterBy?: {
    label?: string;
  };
}

export interface DiscussionsResponse {
  discussions: GitHubDiscussion[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

// 단일 페이지 Discussions 가져오기
export async function fetchDiscussionsPage({
  owner,
  repo,
  first = PAGE_SIZE.DEFAULT,
  after,
  categoryId,
  accessToken
}: PaginatedDiscussionsParams): Promise<{
  discussions: GitHubDiscussion[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}> {
  const data = await graphqlRequest(
    GET_DISCUSSIONS_QUERY,
    { owner, repo, first, after, categoryId },
    accessToken
  );

  const discussionsData = data.data?.repository?.discussions;

  if (!discussionsData) {
    return {
      discussions: [],
      pageInfo: { hasNextPage: false, endCursor: null }
    };
  }

  return {
    discussions: discussionsData.nodes || [],
    pageInfo: {
      hasNextPage: discussionsData.pageInfo?.hasNextPage || false,
      endCursor: discussionsData.pageInfo?.endCursor || null
    }
  };
}

// 모든 페이지 Discussions 가져오기 (비즈니스 로직 포함)
export async function fetchAllDiscussions({
  owner,
  repo,
  accessToken
}: DiscussionsApiParams): Promise<GitHubDiscussion[]> {
  const allDiscussions: GitHubDiscussion[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;
  const maxItems = 1000; // 안전장치

  while (hasNextPage && allDiscussions.length < maxItems) {
    try {
      const { discussions, pageInfo } = await fetchDiscussionsPage({
        owner,
        repo,
        after: cursor,
        categoryId: CATEGORY_ID.TODAY_I_LEARNED,
        accessToken
      });

      allDiscussions.push(...discussions);

      hasNextPage = pageInfo.hasNextPage;
      cursor = pageInfo.endCursor;
    } catch (error) {
      // 개별 페이지 실패 시 이미 가져온 데이터 반환
      console.warn("Failed to fetch discussions page:", error);
      break;
    }
  }

  return allDiscussions;
}

// 주간 인기 Discussions 가져오기 (Search API 사용)
export async function fetchWeeklyTopDiscussions({
  owner,
  repo,
  accessToken
}: Omit<DiscussionsApiParams, "categoryId">): Promise<GitHubDiscussion[]> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // 1주일 이내의 discussions를 인기도순으로 검색
  const searchQuery = `repo:${owner}/${repo} is:discussion created:>=${oneWeekAgo.toISOString().split("T")[0]} sort:interactions-desc`;

  const data = await graphqlRequest(
    SEARCH_DISCUSSIONS_QUERY,
    {
      query: searchQuery,
      first: PAGE_SIZE.WEEKLY_TOP || 10
    },
    accessToken
  );

  const discussions = data.data?.search?.nodes || [];

  // 상위 5개만 반환
  return discussions.slice(0, 5);
}

// Discussion 생성
export async function createDiscussion({
  repositoryId,
  title,
  body,
  categoryId,
  accessToken
}: CreateDiscussionParams): Promise<GitHubDiscussion> {
  const data = await graphqlRequest(
    CREATE_DISCUSSION_MUTATION,
    { repositoryId, title, body, categoryId },
    accessToken
  );

  const discussion = data.data?.createDiscussion?.discussion;

  if (!discussion) {
    throw new Error("Failed to create discussion");
  }

  return discussion;
}

// Repository 정보 가져오기 (Discussion 카테고리 포함)
export async function fetchRepositoryInfo({
  owner,
  repo,
  accessToken
}: Omit<DiscussionsApiParams, "categoryId">): Promise<{
  repositoryId: string;
  categories: Array<{ id: string; name: string; description?: string }>;
}> {
  const data = await graphqlRequest(
    GET_REPOSITORY_INFO_QUERY,
    { owner, repo },
    accessToken
  );

  const repository = data.data?.repository;

  if (!repository) {
    throw new Error("Repository not found");
  }

  return {
    repositoryId: repository.id,
    categories: repository.discussionCategories?.nodes || []
  };
}

// 무한 스크롤을 위한 Discussions 페치 (정렬 및 필터링 지원)
export async function fetchInfiniteDiscussions({
  owner,
  repo,
  categoryId = CATEGORY_ID.TODAY_I_LEARNED,
  first = PAGE_SIZE.INFINITE_SCROLL,
  after,
  sortBy = "latest",
  filterBy,
  accessToken
}: InfiniteDiscussionsParams): Promise<DiscussionsResponse> {
  // 라벨 필터링이나 popularity 정렬이 필요한 경우 Search API 사용
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

    const labelFilter = filterBy?.label ? `label:"${filterBy.label}"` : "";
    const searchQuery =
      `repo:${owner}/${repo} is:discussion ${labelFilter} ${getSortQuery(sortBy)}`.trim();

    const data = await graphqlRequest(
      SEARCH_DISCUSSIONS_QUERY,
      {
        query: searchQuery,
        first,
        after: after || null
      },
      accessToken
    );

    const searchData = data.data?.search;

    return {
      discussions: searchData?.nodes || [],
      pageInfo: {
        hasNextPage: searchData?.pageInfo?.hasNextPage || false,
        endCursor: searchData?.pageInfo?.endCursor || null
      }
    };
  }

  // 기본 discussions API 사용
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

  const data = await graphqlRequest(
    GET_INFINITE_DISCUSSIONS_QUERY,
    {
      owner,
      repo,
      first,
      after: after || null,
      orderBy: getOrderBy(sortBy),
      categoryId
    },
    accessToken
  );

  const discussionsData = data.data?.repository?.discussions;

  return {
    discussions: discussionsData?.nodes || [],
    pageInfo: {
      hasNextPage: discussionsData?.pageInfo?.hasNextPage || false,
      endCursor: discussionsData?.pageInfo?.endCursor || null
    }
  };
}

// 경량화된 컨트리뷰션 데이터 타입 (날짜 정보만)
export interface ContributionData {
  id: string;
  createdAt: string;
  author: {
    login: string;
  };
}

// 내 기여도 계산을 위한 경량화된 데이터 가져오기
export async function fetchMyContributions({
  owner,
  repo,
  accessToken,
  authorLogin
}: Omit<DiscussionsApiParams, "categoryId"> & {
  authorLogin: string;
}): Promise<ContributionData[]> {
  const allContributions: ContributionData[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;
  const maxItems = 1000; // 안전장치

  // "Today I Learned" 카테고리와 작성자 필터링이 포함된 검색 쿼리
  const searchQuery = `repo:${owner}/${repo} is:discussion author:${authorLogin} in:title,body`;

  while (hasNextPage && allContributions.length < maxItems) {
    try {
      const data = await graphqlRequest(
        GET_MY_CONTRIBUTIONS_QUERY,
        {
          query: searchQuery,
          first: PAGE_SIZE.DEFAULT,
          after: cursor || null
        },
        accessToken
      );

      const searchData = data.data?.search;

      if (!searchData) {
        break;
      }

      const contributions = searchData.nodes || [];
      allContributions.push(...contributions);

      hasNextPage = searchData.pageInfo?.hasNextPage || false;
      cursor = searchData.pageInfo?.endCursor || null;
    } catch (error) {
      console.warn("Failed to fetch contributions page:", error);
      break;
    }
  }

  return allContributions;
}

// GitHub 댓글 타입
export interface GitHubComment {
  id: string;
  body: string;
  createdAt: string;
  author: GitHubAuthor;
  reactions: {
    totalCount: number;
    nodes?: Array<{
      content: string;
      user: {
        login: string;
      };
    }>;
  };
  replies?: {
    totalCount: number;
    nodes: GitHubComment[];
  };
}

// Discussion 상세 타입 (댓글 포함)
export interface GitHubDiscussionDetail extends GitHubDiscussion {
  labels?: {
    nodes: Array<{ name: string }>;
  };
  comments: {
    totalCount: number;
    nodes: GitHubComment[];
  };
}

// Discussion 상세 조회
export async function fetchDiscussionDetail({
  id,
  accessToken
}: {
  id: string;
  accessToken?: string;
}): Promise<GitHubDiscussionDetail> {
  const data = await graphqlRequest(
    GET_DISCUSSION_DETAIL_QUERY,
    { id },
    accessToken
  );

  const discussion = data.data?.node;

  if (!discussion) {
    throw new Error("Discussion not found");
  }

  return discussion;
}

export async function addDiscussionComment({
  discussionId,
  body,
  accessToken
}: {
  discussionId: string;
  body: string;
  accessToken: string;
}): Promise<GitHubComment> {
  const data = await graphqlRequest(
    ADD_DISCUSSION_COMMENT_MUTATION,
    { discussionId, body },
    accessToken
  );

  const comment = data.data?.addDiscussionComment?.comment;

  if (!comment) {
    throw new Error("Failed to add comment");
  }

  return comment;
}

export async function addDiscussionCommentReply({
  discussionId,
  replyToId,
  body,
  accessToken
}: {
  discussionId: string;
  replyToId: string;
  body: string;
  accessToken: string;
}): Promise<GitHubComment> {
  const data = await graphqlRequest(
    ADD_DISCUSSION_COMMENT_REPLY_MUTATION,
    { discussionId, replyToId, body },
    accessToken
  );

  const comment = data.data?.addDiscussionComment?.comment;

  if (!comment) {
    throw new Error("Failed to add comment reply");
  }

  return comment;
}

export async function addDiscussionReaction({
  subjectId,
  content = "THUMBS_UP",
  accessToken
}: {
  subjectId: string;
  content?: string;
  accessToken: string;
}): Promise<{ totalCount: number }> {
  const data = await graphqlRequest(
    ADD_DISCUSSION_REACTION_MUTATION,
    { subjectId, content },
    accessToken
  );

  const subject = data.data?.addReaction?.subject;

  if (!subject) {
    throw new Error("Failed to add reaction");
  }

  return {
    totalCount: subject.reactions.totalCount
  };
}

export async function removeDiscussionReaction({
  subjectId,
  content = "THUMBS_UP",
  accessToken
}: {
  subjectId: string;
  content?: string;
  accessToken: string;
}): Promise<{ totalCount: number }> {
  const data = await graphqlRequest(
    REMOVE_DISCUSSION_REACTION_MUTATION,
    { subjectId, content },
    accessToken
  );

  const subject = data.data?.removeReaction?.subject;

  if (!subject) {
    throw new Error("Failed to remove reaction");
  }

  return {
    totalCount: subject.reactions.totalCount
  };
}

export async function updateDiscussion({
  discussionId,
  title,
  body,
  accessToken
}: UpdateDiscussionParams): Promise<GitHubDiscussion> {
  const data = await graphqlRequest(
    UPDATE_DISCUSSION_MUTATION,
    { discussionId, title, body },
    accessToken
  );

  const discussion = data.data?.updateDiscussion?.discussion;

  if (!discussion) {
    throw new Error("Failed to update discussion");
  }

  return discussion;
}

export async function deleteDiscussion({
  discussionId,
  accessToken
}: DeleteDiscussionParams): Promise<{ id: string }> {
  const data = await graphqlRequest(
    DELETE_DISCUSSION_MUTATION,
    { id: discussionId },
    accessToken
  );

  const discussion = data.data?.deleteDiscussion?.discussion;

  if (!discussion) {
    throw new Error("Failed to delete discussion");
  }

  return { id: discussion.id };
}

export interface SearchDiscussionsParams {
  query: string;
  owner: string;
  repo: string;
  first?: number;
  after?: string | null;
  accessToken?: string;
}

export async function searchDiscussions({
  query,
  owner,
  repo,
  first = PAGE_SIZE.DEFAULT,
  after,
  accessToken
}: SearchDiscussionsParams): Promise<DiscussionsResponse> {
  const searchQuery = `repo:${owner}/${repo} is:discussion ${query}`;

  const data = await graphqlRequest(
    SEARCH_DISCUSSIONS_QUERY,
    {
      query: searchQuery,
      first,
      after: after || null
    },
    accessToken
  );

  const searchData = data.data?.search;

  return {
    discussions: searchData?.nodes || [],
    pageInfo: {
      hasNextPage: searchData?.pageInfo?.hasNextPage || false,
      endCursor: searchData?.pageInfo?.endCursor || null
    }
  };
}

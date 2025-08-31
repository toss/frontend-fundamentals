import { useAuth } from "@/contexts/AuthContext";
import { ENV_CONFIG } from "@/libs/env";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  fetchAllDiscussions,
  fetchInfiniteDiscussions,
  fetchRepositoryInfo,
  fetchWeeklyTopDiscussions,
  fetchMyContributions,
  fetchDiscussionDetail,
  addDiscussionComment,
  addDiscussionReaction,
  removeDiscussionReaction,
  type DiscussionsApiParams
} from "../remote/discussions";

// Query Keys 중앙 관리
export const DISCUSSIONS_QUERY_KEYS = {
  all: ["discussions"] as const,
  lists: () => [...DISCUSSIONS_QUERY_KEYS.all, "list"] as const,
  list: (params: Partial<DiscussionsApiParams>) =>
    [...DISCUSSIONS_QUERY_KEYS.lists(), params] as const,
  infinite: (params: Partial<UseInfiniteDiscussionsParams>) =>
    [...DISCUSSIONS_QUERY_KEYS.all, "infinite", params] as const,
  weekly: () => [...DISCUSSIONS_QUERY_KEYS.all, "weekly"] as const,
  repository: (owner: string, repo: string) =>
    ["repository", owner, repo] as const,
  contributions: (authorLogin: string) =>
    [...DISCUSSIONS_QUERY_KEYS.all, "contributions", authorLogin] as const,
  detail: (id: string) => [...DISCUSSIONS_QUERY_KEYS.all, "detail", id] as const
} as const;

// 기본 파라미터 인터페이스
interface UseDiscussionsParams {
  owner?: string;
  repo?: string;
  categoryName?: string;
  enabled?: boolean;
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
  enabled?: boolean;
}

// 전체 Discussions 가져오기 (인기글 등을 위한 완전한 데이터)
export function useAllDiscussionsWithFullData({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  categoryName = "Today I Learned",
  enabled = true
}: UseDiscussionsParams = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.list({ owner, repo, categoryName }),
    queryFn: () =>
      fetchAllDiscussions({
        owner,
        repo,
        categoryName,
        accessToken: user?.accessToken
      }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 2
  });
}

// 무한 스크롤을 위한 Discussions (정렬 및 필터링 지원)
export function useInfiniteDiscussions({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  categoryName,
  pageSize = 5,
  sortBy = "latest",
  filterBy,
  enabled = true
}: UseInfiniteDiscussionsParams = {}) {
  const { user } = useAuth();

  return useInfiniteQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.infinite({
      owner,
      repo,
      categoryName,
      sortBy,
      filterBy
    }),
    queryFn: ({ pageParam }) =>
      fetchInfiniteDiscussions({
        owner,
        repo,
        first: pageSize,
        after: pageParam,
        sortBy,
        filterBy,
        accessToken: user?.accessToken
      }),
    enabled,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    initialPageParam: null as string | null,
    staleTime: 1000 * 60 * 2, // 2분
    gcTime: 1000 * 60 * 10 // 10분
  });
}

// 주간 인기 Discussions
export function useWeeklyTopDiscussions({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  limit,
  enabled = true
}: Omit<UseDiscussionsParams, "categoryName"> & { limit?: number } = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.weekly(),
    queryFn: async () => {
      const discussions = await fetchWeeklyTopDiscussions({
        owner,
        repo,
        accessToken: user?.accessToken
      });
      // limit이 지정된 경우 결과를 제한
      return limit ? discussions.slice(0, limit) : discussions;
    },
    enabled,
    staleTime: 1000 * 60 * 30, // 30분
    gcTime: 1000 * 60 * 60, // 1시간
    retry: 1
  });
}

// Repository 정보
export function useRepositoryInfo({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  enabled = true
}: Omit<UseDiscussionsParams, "categoryName"> = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.repository(owner, repo),
    queryFn: () =>
      fetchRepositoryInfo({
        owner,
        repo,
        accessToken: user?.accessToken
      }),
    enabled: enabled && !!user?.accessToken,
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 24 // 24시간
  });
}

// Discussion 생성을 위한 간단한 인터페이스
interface CreatePostParams {
  title: string;
  body: string;
}

// Discussion 생성 Mutation
export function useCreateDiscussion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: CreatePostParams) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }

      // Repository 정보를 가져와서 repositoryId와 categoryId를 얻음
      const repoInfo = await fetchRepositoryInfo({
        owner: ENV_CONFIG.GITHUB_OWNER,
        repo: ENV_CONFIG.GITHUB_REPO,
        accessToken: user.accessToken
      });

      // "Today I Learned" 카테고리 찾기
      const tilCategory = repoInfo.categories.find(
        (cat) => cat.name === "Today I Learned"
      );

      if (!tilCategory) {
        throw new Error("Today I Learned category not found");
      }

      return createDiscussion({
        repositoryId: repoInfo.repositoryId,
        categoryId: tilCategory.id,
        title: params.title,
        body: params.body,
        accessToken: user.accessToken
      });
    },
    onSuccess: () => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    }
  });
}

// 내 기여도 정보 (컨트리뷰션 그래프용 경량화된 데이터)
export function useMyContributions({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  enabled = true
}: Omit<UseDiscussionsParams, "categoryName"> = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.contributions(user?.login || ""),
    queryFn: () => {
      if (!user?.accessToken || !user?.login) {
        throw new Error("Authentication required");
      }
      return fetchMyContributions({
        owner,
        repo,
        accessToken: user.accessToken,
        authorLogin: user.login
      });
    },
    enabled: enabled && !!user?.accessToken && !!user?.login,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 2
  });
}

// Discussion 상세 조회 Hook
export function useDiscussionDetail(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.detail(id),
    queryFn: () =>
      fetchDiscussionDetail({
        id,
        accessToken: user?.accessToken
      }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 2
  });
}

export function useAddDiscussionComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      discussionId,
      body
    }: {
      discussionId: string;
      body: string;
    }) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }
      return addDiscussionComment({
        discussionId,
        body,
        accessToken: user.accessToken
      });
    },
    onMutate: async ({ discussionId, body }) => {
      await queryClient.cancelQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.detail(discussionId)
      });

      const previousData = queryClient.getQueryData(
        DISCUSSIONS_QUERY_KEYS.detail(discussionId)
      );

      queryClient.setQueryData(
        DISCUSSIONS_QUERY_KEYS.detail(discussionId),
        (old: any) => {
          if (!old || !user) {
            return old;
          }

          const optimisticComment = {
            id: `temp-${Date.now()}`,
            body,
            createdAt: new Date().toISOString(),
            author: {
              login: user.login,
              avatarUrl: user.avatar_url
            },
            reactions: { totalCount: 0 },
            replies: { totalCount: 0, nodes: [] }
          };

          return {
            ...old,
            comments: {
              ...old.comments,
              totalCount: old.comments.totalCount + 1,
              nodes: [...old.comments.nodes, optimisticComment]
            }
          };
        }
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          DISCUSSIONS_QUERY_KEYS.detail(variables.discussionId),
          context.previousData
        );
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.detail(variables.discussionId)
      });
    }
  });
}

export function useToggleDiscussionReaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      subjectId,
      isReacted,
      content = "THUMBS_UP"
    }: {
      subjectId: string;
      isReacted: boolean;
      content?:
        | "THUMBS_UP"
        | "THUMBS_DOWN"
        | "LAUGH"
        | "HOORAY"
        | "CONFUSED"
        | "HEART"
        | "ROCKET"
        | "EYES";
    }) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }

      if (isReacted) {
        return removeDiscussionReaction({
          subjectId,
          content,
          accessToken: user.accessToken
        });
      } else {
        return addDiscussionReaction({
          subjectId,
          content,
          accessToken: user.accessToken
        });
      }
    },
    onMutate: async ({ subjectId, isReacted, content }) => {
      const detailQueryKey = DISCUSSIONS_QUERY_KEYS.detail(subjectId);
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousData = queryClient.getQueryData(detailQueryKey);

      queryClient.setQueryData(detailQueryKey, (old: any) => {
        if (!old) {
          return old;
        }

        const delta = isReacted ? -1 : 1;
        return {
          ...old,
          reactions: {
            ...old.reactions,
            totalCount: Math.max(0, old.reactions.totalCount + delta)
          }
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          DISCUSSIONS_QUERY_KEYS.detail(variables.subjectId),
          context.previousData
        );
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    }
  });
}

// Discussion 수정을 위한 간단한 인터페이스
interface UpdatePostParams {
  discussionId: string;
  title: string;
  body: string;
}

// Discussion 수정 Mutation
export function useUpdateDiscussion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: UpdatePostParams) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }

      return updateDiscussion({
        discussionId: params.discussionId,
        title: params.title,
        body: params.body,
        accessToken: user.accessToken
      });
    },
    onSuccess: (updatedDiscussion) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });

      // 상세 정보도 업데이트
      queryClient.setQueryData(
        DISCUSSIONS_QUERY_KEYS.detail(updatedDiscussion.id),
        (oldData: any) => {
          if (!oldData) {
            return oldData;
          }
          return {
            ...oldData,
            title: updatedDiscussion.title,
            body: updatedDiscussion.body,
            updatedAt: updatedDiscussion.updatedAt
          };
        }
      );
    }
  });
}

// Discussion 삭제를 위한 간단한 인터페이스
interface DeletePostParams {
  discussionId: string;
}

// Discussion 삭제 Mutation
export function useDeleteDiscussion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: DeletePostParams) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }

      return deleteDiscussion({
        discussionId: params.discussionId,
        accessToken: user.accessToken
      });
    },
    onSuccess: (deletedDiscussion) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });

      // 상세 정보 캐시 제거
      queryClient.removeQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.detail(deletedDiscussion.id)
      });
    }
  });
}

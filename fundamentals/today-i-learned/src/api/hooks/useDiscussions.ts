import { useAuth } from "@/contexts/AuthContext";
import { ENV_CONFIG } from "@/utils/env";
import {
  useInfiniteQuery,
  useSuspenseQuery,
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
  addDiscussionCommentReply,
  addDiscussionReaction,
  removeDiscussionReaction,
  type DiscussionsApiParams
} from "@/api/remote/discussions";

// NOTE: 만약 쿼리 옵션으로 분리된다면 각각의 쿼리 옵션에서 인라인하기 (중앙 집권형 쿼리 키 x)
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

export function useWeeklyTopDiscussions({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  limit
}: Omit<UseDiscussionsParams, "categoryName"> & { limit?: number } = {}) {
  const { user } = useAuth();

  return useSuspenseQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.weekly(),
    queryFn: async () => {
      const discussions = await fetchWeeklyTopDiscussions({
        owner,
        repo,
        accessToken: user?.accessToken
      });
      return limit ? discussions.slice(0, limit) : discussions;
    },
    staleTime: 1000 * 60 * 30, // 30분
    gcTime: 1000 * 60 * 60, // 1시간
    retry: 1
  });
}

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

interface CreatePostParams {
  title: string;
  body: string;
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: CreatePostParams) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }

      const repoInfo = await fetchRepositoryInfo({
        owner: ENV_CONFIG.GITHUB_OWNER,
        repo: ENV_CONFIG.GITHUB_REPO,
        accessToken: user.accessToken
      });

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
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    }
  });
}

// TODO: queryOptions로 분리 + 사용처에서 useQuery를 드러낼 수 있으면 좋겠다
// NOTE: 다른 remote fetching 훅들도 useQuery + queryOptions로 만들 수 있기를 희망
export function useMyContributions({
  // FIXME: 외부에서 주입하는 의존성 어떻게 처리할지 고민해보기
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
    // NOTE: (잡초?) enabled 너 꼭 필요해?
    enabled: enabled && !!user?.accessToken && !!user?.login,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 2
  });
}

export function useDiscussionDetail(id: string) {
  const { user } = useAuth();

  return useSuspenseQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.detail(id),
    queryFn: () =>
      fetchDiscussionDetail({
        id,
        accessToken: user?.accessToken
      }),
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
    onError: (_err, variables, context) => {
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

export function useAddDiscussionCommentReply() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      discussionId,
      replyToId,
      body
    }: {
      discussionId: string;
      replyToId: string;
      body: string;
    }) => {
      if (!user?.accessToken) {
        throw new Error("Authentication required");
      }
      return addDiscussionCommentReply({
        discussionId,
        replyToId,
        body,
        accessToken: user.accessToken
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
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
      content?: string;
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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: DISCUSSIONS_QUERY_KEYS.all });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    }
  });
}

interface UpdatePostParams {
  discussionId: string;
  title: string;
  body: string;
}

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
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });

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
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });

      queryClient.removeQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.detail(deletedDiscussion.id)
      });
    }
  });
}

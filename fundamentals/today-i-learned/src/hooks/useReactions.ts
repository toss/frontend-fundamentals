import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "../lib/api";

const ADD_REACTION_MUTATION = `
  mutation AddReaction($subjectId: ID!, $content: ReactionContent!) {
    addReaction(input: {subjectId: $subjectId, content: $content}) {
      reaction {
        id
        content
        user {
          login
        }
      }
      subject {
        id
        ... on Discussion {
          reactions {
            totalCount
          }
        }
      }
    }
  }
`;

const REMOVE_REACTION_MUTATION = `
  mutation RemoveReaction($subjectId: ID!, $content: ReactionContent!) {
    removeReaction(input: {subjectId: $subjectId, content: $content}) {
      reaction {
        id
        content
        user {
          login
        }
      }
      subject {
        id
        ... on Discussion {
          reactions {
            totalCount
          }
        }
      }
    }
  }
`;

const GET_USER_REACTIONS_QUERY = `
  query GetUserReactions($discussionId: ID!) {
    node(id: $discussionId) {
      ... on Discussion {
        id
        reactions(first: 100) {
          nodes {
            id
            content
            user {
              login
            }
          }
        }
        viewerCanReact
      }
    }
  }
`;

const GET_CURRENT_USER_QUERY = `
  query GetCurrentUser {
    viewer {
      login
    }
  }
`;

async function addReaction({
  discussionId,
  content = "THUMBS_UP"
}: {
  discussionId: string;
  content?: "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH";
}) {
  const data = await graphqlRequest(ADD_REACTION_MUTATION, {
    subjectId: discussionId,
    content
  });
  return data.data?.addReaction;
}

async function removeReaction({
  discussionId,
  content = "THUMBS_UP"
}: {
  discussionId: string;
  content?: "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH";
}) {
  const data = await graphqlRequest(REMOVE_REACTION_MUTATION, {
    subjectId: discussionId,
    content
  });
  return data.data?.removeReaction;
}

async function getCurrentUser() {
  const data = await graphqlRequest(GET_CURRENT_USER_QUERY, {});
  return data.data?.viewer;
}

async function getUserReactions(discussionId: string) {
  const data = await graphqlRequest(GET_USER_REACTIONS_QUERY, {
    discussionId
  });
  return data.data?.node;
}

export function useAddReaction() {
  const queryClient = useQueryClient();
  const owner = import.meta.env.VITE_GITHUB_OWNER || "al-bur";
  const repo = import.meta.env.VITE_GITHUB_REPO || "test";

  return useMutation({
    mutationFn: addReaction,
    onSuccess: () => {
      // 성공 시 discussions 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: ["discussions", owner, repo]
      });
    },
    onError: (error) => {
      console.error("Failed to add reaction:", error);
    }
  });
}

export function useRemoveReaction() {
  const queryClient = useQueryClient();
  const owner = import.meta.env.VITE_GITHUB_OWNER || "al-bur";
  const repo = import.meta.env.VITE_GITHUB_REPO || "test";

  return useMutation({
    mutationFn: removeReaction,
    onSuccess: () => {
      // 성공 시 discussions 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: ["discussions", owner, repo]
      });
    },
    onError: (error) => {
      console.error("Failed to remove reaction:", error);
    }
  });
}

// 현재 사용자 정보를 가져오는 훅
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 10 // 10분
  });
}

// 특정 게시물에 대한 사용자의 좋아요 상태를 확인하는 훅
export function useUserReactionStatus(discussionId: string) {
  const { data: currentUser } = useCurrentUser();
  console.log("🚀 ~ useUserReactionStatus ~ currentUser:", currentUser);

  return useQuery({
    queryKey: ["userReactions", discussionId],
    queryFn: () => getUserReactions(discussionId),
    enabled: !!currentUser?.login,
    staleTime: 1000 * 60 * 5, // 5분
    select: (data) => {
      console.log(data, "data");
      if (!data || !currentUser) return { isLiked: false, canReact: true };

      // THUMBS_UP 리액션이 있는지 확인
      const hasThumbsUp = data.reactions?.nodes?.some(
        (reaction: any) =>
          reaction.content === "THUMBS_UP" &&
          reaction.user.login === currentUser.login
      );

      return {
        isLiked: Boolean(hasThumbsUp),
        canReact: data.viewerCanReact ?? true
      };
    }
  });
}

// 사용자의 현재 리액션 상태를 확인하는 훅
export function useToggleReaction() {
  const addReaction = useAddReaction();
  const removeReaction = useRemoveReaction();

  const toggleLike = async (discussionId: string, isLiked: boolean) => {
    if (isLiked) {
      await removeReaction.mutateAsync({
        discussionId,
        content: "THUMBS_UP"
      });
    } else {
      await addReaction.mutateAsync({
        discussionId,
        content: "THUMBS_UP"
      });
    }
  };

  return {
    toggleLike,
    isLoading: addReaction.isPending || removeReaction.isPending
  };
}

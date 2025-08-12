import { useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlRequest } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

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


async function addReaction({
  discussionId,
  content = "THUMBS_UP",
  accessToken
}: {
  discussionId: string;
  content?: "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH";
  accessToken: string;
}) {
  const data = await graphqlRequest(ADD_REACTION_MUTATION, {
    subjectId: discussionId,
    content
  }, accessToken);
  return data.data?.addReaction;
}

async function removeReaction({
  discussionId,
  content = "THUMBS_UP",
  accessToken
}: {
  discussionId: string;
  content?: "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH";
  accessToken: string;
}) {
  const data = await graphqlRequest(REMOVE_REACTION_MUTATION, {
    subjectId: discussionId,
    content
  }, accessToken);
  return data.data?.removeReaction;
}


export function useAddReaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const owner = "toss";
  const repo = "frontend-fundamentals";

  return useMutation({
    mutationFn: ({ discussionId, content }: { discussionId: string; content?: "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH" }) => {
      if (!user?.access_token) {
        throw new Error("User not authenticated");
      }
      return addReaction({ discussionId, content, accessToken: user.access_token });
    },
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
  const { user } = useAuth();
  const owner = "toss";
  const repo = "frontend-fundamentals";

  return useMutation({
    mutationFn: ({ discussionId, content }: { discussionId: string; content?: "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH" }) => {
      if (!user?.access_token) {
        throw new Error("User not authenticated");
      }
      return removeReaction({ discussionId, content, accessToken: user.access_token });
    },
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

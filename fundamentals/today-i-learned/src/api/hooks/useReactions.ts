// 리액션 관련 React Query 훅

import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addReaction,
  removeReaction,
  type ReactionContent
} from "../remote/reactions";
import { DISCUSSIONS_QUERY_KEYS } from "./useDiscussions";

interface ReactionMutationParams {
  discussionId: string;
  content?: ReactionContent;
}

// 리액션 추가 훅
export function useAddReaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ discussionId, content }: ReactionMutationParams) => {
      if (!user?.accessToken) {
        throw new Error("User not authenticated");
      }
      return addReaction({
        discussionId,
        content,
        accessToken: user.accessToken
      });
    },
    onSuccess: () => {
      // 성공 시 discussions 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    }
  });
}

// 리액션 제거 훅
export function useRemoveReaction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ discussionId, content }: ReactionMutationParams) => {
      if (!user?.accessToken) {
        throw new Error("User not authenticated");
      }
      return removeReaction({
        discussionId,
        content,
        accessToken: user.accessToken
      });
    },
    onSuccess: () => {
      // 성공 시 discussions 목록을 새로고침
      queryClient.invalidateQueries({
        queryKey: DISCUSSIONS_QUERY_KEYS.all
      });
    }
  });
}

// 리액션 토글 훅 (좋아요 토글)
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

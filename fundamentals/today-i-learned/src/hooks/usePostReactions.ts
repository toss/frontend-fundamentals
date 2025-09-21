import { useCallback } from "react";
import { useToggleDiscussionReaction, DISCUSSIONS_QUERY_KEYS } from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { hasUserReacted as hasUserReactedUtil } from "@/libs/reactions";

interface UsePostReactionsParams {
  discussion?: GitHubDiscussion;
}

interface PostReactionCallbacks {
  onLikeSuccess?: (discussion: GitHubDiscussion) => void;
  onCommentSuccess?: (discussion: GitHubDiscussion) => void;
  onUpvoteSuccess?: (discussion: GitHubDiscussion) => void;
}

export function usePostReactions({ discussion }: UsePostReactionsParams = {}) {
  const { user } = useAuth();
  const { mutate: toggleReaction } = useToggleDiscussionReaction();
  const { handleApiError } = useErrorHandler();
  const queryClient = useQueryClient();

  // Helper function to check if user has reacted
  const hasUserReacted = useCallback((discussionData: GitHubDiscussion, content: "HEART" | "THUMBS_UP") => {
    return hasUserReactedUtil(discussionData.reactions, user?.login || "", content);
  }, [user?.login]);

  /**
   * 좋아요 액션
   */
  const handleLike = useCallback(
    async (postId?: string, callbacks?: PostReactionCallbacks) => {
      const targetId = postId || discussion?.id;

      if (!user?.accessToken || !targetId) {
        return;
      }

      // Get current discussion data from query cache or props
      const currentData = discussion || queryClient.getQueryData<GitHubDiscussion>(
        DISCUSSIONS_QUERY_KEYS.detail(targetId)
      );

      if (!currentData) return;

      const isCurrentlyReacted = hasUserReacted(currentData, "HEART");

      try {
        await new Promise<void>((resolve, reject) => {
          toggleReaction(
            {
              subjectId: targetId,
              isReacted: isCurrentlyReacted,
              content: "HEART"
            },
            {
              onSuccess: () => {
                if (discussion) {
                  callbacks?.onLikeSuccess?.(discussion);
                }
                resolve();
              },
              onError: (error) => {
                handleApiError(error, "좋아요");
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        // 에러는 이미 handleApiError에서 처리됨
      }
    },
    [user?.accessToken, discussion, toggleReaction, handleApiError, queryClient, hasUserReacted]
  );

  /**
   * 댓글 액션 - 현재는 placeholder
   */
  const handleComment = useCallback(
    async (postId?: string, callbacks?: PostReactionCallbacks) => {
      const targetId = postId || discussion?.id;

      if (!targetId) {
        return;
      }

      // TODO: 댓글 모달 또는 댓글 입력 영역으로 이동
      console.log("Comment:", targetId);

      if (discussion) {
        callbacks?.onCommentSuccess?.(discussion);
      }
    },
    [discussion]
  );

  /**
   * 업보트 액션
   */
  const handleUpvote = useCallback(
    async (postId?: string, callbacks?: PostReactionCallbacks) => {
      const targetId = postId || discussion?.id;

      if (!user?.accessToken || !targetId) {
        return;
      }

      // Get current discussion data from query cache or props
      const currentData = discussion || queryClient.getQueryData<GitHubDiscussion>(
        DISCUSSIONS_QUERY_KEYS.detail(targetId)
      );

      if (!currentData) return;

      const isCurrentlyReacted = hasUserReacted(currentData, "THUMBS_UP");

      try {
        await new Promise<void>((resolve, reject) => {
          toggleReaction(
            {
              subjectId: targetId,
              isReacted: isCurrentlyReacted,
              content: "THUMBS_UP"
            },
            {
              onSuccess: () => {
                if (discussion) {
                  callbacks?.onUpvoteSuccess?.(discussion);
                }
                resolve();
              },
              onError: (error) => {
                handleApiError(error, "업보트");
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        // 에러는 이미 handleApiError에서 처리됨
      }
    },
    [user?.accessToken, discussion, toggleReaction, handleApiError, queryClient, hasUserReacted]
  );

  return {
    // 액션 함수들
    handleLike,
    handleComment,
    handleUpvote,

    // 인증 상태
    isAuthenticated: Boolean(user?.accessToken)
  };
}
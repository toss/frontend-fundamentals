import { useCallback } from "react";
import { useToggleDiscussionReaction } from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useAuth } from "@/contexts/AuthContext";
import type { GitHubDiscussion } from "@/api/remote/discussions";

interface UsePostReactionsParams {
  discussion?: GitHubDiscussion;
}

interface PostReactionCallbacks {
  onLikeSuccess?: (discussion: GitHubDiscussion) => void;
  onCommentSuccess?: (discussion: GitHubDiscussion) => void;
  onUpvoteSuccess?: (discussion: GitHubDiscussion) => void;
}

export function usePostReactions({
  discussion
}: UsePostReactionsParams = {}) {
  const { user } = useAuth();
  const { mutate: toggleReaction } = useToggleDiscussionReaction();
  const { handleApiError } = useErrorHandler();

  /**
   * 좋아요 액션
   */
  const handleLike = useCallback(
    async (postId?: string, callbacks?: PostReactionCallbacks) => {
      const targetId = postId || discussion?.id;
      
      if (!user?.accessToken || !targetId) {
        return;
      }

      try {
        await new Promise<void>((resolve, reject) => {
          toggleReaction(
            {
              subjectId: targetId,
              isReacted: false, // TODO: 현재 반응 상태 확인 로직 필요
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
    [user?.accessToken, discussion, toggleReaction, handleApiError]
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

      try {
        await new Promise<void>((resolve, reject) => {
          toggleReaction(
            {
              subjectId: targetId,
              isReacted: false, // TODO: 현재 반응 상태 확인 로직 필요
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
    [user?.accessToken, discussion, toggleReaction, handleApiError]
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
import { useCallback } from "react";
import {
  useUpdateDiscussion,
  useDeleteDiscussion
} from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/components/shared/ui/Toast";
import type { GitHubDiscussion } from "@/api/remote/discussions";

interface UsePostActionsParams {
  currentUserLogin?: string;
}

interface PostActionCallbacks {
  onEditSuccess?: (updatedPost: GitHubDiscussion) => void;
  onDeleteSuccess?: (deletedPostId: string) => void;
}

export function usePostActions({
  currentUserLogin
}: UsePostActionsParams = {}) {
  const { mutate: updateDiscussion, isPending: isUpdating } =
    useUpdateDiscussion();
  const { mutate: deleteDiscussion, isPending: isDeleting } =
    useDeleteDiscussion();
  const { handleApiError } = useErrorHandler();
  const { success: showSuccessToast } = useToast();

  /**
   * 글 수정 액션
   */
  const handleEdit = useCallback(
    async (
      discussion: GitHubDiscussion,
      { title, body }: { title: string; body: string },
      callbacks?: PostActionCallbacks
    ) => {
      try {
        await new Promise<void>((resolve, reject) => {
          updateDiscussion(
            {
              discussionId: discussion.id,
              title,
              body
            },
            {
              onSuccess: (updatedDiscussion) => {
                showSuccessToast(
                  "수정 완료",
                  "글이 성공적으로 수정되었습니다."
                );
                callbacks?.onEditSuccess?.(updatedDiscussion);
                resolve();
              },
              onError: (error) => {
                handleApiError(error, "글 수정");
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        // 에러는 이미 handleApiError에서 처리됨
        throw error;
      }
    },
    [updateDiscussion, handleApiError, showSuccessToast]
  );

  /**
   * 글 삭제 액션
   */
  const handleDelete = useCallback(
    async (discussion: GitHubDiscussion, callbacks?: PostActionCallbacks) => {
      try {
        await new Promise<void>((resolve, reject) => {
          deleteDiscussion(
            {
              discussionId: discussion.id
            },
            {
              onSuccess: () => {
                showSuccessToast(
                  "삭제 완료",
                  "글이 성공적으로 삭제되었습니다."
                );
                callbacks?.onDeleteSuccess?.(discussion.id);
                resolve();
              },
              onError: (error) => {
                handleApiError(error, "글 삭제");
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        // 에러는 이미 handleApiError에서 처리됨
        throw error;
      }
    },
    [deleteDiscussion, handleApiError, showSuccessToast]
  );

  /**
   * 현재 사용자가 해당 글의 작성자인지 확인
   */
  const canEditPost = useCallback(
    (discussion: GitHubDiscussion): boolean => {
      return Boolean(
        currentUserLogin && discussion.author.login === currentUserLogin
      );
    },
    [currentUserLogin]
  );

  /**
   * 현재 사용자가 해당 글을 삭제할 수 있는지 확인
   */
  const canDeletePost = useCallback(
    (discussion: GitHubDiscussion): boolean => {
      return Boolean(
        currentUserLogin && discussion.author.login === currentUserLogin
      );
    },
    [currentUserLogin]
  );

  return {
    // 액션 함수들
    handleEdit,
    handleDelete,

    // 권한 체크 함수들
    canEditPost,
    canDeletePost,

    // 로딩 상태
    isUpdating,
    isDeleting,
    isLoading: isUpdating || isDeleting
  };
}

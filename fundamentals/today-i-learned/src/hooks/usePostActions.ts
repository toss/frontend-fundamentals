import { useCallback } from "react";
import {
  useUpdateDiscussion,
  useDeleteDiscussion
} from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/contexts/ToastContext";
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
  const {
    mutate: deleteDiscussion,
    isPending: isDeleting,
    isError: isDeleteError
  } = useDeleteDiscussion();
  const { handleApiError } = useErrorHandler();
  const { success: showSuccessToast } = useToast();

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
        throw error;
      }
    },
    [updateDiscussion, handleApiError, showSuccessToast]
  );

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
        throw error;
      }
    },
    [deleteDiscussion, handleApiError, showSuccessToast]
  );

  const canEditPost = useCallback(
    (discussion: GitHubDiscussion): boolean => {
      return Boolean(
        currentUserLogin && discussion.author.login === currentUserLogin
      );
    },
    [currentUserLogin]
  );

  const canDeletePost = useCallback(
    (discussion: GitHubDiscussion): boolean => {
      return Boolean(
        currentUserLogin && discussion.author.login === currentUserLogin
      );
    },
    [currentUserLogin]
  );

  return {
    handleEdit,
    handleDelete,
    canEditPost,
    canDeletePost,
    isUpdating,
    isDeleting,
    isLoading: isUpdating || isDeleting,
    isDeleteError
  };
}

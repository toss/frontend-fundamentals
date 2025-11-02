import { useToggleDiscussionReaction } from "@/api/hooks/useDiscussions";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useAuth } from "@/contexts/AuthContext";
import {
  getHeartAndUpvoteCounts,
  getUserReactionStates
} from "@/utils/reactions";
import { handleApiError } from "@/utils/errors";
import type { GitHubDiscussionDetail } from "@/api/remote/discussions";

export function useDiscussionReactions(
  discussionDetail: GitHubDiscussionDetail
) {
  const { user } = useAuth();
  const { handleLike, handleUpvote } = usePostReactions({
    discussion: discussionDetail
  });
  const toggleReactionMutation = useToggleDiscussionReaction();

  const handleReaction = async (type: "like" | "upvote") => {
    if (!user?.accessToken || !user?.login) {
      return;
    }

    try {
      const reactionContent = type === "like" ? "HEART" : "THUMBS_UP";

      const { hasLiked: currentHasLiked, hasUpvoted: currentHasUpvoted } =
        getUserReactionStates(discussionDetail.reactions, user.login);
      const isCurrentlyReacted =
        type === "like" ? currentHasLiked : currentHasUpvoted;

      await toggleReactionMutation.mutateAsync({
        subjectId: discussionDetail.id,
        isReacted: isCurrentlyReacted,
        content: reactionContent
      });

      if (type === "like") {
        handleLike(discussionDetail.id);
      }
      if (type === "upvote") {
        handleUpvote(discussionDetail.id);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(
    discussionDetail.reactions
  );
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } =
    getUserReactionStates(discussionDetail.reactions, user?.login);

  return {
    handleReaction,
    hasUserLiked,
    hasUserUpvoted,
    heartCount,
    upvoteCount
  };
}

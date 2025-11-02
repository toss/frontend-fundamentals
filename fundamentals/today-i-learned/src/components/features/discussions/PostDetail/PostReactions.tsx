import { InteractionButtons } from "@/components/shared/ui/InteractionButtons";
import { useDiscussionReactions } from "@/hooks/useDiscussionReactions";
import type { GitHubDiscussionDetail } from "@/api/remote/discussions";

interface PostReactionsProps {
  discussionDetail: GitHubDiscussionDetail;
}

export function PostReactions({ discussionDetail }: PostReactionsProps) {
  const {
    handleReaction,
    hasUserLiked,
    hasUserUpvoted,
    heartCount,
    upvoteCount
  } = useDiscussionReactions(discussionDetail);

  return (
    <InteractionButtons
      discussion={discussionDetail}
      onLike={() => handleReaction("like")}
      onUpvote={() => handleReaction("upvote")}
      hasUserLiked={hasUserLiked}
      hasUserUpvoted={hasUserUpvoted}
      heartCount={heartCount}
      upvoteCount={upvoteCount}
      variant="detail"
    />
  );
}
import { CommentList } from "@/pages/timeline/components/CommentList";
import { css } from "@styled-system/css";
import type { GitHubComment } from "@/api/remote/discussions";

interface CommentsSectionProps {
  comments: GitHubComment[];
  discussionId: string;
}

export function CommentsSection({ comments, discussionId }: CommentsSectionProps) {
  return (
    <div className={commentsSection}>
      <CommentList comments={comments} discussionId={discussionId} />
    </div>
  );
}

const commentsSection = css({
  display: "flex",
  flexDirection: "column"
});
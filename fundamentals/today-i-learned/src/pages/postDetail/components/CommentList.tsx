import { Comment } from "./Comment";
import type { GitHubComment } from "@/api/remote/discussions";

interface CommentListProps {
  comments: GitHubComment[];
  onUpvote: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
}

export function CommentList({ comments, onUpvote, onReply }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base text-black/60">
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpvote={onUpvote}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

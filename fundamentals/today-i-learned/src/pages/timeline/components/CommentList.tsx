import { Comment } from "./Comment";
import type { GitHubComment } from "@/api/remote/discussions";

interface CommentListProps {
  comments: GitHubComment[];
  onUpvote: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
}

export function CommentList({ comments, onUpvote, onLike, onReply }: CommentListProps) {
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
    <div className="flex flex-col items-center p-0 gap-6 w-full max-w-[800px]">
      {comments.map((comment, index) => (
        <div key={comment.id} className="w-full">
          <Comment comment={comment} onUpvote={onUpvote} onLike={onLike} onReply={onReply} />

          {/* Border - 댓글 사이 경계선 */}
          {index < comments.length - 1 && (
            <div className="flex flex-col items-start py-2 gap-2.5 w-full h-4">
              <div className="w-full h-0 border-b border-[rgba(201,201,201,0.4)]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

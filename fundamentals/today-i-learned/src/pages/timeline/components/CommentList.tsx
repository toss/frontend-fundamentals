import { Comment } from "./Comment";
import type { GitHubComment } from "@/api/remote/discussions";
import { css } from "@styled-system/css";

interface CommentListProps {
  comments: GitHubComment[];
  onUpvote: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
}

export function CommentList({ comments, onUpvote, onLike, onReply }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className={emptyState}>
        <p className={emptyMessage}>
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className={commentListContainer}>
      {comments.map((comment, index) => (
        <div key={comment.id} className={commentItemContainer}>
          <Comment comment={comment} onUpvote={onUpvote} onLike={onLike} onReply={onReply} />

          {/* Border - 댓글 사이 경계선 */}
          {index < comments.length - 1 && (
            <div className={dividerContainer}>
              <div className={dividerLine} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Semantic style definitions
const emptyState = css({
  textAlign: 'center',
  paddingY: '2rem'
});

const emptyMessage = css({
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.6)'
});

const commentListContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '800px'
});

const commentItemContainer = css({
  width: '100%'
});

const dividerContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingY: '1rem',
  gap: '0.625rem',
  width: '100%'
});

const dividerLine = css({
  width: '100%',
  height: '1px',
  backgroundColor: 'rgba(201, 201, 201, 0.5)'
});

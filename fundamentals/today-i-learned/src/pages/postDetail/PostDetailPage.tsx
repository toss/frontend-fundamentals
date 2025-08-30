import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { LoadingSpinner } from "@/components/shared/ui/LoadingSpinner";
import { useParams } from "react-router-dom";
import { CommentInput } from "./components/CommentInput";
import { CommentList } from "./components/CommentList";
import { PostActions } from "./components/PostActions";
import { PostContent } from "./components/PostContent";
import { PostHeader } from "./components/PostHeader";
import {
  CommentHeader,
  CommentSection,
  ContentWrapper,
  ErrorContainer,
  LoadingContainer,
  MainColumn,
  PageContainer,
  PostSection,
  SidebarColumn
} from "./components/StyledWrappers";
import { usePostDetail } from "./hooks/usePostDetail";

/**
 * NOTE: MVP에서는 제외 (모달만 남기기)
 */
export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, postData, comments, handlers } = usePostDetail(id);

  if (!id) {
    return <ErrorContainer message="게시글을 찾을 수 없습니다." />;
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner text="게시글을 불러오는 중..." variant="primary" />
      </LoadingContainer>
    );
  }

  if (error || !postData) {
    return <ErrorContainer message="게시글을 불러올 수 없습니다." />;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <MainColumn>
          <PostDetail post={postData} comments={comments} handlers={handlers} />
        </MainColumn>

        <SidebarColumn>
          <div className="sticky top-4">
            <WeeklyTop5 />
          </div>
        </SidebarColumn>
      </ContentWrapper>
    </PageContainer>
  );
}

interface PostDetailProps {
  post: any;
  comments: any[];
  handlers: {
    handleLike: (id: string) => void;
    handleComment: (id: string) => void;
    handleShare: (id: string) => void;
    handleUpvote: (id: string) => void;
    handleCommentUpvote: (id: string) => void;
    handleReply: (commentId: string, content: string) => void;
    handleNewComment: (content: string) => void;
  };
}

function PostDetail({ post, comments, handlers }: PostDetailProps) {
  const {
    handleLike,
    handleComment,
    handleShare,
    handleUpvote,
    handleCommentUpvote,
    handleReply,
    handleNewComment
  } = handlers;

  return (
    <>
      <PostSection>
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostActions
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onUpvote={handleUpvote}
        />
      </PostSection>

      <CommentSection>
        <div className="mb-6">
          <CommentHeader count={comments.length} />
          <CommentInput
            onSubmit={handleNewComment}
            placeholder="댓글을 작성해보세요..."
          />
        </div>

        <CommentList
          comments={comments}
          onUpvote={handleCommentUpvote}
          onReply={handleReply}
        />
      </CommentSection>
    </>
  );
}

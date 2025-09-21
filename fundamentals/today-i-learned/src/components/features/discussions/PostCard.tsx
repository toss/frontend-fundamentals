import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Card } from "@/components/shared/ui/Card";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { InteractionButtons } from "@/components/shared/ui/InteractionButtons";
import { useWritePostModal } from "@/pages/timeline/hooks/useWritePostModal";
import { PostMoreMenu } from "./PostMoreMenu";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { formatTimeAgo } from "@/pages/timeline/utils/formatters";
import { usePostActions } from "@/hooks/usePostActions";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useAuth } from "@/contexts/AuthContext";
import { getHeartAndUpvoteCounts, getUserReactionStates } from "@/utils/reactions";
import { css } from "@styled-system/css";

interface PostCardProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onUpvote?: (postId: string) => void;
  currentUserLogin?: string;
}

export function PostCardSkeleton() {
  return <div className={skeletonContainer} />;
}

export function PostCard({
  discussion,
  onLike,
  onUpvote,
  currentUserLogin
}: PostCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Use utility functions to get reaction counts and user states
  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(discussion.reactions);
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } = getUserReactionStates(discussion.reactions, user?.login);

  // Post actions 훅 사용
  const {
    handleEdit,
    handleDelete,
    canEditPost,
    isUpdating,
    isDeleting,
    isDeleteError
  } = usePostActions({ currentUserLogin });

  // Post reactions 훅 사용
  const {
    handleLike: defaultHandleLike,
    handleUpvote: defaultHandleUpvote
  } = usePostReactions({ discussion });

  const { openModal, WritePostModal, isOpen } = useWritePostModal({
    onSubmit: async (title, content) => {
      await handleEdit(discussion, { title, body: content });
    },
    isEdit: true,
    initialTitle: discussion.title,
    initialContent: discussion.body
  });

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 수정 모달이 열려있으면 페이지 이동하지 않음
    if (!isOpen) {
      navigate(`/post/${discussion.id}`);
    }
  };
  return (
    <Card
      variant="bordered"
      padding="none"
      className={cardContainer}
      onClick={handlePostClick}
    >
      <div className={cardContent}>
        {/* 헤더: 사용자 정보 */}
        <div className={headerSection}>
          <div className={userInfoContainer}>
            <Avatar
              size="40"
              src={discussion.author.avatarUrl}
              alt={discussion.author.login}
              fallback={discussion.author.login}
              className={avatarStyles}
            />
            <div className={userDetailsContainer}>
              <div className={userMetaContainer}>
                <h4 className={userName}>
                  {discussion.author.login}
                </h4>
                <span className={userHandle}>
                  @{discussion.author.login}
                </span>
                <span className={separator}>
                  ·
                </span>
                <span className={timeStamp}>
                  {formatTimeAgo(discussion.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* 더보기 메뉴 (본인 글인 경우만) */}
          {canEditPost(discussion) && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostMoreMenu
                onEdit={openModal}
                onDelete={() => handleDelete(discussion)}
                isLoading={isUpdating || isDeleting}
                isDeleteError={isDeleteError}
              />
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className={contentSection}>
          {/* 제목과 내용 */}
          <div className={contentContainer}>
            {/* 제목 */}
            <h2 className={postTitle}>
              {discussion.title}
            </h2>

            {/* 내용 미리보기 */}
            <div className={contentPreview}>
              <MarkdownRenderer
                content={discussion.body}
                className={markdownContent}
              />
            </div>
          </div>
        </div>

        <InteractionButtons
          discussion={discussion}
          onLike={onLike || defaultHandleLike}
          onUpvote={onUpvote || defaultHandleUpvote}
          hasUserLiked={hasUserLiked}
          hasUserUpvoted={hasUserUpvoted}
          heartCount={heartCount}
          upvoteCount={upvoteCount}
          variant="card"
        />
      </div>
      {WritePostModal}
    </Card>
  );
}

// Semantic style definitions
const skeletonContainer = css({
  width: '100%',
  height: '322px',
  backgroundColor: 'rgba(0, 0, 0, 0.03)',
  borderRadius: '1rem'
});

const cardContainer = css({
  width: '100%',
  cursor: 'pointer'
});

const cardContent = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  gap: '1.5rem'
});

const headerSection = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '2.5rem'
});

const userInfoContainer = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  minWidth: '0',
  flex: '1'
});

const avatarStyles = css({
  flexShrink: '0'
});

const userDetailsContainer = css({
  minWidth: '0',
  flex: '1'
});

const userMetaContainer = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap'
});

const userName = css({
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.8)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

const userHandle = css({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: '#979797'
});

const separator = css({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: '#979797'
});

const timeStamp = css({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: '#979797'
});

const contentSection = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
});

const contentContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem'
});

const postTitle = css({
  fontWeight: '700',
  fontSize: '22px',
  lineHeight: '130%',
  letterSpacing: '-0.4px',
  color: '#0F0F0F',
  transition: 'colors 0.15s ease-in-out',
  _hover: {
    color: 'rgb(55, 65, 81)'
  }
});

const contentPreview = css({
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: 'colors 0.15s ease-in-out',
  _hover: {
    color: 'rgba(0, 0, 0, 0.6)'
  }
});

const markdownContent = css({
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '160%',
  letterSpacing: '-0.4px',
  color: 'rgba(0, 0, 0, 0.8)'
});

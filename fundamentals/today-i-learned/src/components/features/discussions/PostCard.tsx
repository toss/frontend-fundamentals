import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Card } from "@/components/shared/ui/Card";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { InteractionButtons } from "@/components/shared/ui/InteractionButtons";
import { useEditPostModal } from "@/pages/timeline/hooks/useEditPostModal";
import { PostMoreMenu } from "./PostMoreMenu";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { formatTimeAgo } from "@/pages/timeline/utils/formatters";
import { usePostActions } from "@/hooks/usePostActions";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useAuth } from "@/contexts/AuthContext";
import {
  getHeartAndUpvoteCounts,
  getUserReactionStates
} from "@/utils/reactions";
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

  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(
    discussion.reactions
  );
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } =
    getUserReactionStates(discussion.reactions, user?.login);

  const {
    handleEdit,
    handleDelete,
    canEditPost,
    isUpdating,
    isDeleting,
    isDeleteError
  } = usePostActions({ currentUserLogin });

  const { handleLike: defaultHandleLike, handleUpvote: defaultHandleUpvote } =
    usePostReactions({ discussion });

  const { openModal, EditPostModal, isOpen } = useEditPostModal({
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
                <h4 className={userName}>{discussion.author.login}</h4>
                <span className={userHandle}>@{discussion.author.login}</span>
                <span className={separator}>·</span>
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
                deleteDialogTitle="글을 삭제하시겠습니까?"
                deleteDialogDescription="댓글과 반응도 함께 삭제됩니다."
              />
            </div>
          )}
        </div>

        {/* 제목 */}
        <h2 className={postTitle}>{discussion.title}</h2>

        {/* 내용 미리보기 */}
        <div className={contentPreview}>
          <MarkdownRenderer
            content={discussion.body}
            className={markdownContent}
          />
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

      {EditPostModal}
    </Card>
  );
}

const skeletonContainer = css({
  width: "100%",
  height: "322px",
  backgroundColor: "rgba(0, 0, 0, 0.03)",
  borderRadius: "1rem"
});

const cardContainer = css({
  width: "100%",
  cursor: "pointer"
});

const cardContent = css({
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem",
  transition: "all 0.2s",
  _hover: {
    "& h2": {
      color: "#0064FF",
      opacity: 0.8
    }
  }
});

const headerSection = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "2.5rem",
  marginBottom: "1rem"
});

const userInfoContainer = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  minWidth: "0",
  flex: "1"
});

const avatarStyles = css({
  flexShrink: "0"
});

const userDetailsContainer = css({
  minWidth: "0",
  flex: "1"
});

const userMetaContainer = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap"
});

const userName = css({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

const userHandle = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#979797"
});

const separator = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#979797"
});

const timeStamp = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#979797"
});

const postTitle = css({
  marginBottom: "0.5rem",
  fontWeight: "700",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transition: "color 0.2s"
});

const contentPreview = css({
  display: "-webkit-box",
  marginBottom: "1rem",
  WebkitLineClamp: "3",
  // @ts-ignore
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  transition: "colors 0.15s ease-in-out",
  _hover: {
    color: "rgba(0, 0, 0, 0.6)"
  }
});

const markdownContent = css({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)",
  // PostCard에서 모든 마크다운 요소의 텍스트 크기를 균일하게 만들기
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    fontSize: "16px !important",
    fontWeight: "500 !important",
    lineHeight: "160% !important",
    letterSpacing: "-0.4px !important",
    color: "rgba(0, 0, 0, 0.8) !important",
    margin: "0 !important"
  },
  "& p": {
    fontSize: "16px !important",
    fontWeight: "500 !important",
    lineHeight: "160% !important",
    letterSpacing: "-0.4px !important",
    color: "rgba(0, 0, 0, 0.8) !important",
    margin: "0 !important"
  },
  "& strong": {
    fontSize: "16px !important",
    fontWeight: "600 !important",
    color: "rgba(0, 0, 0, 0.8) !important"
  },
  "& em": {
    fontSize: "16px !important",
    fontStyle: "italic !important",
    color: "rgba(0, 0, 0, 0.8) !important"
  },
  "& ul, & ol": {
    margin: "0 !important",
    fontSize: "16px !important"
  },
  "& li": {
    fontSize: "16px !important",
    fontWeight: "500 !important",
    lineHeight: "160% !important",
    letterSpacing: "-0.4px !important",
    color: "rgba(0, 0, 0, 0.8) !important"
  },
  "& code": {
    fontSize: "14px !important",
    fontFamily: "monospace !important",
    backgroundColor: "#F5F5F5 !important",
    padding: "2px 4px !important",
    borderRadius: "4px !important"
  },
  "& blockquote": {
    fontSize: "16px !important",
    fontWeight: "500 !important",
    color: "rgba(0, 0, 0, 0.7) !important",
    margin: "0 !important",
    paddingLeft: "8px !important",
    borderLeft: "2px solid #D3D3D3 !important"
  }
});

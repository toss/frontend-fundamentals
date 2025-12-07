import { Avatar } from "@/components/shared/ui/Avatar";
import { css } from "@styled-system/css";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { PostMoreMenu } from "../PostMoreMenu";
import { useAuth } from "@/contexts/AuthContext";
import { usePostActions } from "@/hooks/usePostActions";
import { useEditPostModal } from "@/pages/timeline/hooks/useEditPostModal";

interface PostHeaderProps {
  author: {
    avatarUrl: string;
    login: string;
  };
  createdAt: string;
  discussionId: string;
  discussionTitle: string;
  discussionBody: string;
}

export function PostHeader({
  author,
  createdAt,
  discussionId,
  discussionTitle,
  discussionBody
}: PostHeaderProps) {
  const { user } = useAuth();

  const {
    handleEdit,
    handleDelete,
    canEditPost,
    isUpdating,
    isDeleting,
    isDeleteError
  } = usePostActions({ currentUserLogin: user?.login });

  const { openModal, EditPostModal } = useEditPostModal({
    onSubmit: async (title, content) => {
      await handleEdit(
        { id: discussionId, author } as any,
        { title, body: content }
      );
    },
    isEdit: true,
    initialTitle: discussionTitle,
    initialContent: discussionBody
  });

  const isOwnPost = canEditPost({ author } as any);

  return (
    <>
      <div className={headerSection}>
        <div className={authorSection}>
          <Avatar
            size="40"
            src={author.avatarUrl}
            alt={author.login}
            fallback={author.login}
            className={avatarStyles}
          />
          <div className={authorInfoContainer}>
            <h4 className={authorName}>{author.login}</h4>
            <div className={authorMeta}>
              <span className={authorHandle}>@{author.login}</span>
              <span className={separator}>·</span>
              <span className={timeStamp}>{formatTimeAgo(createdAt)}</span>
            </div>
          </div>
        </div>

        {isOwnPost && (
          <PostMoreMenu
            onEdit={openModal}
            onDelete={() =>
              handleDelete({ id: discussionId, author } as any)
            }
            isLoading={isUpdating || isDeleting}
            isDeleteError={isDeleteError}
          />
        )}
      </div>
      {EditPostModal}
    </>
  );
}

const headerSection = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

const authorSection = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem"
});

const avatarStyles = css({
  flexShrink: "0"
});

const authorInfoContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem"
});

const authorName = css({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)"
});

const authorMeta = css({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem"
});

const authorHandle = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.4)"
});

const separator = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.4)"
});

const timeStamp = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.4)"
});

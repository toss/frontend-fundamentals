import { useToggleDiscussionReaction } from "@/api/hooks/useDiscussions";
import { GitHubDiscussionDetail } from "@/api/remote/discussions";
import { Avatar } from "@/components/shared/ui/Avatar";
import { InteractionButtons } from "@/components/shared/ui/InteractionButtons";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { usePostReactions } from "@/hooks/usePostReactions";
import {
  getHeartAndUpvoteCounts,
  getUserReactionStates
} from "@/utils/reactions";
import { css } from "@styled-system/css";

export function ContentBody({
  discussionDetail
}: {
  discussionDetail: GitHubDiscussionDetail;
}) {
  {
    /* 헤더: 사용자 정보 + 본문 */
  }

  const { handleLike, handleUpvote } = usePostReactions({
    discussion: discussion || undefined
  });

  const toggleReactionMutation = useToggleDiscussionReaction();
  const handleReaction = async (type: "like" | "upvote") => {
    if (!user?.accessToken || !user?.login) {
      return;
    }

    try {
      const reactionContent = type === "like" ? "HEART" : "THUMBS_UP";

      const { hasLiked: currentHasLiked, hasUpvoted: currentHasUpvoted } =
        getUserReactionStates(actualDiscussion.reactions, user.login);
      const isCurrentlyReacted =
        type === "like" ? currentHasLiked : currentHasUpvoted;

      await toggleReactionMutation.mutateAsync({
        subjectId: discussion.id,
        isReacted: isCurrentlyReacted,
        content: reactionContent
      });

      if (type === "like") {
        handleLike(discussion.id);
      }
      if (type === "upvote") {
        handleUpvote(discussion.id);
      }
    } catch (error) {
      console.error("반응 처리 실패:", error);
    }
  };
  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(
    actualDiscussion.reactions
  );
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } =
    getUserReactionStates(actualDiscussion.reactions, user?.login);
  return (
    <>
      <div className={headerSection}>
        <Avatar
          size="40"
          src={actualDiscussion.author.avatarUrl}
          alt={actualDiscussion.author.login}
          fallback={actualDiscussion.author.login}
          className={avatarStyles}
        />
        <div className={authorInfoContainer}>
          <h4 className={authorName}>{actualDiscussion.author.login}</h4>
          <div className={authorMeta}>
            <span className={authorHandle}>
              @{actualDiscussion.author.login}
            </span>
            <span className={separator}>·</span>
            <span className={timeStamp}>
              {formatTimeAgo(actualDiscussion.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className={contentSection}>
        {/* 제목 */}
        <h2 className={postTitle}>{actualDiscussion.title}</h2>

        {/* 내용 */}
        <div className={contentContainer}>
          <MarkdownRenderer
            content={actualDiscussion.body}
            className={markdownContent}
          />
        </div>
      </div>

      <InteractionButtons
        discussion={actualDiscussion}
        onLike={() => handleReaction("like")}
        onUpvote={() => handleReaction("upvote")}
        hasUserLiked={hasUserLiked}
        hasUserUpvoted={hasUserUpvoted}
        heartCount={heartCount}
        upvoteCount={upvoteCount}
        variant="detail"
      />
    </>
  );
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  }
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  }
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

const headerSection = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem"
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

const contentSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem"
});

const postTitle = css({
  fontWeight: "700",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const contentContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
});

const markdownContent = css({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)"
});

const dividerContainerSmall = css({
  paddingY: "0.5rem"
});

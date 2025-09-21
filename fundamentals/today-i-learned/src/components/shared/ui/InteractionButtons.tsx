import { Heart, MessageCircle, ChevronUp } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { ReactionTooltip } from "@/components/shared/ui/ReactionTooltip";
import { ShareLinkButton } from "@/components/shared/ShareLinkButton";
import { formatNumber } from "@/pages/timeline/utils/formatters";
import { getUsersWhoReacted } from "@/libs/reactions";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { css } from "@styled-system/css";

const interactionContainer = {
  display: "flex",
  alignItems: "start",
  gap: "16px",
  paddingTop: "8px"
};

const buttonSection = {
  position: "relative"
};

const interactionButton = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  _hover: {
    opacity: "0.7"
  }
};

const iconContainer = {
  width: "20px",
  height: "20px"
};

const buttonText = {
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  fontWeight: "600"
};

const upvoteText = {
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  fontWeight: "700"
};

const avatarGroup = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "6px"
};

const avatarList = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
};

const avatarItem = {
  width: "24px",
  height: "24px",
  borderRadius: "9999px",
  border: "2px solid white",
  backgroundColor: "rgb(243, 244, 246)",
  overflow: "hidden",
  flexShrink: "0"
};

const tooltipText = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgb(55, 65, 81)",
  marginLeft: "8px",
  paddingRight: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const commentTooltip = {
  position: "absolute",
  bottom: "100%",
  left: "0",
  marginBottom: "8px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "9999px",
  zIndex: "50",
  padding: "4px",
  gap: "6px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)",
  minWidth: "fit-content",
  whiteSpace: "nowrap",
  maxWidth: "300px"
};

const commentAvatar = {
  width: "24px",
  height: "24px",
  borderRadius: "9999px",
  backgroundColor: "rgb(243, 244, 246)",
  overflow: "hidden",
  flexShrink: "0"
};

const commentText = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgb(55, 65, 81)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingX: "8px",
  paddingY: "4px",
  maxWidth: "30vw"
};

interface InteractionButtonsProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onUpvote?: (postId: string) => void;
  hasUserLiked: boolean;
  hasUserUpvoted: boolean;
  heartCount: number;
  upvoteCount: number;
  variant?: "card" | "detail";
}

export function InteractionButtons({
  discussion,
  onLike,
  onUpvote,
  hasUserLiked: initialHasUserLiked,
  hasUserUpvoted: initialHasUserUpvoted,
  heartCount: initialHeartCount,
  upvoteCount: initialUpvoteCount,
  variant = "card"
}: InteractionButtonsProps) {
  // Optimistic UI state
  const [optimisticState, setOptimisticState] = useState({
    hasUserLiked: initialHasUserLiked,
    hasUserUpvoted: initialHasUserUpvoted,
    heartCount: initialHeartCount,
    upvoteCount: initialUpvoteCount
  });

  const [isUpvoteHovered, setIsUpvoteHovered] = useState(false);
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  const [isCommentHovered, setIsCommentHovered] = useState(false);

  const heartUsers = getUsersWhoReacted(discussion.reactions, "HEART");
  const upvoteUsers = getUsersWhoReacted(discussion.reactions, "THUMBS_UP");

  const isCardVariant = variant === "card";

  // Props 변화에 따른 상태 동기화
  useEffect(() => {
    setOptimisticState({
      hasUserLiked: initialHasUserLiked,
      hasUserUpvoted: initialHasUserUpvoted,
      heartCount: initialHeartCount,
      upvoteCount: initialUpvoteCount
    });
  }, [
    initialHasUserLiked,
    initialHasUserUpvoted,
    initialHeartCount,
    initialUpvoteCount
  ]);

  // Optimistic handlers
  const handleOptimisticLike = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      const wasLiked = optimisticState.hasUserLiked;

      // Immediate UI update
      setOptimisticState((prev) => ({
        ...prev,
        hasUserLiked: !prev.hasUserLiked,
        heartCount: prev.hasUserLiked
          ? prev.heartCount - 1
          : prev.heartCount + 1
      }));

      try {
        await onLike?.(discussion.id);
      } catch (error) {
        // Rollback on failure
        setOptimisticState((prev) => ({
          ...prev,
          hasUserLiked: wasLiked,
          heartCount: wasLiked ? prev.heartCount + 1 : prev.heartCount - 1
        }));
        console.error("좋아요 실패:", error);
      }
    },
    [optimisticState.hasUserLiked, onLike, discussion.id]
  );

  const handleOptimisticUpvote = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      const wasUpvoted = optimisticState.hasUserUpvoted;

      // Immediate UI update
      setOptimisticState((prev) => ({
        ...prev,
        hasUserUpvoted: !prev.hasUserUpvoted,
        upvoteCount: prev.hasUserUpvoted
          ? prev.upvoteCount - 1
          : prev.upvoteCount + 1
      }));

      try {
        await onUpvote?.(discussion.id);
      } catch (error) {
        // Rollback on failure
        setOptimisticState((prev) => ({
          ...prev,
          hasUserUpvoted: wasUpvoted,
          upvoteCount: wasUpvoted ? prev.upvoteCount + 1 : prev.upvoteCount - 1
        }));
        console.error("업보트 실패:", error);
      }
    },
    [optimisticState.hasUserUpvoted, onUpvote, discussion.id]
  );

  return (
    <div className={css(interactionContainer)}>
      {/* Upvote Button */}
      <div
        className={css(buttonSection)}
        onMouseEnter={() => setIsUpvoteHovered(true)}
        onMouseLeave={() => setIsUpvoteHovered(false)}
      >
        <button
          onClick={handleOptimisticUpvote}
          className={css(interactionButton)}
          style={{
            color: optimisticState.hasUserUpvoted ? "rgb(107, 114, 128)" : ""
          }}
        >
          <div className={css(iconContainer)}>
            <ChevronUp
              style={{
                width: "100%",
                height: "100%",
                strokeWidth: "1.67px",
                stroke: optimisticState.hasUserUpvoted
                  ? "#979797"
                  : isCardVariant
                    ? "#979797"
                    : "rgba(0,0,0,0.4)"
              }}
            />
          </div>
          <span
            className={css(upvoteText)}
            style={{
              color: optimisticState.hasUserUpvoted
                ? "#979797"
                : isCardVariant
                  ? "#979797"
                  : "rgba(0,0,0,0.4)"
            }}
          >
            {formatNumber(optimisticState.upvoteCount)}
          </span>
        </button>

        {isCardVariant && (
          <ReactionTooltip
            isVisible={isUpvoteHovered && optimisticState.upvoteCount > 0}
          >
            <div className={css(avatarGroup)}>
              <div className={css(avatarList)}>
                {upvoteUsers.slice(0, 3).map((reaction, index) => (
                  <div
                    key={`${reaction.user.login}-${index}`}
                    className={css(avatarItem)}
                    style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                  >
                    <Avatar
                      src={`https://github.com/${reaction.user.login}.png`}
                      alt={reaction.user.login}
                      size="20"
                    />
                  </div>
                ))}
              </div>
              <span className={css(tooltipText)}>
                {`${optimisticState.upvoteCount}명이 업보트했어요`}
              </span>
            </div>
          </ReactionTooltip>
        )}
      </div>

      {/* Like Button */}
      <div
        className={css(buttonSection)}
        onMouseEnter={() => setIsLikeHovered(true)}
        onMouseLeave={() => setIsLikeHovered(false)}
      >
        <button
          onClick={handleOptimisticLike}
          className={css(interactionButton)}
          style={{
            color: optimisticState.hasUserLiked ? "rgb(107, 114, 128)" : ""
          }}
        >
          <div className={css(iconContainer)}>
            <Heart
              style={{
                width: "100%",
                height: "100%",
                strokeWidth: "1.67px",
                stroke: optimisticState.hasUserLiked
                  ? "#979797"
                  : isCardVariant
                    ? "#979797"
                    : "rgba(0,0,0,0.4)",
                fill: optimisticState.hasUserLiked ? "#656565" : "none"
              }}
            />
          </div>
          <span
            className={css(buttonText)}
            style={{
              color: optimisticState.hasUserLiked
                ? "#979797"
                : isCardVariant
                  ? "#979797"
                  : "rgba(0,0,0,0.4)"
            }}
          >
            {formatNumber(optimisticState.heartCount)}
          </span>
        </button>

        {isCardVariant && (
          <ReactionTooltip
            isVisible={isLikeHovered && optimisticState.heartCount > 0}
          >
            <div className={css(avatarGroup)}>
              <div className={css(avatarList)}>
                {heartUsers.slice(0, 3).map((reaction, index) => (
                  <div
                    key={`${reaction.user.login}-${index}`}
                    className={css(avatarItem)}
                    style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                  >
                    <Avatar
                      src={`https://github.com/${reaction.user.login}.png`}
                      alt={reaction.user.login}
                      size="20"
                    />
                  </div>
                ))}
              </div>
              <span className={css(tooltipText)}>
                {`${optimisticState.heartCount}명이 좋아했어요`}
              </span>
            </div>
          </ReactionTooltip>
        )}
      </div>

      {/* Comment Button */}
      <div
        className={css(buttonSection)}
        onMouseEnter={() => setIsCommentHovered(true)}
        onMouseLeave={() => setIsCommentHovered(false)}
      >
        <div className={css(interactionButton)}>
          <div className={css(iconContainer)}>
            <MessageCircle
              style={{
                width: "100%",
                height: "100%",
                stroke: isCardVariant ? "#979797" : "rgba(0,0,0,0.4)",
                strokeWidth: "1.67px",
                fill: "none"
              }}
            />
          </div>
          <span
            className={css(buttonText)}
            style={{
              color: isCardVariant ? "#979797" : "rgba(0,0,0,0.4)"
            }}
          >
            {formatNumber(discussion.comments.totalCount)}
          </span>
        </div>

        {isCardVariant &&
          isCommentHovered &&
          discussion.comments.totalCount > 0 && (
            <div className={css(commentTooltip)}>
              {discussion.comments.nodes &&
              discussion.comments.nodes.length > 0 ? (
                <>
                  <div className={css(commentAvatar)}>
                    <Avatar
                      src={
                        discussion.comments.nodes[0].author.avatarUrl ||
                        `https://github.com/${discussion.comments.nodes[0].author.login}.png`
                      }
                      alt={discussion.comments.nodes[0].author.login}
                      size="20"
                    />
                  </div>
                  <span className={css(commentText)}>
                    @{discussion.comments.nodes[0].author.login}:{" "}
                    {discussion.comments.nodes[0].body}
                  </span>
                </>
              ) : (
                <span className={css(commentText)}>
                  {discussion.comments.totalCount === 1
                    ? "1개의 댓글"
                    : `${discussion.comments.totalCount}개의 댓글`}
                </span>
              )}
            </div>
          )}
      </div>

      <ShareLinkButton discussionId={discussion.id} />
    </div>
  );
}

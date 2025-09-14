import { Heart, MessageCircle, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { ReactionTooltip } from "@/components/shared/ui/ReactionTooltip";
import { ShareLinkButton } from "@/components/shared/ShareLinkButton";
import { formatNumber } from "@/pages/timeline/utils/formatters";
import { getUsersWhoReacted } from "@/utils/reactions";
import type { GitHubDiscussion } from "@/api/remote/discussions";

interface InteractionButtonsProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
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
  onComment,
  onUpvote,
  hasUserLiked,
  hasUserUpvoted,
  heartCount,
  upvoteCount,
  variant = "card"
}: InteractionButtonsProps) {
  const [isUpvoteHovered, setIsUpvoteHovered] = useState(false);
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  const [isCommentHovered, setIsCommentHovered] = useState(false);

  const heartUsers = getUsersWhoReacted(discussion.reactions, "HEART");
  const upvoteUsers = getUsersWhoReacted(discussion.reactions, "THUMBS_UP");

  const isCardVariant = variant === "card";
  const iconStroke = isCardVariant ? "stroke-[#979797]" : "stroke-black/40";
  const textColor = isCardVariant ? "text-[#979797]" : "text-black/40";

  return (
    <div className="flex items-start gap-4 pt-2">
      {/* Upvote Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsUpvoteHovered(true)}
        onMouseLeave={() => setIsUpvoteHovered(false)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpvote?.(discussion.id);
          }}
          className={`flex items-center gap-[6px] hover:opacity-70 transition-all ${
            hasUserUpvoted ? "text-gray-600" : ""
          }`}
        >
          <div className="w-5 h-5">
            <ChevronUp
              className={`w-full h-full stroke-[1.67px] ${
                hasUserUpvoted ? "stroke-[#979797]" : iconStroke
              }`}
            />
          </div>
          <span
            className={`text-[16px] leading-[130%] tracking-[-0.4px] font-bold ${
              hasUserUpvoted ? "text-[#979797]" : textColor
            }`}
          >
            {formatNumber(upvoteCount)}
          </span>
        </button>

        {isCardVariant && (
          <ReactionTooltip isVisible={isUpvoteHovered && upvoteCount > 0}>
            <div className="flex flex-row items-center gap-[6px]">
              <div className="flex flex-row items-center">
                {upvoteUsers.slice(0, 3).map((reaction, index) => (
                  <div
                    key={`${reaction.user.login}-${index}`}
                    className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden flex-shrink-0"
                    style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                  >
                    <Avatar
                      src={`https://github.com/${reaction.user.login}.png`}
                      alt={reaction.user.login}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2 pr-2 truncate">
                {`${upvoteCount}명이 업보트했어요`}
              </span>
            </div>
          </ReactionTooltip>
        )}
      </div>

      {/* Like Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsLikeHovered(true)}
        onMouseLeave={() => setIsLikeHovered(false)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike?.(discussion.id);
          }}
          className={`flex items-center gap-[6px] hover:opacity-70 transition-all ${
            hasUserLiked ? "text-gray-600" : ""
          }`}
        >
          <div className="w-5 h-5">
            <Heart
              className={`w-full h-full stroke-[1.67px] ${
                hasUserLiked
                  ? "stroke-[#979797] fill-[#656565]"
                  : `${iconStroke} fill-none`
              }`}
            />
          </div>
          <span
            className={`text-[16px] leading-[130%] tracking-[-0.4px] font-semibold ${
              hasUserLiked ? "text-[#979797]" : textColor
            }`}
          >
            {formatNumber(heartCount)}
          </span>
        </button>

        {isCardVariant && (
          <ReactionTooltip isVisible={isLikeHovered && heartCount > 0}>
            <div className="flex flex-row items-center gap-[6px]">
              <div className="flex flex-row items-center">
                {heartUsers.slice(0, 3).map((reaction, index) => (
                  <div
                    key={`${reaction.user.login}-${index}`}
                    className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden flex-shrink-0"
                    style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                  >
                    <Avatar
                      src={`https://github.com/${reaction.user.login}.png`}
                      alt={reaction.user.login}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2 pr-2 truncate">
                {`${heartCount}명이 좋아했어요`}
              </span>
            </div>
          </ReactionTooltip>
        )}
      </div>

      {/* Comment Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsCommentHovered(true)}
        onMouseLeave={() => setIsCommentHovered(false)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComment?.(discussion.id);
          }}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
        >
          <div className="w-5 h-5">
            <MessageCircle
              className={`w-full h-full ${iconStroke} stroke-[1.67px] fill-none`}
            />
          </div>
          <span
            className={`font-semibold text-[16px] leading-[130%] tracking-[-0.4px] ${textColor}`}
          >
            {formatNumber(discussion.comments.totalCount)}
          </span>
        </button>

        {isCardVariant &&
          isCommentHovered &&
          discussion.comments.totalCount > 0 && (
            <div
              className="absolute bottom-full left-0 mb-2 flex flex-row items-center bg-white rounded-full z-50 p-1 gap-[6px]"
              style={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)",
                minWidth: "fit-content",
                whiteSpace: "nowrap",
                maxWidth: "300px"
              }}
            >
              {discussion.comments.nodes &&
              discussion.comments.nodes.length > 0 ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                    <Avatar
                      src={
                        discussion.comments.nodes[0].author.avatarUrl ||
                        `https://github.com/${discussion.comments.nodes[0].author.login}.png`
                      }
                      alt={discussion.comments.nodes[0].author.login}
                      className="w-full h-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate px-2 py-1 max-w-[30vw]">
                    @{discussion.comments.nodes[0].author.login}:{" "}
                    {discussion.comments.nodes[0].body}
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-gray-700 truncate px-2 py-1">
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

import { useState } from "react";
import {
  useDiscussionDetail,
  useWeeklyTopDiscussions,
  useAddDiscussionComment,
  useToggleDiscussionReaction
} from "@/api/hooks/useDiscussions";
import type { GitHubDiscussionDetail } from "@/api/remote/discussions";

export function usePostDetail(postId: string | undefined) {
  const {
    data: discussion,
    isLoading,
    error
  } = useDiscussionDetail(postId || "");
  const { data: weeklyPosts } = useWeeklyTopDiscussions({ limit: 5 });
  const addComment = useAddDiscussionComment();
  const toggleReaction = useToggleDiscussionReaction();

  const [interactionState, setInteractionState] = useState({
    likes: new Set<string>(),
    upvotes: new Set<string>()
  });

  const handleLike = (postId: string) => {
    const isLiked = interactionState.likes.has(postId);
    toggleReaction.mutate({
      subjectId: postId,
      isReacted: isLiked,
      content: "HEART"
    });

    setInteractionState((prev) => {
      const newLikes = new Set(prev.likes);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return { ...prev, likes: newLikes };
    });
  };

  const handleComment = (postId: string) => {
    // TODO: Implement comment functionality
  };

  const handleShare = (postId: string) => {
    // TODO: Implement share functionality
  };

  const handleUpvote = (postId: string) => {
    const isUpvoted = interactionState.upvotes.has(postId);
    toggleReaction.mutate({
      subjectId: postId,
      isReacted: isUpvoted,
      content: "THUMBS_UP"
    });

    setInteractionState((prev) => {
      const newUpvotes = new Set(prev.upvotes);
      if (newUpvotes.has(postId)) {
        newUpvotes.delete(postId);
      } else {
        newUpvotes.add(postId);
      }
      return { ...prev, upvotes: newUpvotes };
    });
  };

  const handleCommentUpvote = (commentId: string) => {
    toggleReaction.mutate({
      subjectId: commentId,
      isReacted: false,
      content: "THUMBS_UP"
    });
  };

  const handleReply = (commentId: string, content: string) => {
    if (!discussion?.id || !content.trim()) {
      return;
    }

    const parentComment = comments.find((comment) => comment.id === commentId);
    const replyPrefix = parentComment
      ? `> @${parentComment.author.login}: ${content}\n\n`
      : `> ${content}\n\n`;

    addComment.mutate({
      discussionId: discussion.id,
      body: `${replyPrefix}답글 내용을 입력하세요.`
    });
  };

  const handleNewComment = (content: string) => {
    if (!discussion?.id || !content.trim()) {
      return;
    }

    addComment.mutate({
      discussionId: discussion.id,
      body: content
    });
  };

  const postData: GitHubDiscussionDetail | null = discussion || null;

  const comments = discussion?.comments.nodes || [];

  const weeklyTop5Data = {
    posts: weeklyPosts || [],
    weekInfo: "이번 주 인기글"
  };

  return {
    postId,
    isLoading,
    error,

    postData,
    comments,
    weeklyTop5Data,

    handlers: {
      handleLike,
      handleComment,
      handleShare,
      handleUpvote,
      handleCommentUpvote,
      handleReply,
      handleNewComment
    }
  };
}

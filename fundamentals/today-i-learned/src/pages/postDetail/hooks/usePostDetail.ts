import { useState } from "react";
import {
  useDiscussionDetail,
  useWeeklyTopDiscussions,
  useAddDiscussionComment,
  useToggleDiscussionReaction
} from "@/api/hooks/useDiscussions";
import type {
  GitHubDiscussionDetail,
  GitHubComment
} from "@/api/remote/discussions";
import type { Post, Comment, PopularPost } from "../../timeline/utils/types";

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function mapGitHubUserToAuthor(githubUser: {
  login: string;
  avatarUrl: string;
}) {
  return {
    id: githubUser.login,
    name: githubUser.login,
    username: githubUser.login,
    avatar: githubUser.avatarUrl
  };
}

function mapGitHubCommentToComment(comment: GitHubComment): Comment {
  return {
    id: comment.id,
    content: comment.body,
    author: mapGitHubUserToAuthor(comment.author),
    createdAt: comment.createdAt,
    stats: {
      upvotes: comment.reactions.totalCount,
      replies: comment.replies?.totalCount || 0
    },
    replies:
      comment.replies?.nodes?.map((reply) => ({
        id: reply.id,
        content: reply.body,
        author: mapGitHubUserToAuthor(reply.author),
        createdAt: reply.createdAt,
        stats: {
          upvotes: reply.reactions.totalCount,
          replies: 0
        },
        parentId: comment.id
      })) || []
  };
}

function mapDiscussionToPost(discussion: GitHubDiscussionDetail): Post {
  return {
    id: discussion.id,
    title: discussion.title,
    content: discussion.body,
    author: mapGitHubUserToAuthor(discussion.author),
    createdAt: discussion.createdAt,
    category: discussion.category.name,
    tags: discussion.labels?.nodes?.map((label) => label.name) || [],
    stats: {
      upvotes: discussion.reactions.totalCount,
      hearts: 0,
      comments: discussion.comments.totalCount,
      shares: 0
    },
    isOwn: false
  };
}

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
    console.log("Comment post:", postId);
  };

  const handleShare = (postId: string) => {
    console.log("Share post:", postId);
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
    if (!discussion?.id || !content.trim()) return;

    const parentComment = comments.find((comment) => comment.id === commentId);
    const replyPrefix = parentComment
      ? `> @${parentComment.author.name}: ${content}\n\n`
      : `> ${content}\n\n`;

    addComment.mutate({
      discussionId: discussion.id,
      body: `${replyPrefix}답글 내용을 입력하세요.`
    });
  };

  const handleNewComment = (content: string) => {
    if (!discussion?.id || !content.trim()) return;

    addComment.mutate({
      discussionId: discussion.id,
      body: content
    });
  };

  const postData = discussion ? mapDiscussionToPost(discussion) : null;

  const comments =
    discussion?.comments.nodes.map(mapGitHubCommentToComment) || [];

  const weeklyTop5Data = {
    posts: (weeklyPosts || []).map(
      (post, index): PopularPost => ({
        id: post.id,
        title: post.title,
        author: mapGitHubUserToAuthor(post.author),
        excerpt: truncateText(post.body.replace(/[#*`\n]/g, " ").trim(), 80),
        rank: index + 1
      })
    ),
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

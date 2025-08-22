import { useState } from "react";
import { useDiscussionDetail, useWeeklyTopDiscussions } from "@/api/hooks/useDiscussions";
import type { 
  GitHubDiscussionDetail, 
  GitHubComment 
} from "@/api/remote/discussions";
import type { Post, Comment, PopularPost } from "../../newHome/utils/types";

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function mapGitHubUserToAuthor(githubUser: { login: string; avatarUrl: string }) {
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
    replies: comment.replies?.nodes?.map(reply => ({
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
    tags: discussion.labels?.nodes?.map(label => label.name) || [],
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
  const { data: discussion, isLoading, error } = useDiscussionDetail(postId || "");
  const { data: weeklyPosts } = useWeeklyTopDiscussions({ limit: 5 });

  const [interactionState, setInteractionState] = useState({
    likes: new Set<string>(),
    upvotes: new Set<string>()
  });

  const handleLike = (postId: string) => {
    console.log("Like post:", postId);
    setInteractionState(prev => {
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
    console.log("Upvote post:", postId);
    setInteractionState(prev => {
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
    console.log("Upvote comment:", commentId);
  };

  const handleReply = (commentId: string, content: string) => {
    console.log("Reply to comment:", commentId, content);
  };

  const handleNewComment = (content: string) => {
    console.log("New comment:", content);
  };

  const postData = discussion ? mapDiscussionToPost(discussion) : null;
  
  const comments = discussion?.comments.nodes.map(mapGitHubCommentToComment) || [];

  const weeklyTop5Data = {
    posts: (weeklyPosts || []).map((post, index): PopularPost => ({
      id: post.id,
      title: post.title,
      author: mapGitHubUserToAuthor(post.author),
      excerpt: truncateText(post.body.replace(/[#*`\n]/g, " ").trim(), 80),
      rank: index + 1
    })),
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
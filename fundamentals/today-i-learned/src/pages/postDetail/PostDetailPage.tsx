import { useParams } from "react-router-dom";
import { useDiscussionDetail, useWeeklyTopDiscussions } from "@/api/hooks/useDiscussions";
import { LoadingSpinner } from "@/components/shared/ui/LoadingSpinner";
import { WeeklyTop5 } from "../newHome/components/WeeklyTop5";
import { PostHeader } from "./components/PostHeader";
import { PostContent } from "./components/PostContent";
import { PostActions } from "./components/PostActions";
import { CommentList } from "./components/CommentList";
import { CommentInput } from "./components/CommentInput";
import type { PopularPost } from "../newHome/utils/types";

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: discussion, isLoading, error } = useDiscussionDetail(id || "");
  const { data: weeklyPosts } = useWeeklyTopDiscussions({ limit: 5 });

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">게시글을 찾을 수 없습니다.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner text="게시글을 불러오는 중..." variant="primary" />
      </div>
    );
  }

  if (error || !discussion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">게시글을 불러올 수 없습니다.</div>
      </div>
    );
  }

  // GitHub API 데이터를 컴포넌트에서 사용하는 형식으로 변환
  const postData = {
    id: discussion.id,
    title: discussion.title,
    content: discussion.body,
    author: {
      id: discussion.author.login,
      name: discussion.author.login,
      username: discussion.author.login,
      avatar: discussion.author.avatarUrl
    },
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

  // WeeklyTop5 데이터 변환
  const weeklyTop5Data = weeklyPosts ? {
    posts: weeklyPosts.map((post, index): PopularPost => ({
      id: post.id,
      title: post.title,
      author: {
        id: post.author.login,
        name: post.author.login,
        username: post.author.login,
        avatar: post.author.avatarUrl
      },
      excerpt: truncateText(post.body.replace(/[#*`\n]/g, " ").trim(), 80),
      rank: index + 1
    })),
    weekInfo: "이번 주 인기글"
  } : {
    posts: [],
    weekInfo: "이번 주 인기글"
  };

  // 댓글 데이터 변환
  const comments = discussion.comments.nodes.map(comment => ({
    id: comment.id,
    content: comment.body,
    author: {
      id: comment.author.login,
      name: comment.author.login,
      username: comment.author.login,
      avatar: comment.author.avatarUrl
    },
    createdAt: comment.createdAt,
    stats: {
      upvotes: comment.reactions.totalCount,
      replies: comment.replies?.totalCount || 0
    },
    replies: comment.replies?.nodes?.map(reply => ({
      id: reply.id,
      content: reply.body,
      author: {
        id: reply.author.login,
        name: reply.author.login,
        username: reply.author.login,
        avatar: reply.author.avatarUrl
      },
      createdAt: reply.createdAt,
      stats: {
        upvotes: reply.reactions.totalCount,
        replies: 0
      },
      parentId: comment.id
    })) || []
  }));

  const handleLike = (postId: string) => {
    console.log("Like post:", postId);
  };

  const handleComment = (postId: string) => {
    console.log("Comment post:", postId);
  };

  const handleShare = (postId: string) => {
    console.log("Share post:", postId);
  };

  const handleUpvote = (postId: string) => {
    console.log("Upvote post:", postId);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-8">
                {/* 게시글 헤더 */}
                <PostHeader post={postData} />

                {/* 게시글 내용 */}
                <PostContent post={postData} />

                {/* 게시글 액션 */}
                <PostActions
                  post={postData}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onUpvote={handleUpvote}
                />
              </div>

              {/* 댓글 섹션 */}
              <div className="border-t border-gray-100 p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-black mb-4">
                    댓글 {comments.length}개
                  </h3>
                  <CommentInput
                    onSubmit={handleNewComment}
                    placeholder="댓글을 작성해보세요..."
                  />
                </div>

                {/* 댓글 리스트 */}
                <CommentList
                  comments={comments}
                  onUpvote={handleCommentUpvote}
                  onReply={handleReply}
                />
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <WeeklyTop5 {...weeklyTop5Data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useParams } from "react-router-dom";
import { WeeklyTop5 } from "../newHome/components/WeeklyTop5";
import { PostHeader } from "./components/PostHeader";
import { PostContent } from "./components/PostContent";
import { PostActions } from "./components/PostActions";
import { CommentList } from "./components/CommentList";
import { CommentInput } from "./components/CommentInput";
import type { Post, Comment } from "../newHome/utils/types";

// 임시 데이터 (나중에 실제 API로 교체)
const mockPost: Post = {
  id: "1",
  title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
  content: `안녕하세요! 리액트로 프로젝트를 작성하면서 보면 조건부 렌더링을 할 일이 정말 많은데,
지금은 보통 AND (&&) 연산자나 삼항 연산자(?:)로 이용해서 조건부 렌더링을 처리하고 있는데요.

const Component = () => (
  return (
    {/*
    * 조건이 true일 경우 <A/>를 렌더링합니다.
    * 조건이 false일 경우 null을 렌더링합니다 (렌더링하지 않음).
    */}
    {condition&&<someCondition/>}
    <A/>
  );
);

이런 방식이 익숙하지 않거나, 기본 방식이 아님에도 기술 면접에서 보면 조건부 렌더링에 있는 조금지음스럽다고요.
특히 0이 아닌 falsy에 대한 방식과 시행 착오를 겪었고, 위와 같은 조건부 렌더링을 구현하고 있습니다.`,
  author: {
    id: "user1",
    name: "User Name", 
    username: "user1234",
    avatar: "/api/placeholder/40/40"
  },
  createdAt: "2024-01-01T00:00:00Z",
  category: "React",
  tags: ["조건부", "렌더링", "React"],
  stats: {
    upvotes: 1300,
    hearts: 0,
    comments: 22,
    shares: 31
  }
};

const mockComments: Comment[] = [
  {
    id: "comment1",
    content: `저는 사용하고 있지 않고, 성능 상의 이슈나 오탈자로 인한 사고, 전반적인 재미 없는 코드 읽기 등은 유지보수 측면에서 좋지 않은 것 같아서 조건부의 경우 표현식을 통해 바로 리턴하거나 할 때만 쓰고, 각 단계로 보는 목적으로 useEffect의 정리 리턴과 정합니다.

이런 나쁜 케이스도 있더라고요, condition은 배열이어서는 빈 배열인 경우에는 렌더링이 안 되어야 하는데, 배열로 매치판 하나로 줄어들게 되었습니다.`,
    author: {
      id: "user2",
      name: "User Han",
      username: "user1234",
      avatar: "/api/placeholder/32/32"
    },
    createdAt: "2024-01-01T01:00:00Z",
    stats: {
      upvotes: 130,
      replies: 22
    },
    replies: [
      {
        id: "reply1",
        content: "지금도 AND 연산자 && 쓴 부분이나 생긴다며, 쓸 만 합니다.",
        author: {
          id: "user3",
          name: "User Jung",
          username: "user1234",
          avatar: "/api/placeholder/32/32"
        },
        createdAt: "2024-01-01T01:30:00Z",
        stats: {
          upvotes: 10,
          replies: 0
        },
        parentId: "comment1"
      }
    ]
  },
  {
    id: "comment2", 
    content: "마지 제대로된 분야여 전문적이고 심도 있는 지식을 갖어야만 합니다.",
    author: {
      id: "user4",
      name: "User Kim",
      username: "user1234", 
      avatar: "/api/placeholder/32/32"
    },
    createdAt: "2024-01-01T02:00:00Z",
    stats: {
      upvotes: 123,
      replies: 0
    }
  }
];

const mockWeeklyTop5 = {
  posts: [
    {
      id: "1",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      author: {
        id: "user1",
        name: "User Kim",
        username: "user1234",
        avatar: "/api/placeholder/20/20"
      },
      excerpt: "안녕하세요! 리액트로 프로젝트를 작성하면서 보면 조건부 렌더링을 할 일이 정말...",
      rank: 1
    },
    {
      id: "2", 
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      author: {
        id: "user2",
        name: "Anonymous",
        username: "anonymous",
        avatar: "/api/placeholder/20/20"
      },
      excerpt: "안녕하세요! 리액트로 프로젝트를 작성하면서 보면 조건부 렌더링을 할 일이 정말...",
      rank: 2
    },
    {
      id: "3",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?", 
      author: {
        id: "user3",
        name: "User Han",
        username: "userhan",
        avatar: "/api/placeholder/20/20"
      },
      excerpt: "안녕하세요! 리액트로 프로젝트를 작성하면서 보면 조건부 렌더링을 할 일이 정말...",
      rank: 3
    },
    {
      id: "4",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      author: {
        id: "user4", 
        name: "User Jung",
        username: "userjung",
        avatar: "/api/placeholder/20/20"
      },
      excerpt: "안녕하세요! 리액트로 프로젝트를 작성하면서 보면 조건부 렌더링을 할 일이 정말...",
      rank: 4
    },
    {
      id: "5",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      author: {
        id: "user5",
        name: "User Kim", 
        username: "userkim2",
        avatar: "/api/placeholder/20/20"
      },
      excerpt: "안녕하세요! 리액트로 프로젝트를 작성하면서 보면 조건부 렌더링을 할 일이 정말...",
      rank: 5
    }
  ],
  weekInfo: "6월 첫째 주 인기글"
};

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

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
                <PostHeader post={mockPost} />

                {/* 게시글 내용 */}
                <PostContent post={mockPost} />

                {/* 게시글 액션 */}
                <PostActions
                  post={mockPost}
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
                    댓글 {mockComments.length}개
                  </h3>
                  <CommentInput
                    onSubmit={handleNewComment}
                    placeholder="댓글을 작성해보세요..."
                  />
                </div>

                {/* 댓글 리스트 */}
                <CommentList
                  comments={mockComments}
                  onUpvote={handleCommentUpvote}
                  onReply={handleReply}
                />
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <WeeklyTop5 {...mockWeeklyTop5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
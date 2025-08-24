import {
  Heart,
  MessageCircle,
  Share,
  ChevronUp
} from "lucide-react";
import { Avatar } from "../ui";
import { PostMoreMenu } from "./PostMoreMenu";
import type { Post } from "../utils/types";

interface PostDetailProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: () => void;
  showComments?: boolean;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export function PostDetail({
  post,
  onLike,
  onComment,
  onShare,
  onUpvote,
  onDelete,
  onEdit,
  showComments = true
}: PostDetailProps) {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* 헤더: 사용자 정보 */}
      <div className="flex items-center gap-3">
        <Avatar
          size="40"
          src={post.author.avatar}
          alt={post.author.name}
          fallback={post.author.name}
          className="shrink-0"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80">
            {post.author.name}
          </h4>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              @{post.author.username}
            </span>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              ·
            </span>
            <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex flex-col gap-8">
        {/* 제목 */}
        <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
          {post.title}
        </h2>

        {/* 내용 */}
        <div className="flex flex-col gap-6">
          {/* 첫 번째 문단 */}
          <div className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80">
            {post.content.split('\n\n')[0]}
          </div>

          {/* 코드 블록 (예시) */}
          {post.content.includes('const') && (
            <div className="bg-black/[0.03] rounded-[16px] p-6 flex justify-center items-center">
              <pre className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 whitespace-pre-wrap">
                {post.content.split('\n\n').find(part => part.includes('const')) || 
                `const Component = () => {
  return (
    /**
     * 조건이 true일 경우 <A />를 렌더링합니다.
     * 조건이 false일 경우 null을 반환합니다 (렌더링하지 않음).
     */
    <If condition={someCondition}>
      <A />
    </If>
  );
};`}
              </pre>
            </div>
          )}

          {/* 나머지 내용 */}
          {post.content.split('\n\n').length > 1 && (
            <div className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80">
              {post.content.split('\n\n').slice(1).join('\n\n')}
            </div>
          )}
        </div>
      </div>

      {/* 상호작용 버튼들 */}
      <div className="flex items-start gap-4 py-2">
        <button
          onClick={() => onUpvote(post.id)}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
        >
          <div className="w-5 h-5">
            <ChevronUp className="w-full h-full stroke-black/40 stroke-[1.67px]" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(post.stats.upvotes)}
          </span>
        </button>

        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
        >
          <div className="w-5 h-5">
            <Heart className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(post.stats.hearts)}
          </span>
        </button>

        <button
          onClick={() => onComment(post.id)}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
        >
          <div className="w-5 h-5">
            <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(post.stats.comments)}
          </span>
        </button>

        <button
          onClick={() => onShare(post.id)}
          className="flex items-center gap-[6px] hover:opacity-70 transition-opacity"
        >
          <div className="w-5 h-5">
            <Share className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
          </div>
          <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
            {formatNumber(post.stats.shares)}
          </span>
        </button>
      </div>

      {/* 구분선 */}
      {showComments && (
        <div className="py-4">
          <div className="w-full h-0 border-t border-[rgba(201,201,201,0.4)]" />
        </div>
      )}

      {/* 댓글 입력 */}
      {showComments && (
        <div className="px-8 pb-3 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Avatar
              size="40"
              src="/default-avatar.png"
              alt="User"
              fallback="U"
              className="shrink-0"
            />
            <div className="flex-1 font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/20">
              댓글을 작성해주세요
            </div>
          </div>
          <div className="flex justify-end">
            <button className="flex justify-center items-center px-6 py-[18px] gap-[10px] w-24 h-[46px] bg-black/20 rounded-[200px] font-bold text-[14px] leading-[130%] tracking-[-0.4px] text-[#FCFCFC]">
              작성하기
            </button>
          </div>
        </div>
      )}

      {/* 구분선 */}
      {showComments && (
        <div className="py-2">
          <div className="w-full h-0 border-t border-[rgba(201,201,201,0.4)]" />
        </div>
      )}

      {/* 댓글들 */}
      {showComments && (
        <div className="flex flex-col">
          {/* 첫 번째 댓글 */}
          <div className="px-8">
            <div className="flex items-center gap-3 mb-6">
              <Avatar
                size="40"
                src="/default-avatar.png"
                alt="User Han"
                fallback="UH"
                className="shrink-0"
              />
              <div className="flex items-center gap-2">
                <span className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80">
                  User Han
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  @user1234
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  ·
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                  22시간 전
                </span>
              </div>
            </div>
            <div className="pb-6">
              <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 mb-6">
                저는 사용성 관점에서 생각해봤어요. 사용성이 낮은 코드는 논리 연산자로 작성하는 게 더 적합하다고 봐요. 왜냐하면 이런 경우엔 어떤 조건으로 렌더링되는지 파악하기 간결하고, 논리 연산자가 일반적으로 많이 사용되기 때문에 가독성도 좋거든요. 반대로 사용성이 높은 코드에서는 선언적으로 상태를 넘겨주는 방식이 더 효과적일 것 같아요.

이렇게 하면 컴포넌트를 사용할 때 선언 방식이 모두 일관되게 맞춰지고, condition을 빼먹으면 에러가 발생해서 실수도 줄어들겠죠 ㅋㅋㅋ! 그리고 마치 객체지향에서 인터페이스로 상속하는 구조와 비슷해서 추후 유지보수에도 더 유리할 것 같아요.
              </p>
              {/* 댓글 상호작용 버튼들 */}
              <div className="flex items-start gap-4 py-2">
                <button className="flex items-center gap-[6px] hover:opacity-70 transition-opacity">
                  <div className="w-5 h-5">
                    <ChevronUp className="w-full h-full stroke-black/40 stroke-[1.67px]" />
                  </div>
                  <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                    1.3K
                  </span>
                </button>
                <button className="flex items-center gap-[6px] hover:opacity-70 transition-opacity">
                  <div className="w-5 h-5">
                    <Heart className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
                  </div>
                  <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                    1M
                  </span>
                </button>
                <button className="flex items-center gap-[6px] hover:opacity-70 transition-opacity">
                  <div className="w-5 h-5">
                    <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
                  </div>
                  <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                    22
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="py-2">
            <div className="w-full h-0 border-t border-[rgba(201,201,201,0.4)]" />
          </div>

          {/* 답글 (대댓글) */}
          <div className="px-8">
            <div className="flex gap-4">
              <div className="w-0 flex items-center">
                <div className="w-0 h-[119px] border-l border-[rgba(201,201,201,0.4)]" />
              </div>
              <div className="flex-1 py-6">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar
                    size="40"
                    src="/default-avatar2.png"
                    alt="User Kim"
                    fallback="UK"
                    className="shrink-0"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80">
                      User Kim
                    </span>
                    <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                      @user1234
                    </span>
                    <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                      ·
                    </span>
                    <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                      22시간 전
                    </span>
                  </div>
                </div>
                <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80">
                  좋은 관점이네요! 동감합니다.
                </p>
                <div className="flex items-start gap-4 py-2 mt-6">
                  <button className="flex items-center gap-[6px] hover:opacity-70 transition-opacity">
                    <div className="w-5 h-5">
                      <ChevronUp className="w-full h-full stroke-black/40 stroke-[1.67px]" />
                    </div>
                    <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                      1.3K
                    </span>
                  </button>
                  <button className="flex items-center gap-[6px] hover:opacity-70 transition-opacity">
                    <div className="w-5 h-5">
                      <Heart className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
                    </div>
                    <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                      1M
                    </span>
                  </button>
                  <button className="flex items-center gap-[6px] hover:opacity-70 transition-opacity">
                    <div className="w-5 h-5">
                      <MessageCircle className="w-full h-full stroke-black/40 stroke-[1.67px] fill-none" />
                    </div>
                    <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40">
                      22
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
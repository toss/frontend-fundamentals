import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Card } from "@/components/shared/ui/Card";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { InteractionButtons } from "@/components/shared/ui/InteractionButtons";
import { useWritePostModal } from "@/pages/timeline/hooks/useWritePostModal";
import { PostMoreMenu } from "./PostMoreMenu";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { formatTimeAgo } from "@/pages/timeline/utils/formatters";
import { usePostActions } from "@/hooks/usePostActions";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useAuth } from "@/contexts/AuthContext";
import { getHeartAndUpvoteCounts, getUserReactionStates } from "@/utils/reactions";

interface PostCardProps {
  discussion: GitHubDiscussion;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onUpvote?: (postId: string) => void;
  currentUserLogin?: string;
}

export function PostCardSkeleton() {
  return <div className="w-full h-[322px] bg-black/[0.03] rounded-2xl" />;
}

export function PostCard({
  discussion,
  onLike,
  onComment,
  onUpvote,
  currentUserLogin
}: PostCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Use utility functions to get reaction counts and user states
  const { heartCount, upvoteCount } = getHeartAndUpvoteCounts(discussion.reactions);
  const { hasLiked: hasUserLiked, hasUpvoted: hasUserUpvoted } = getUserReactionStates(discussion.reactions, user?.login);

  // Post actions 훅 사용
  const {
    handleEdit,
    handleDelete,
    canEditPost,
    isUpdating,
    isDeleting,
    isDeleteError
  } = usePostActions({ currentUserLogin });

  // Post reactions 훅 사용
  const {
    handleLike: defaultHandleLike,
    handleComment: defaultHandleComment,
    handleUpvote: defaultHandleUpvote
  } = usePostReactions({ discussion });

  const { openModal, WritePostModal, isOpen } = useWritePostModal({
    onSubmit: async (title, content) => {
      await handleEdit(discussion, { title, body: content });
    },
    isEdit: true,
    initialTitle: discussion.title,
    initialContent: discussion.body
  });

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 수정 모달이 열려있으면 페이지 이동하지 않음
    if (!isOpen) {
      navigate(`/post/${discussion.id}`);
    }
  };
  return (
    <Card
      variant="bordered"
      padding="none"
      className="w-full cursor-pointer"
      onClick={handlePostClick}
    >
      <div className="flex flex-col p-6 gap-6">
        {/* 헤더: 사용자 정보 */}
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar
              size="40"
              src={discussion.author.avatarUrl}
              alt={discussion.author.login}
              fallback={discussion.author.login}
              className="shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-[20px] leading-[130%] tracking-[-0.4px] text-black/80 truncate">
                  {discussion.author.login}
                </h4>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
                  @{discussion.author.login}
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
                  ·
                </span>
                <span className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-[#979797]">
                  {formatTimeAgo(discussion.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* 더보기 메뉴 (본인 글인 경우만) */}
          {canEditPost(discussion) && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostMoreMenu
                onEdit={openModal}
                onDelete={() => handleDelete(discussion)}
                isLoading={isUpdating || isDeleting}
                isDeleteError={isDeleteError}
              />
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-5">
          {/* 제목과 내용 */}
          <div className="flex flex-col gap-5">
            {/* 제목 */}
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] hover:text-gray-700 transition-colors">
              {discussion.title}
            </h2>

            {/* 내용 미리보기 */}
            <div className="line-clamp-2 hover:text-black/60 transition-colors">
              <MarkdownRenderer
                content={discussion.body}
                className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80"
              />
            </div>
          </div>
        </div>

        <InteractionButtons
          discussion={discussion}
          onLike={onLike || defaultHandleLike}
          onComment={onComment || defaultHandleComment}
          onUpvote={onUpvote || defaultHandleUpvote}
          hasUserLiked={hasUserLiked}
          hasUserUpvoted={hasUserUpvoted}
          heartCount={heartCount}
          upvoteCount={upvoteCount}
          variant="card"
        />
      </div>
      {WritePostModal}
    </Card>
  );
}

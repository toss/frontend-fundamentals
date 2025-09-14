import { useDiscussionDetail } from "@/api/hooks/useDiscussions";
import { PostDetail } from "@/components/features/discussions/PostDetail";
import { WeeklyTop5 } from "@/components/features/discussions/WeeklyTop5";
import { usePostReactions } from "@/hooks/usePostReactions";
import { useParams } from "react-router-dom";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: discussion, isLoading, error } = useDiscussionDetail(id || "");

  const { handleLike, handleComment, handleUpvote } = usePostReactions({
    discussion: discussion || undefined
  });

  return (
    <div className="flex">
      <div className="lg:border-x border-gray-200 flex-1 p-[24px]">
        {(() => {
          if (isLoading) {
            return <LoadingState />;
          }

          if (error || !discussion) {
            return <ErrorState />;
          }

          return (
            <PostDetail
              discussion={discussion as any}
              onLike={handleLike}
              onComment={handleComment}
              onUpvote={handleUpvote}
              showComments={true}
            />
          );
        })()}
      </div>

      {/* 사이드바 */}
      <div className="hidden lg:block w-[350px]">
        <div className="sticky top-[120px] p-[24px]">
          <WeeklyTop5 />
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-gray-500">로딩 중...</div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-gray-500">포스트를 찾을 수 없습니다.</div>
    </div>
  );
}

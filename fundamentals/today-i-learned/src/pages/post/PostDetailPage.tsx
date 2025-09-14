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
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
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

import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
import type { GitHubUser } from "@/api/remote/user";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { css } from "@styled-system/css";

interface ActivityContentProps extends BaseComponentProps {
  isLoading: boolean;
  error: Error | null;
  userProfile: GitHubUser | null | undefined;
  userPosts: GitHubDiscussion[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  refetch: () => Promise<any>;
}

export function ActivityContent({
  isLoading,
  error,
  userProfile,
  userPosts,
  hasNextPage,
  isFetchingNextPage,
  elementRef,
  refetch
}: ActivityContentProps) {
  const { handleApiError } = useErrorHandler();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          글을 불러올 수 없습니다
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
        <button
          onClick={() => {
            refetch().catch((error) =>
              handleApiError(error, "활동 목록 재시도")
            );
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!isLoading && userProfile && userPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-black/60 font-medium">아직 작성한 글이 없습니다.</p>
      </div>
    );
  }

  if (userPosts.length > 0) {
    return (
      <>
        <div className={activityContentContainer}>
          {userPosts.map((discussion) => (
            <PostCard
              key={discussion.id}
              discussion={discussion}
              onLike={(postId) => console.log("Like:", postId)}
              onUpvote={(postId) => console.log("Upvote:", postId)}
              currentUserLogin={userProfile?.login}
            />
          ))}
        </div>

        {hasNextPage && (
          <div
            ref={elementRef}
            className="flex items-center justify-center py-4"
          >
            {isFetchingNextPage && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PostCardSkeleton key={`loading-${index}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {!hasNextPage && userPosts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-black/40 font-medium text-sm">
              모든 글을 불러왔습니다.
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-black/60 font-medium">글을 불러오는 중...</p>
    </div>
  );
}

const activityContentContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

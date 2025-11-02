import {
  PostCard,
  PostCardSkeleton
} from "@/components/features/discussions/PostCard";
import type { GitHubUser } from "@/api/remote/user";
import type { GitHubDiscussion } from "@/api/remote/discussions";
import { css } from "@styled-system/css";

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface ActivityContentProps extends BaseComponentProps {
  userProfile: GitHubUser | null | undefined;
  userPosts: GitHubDiscussion[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
}

export function ActivityContent({
  userProfile,
  userPosts,
  hasNextPage,
  isFetchingNextPage,
  elementRef
}: ActivityContentProps) {
  if (userProfile && userPosts.length === 0) {
    return (
      <div className={emptyStateContainer}>
        <p className={emptyStateText}>아직 작성한 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className={activityContentContainer}>
        {userPosts.map((discussion) => (
          <PostCard
            key={discussion.id}
            discussion={discussion}
            currentUserLogin={userProfile?.login}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={elementRef} className={infiniteScrollTrigger}>
          {isFetchingNextPage ? (
            <div className={loadingMoreContainer}>
              <div className={activityContentContainer}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <PostCardSkeleton key={`loading-${index}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className={loadMoreTrigger} />
          )}
        </div>
      )}

      {!hasNextPage && (
        <div className={endStateContainer}>
          <p className={endStateText}>모든 글을 불러왔습니다.</p>
        </div>
      )}
    </>
  );
}

const activityContentContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const emptyStateContainer = css({
  textAlign: "center",
  paddingY: "3rem"
});

const emptyStateText = css({
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: "500"
});

const infiniteScrollTrigger = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingY: "1rem"
});

const loadingMoreContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%"
});

const loadMoreTrigger = css({
  height: "20px",
  width: "100%"
});

const endStateContainer = css({
  textAlign: "center",
  paddingY: "2rem"
});

const endStateText = css({
  color: "rgba(0, 0, 0, 0.4)",
  fontWeight: "500",
  fontSize: "14px"
});

import { css } from "@styled-system/css";
import { PostCardSkeleton } from "@/components/features/discussions/PostCard";

export function ProfileInfoLoadingState() {
  return (
    <div className={profileInfoLoading}>
      <div className={avatarSkeleton} />
      <div className={nameSkeleton} />
      <div className={usernameSkeleton} />
    </div>
  );
}

export function ProfileInfoErrorState() {
  return (
    <div className={errorState}>
      <h3>프로필 정보를 불러올 수 없습니다</h3>
    </div>
  );
}

export function HallOfFameLoadingState() {
  return (
    <div className={hallOfFameLoading}>
      <h2 className={sectionTitleSkeleton} />
      <div className={postsGridSkeleton}>
        {Array.from({ length: 4 }).map((_, index) => (
          <PostCardSkeleton key={`loading-${index}`} />
        ))}
      </div>
    </div>
  );
}

export function HallOfFameErrorState() {
  return (
    <div className={errorState}>
      <h3>명예의 전당을 불러올 수 없습니다</h3>
    </div>
  );
}

export function ActivityLoadingState() {
  return (
    <div className={activityLoading}>
      <div className={activityHeaderSkeleton}>
        <div className={sectionTitleSkeleton} />
        <div className={filterButtonSkeleton} />
      </div>
      <div className={postsListSkeleton}>
        {Array.from({ length: 3 }).map((_, index) => (
          <PostCardSkeleton key={`loading-${index}`} />
        ))}
      </div>
    </div>
  );
}

export function ActivityErrorState() {
  return (
    <div className={errorState}>
      <h3>활동 내역을 불러올 수 없습니다</h3>
    </div>
  );
}

export function ChallengeLoadingState() {
  return (
    <div className={challengeLoading}>
      <div className={challengeHeaderSkeleton}>
        <div className={challengeTitleSkeleton} />
        <div className={challengeSubtitleSkeleton} />
      </div>
      <div className={challengeCalendarSkeleton}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={challengeDaySkeleton}>
            <div />
            <div />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChallengeErrorState() {
  return (
    <div className={errorState}>
      <h3>월간 기록을 불러올 수 없습니다</h3>
    </div>
  );
}

// 스타일 정의
const profileInfoLoading = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  animation: "pulse 2s infinite"
});

const avatarSkeleton = css({
  width: "100px",
  height: "100px",
  backgroundColor: "#e5e7eb",
  borderRadius: "50%"
});

const nameSkeleton = css({
  width: "128px",
  height: "32px",
  backgroundColor: "#e5e7eb",
  borderRadius: "4px"
});

const usernameSkeleton = css({
  width: "96px",
  height: "20px",
  backgroundColor: "#e5e7eb",
  borderRadius: "4px"
});

const hallOfFameLoading = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  animation: "pulse 2s infinite"
});

const activityLoading = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  animation: "pulse 2s infinite"
});

const activityHeaderSkeleton = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

const sectionTitleSkeleton = css({
  width: "120px",
  height: "28px",
  backgroundColor: "#e5e7eb",
  borderRadius: "4px"
});

const filterButtonSkeleton = css({
  width: "140px",
  height: "40px",
  backgroundColor: "#e5e7eb",
  borderRadius: "8px"
});

const postsGridSkeleton = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem"
});

const postsListSkeleton = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const challengeLoading = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "1rem",
  animation: "pulse 2s infinite"
});

const challengeHeaderSkeleton = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginTop: "1.25rem"
});

const challengeTitleSkeleton = css({
  width: "120px",
  height: "32px",
  backgroundColor: "#e5e7eb",
  borderRadius: "4px"
});

const challengeSubtitleSkeleton = css({
  width: "180px",
  height: "20px",
  backgroundColor: "#e5e7eb",
  borderRadius: "4px"
});

const challengeCalendarSkeleton = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.75rem",
  maxWidth: "32rem",
  padding: "1rem",
  border: "1px solid #e5e7eb",
  borderRadius: "8px"
});

const challengeDaySkeleton = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  "& > div:first-child": {
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: "#e5e7eb",
    borderRadius: "50%"
  },
  "& > div:last-child": {
    width: "24px",
    height: "16px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px"
  }
});

const errorState = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "2rem",
  textAlign: "center",
  "& h3": {
    fontWeight: "600",
    fontSize: "14px"
  }
});

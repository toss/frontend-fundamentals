import { css } from "@styled-system/css";

export function PostDetailLoadingState() {
  return (
    <div className={loadingContainer}>
      <div className={loadingTitle}></div>
      <div className={loadingSubtitle}></div>
      <div className={loadingContent}>
        <div className={loadingLine}></div>
        <div className={loadingLineMedium}></div>
        <div className={loadingLineShort}></div>
      </div>
    </div>
  );
}

export function PostDetailErrorState() {
  return <div>포스트를 찾을 수 없습니다.</div>;
}

export function WeeklyTop5LoadingState() {
  const weekText = "이번 주"; // FIXME: 실제 week 계산 로직 필요

  return (
    <div className={weeklyTop5Container}>
      <div className={headerSection}>
        <h3 className={mainTitle}>주간 TOP 5</h3>
        <p className={subtitle}>{weekText}</p>
      </div>
      <div className={contentSection}>
        {[...new Array(5)].map((_, index) => (
          <div key={index} className={skeletonItem} />
        ))}
      </div>
    </div>
  );
}

export function WeeklyTop5ErrorState() {
  return <div>주간 TOP 5를 찾을 수 없습니다.</div>;
}

const loadingContainer = css({
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const loadingTitle = css({
  height: "2rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "75%"
});

const loadingSubtitle = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "50%"
});

const loadingContent = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const loadingLine = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem"
});

const loadingLineMedium = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "83.333333%"
});

const loadingLineShort = css({
  height: "1rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.25rem",
  width: "80%"
});

const weeklyTop5Container = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

const headerSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const mainTitle = css({
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const subtitle = css({
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.6)"
});

const contentSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem"
});

const skeletonItem = css({
  height: "3rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "0.5rem",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
});

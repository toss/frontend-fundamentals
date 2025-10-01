import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/shared/ui/Avatar";
import { useWeeklyTopDiscussions } from "@/api/hooks/useDiscussions";
import { css } from "@styled-system/css";

function getWeekLabel(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - daysToSubtract);

  const month = weekStart.getMonth() + 1;
  const weekOfMonth = Math.ceil(weekStart.getDate() / 7);

  return `${month}월 ${weekOfMonth}째주 인기글`;
}

function PopularPostItem({ post, rank }: { post: any; rank: number }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className={postItemContainer}>
      <div className={rankContainer}>
        <span className={rankNumber}>{rank}</span>
      </div>

      <button type="button" onClick={handleClick} className={postButton}>
        <div className={authorSection}>
          <Avatar
            size="20"
            src={post.author.avatarUrl}
            alt={post.author.login}
            fallback={post.author.login}
            className={avatarStyle}
          />
          <span className={authorName}>{post.author.login}</span>
        </div>

        <h4 className={postTitle}>{post.title}</h4>
        <p className={contentPreview}>{post.body}</p>
      </button>
    </div>
  );
}

export function WeeklyTop5() {
  const { data: discussions, isLoading } = useWeeklyTopDiscussions({
    limit: 5
  });

  const weekText = getWeekLabel();

  if (isLoading) {
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

  if (!discussions?.length) {
    return (
      <div className={weeklyTop5Container}>
        <div className={headerSection}>
          <h3 className={mainTitle}>주간 TOP 5</h3>
          <p className={subtitle}>{weekText}</p>
        </div>
        <div className={emptyState}>이번주 인기글이 없습니다</div>
      </div>
    );
  }

  return (
    <div className={weeklyTop5Container}>
      <div className={headerSection}>
        <h3 className={mainTitle}>주간 TOP 5</h3>
        <p className={subtitle}>{weekText}</p>
      </div>

      <div className={contentSection}>
        {discussions.map((discussion, index) => (
          <PopularPostItem
            key={discussion.id}
            post={discussion}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

// Main Container Styles
const weeklyTop5Container = css({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  gap: "1.5rem"
});

const headerSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const mainTitle = css({
  fontSize: "24px",
  fontWeight: "bold",
  color: "black",
  letterSpacing: "-0.025em"
});

const subtitle = css({
  fontSize: "16px",
  fontWeight: "semibold",
  color: "rgba(0, 0, 0, 0.6)",
  letterSpacing: "-0.025em"
});

const contentSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem"
});

// Post Item Styles
const postItemContainer = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.75rem"
});

const rankContainer = css({
  display: "flex",
  alignItems: "center",
  paddingTop: "0.625rem"
});

const rankNumber = css({
  fontSize: "18px",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.4)",
  letterSpacing: "-0.025em",
  lineHeight: "tight"
});

const postButton = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  paddingY: "1.25rem",
  paddingX: "1.5rem",
  backgroundColor: "white",
  border: "1px solid rgba(209, 213, 219, 0.5)",
  borderRadius: "1rem",
  textAlign: "left",
  transition: "all 0.2s",
  overflow: "hidden",
  cursor: "pointer",
  _hover: {
    "& h4": {
      color: "#0064FF",
      opacity: 0.8
    }
  }
});

const authorSection = css({
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  marginBottom: "1rem"
});

const avatarStyle = css({
  flexShrink: 0
});

const authorName = css({
  fontSize: "16px",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.8)",
  letterSpacing: "-0.025em",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

const postTitle = css({
  marginBottom: "0.5rem",
  overflow: "hidden",

  fontWeight: "bold",
  fontSize: "18px",
  color: "#0F0F0F",
  lineHeight: "tight",
  letterSpacing: "-0.025em",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  transition: "color 0.2s"
});

const contentPreview = css({
  display: "-webkit-box",
  overflow: "hidden",

  fontSize: "16px",
  fontWeight: "medium",
  color: "rgba(0, 0, 0, 0.8)",
  lineHeight: "relaxed",
  letterSpacing: "-0.025em",
  WebkitLineClamp: 2,
  // @ts-ignore
  WebkitBoxOrient: "vertical",
  whiteSpace: "normal"
});

// Loading and Empty States
const skeletonItem = css({
  height: "136px",
  backgroundColor: "rgb(243, 244, 246)",
  borderRadius: "1rem",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  width: "100%"
});

const emptyState = css({
  textAlign: "center",
  paddingY: "2rem",
  color: "rgb(107, 114, 128)"
});

import { Avatar } from "@/components/shared/ui/Avatar";
import { css } from "@styled-system/css";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

interface PostHeaderProps {
  author: {
    avatarUrl: string;
    login: string;
  };
  createdAt: string;
}

export function PostHeader({ author, createdAt }: PostHeaderProps) {
  return (
    <div className={headerSection}>
      <Avatar
        size="40"
        src={author.avatarUrl}
        alt={author.login}
        fallback={author.login}
        className={avatarStyles}
      />
      <div className={authorInfoContainer}>
        <h4 className={authorName}>{author.login}</h4>
        <div className={authorMeta}>
          <span className={authorHandle}>@{author.login}</span>
          <span className={separator}>·</span>
          <span className={timeStamp}>{formatTimeAgo(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

const headerSection = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem"
});

const avatarStyles = css({
  flexShrink: "0"
});

const authorInfoContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem"
});

const authorName = css({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)"
});

const authorMeta = css({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem"
});

const authorHandle = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.4)"
});

const separator = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.4)"
});

const timeStamp = css({
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.4)"
});

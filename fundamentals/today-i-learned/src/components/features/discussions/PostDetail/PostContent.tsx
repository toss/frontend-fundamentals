import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { css } from "@styled-system/css";

interface PostContentProps {
  title: string;
  body: string;
}

export function PostContent({ title, body }: PostContentProps) {
  return (
    <div className={contentSection}>
      <h2 className={postTitle}>{title}</h2>
      <div className={contentContainer}>
        <MarkdownRenderer content={body} className={markdownContent} />
      </div>
    </div>
  );
}

const contentSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem"
});

const postTitle = css({
  fontWeight: "700",
  fontSize: "22px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const contentContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
});

const markdownContent = css({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)"
});
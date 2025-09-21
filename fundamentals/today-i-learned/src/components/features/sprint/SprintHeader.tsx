import { css } from "@styled-system/css";

interface SprintHeaderProps {
  title: string;
  message: string;
}

export function SprintHeader({ title, message }: SprintHeaderProps) {
  return (
    <div className={headerContainer}>
      <div className={contentContainer}>
        <div className={titleContainer}>
          <h2 className={titleText}>{title}</h2>
        </div>
        <p className={messageText}>{message}</p>
      </div>
    </div>
  );
}

const headerContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingX: "1.5rem",
  paddingBottom: "1.5rem",
  width: "100%"
});

const contentContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "0.5rem"
});

const titleContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem"
});

const titleText = css({
  fontSize: "20px",
  fontWeight: "800",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#0F0F0F"
});

const messageText = css({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.6)"
});

import { Link } from "react-router-dom";
import { css } from "@styled-system/css";

export function NotFoundPage() {
  return (
    <div className={container}>
      <h1 className={errorCode}>404</h1>
      <h2 className={title}>페이지를 찾을 수 없습니다</h2>
      <p className={message}>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link to="/" className={homeButton}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "2rem",
  textAlign: "center"
});

const errorCode = css({
  fontSize: "6rem",
  fontWeight: "bold",
  color: "#ff8a80",
  marginBottom: "0.2rem"
});

const title = css({
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#0F0F0F",
  marginBottom: "0.5rem"
});

const message = css({
  color: "rgba(0, 0, 0, 0.6)",
  marginBottom: "2rem"
});

const homeButton = css({
  padding: "0.75rem 1.5rem",
  backgroundColor: "#0F0F0F",
  color: "white",
  borderRadius: "0.5rem",
  fontWeight: "500",
  textDecoration: "none",
  transition: "opacity 0.2s",
  _hover: { opacity: 0.8 }
});
import { useAuth } from "@/contexts/AuthContext";
import { ProfileLayout } from "./components/ProfileLayout";
import { css } from "@styled-system/css";

export function MyPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={loadingContainer}>
        <p className={loadingText}>로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={errorContainer}>
        <h2 className={errorTitle}>로그인이 필요합니다</h2>
        <p className={errorMessage}>프로필을 보려면 로그인해주세요.</p>
      </div>
    );
  }

  return <ProfileLayout username={user.login} />;
}

const loadingContainer = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "white"
});

const loadingText = css({
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "16px"
});

const errorContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "white",
  gap: "1rem",
  padding: "2rem"
});

const errorTitle = css({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#0F0F0F"
});

const errorMessage = css({
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "16px",
  textAlign: "center"
});

import { useParams } from "react-router-dom";
import { usePublicUserProfile } from "@/api/hooks/useUser";
import { ProfileLayout } from "./components/ProfileLayout";
import { css } from "@styled-system/css";

export function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { data: userProfile, isLoading, error } = usePublicUserProfile(username);

  if (!username) {
    return (
      <div className={errorContainer}>
        <h2 className={errorTitle}>잘못된 접근입니다</h2>
        <p className={errorMessage}>사용자 이름이 필요합니다.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={loadingContainer}>
        <p className={loadingText}>프로필을 불러오는 중...</p>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className={errorContainer}>
        <h2 className={errorTitle}>사용자를 찾을 수 없습니다</h2>
        <p className={errorMessage}>
          '{username}' 사용자가 존재하지 않거나 접근할 수 없습니다.
        </p>
      </div>
    );
  }

  return <ProfileLayout username={username} />;
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

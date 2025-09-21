import { User } from "lucide-react";
import type { GitHubUser, AuthenticatedUser } from "@/api/remote/user";
import { css } from "../../../../styled-system/css";

const avatarImage = {
  height: "44px",
  width: "44px",
  borderRadius: "9999px",
  objectFit: "cover",
  outline: "2px solid rgba(229, 231, 235, 0.4)",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
};

const avatarFallback = {
  display: "flex",
  height: "44px",
  width: "44px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  background: "linear-gradient(to right, rgb(156, 163, 175), rgb(107, 114, 128))",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
};

const loadingSpinner = {
  animation: "spin 1s linear infinite",
  borderRadius: "9999px",
  height: "16px",
  width: "16px",
  border: "2px solid white",
  borderTopColor: "transparent"
};

const userIcon = {
  height: "20px",
  width: "20px",
  color: "white"
};

interface UserAvatarProps {
  user?: GitHubUser | AuthenticatedUser | null;
  isLoading?: boolean;
}

export function UserAvatar({ user, isLoading }: UserAvatarProps) {
  if (user && !isLoading) {
    return (
      <img
        src={user.avatar_url}
        alt={`${user.login}님의 프로필`}
        className={css(avatarImage)}
      />
    );
  }

  return (
    <div className={css(avatarFallback)}>
      {isLoading ? (
        <div className={css(loadingSpinner)} />
      ) : (
        <User className={css(userIcon)} aria-hidden="true" />
      )}
    </div>
  );
}

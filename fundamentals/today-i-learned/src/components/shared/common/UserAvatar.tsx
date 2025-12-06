import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { GitHubUser, AuthenticatedUser } from "@/api/remote/user";
import { Avatar } from "@/components/shared/ui/Avatar";
import { css, cx } from "@styled-system/css";
import { ComponentPropsWithoutRef } from "react";

type AvatarSize = NonNullable<ComponentPropsWithoutRef<typeof Avatar>["size"]>;

const sizeMap: Record<AvatarSize, { size: string; userIconSize: string }> = {
  "20": { size: "20px", userIconSize: "12px" },
  "32": { size: "32px", userIconSize: "16px" },
  "40": { size: "40px", userIconSize: "20px" },
  "44": { size: "44px", userIconSize: "20px" },
  "48": { size: "48px", userIconSize: "24px" },
  "60": { size: "60px", userIconSize: "28px" },
  "100": { size: "100px", userIconSize: "48px" }
};

interface BaseAvatarProps {
  /** 아바타 크기 */
  size?: AvatarSize;
  /** 클릭 시 프로필 페이지로 이동 여부 */
  linkToProfile: boolean;
  /** 추가 className */
  className?: string;
  /** 폴백 아바타 여부 */
  isFallback?: boolean;
}

interface UserObjectProps extends BaseAvatarProps {
  /** GitHubUser 객체를 전달 */
  user: GitHubUser | AuthenticatedUser;
  username?: never;
  avatarUrl?: never;
}

interface DirectProps extends BaseAvatarProps {
  /** username과 avatarUrl을 직접 전달 */
  user?: never;
  username: string;
  avatarUrl?: string;
}

interface FallbackProps extends BaseAvatarProps {
  user?: never;
  isLoading?: never;
  username?: never;
  avatarUrl?: never;
  isFallback: true;
}

type UserAvatarProps = UserObjectProps | DirectProps | FallbackProps;

export function UserAvatar({
  user,
  username,
  avatarUrl,
  isFallback,
  size = "44",
  linkToProfile,
  className
}: UserAvatarProps) {
  const navigate = useNavigate();

  const resolvedUsername = user?.login ?? username;
  const resolvedAvatarUrl = user?.avatar_url ?? avatarUrl;

  const { size: avatarSize, userIconSize } = sizeMap[size];

  const avatarContainerStyle = css({
    cursor: linkToProfile && resolvedUsername ? "pointer" : "default",
    transition: "opacity 0.2s",
    _hover: linkToProfile && resolvedUsername ? { opacity: 0.8 } : {},
    flexShrink: 0
  });

  const fallbackContainerStyle = css({
    display: "flex",
    height: avatarSize,
    width: avatarSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    background:
      "linear-gradient(to right, rgb(156, 163, 175), rgb(107, 114, 128))",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    flexShrink: 0
  });

  const userIconStyle = css({
    height: userIconSize,
    width: userIconSize,
    color: "white"
  });

  const handleClick = (e: React.MouseEvent) => {
    if (linkToProfile && resolvedUsername) {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/profile/${resolvedUsername}`);
    }
  };

  if (!resolvedAvatarUrl || isFallback) {
    return (
      <div className={cx(fallbackContainerStyle, className)}>
        <User className={userIconStyle} aria-hidden="true" />
      </div>
    );
  }

  return (
    <Avatar
      src={resolvedAvatarUrl}
      alt={resolvedUsername ? `${resolvedUsername}님의 프로필` : "프로필"}
      fallback={resolvedUsername}
      size={size}
      onClick={handleClick}
      className={cx(avatarContainerStyle, className)}
    />
  );
}

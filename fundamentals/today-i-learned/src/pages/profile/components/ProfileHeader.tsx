import { ProfileInfo } from "@/components/features/profile/ProfileInfo";
import { css, cx } from "@styled-system/css";
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface ProfileHeaderProps extends BaseComponentProps {
  username: string;
}

export function ProfileHeader({ className, username }: ProfileHeaderProps) {
  return (
    <div className={cx(profileHeaderContainer, className)}>
      <ProfileInfo username={username} />
    </div>
  );
}

const profileHeaderContainer = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem"
});

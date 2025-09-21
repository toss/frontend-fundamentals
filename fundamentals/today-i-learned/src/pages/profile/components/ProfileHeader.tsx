import { ProfileInfo } from "@/components/features/profile/ProfileInfo";
import { css, cx } from "@styled-system/css";
import type { BaseComponentProps } from "@/types";

interface ProfileHeaderProps extends BaseComponentProps {}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  return (
    <div className={cx(profileHeaderContainer, className)}>
      <ProfileInfo />
    </div>
  );
}

const profileHeaderContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingY: "1rem",
  paddingX: "1rem",
  gap: "1.5rem",
  position: "relative"
});

import { ProfileInfo } from "@/components/features/profile/ProfileInfo";
import { flex } from "styled-system/patterns";
import { cx } from "styled-system/css";
import type { BaseComponentProps } from "@/types";

interface ProfileHeaderProps extends BaseComponentProps {}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  return (
    <div className={cx(profileHeaderContainer, className)}>
      <ProfileInfo />
    </div>
  );
}

const profileHeaderContainer = flex({
  direction: "column",
  alignItems: "center",
  py: "4",
  px: "4",
  gap: "6",
  position: "relative"
});

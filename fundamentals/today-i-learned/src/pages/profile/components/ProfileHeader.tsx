import { ProfileInfo } from "@/components/features/profile/ProfileInfo";
import { ProfileShareButton } from "./ProfileShareButton";
import { cn } from "@/libs/utils";
import type { BaseComponentProps } from "@/types";

interface ProfileHeaderProps extends BaseComponentProps {}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center py-4 px-4 gap-6 relative",
        className
      )}
    >
      <ProfileInfo />
      <ProfileShareButton />
    </div>
  );
}

import { useUserProfile } from "@/api/hooks/useUser";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { cn } from "@/libs/utils";
import type { BaseComponentProps } from "@/types";

interface ProfileInfoProps extends BaseComponentProps {
  showLoadingSkeleton?: boolean;
}

export function ProfileInfo({
  className,
  showLoadingSkeleton = true
}: ProfileInfoProps) {
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading && showLoadingSkeleton) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-6 animate-pulse",
          className
        )}
      >
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-full"></div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        {userProfile?.avatar_url ? (
          <img
            src={userProfile.avatar_url}
            alt={`${userProfile.login} avatar`}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        ) : (
          <UserAvatar user={userProfile} isLoading={isLoading} />
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-extrabold text-[24px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] text-center">
          {userProfile?.name || userProfile?.login || "사용자"}
        </h1>
        <p className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40 text-center">
          @{userProfile?.login || "user"}
        </p>
      </div>
    </div>
  );
}

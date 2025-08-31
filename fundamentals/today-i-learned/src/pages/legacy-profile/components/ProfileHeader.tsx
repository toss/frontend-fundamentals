import { useUserProfile } from "@/api/hooks/useUser";
import { cn } from "@/libs/utils";
import type { BaseComponentProps } from "@/types";
import { User, Calendar, GitBranch } from "lucide-react";

interface ProfileHeaderProps extends BaseComponentProps {}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-lg bg-gradient-to-r p-3 shadow-sm",
          "from-[#ff8a80]/5 to-[#369870]/5",
          "dark:from-[#ff8a80]/10 dark:to-[#369870]/10 dark:border-[#ff8a80]/30",
          "animate-pulse",
          className
        )}
      >
        <div className="flex items-center gap-4">
          {/* 스켈레톤 아바타 - 실제 이미지와 동일한 크기 */}
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r p-3 shadow-sm",
        "from-[#ff8a80]/5 to-[#369870]/5",
        "dark:from-[#ff8a80]/10 dark:to-[#369870]/10 dark:border-[#ff8a80]/30",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Profile Avatar */}
        <div className="relative">
          {userProfile?.avatar_url ? (
            <img
              src={userProfile.avatar_url}
              alt={`${userProfile.login} avatar`}
              className="w-16 h-16 rounded-full shadow-sm object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {userProfile?.name || userProfile?.login || "사용자"}
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{userProfile?.login || "user"}
            </span>
          </div>

          {userProfile?.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {userProfile.bio}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              <span>{userProfile?.public_repos || 0} repositories</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{userProfile?.followers || 0} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>GitHub 멤버</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

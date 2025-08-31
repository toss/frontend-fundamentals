import { useUserProfile } from "@/api/hooks/useUser";
import { cn } from "@/libs/utils";
import type { BaseComponentProps } from "@/types";
import { User, Share } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps extends BaseComponentProps {}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const { data: userProfile, isLoading } = useUserProfile();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${userProfile?.name || userProfile?.login}의 프로필`,
          text: `${userProfile?.name || userProfile?.login}님의 Today I Learned 프로필을 확인해보세요!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // TODO: 토스트 메시지 추가
        alert("프로필 링크가 복사되었습니다!");
      }
    } catch (error) {
      console.error("공유 실패:", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-2xl bg-white p-6 shadow-sm border border-black/5",
          "animate-pulse",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-7 bg-gray-200 rounded w-48"></div>
              <div className="h-5 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 shadow-sm border border-black/5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Profile Avatar */}
          <div className="relative">
            {userProfile?.avatar_url ? (
              <img
                src={userProfile.avatar_url}
                alt={`${userProfile.login} avatar`}
                className="w-20 h-20 rounded-full shadow-sm object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div>
            <h1 className="font-bold text-[28px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] mb-1">
              {userProfile?.name || userProfile?.login || "사용자"}
            </h1>
            <p className="font-semibold text-[18px] leading-[130%] tracking-[-0.4px] text-black/60">
              @{userProfile?.login || "user"}
            </p>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors disabled:opacity-50"
          aria-label="프로필 공유"
        >
          <Share className="w-5 h-5 text-black/60" />
        </button>
      </div>

      {/* Share Button Label */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-black/40 font-medium">프로필공유하기</span>
      </div>
    </div>
  );
}
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
          "flex flex-col items-center py-6 px-6 gap-6",
          "animate-pulse",
          className
        )}
      >
        {/* 스켈레톤 아바타와 프로필 정보 */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-full"></div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* 스켈레톤 공유하기 버튼 */}
        <div className="w-[100px] h-10 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center py-4 px-4 gap-6 relative",
        className
      )}
    >
      {/* Profile Avatar and Info */}
      <div className="flex flex-col items-center gap-4">
        {/* Profile Avatar */}
        <div className="relative">
          {userProfile?.avatar_url ? (
            <img
              src={userProfile.avatar_url}
              alt={`${userProfile.login} avatar`}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-extrabold text-[24px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F] text-center">
            {userProfile?.name || userProfile?.login || "사용자"}
          </h1>
          <p className="font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black/40 text-center">
            @{userProfile?.login || "user"}
          </p>
        </div>
      </div>

      <button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center justify-center gap-[6px] px-[18px] py-3 w-[140px] h-10 border border-black/8 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50"
        style={{ paddingLeft: "15px", paddingRight: "18px" }}
        aria-label="프로필 공유"
      >
        <Share className="w-4 h-4 text-black/40" />
        <span className="font-bold text-[14px] leading-[160%] tracking-[-0.4px] text-black/60">
          프로필공유하기
        </span>
      </button>
    </div>
  );
}

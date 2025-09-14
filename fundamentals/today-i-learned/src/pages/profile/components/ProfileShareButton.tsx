import { useUserProfile } from "@/api/hooks/useUser";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/contexts/ToastContext";
import type { BaseComponentProps } from "@/types";
import { Share } from "lucide-react";
import { useState } from "react";

interface ProfileShareButtonProps extends BaseComponentProps {}

export function ProfileShareButton({ className }: ProfileShareButtonProps) {
  const { data: userProfile } = useUserProfile();
  const { handleApiError } = useErrorHandler();
  const { success: showSuccessToast } = useToast();
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
        showSuccessToast("프로필 링크가 복사되었습니다!");
      }
    } catch (error) {
      handleApiError(error, "프로필 공유");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`flex items-center justify-center gap-[6px] px-[18px] py-3 w-[140px] h-10 border border-black/8 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50 ${className || ""}`}
      style={{ paddingLeft: "15px", paddingRight: "18px" }}
      aria-label="프로필 공유"
    >
      <Share className="w-4 h-4 text-black/40" />
      <span className="font-bold text-[14px] leading-[160%] tracking-[-0.4px] text-black/60">
        프로필공유하기
      </span>
    </button>
  );
}

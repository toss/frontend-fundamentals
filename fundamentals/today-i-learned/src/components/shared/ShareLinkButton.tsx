import { Link } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

interface ShareLinkButtonProps {
  discussionId: string;
  className?: string;
}

export function ShareLinkButton({ discussionId, className = "" }: ShareLinkButtonProps) {
  const { success: showSuccessToast } = useToast();

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${origin}/today-i-learned/post/${discussionId}`;
    navigator.clipboard.writeText(url);
    showSuccessToast("링크가 복사되었습니다!");
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`flex items-center gap-[6px] hover:opacity-70 transition-opacity ${className}`}
      aria-label="링크 복사"
    >
      <div className="w-5 h-5">
        <Link className="w-full h-full stroke-[#979797] stroke-[1.67px] fill-none" />
      </div>
    </button>
  );
}
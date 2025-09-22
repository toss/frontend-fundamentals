import { Link } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { css, cx } from "@styled-system/css";

const shareButton = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  _hover: {
    opacity: "0.7"
  }
};

const shareIconContainer = {
  width: "20px",
  height: "20px"
};

const shareIcon = {
  width: "100%",
  height: "100%",
  stroke: "#979797",
  strokeWidth: "1.67px",
  fill: "none"
};

interface ShareLinkButtonProps {
  discussionId: string;
  className?: string;
}

export function ShareLinkButton({
  discussionId,
  className = ""
}: ShareLinkButtonProps) {
  const { success: showSuccessToast } = useToast();

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/today-i-learned/post/${discussionId}`;
    navigator.clipboard.writeText(url);
    showSuccessToast("링크가 복사되었습니다!");
  };

  return (
    <button
      onClick={handleCopyLink}
      className={cx(css(shareButton), className)}
      aria-label="링크 복사"
    >
      <div className={css(shareIconContainer)}>
        <Link className={css(shareIcon)} />
      </div>
    </button>
  );
}

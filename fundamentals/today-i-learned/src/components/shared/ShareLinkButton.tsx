import { Check, Link } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { css, cx } from "@styled-system/css";
import { useState } from "react";

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
  const [isCopied, setIsCopied] = useState(false);
  const { addToast } = useToast();

  const handleCopyLink = (e: React.MouseEvent) => {
    setIsCopied(true);
    e.stopPropagation();

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/today-i-learned/post/${discussionId}`;
    navigator.clipboard.writeText(url);
    addToast({
      type: "success",
      title: "링크가 복사되었습니다!",
      duration: 3000
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
      onClick={handleCopyLink}
      className={cx(css(shareButton), className)}
      aria-label="링크 복사"
    >
      <div className={css(shareIconContainer)}>
        {isCopied ? (
          <Check className={css(shareIcon)} stroke="#10b981" />
        ) : (
          <Link className={css(shareIcon)} stroke="#979797" />
        )}
      </div>
    </button>
  );
}

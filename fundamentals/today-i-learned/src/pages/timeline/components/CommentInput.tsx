import { useState } from "react";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";
import { css } from "@styled-system/css";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  isReply?: boolean;
  parentId?: string;
  isError?: boolean;
}

export function CommentInput({
  onSubmit,
  placeholder = "댓글을 작성해보세요",
  isError
}: CommentInputProps) {
  const [commentText, setCommentText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { user } = useAuth();

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      setIsPending(true);
      try {
        await onSubmit(commentText.trim());
        setCommentText("");
      } finally {
        setIsPending(false);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={commentInputContainer}>
      <div className={inputWrapper}>
        <UserAvatar user={user} size="40" linkToProfile={false} />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={placeholder}
          className={textareaStyle}
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
          }}
        />
      </div>
      <div className={buttonWrapper}>
        <button
          onClick={handleCommentSubmit}
          disabled={!commentText.trim() || isPending}
          className={submitButton}
        >
          {isPending ? "작성중..." : "작성하기"}
        </button>

        {/* 에러 메시지 */}
        {isError && (
          <p className={errorMessage}>
            댓글 작성에 실패했습니다. 네트워크 상태를 확인해주세요.
          </p>
        )}
      </div>
    </div>
  );
}

// Semantic style definitions
const commentInputContainer = css({
  paddingX: "2rem",
  paddingBottom: "0.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem"
});

const inputWrapper = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem"
});

const textareaStyle = css({
  flex: "1",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgba(0, 0, 0, 0.8)",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  resize: "none",
  minHeight: "24px",
  maxHeight: "120px",
  _placeholder: {
    color: "rgba(0, 0, 0, 0.2)"
  }
});

const buttonWrapper = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "0.5rem"
});

const submitButton = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingX: "1.5rem",
  paddingY: "18px",
  gap: "10px",
  width: "6rem",
  height: "46px",
  backgroundColor: "#0F0F0F",
  borderRadius: "200px",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "#FCFCFC",
  transition: "colors 0.15s ease-in-out",
  border: "none",
  cursor: "pointer",
  _hover: {
    backgroundColor: "#333333"
  },
  _disabled: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    cursor: "not-allowed"
  }
});

const errorMessage = css({
  color: "#ef4444",
  fontSize: "14px"
});

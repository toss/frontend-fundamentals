import { useState } from "react";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { useAddDiscussionComment } from "@/api/hooks/useDiscussions";
import { useAuth } from "@/contexts/AuthContext";
import { css } from "@styled-system/css";
import { handleApiError } from "@/utils/errors";

interface CommentInputProps {
  discussionId: string;
}

export function CommentInput({ discussionId }: CommentInputProps) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const addCommentMutation = useAddDiscussionComment();

  const handleCommentSubmit = async () => {
    if (commentText.trim() && user?.accessToken) {
      try {
        await addCommentMutation.mutateAsync({
          discussionId,
          body: commentText
        });
        setCommentText("");
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={commentInputSection}>
      <div className={commentInputContainer}>
        <UserAvatar user={user} size="40" linkToProfile={false} />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 작성해주세요"
          className={commentTextarea}
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
          }}
        />
      </div>
      <div className={submitButtonContainer}>
        <button
          onClick={handleCommentSubmit}
          disabled={!commentText.trim() || addCommentMutation.isPending}
          className={submitButton}
        >
          {addCommentMutation.isPending ? "작성중..." : "작성하기"}
        </button>

        {addCommentMutation.isError && (
          <p className={errorMessage}>
            댓글 작성에 실패했습니다. 네트워크 상태를 확인해주세요.
          </p>
        )}
      </div>
    </div>
  );
}

const commentInputSection = css({
  paddingX: "2rem",
  paddingBottom: "0.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem"
});

const commentInputContainer = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem"
});

const commentTextarea = css({
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

const submitButtonContainer = css({
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
  fontSize: "14px",
  fontWeight: "500"
});

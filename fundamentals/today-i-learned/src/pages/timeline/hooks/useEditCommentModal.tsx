import { useState } from "react";
import { X } from "lucide-react";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";
import { useUserProfile } from "@/api/hooks/useUser";
import { css } from "@styled-system/css";

interface UseEditCommentModalOptions {
  onSubmit?: (content: string) => void;
  initialContent?: string;
}

export function useEditCommentModal(options: UseEditCommentModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(options.initialContent || "");
  const { data: userProfile } = useUserProfile();

  const openModal = () => {
    setContent(options.initialContent || "");
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      options.onSubmit?.(content.trim());
      setIsOpen(false);
    }
  };

  const EditCommentModal = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Content className={css(dialogContent)}>
        {/* Header with close button */}
        <div className={css(headerContainer)}>
          <AlertDialog.Cancel asChild>
            <button className={css(closeButtonStyle)}>
              <X size={16} />
            </button>
          </AlertDialog.Cancel>
        </div>

        {/* Main content */}
        <div className={css(mainContent)}>
          {/* Profile Avatar */}
          <div className={css(avatarContainer)}>
            <div
              className={css(avatarStyle)}
              style={{
                backgroundImage: userProfile?.avatar_url
                  ? `url(${userProfile.avatar_url})`
                  : "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face)"
              }}
            />
          </div>

          {/* Content area */}
          <div className={css(contentArea)}>
            {/* Title */}
            <div className={css(titleContainer)}>
              <AlertDialog.Title className={css(dialogTitle)}>
                댓글 수정
              </AlertDialog.Title>
            </div>

            {/* Text area - 본문만 입력 */}
            <div className={css(contentWrapper)}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 수정해주세요..."
                className={css(textArea)}
                style={{
                  fontFamily:
                    "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                }}
              />
            </div>

            {/* Submit button */}
            <div className={css(submitButtonWrapper)}>
              <AlertDialog.Action asChild>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className={css(submitButtonStyle)}
                >
                  <span
                    className={css(submitButtonText)}
                    style={{
                      fontFamily:
                        "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                    }}
                  >
                    수정하기
                  </span>
                </button>
              </AlertDialog.Action>
            </div>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  );

  return {
    isOpen,
    openModal,
    closeModal: () => setIsOpen(false),
    EditCommentModal,
    content,
    setContent
  };
}

const contentWrapper = {
  flex: "1",
  marginBottom: "24px"
};

const textArea = {
  width: "100%",
  height: "100%",
  resize: "none",
  border: "none",
  outline: "none",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "160%",
  letterSpacing: "-0.4px",
  color: "rgb(15, 15, 15)",
  backgroundColor: "transparent",
  "&::placeholder": {
    color: "rgba(15, 15, 15, 0.4)"
  }
};

const dialogContent = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "800px",
  minHeight: "400px"
};

const headerContainer = {
  display: "flex",
  justifyContent: "end",
  padding: "24px",
  paddingBottom: "0"
};

const closeButtonStyle = {
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(0, 0, 0, 0.6)",
  cursor: "pointer",
  transition: "color 0.2s ease",
  _hover: {
    color: "rgba(0, 0, 0, 0.8)"
  }
};

const mainContent = {
  display: "flex",
  paddingX: "24px",
  paddingBottom: "24px",
  gap: "24px",
  flex: "1",
  minHeight: "0"
};

const avatarContainer = {
  flexShrink: "0"
};

const avatarStyle = {
  width: "60px",
  height: "60px",
  borderRadius: "9999px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
};

const contentArea = {
  flex: "1",
  display: "flex",
  flexDirection: "column"
};

const titleContainer = {
  marginBottom: "24px"
};

const dialogTitle = {
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgb(15, 15, 15)"
};

const submitButtonWrapper = {
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
  alignItems: "end",
  gap: "8px"
};

const submitButtonStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingX: "24px",
  paddingY: "18px",
  gap: "10px",
  width: "96px",
  height: "46px",
  backgroundColor: "rgb(15, 15, 15)",
  borderRadius: "200px",
  transition: "background-color 0.2s ease",
  cursor: "pointer",
  border: "none",
  flexShrink: "0",
  _hover: {
    backgroundColor: "rgb(51, 51, 51)"
  },
  _disabled: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    cursor: "not-allowed"
  }
};

const submitButtonText = {
  width: "48px",
  height: "10px",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgb(252, 252, 252)",
  display: "flex",
  alignItems: "center",
  flexShrink: "0"
};

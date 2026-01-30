import { useState } from "react";
import { X } from "lucide-react";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { useUserProfile } from "@/api/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { css, cx } from "@styled-system/css";

type EditorMode = "write" | "preview";

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

const titleInput = {
  width: "100%",
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "130%",
  letterSpacing: "-0.4px",
  color: "rgb(15, 15, 15)",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  padding: "0",
  "&::placeholder": {
    color: "rgba(15, 15, 15, 0.4)"
  }
};

const dialogContent = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "800px",
  minHeight: "628px"
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

const errorContainer = {
  display: "flex",
  justifyContent: "end",
  alignSelf: "stretch",
  marginTop: "8px"
};

const errorText = {
  color: "rgb(239, 68, 68)",
  fontSize: "14px",
  fontWeight: "500"
};

// Tab Styles
const tabWrapper = {
  paddingX: "24px",
  paddingBottom: "24px"
};

const tabContainer = {
  display: "flex",
  gap: "4px",
  padding: "3px",
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  borderRadius: "8px",
  width: "fit-content"
};

const tabButton = {
  padding: "4px 10px",
  fontSize: "14px",
  fontWeight: "700",
  color: "rgba(0, 0, 0, 0.4)",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  letterSpacing: "-0.4px",
  lineHeight: "1.6",
  _hover: {
    color: "rgba(0, 0, 0, 0.6)"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
};

const tabButtonActive = {
  color: "rgba(0, 0, 0, 0.8)",
  backgroundColor: "#fcfcfc"
};

// Preview Styles
const previewContainer = {
  flex: "1",
  marginBottom: "24px",
  maxHeight: "400px",
  overflowY: "auto"
};

const previewTitle = {
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "130%",
  color: "rgb(15, 15, 15)",
  letterSpacing: "-0.4px",
  marginBottom: "16px"
};

const previewPlaceholder = {
  color: "rgba(0, 0, 0, 0.3)",
  fontSize: "14px",
  fontStyle: "italic"
};

interface UseWritePostModalOptions {
  onSubmit?: (title: string, content: string) => void;
  isEdit?: boolean;
  initialTitle?: string;
  initialContent?: string;
}

export function useEditPostModal(options: UseWritePostModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(options.initialTitle || "");
  const [content, setContent] = useState(options.initialContent || "");
  const [editorMode, setEditorMode] = useState<EditorMode>("write");
  const { data: userProfile } = useUserProfile();

  const openModal = () => {
    // 모달을 열 때 초기값 설정
    setTitle(options.initialTitle || "");
    setContent(options.initialContent || "");
    setEditorMode("write");
    setIsOpen(true);
  };

  const handleSubmit = useMutation({
    mutationFn: async () => {
      if (title.trim() && content.trim()) {
        options.onSubmit?.(title.trim(), content.trim());

        if (!options.isEdit) {
          setTitle("");
          setContent("");
        }
        setIsOpen(false);
      }
    }
  });

  const EditPostModal = (
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

        {/* 작성/미리보기 탭 - 아바타 위에 배치 */}
        <div className={css(tabWrapper)}>
          <div className={css(tabContainer)}>
            <button
              type="button"
              className={cx(
                css(tabButton),
                editorMode === "write" && css(tabButtonActive)
              )}
              onClick={() => setEditorMode("write")}
            >
              작성
            </button>
            <button
              type="button"
              className={cx(
                css(tabButton),
                editorMode === "preview" && css(tabButtonActive)
              )}
              onClick={() => setEditorMode("preview")}
              disabled={!content.trim()}
            >
              미리보기
            </button>
          </div>
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
            {editorMode === "write" ? (
              <>
                {/* Title */}
                <div className={css(titleContainer)}>
                  {options.isEdit ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                      className={css(titleInput)}
                      style={{
                        fontFamily:
                          "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                      }}
                    />
                  ) : (
                    <AlertDialog.Title className={css(dialogTitle)}>
                      오늘 배운 내용을 기록해 보세요
                    </AlertDialog.Title>
                  )}
                </div>

                {/* Text area - 본문만 입력 */}
                <div className={css(contentWrapper)}>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="## 오늘 한 일&#10;- [X] 블로그 초안 쓰기&#10;- [ ] 커밋 푸시하기&#10;&#10;오늘 이만큼이나 했어요! 짱이죠?"
                    className={css(textArea)}
                    style={{
                      fontFamily:
                        "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                    }}
                  />
                </div>
              </>
            ) : (
              /* Preview 모드 */
              <div className={css(previewContainer)}>
                {title.trim() && <h1 className={css(previewTitle)}>{title}</h1>}
                {content.trim() ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className={css(previewPlaceholder)}>
                    미리볼 내용이 없습니다.
                  </p>
                )}
              </div>
            )}

            {/* Submit button */}
            <div className={css(submitButtonWrapper)}>
              <AlertDialog.Action asChild>
                <button
                  onClick={() => handleSubmit.mutate()}
                  disabled={
                    options.isEdit
                      ? !title.trim() || !content.trim()
                      : !content.trim()
                  }
                  className={css(submitButtonStyle)}
                >
                  <span
                    className={css(submitButtonText)}
                    style={{
                      fontFamily:
                        "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                    }}
                  >
                    작성하기
                  </span>
                </button>
              </AlertDialog.Action>
              {handleSubmit.isError && (
                <div className={css(errorContainer)}>
                  <p className={css(errorText)}>
                    저장에 실패했습니다. 네트워크 상태를 확인해주세요.
                  </p>
                </div>
              )}
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
    EditPostModal,
    title,
    content,
    setTitle,
    setContent
  };
}

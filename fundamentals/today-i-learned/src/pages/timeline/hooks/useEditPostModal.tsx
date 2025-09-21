import { useState } from "react";
import { X } from "lucide-react";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";
import { useUserProfile } from "@/api/hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { css } from "@styled-system/css";

const modalContainer = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "9999"
};

const modalContent = {
  backgroundColor: "white",
  borderRadius: "24px",
  padding: "32px",
  width: "90%",
  maxWidth: "600px",
  maxHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
};

const modalHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "24px"
};

const modalTitle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "rgb(15, 15, 15)"
};

const closeButton = {
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  _hover: {
    backgroundColor: "rgb(243, 244, 246)"
  }
};

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

const submitButton = {
  backgroundColor: "black",
  color: "white",
  paddingX: "24px",
  paddingY: "12px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  border: "none",
  transition: "background-color 0.2s ease",
  _hover: {
    backgroundColor: "rgb(31, 41, 55)"
  },
  _disabled: {
    backgroundColor: "rgb(156, 163, 175)",
    cursor: "not-allowed"
  }
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
  const { data: userProfile } = useUserProfile();

  const openModal = () => {
    // 모달을 열 때 초기값 설정
    setTitle(options.initialTitle || "");
    setContent(options.initialContent || "");
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
      <AlertDialog.Content className="flex flex-col max-w-[800px] min-h-[628px]">
        {/* Header with close button */}
        <div className="flex justify-end p-6 pb-0">
          <AlertDialog.Cancel asChild>
            <button className="w-5 h-5 flex items-center justify-center text-black/60 hover:text-black/80 transition-colors">
              <X size={16} />
            </button>
          </AlertDialog.Cancel>
        </div>

        {/* Main content */}
        <div className="flex px-6 pb-6 gap-6 flex-1 min-h-0">
          {/* Profile Avatar */}
          <div className="flex-shrink-0">
            <div
              className="w-[60px] h-[60px] rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: userProfile?.avatar_url
                  ? `url(${userProfile.avatar_url})`
                  : "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face)"
              }}
            />
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <div className="mb-6">
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
                <AlertDialog.Title className="text-[22px] font-bold leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
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

            {/* Submit button */}
            <div className="flex justify-end flex-col items-end gap-2">
              <AlertDialog.Action asChild>
                <button
                  onClick={() => handleSubmit.mutate()}
                  disabled={
                    options.isEdit
                      ? !title.trim() || !content.trim()
                      : !content.trim()
                  }
                  className="flex flex-row justify-center items-center px-6 py-[18px] gap-[10px] w-24 h-[46px] bg-[#0F0F0F] hover:bg-[#333333] disabled:bg-black/10 disabled:cursor-not-allowed rounded-[200px] transition-colors flex-none"
                >
                  <span
                    className="w-12 h-[10px] text-[14px] font-bold leading-[130%] tracking-[-0.4px] text-[#FCFCFC] flex items-center flex-none"
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
                <div className="flex justify-end self-stretch mt-2">
                  <p className="text-red-500 text-sm font-medium">
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

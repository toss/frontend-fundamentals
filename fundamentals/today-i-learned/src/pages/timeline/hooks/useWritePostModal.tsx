import { useState } from "react";
import { X } from "lucide-react";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";
import { useUserProfile } from "@/api/hooks/useUser";

interface UseWritePostModalOptions {
  onSubmit?: (title: string, content: string) => void;
  isEdit?: boolean;
  initialTitle?: string;
  initialContent?: string;
}

export function useWritePostModal(options: UseWritePostModalOptions = {}) {
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

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      options.onSubmit?.(title.trim(), content.trim());
      if (!options.isEdit) {
        setTitle("");
        setContent("");
      }
      setIsOpen(false);
    }
  };

  const WritePostModal = (
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
                  className="w-full text-[22px] font-bold leading-[130%] tracking-[-0.4px] text-[#0F0F0F] placeholder:text-[#0F0F0F]/40 bg-transparent border-none outline-none p-0"
                  style={{
                    fontFamily: "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                  }}
                />
              ) : (
                <AlertDialog.Title className="text-[22px] font-bold leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
                  오늘 배운 내용을 기록해 보세요
                </AlertDialog.Title>
              )}
            </div>

            {/* Text area - 본문만 입력 */}
            <div className="flex-1 mb-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="## 오늘 한 일&#10;- [X] 블로그 초안 쓰기&#10;- [ ] 커밋 푸시하기&#10;&#10;오늘 이만큼이나 했어요! 짱이죠?"
                className="w-full h-full resize-none border-none outline-none text-[16px] font-medium leading-[160%] tracking-[-0.4px] text-[#0F0F0F] placeholder:text-[#0F0F0F]/40 bg-transparent"
                style={{
                  fontFamily:
                    "'Toss Product Sans OTF', ui-sans-serif, system-ui, sans-serif"
                }}
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
              <AlertDialog.Action asChild>
                <button
                  onClick={handleSubmit}
                  disabled={options.isEdit ? (!title.trim() || !content.trim()) : !content.trim()}
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
    WritePostModal,
    title,
    content,
    setTitle,
    setContent
  };
}

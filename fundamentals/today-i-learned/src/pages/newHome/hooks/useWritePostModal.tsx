import { useState } from "react";
import { X } from "lucide-react";
import { AlertDialog } from "../ui/AlertDialog";

interface UseWritePostModalOptions {
  onSubmit?: (content: string) => void;
}

export function useWritePostModal(options: UseWritePostModalOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      console.log("Submitting post:", content);
      options.onSubmit?.(content);
      setContent("");
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
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face)"
              }}
            />
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col">
            {/* Title */}
            <div className="mb-6">
              <AlertDialog.Title className="text-[22px] font-bold leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
                오늘 배운 내용을 기록해 보세요
              </AlertDialog.Title>
            </div>

            {/* Text area */}
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
                  disabled={!content.trim()}
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
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    WritePostModal,
    content,
    setContent
  };
}

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";

interface PostMoreMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

export function PostMoreMenu({
  onEdit,
  onDelete,
  isLoading = false
}: PostMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onEdit();
    setIsOpen(false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };

  const handleConfirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="shrink-0 p-2"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-8 z-50 w-[160px] bg-white rounded-[16px] p-2 gap-2 flex flex-col"
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)" }}
        >
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="w-full px-3 py-2 text-left font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black hover:bg-gray-50 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            수정하기
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={isLoading}
            className="w-full px-3 py-2 text-left font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black hover:bg-gray-50 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            삭제하기
          </button>
        </div>
      )}

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialog.Content
          showCloseButton
          className="w-[343px] h-[230px] bg-[#FCFCFC] rounded-[16px] flex flex-col items-center p-6 gap-8"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-bold text-[22px] leading-[130%] tracking-[-0.4px] text-[#0F0F0F]">
              글을 삭제하시겠습니까?
            </h2>
            <p className="font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 text-center">
              댓글과 반응도 함께 삭제됩니다.
              <br />
              삭제 후에는 복구할 수 없습니다.
            </p>
          </div>

          <button
            onClick={handleConfirmDelete}
            disabled={isLoading}
            className="w-24 h-[46px] bg-[#0F0F0F] rounded-[200px] font-bold text-[14px] leading-[130%] tracking-[-0.4px] text-[#FCFCFC] hover:bg-black/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "삭제중..." : "삭제하기"}
          </button>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}

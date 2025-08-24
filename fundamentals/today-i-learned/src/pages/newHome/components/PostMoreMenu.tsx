import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui";

interface PostMoreMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function PostMoreMenu({ onEdit, onDelete }: PostMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="shrink-0 p-2"
        onClick={() => setIsOpen(!isOpen)}
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
            className="w-full px-3 py-2 text-left font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black hover:bg-gray-50 transition-colors rounded-lg"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 text-left font-semibold text-[16px] leading-[130%] tracking-[-0.4px] text-black hover:bg-gray-50 transition-colors rounded-lg"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

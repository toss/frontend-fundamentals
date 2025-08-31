import { useState } from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  isReply?: boolean;
  parentId?: string;
}

export function CommentInput({
  onSubmit,
  placeholder = "댓글을 작성해보세요",
  isReply = false
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

  if (!user) return null;

  return (
    <div className="px-8 pb-3 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Avatar
          size="40"
          src={user.avatar_url}
          alt={user.login}
          fallback={user.login}
          className="shrink-0"
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 font-medium text-[16px] leading-[160%] tracking-[-0.4px] text-black/80 placeholder:text-black/20 bg-transparent border-none outline-none resize-none min-h-[24px] max-h-[120px]"
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
          }}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCommentSubmit}
          disabled={!commentText.trim() || isPending}
          className="flex justify-center items-center px-6 py-[18px] gap-[10px] w-24 h-[46px] bg-[#0F0F0F] hover:bg-[#333333] disabled:bg-black/20 disabled:cursor-not-allowed rounded-[200px] font-bold text-[14px] leading-[130%] tracking-[-0.4px] text-[#FCFCFC] transition-colors"
        >
          {isPending ? "작성중..." : "작성하기"}
        </button>
      </div>
    </div>
  );
}

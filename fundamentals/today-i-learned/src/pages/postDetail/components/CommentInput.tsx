import { useState } from "react";
import { Button } from "@/components/shared/ui/Button";
import type { CommentInputProps } from "../../newHome/utils/types";

export function CommentInput({ 
  onSubmit, 
  placeholder = "댓글을 작성해보세요...", 
  isReply = false,
  parentId 
}: CommentInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`${isReply ? "ml-12" : ""}`}>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full bg-transparent border-none resize-none focus:outline-none text-base placeholder-gray-500 min-h-[80px]"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
          >
            {isReply ? "답글달기" : "댓글달기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
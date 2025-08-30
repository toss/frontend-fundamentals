import * as React from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Button } from "@/components/shared/ui/Button";
import { Input, Textarea } from "@/components/shared/ui/Input";
import type { GitHubAuthor } from "@/api/remote/discussions";

interface PostInputProps {
  user: GitHubAuthor;
  onSubmit: (data: { title: string; content: string }) => void;
  placeholder?: string;
}

export function PostInput({
  user,
  onSubmit,
  placeholder = "오늘 배운 내용을 기록해 보세요"
}: PostInputProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = () => {
    if (title.trim() || content.trim()) {
      onSubmit({
        title: title.trim(),
        content: content.trim()
      });
      setTitle("");
      setContent("");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Focus the textarea when Enter is pressed on title
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-start gap-[10px] w-full mt-5">
      <div className="flex flex-col justify-center items-start p-6 gap-3 w-full max-w-[800px] mx-auto h-[232px] bg-white rounded-2xl border-none">
        {/* 상단 사용자 정보 및 입력 영역 */}
        <div className="flex flex-row items-center pb-2 gap-6 self-stretch">
          {/* 아바타 영역 */}
          <div className="flex flex-row items-start gap-[10px] w-[60px] self-stretch">
            <Avatar
              size="60"
              src={user.avatarUrl}
              alt={user.login}
              fallback={user.login}
              className="shrink-0 w-[60px] h-[60px] rounded-[150px]"
            />
          </div>

          {/* 입력 영역 */}
          <div className="flex flex-col items-start py-3 gap-6 flex-grow">
            {/* 제목 입력 필드 */}
            <div className="flex flex-row justify-center items-center gap-[10px] w-[260px]">
              <Input
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleTitleKeyDown}
                placeholder={placeholder}
                className="text-[22px] font-bold leading-[130%] text-black tracking-[-0.4px] w-[260px] p-0 border-none outline-none focus:outline-none focus:ring-0 bg-transparent placeholder:text-black/20 shadow-none"
              />
            </div>

            {/* 텍스트 영역 */}
            <Textarea
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="## 오늘 한 일&#10;- [X] 블로그 초안 쓰기&#10;- [ ] 커밋 푸시하기"
              className="w-full h-[63px] resize-none border-none outline-none focus:outline-none focus:ring-0 p-0 text-base font-medium text-black leading-[160%] tracking-[-0.4px] bg-transparent placeholder:text-black/20 shadow-none self-stretch"
            />
          </div>
        </div>

        {/* 하단 액션 영역 */}
        <div className="flex flex-row justify-end items-center gap-5 self-stretch h-[51px]">
          {/* 왼쪽 빈 공간 */}
          <div className="flex-grow h-[51px]" />

          {/* 작성하기 버튼 */}
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className="flex flex-row justify-center items-center px-[30px] py-5 gap-[10px] w-[115px] h-[51px] bg-black disabled:bg-[#00000033] rounded-[200px] border-none outline-none focus:outline-none"
          >
            <span className="text-[16px] font-bold leading-[130%] tracking-[-0.4px] text-[#FCFCFC]">
              작성하기
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

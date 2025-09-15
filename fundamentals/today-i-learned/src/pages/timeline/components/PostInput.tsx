import * as React from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Button } from "@/components/shared/ui/Button";
import { Input } from "@/components/shared/ui/Input";
import MDEditor from "@uiw/react-md-editor";
import type { GitHubAuthor } from "@/api/remote/discussions";

interface PostInputProps {
  user: GitHubAuthor;
  onSubmit: (data: { title: string; content: string }) => void;
  placeholder?: string;
  isError?: boolean;
  isLoading?: boolean;
}

export function PostInput({
  user,
  onSubmit,
  placeholder = "오늘 배운 내용을 기록해 보세요",
  isError,
  isLoading = false
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

  const handleContentChange = (value: string | undefined) => {
    setContent(value || "");
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Focus the markdown editor when Enter is pressed on title
      const editorElement = document.querySelector(
        "[data-md-editor] .cm-editor"
      );
      if (editorElement) {
        (editorElement as HTMLElement).focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-start gap-[10px] w-full my-[24px]">
      {/* 상단 사용자 정보 및 제목 입력 */}
      <div className="flex flex-row gap-6 self-stretch">
        {/* 아바타 영역 */}
        <div className="flex flex-row items-start gap-[10px] w-[60px]">
          <Avatar
            size="60"
            src={user.avatarUrl}
            alt={user.login}
            fallback={user.login}
            className="shrink-0 w-[60px] h-[60px] rounded-[150px]"
          />
        </div>

        <div className="flex flex-col items-start flex-grow">
          <Input
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            placeholder={placeholder}
            className="text-[22px] font-bold leading-[130%] text-black tracking-[-0.4px] w-full p-0 border-none outline-none focus:outline-none focus:ring-0 bg-transparent placeholder:text-black/20 shadow-none pb-2"
          />
          <div className="w-full" data-color-mode="light">
            <div className="[&_.w-md-editor]:!border-none [&_.w-md-editor]:!shadow-none [&_.w-md-editor-text]:!p-0 [&_.w-md-editor-text]:h-full">
              <MDEditor
                value={content}
                onChange={handleContentChange}
                preview="edit"
                hideToolbar={true}
                visibleDragbar={false}
                textareaProps={{
                  placeholder:
                    "작은 기록이 모여 큰 성장이 됩니다.\nTIL은 Frontend Fundamentals Discussion에 여러분의 GitHub 계정으로 저장돼요.\n하루에 한 줄씩, 함께 성장해봐요.",
                  style: { backgroundColor: "red !important" }
                }}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 영역 */}
      <div className="flex flex-row justify-end items-center gap-5 self-stretch">
        <Button
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim() || isLoading}
          className="flex flex-row justify-center items-center px-[18px] py-[22px] gap-[10px] bg-black disabled:bg-[#00000033] rounded-[200px] border-none outline-none focus:outline-none text-[16px] font-bold text-[#FCFCFC]"
        >
          {isLoading ? "작성중..." : "작성하기"}
        </Button>
      </div>

      {/* 에러 메시지 */}
      {isError && (
        <div className="flex justify-end self-stretch">
          <p className="text-red-500 text-sm font-medium">
            게시에 실패했습니다. 네트워크 상태를 확인해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

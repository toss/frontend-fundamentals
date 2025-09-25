import * as React from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Button } from "@/components/shared/ui/Button";
import { Input } from "@/components/shared/ui/Input";
import MDEditor from "@uiw/react-md-editor";
import type { GitHubAuthor } from "@/api/remote/discussions";
import { css } from "@styled-system/css";

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
  const [editorHeight, setEditorHeight] = React.useState(100);

  const handleSubmit = () => {
    if (title.trim() || content.trim()) {
      onSubmit({
        title: title.trim(),
        content: content.trim()
      });
      setTitle("");
      setContent("");
      setEditorHeight(100);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string | undefined) => {
    setContent(value || "");
    setEditorHeight(calculateEditorHeight(value));
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
    <div className={postInputContainer}>
      <div className={inputContentArea}>
        <div className={avatarSection}>
          <Avatar
            size="60"
            src={user.avatarUrl}
            alt={user.login}
            fallback={user.login}
            className={avatarStyle}
          />
        </div>

        <div className={inputFieldsArea}>
          <Input
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            placeholder={placeholder}
            className={titleInputStyle}
          />
          <div className={editorWrapper} data-color-mode="light">
            <div className={editorContainer}>
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
                height={editorHeight}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={actionArea}>
        <Button
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim() || isLoading}
          className={submitButton}
        >
          {isLoading ? "작성중..." : "작성하기"}
        </Button>
      </div>

      {isError && (
        <div className={errorContainer}>
          <p className={errorMessage}>
            게시에 실패했습니다. 네트워크 상태를 확인해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

const DEFAULT_CONFIG = {
  minHeight: 100,
  maxHeight: 400,
  lineHeight: 22,
  padding: 20
};

export function calculateEditorHeight(
  content: string | undefined,
  config?: {
    minHeight?: number;
    maxHeight?: number;
    lineHeight?: number;
    padding?: number;
  }
): number {
  const { minHeight, maxHeight, lineHeight, padding } = {
    ...DEFAULT_CONFIG,
    ...config
  };

  if (!content) {
    return minHeight;
  }

  const lines = content.split("\n").length;
  const estimatedHeight = lines * lineHeight + padding;

  return Math.min(Math.max(minHeight, estimatedHeight), maxHeight);
}

// Container Styles
const postInputContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  width: "100%",
  marginY: "24px"
});

// Input Content Area
const inputContentArea = css({
  display: "flex",
  flexDirection: "row",
  gap: "1.5rem",
  alignSelf: "stretch"
});

const avatarSection = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "10px",
  width: "60px"
});

const avatarStyle = css({
  flexShrink: 0,
  width: "60px",
  height: "60px",
  borderRadius: "150px"
});

const inputFieldsArea = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flexGrow: 1
});

// Input Styles
const titleInputStyle = css({
  fontSize: "22px",
  fontWeight: "bold",
  lineHeight: "130%",
  color: "black",
  letterSpacing: "-0.4px",
  width: "100%",
  padding: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  boxShadow: "none",
  paddingBottom: "0.5rem",
  _focus: {
    outline: "none",
    ring: 0
  },
  _placeholder: {
    color: "rgba(0, 0, 0, 0.2)"
  }
});

// Editor Styles
const editorWrapper = css({
  width: "100%"
});

const editorContainer = css({
  "& .w-md-editor": {
    border: "none !important",
    boxShadow: "none !important"
  },
  "& .w-md-editor-text": {
    padding: "0 !important",
    height: "full"
  }
});

// Action Area
const actionArea = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "1.25rem",
  alignSelf: "stretch"
});

const submitButton = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingX: "18px",
  paddingY: "22px",
  gap: "10px",
  backgroundColor: "black",
  borderRadius: "200px",
  border: "none",
  outline: "none",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#FCFCFC",
  _focus: {
    outline: "none"
  },
  _disabled: {
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  }
});

// Error Styles
const errorContainer = css({
  display: "flex",
  justifyContent: "flex-end",
  alignSelf: "stretch"
});

const errorMessage = css({
  color: "rgb(239, 68, 68)",
  fontSize: "14px",
  fontWeight: "medium"
});

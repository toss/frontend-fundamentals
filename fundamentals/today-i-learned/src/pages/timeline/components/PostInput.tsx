import { css, cx } from "@styled-system/css";
import MDEditor from "@uiw/react-md-editor";
import * as React from "react";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Button } from "@/components/shared/ui/Button";
import { Input } from "@/components/shared/ui/Input";
import { MarkdownRenderer } from "@/components/shared/ui/MarkdownRenderer";
import { useNavigate } from "react-router-dom";
import { useCreateDiscussion } from "@/api/hooks/useDiscussions";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

type EditorMode = "write" | "preview";

// FIXME: UI 대비 코드가 복잡해서 1:1 매칭이 안된다고 느껴짐 -> 어떻게 하지?
export function PostWriteSection() {
  const navigate = useNavigate();

  const createPostMutation = useCreateDiscussion();
  const { handleApiError } = useErrorHandler();
  // TODO: 중복되는 useToast를 하나로 통일하기
  const { success: showSuccessToast } = useToast();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [editorHeight, setEditorHeight] = React.useState(100);
  const [editorMode, setEditorMode] = React.useState<EditorMode>("write");

  // TODO: react-hook-form + zod 사용하기
  return (
    <form
      className={postInputContainer}
      onSubmit={async (e) => {
        e.preventDefault();
        // NOTE: trim 잡초?
        if (title.trim() || content.trim()) {
          try {
            const newPost = await createPostMutation.mutateAsync({
              title: title.trim(),
              body: content.trim()
            });
            showSuccessToast("포스트 작성 완료", "성공적으로 게시되었습니다.", {
              label: "보러가기",
              onClick: () => navigate(`/post/${newPost.id}`)
            });
            setTitle("");
            setContent("");
            setEditorHeight(100);
          } catch (error) {
            handleApiError(error, "포스트 작성");
          }
        }
      }}
    >
      <div className={inputContentArea}>
        <div className={avatarSection}>
          <UserAvatar />
        </div>

        <div className={inputFieldsArea}>
          {/* Write/Preview 탭 토글 - 제목 위에 배치 */}
          <div className={tabContainer}>
            <button
              type="button"
              className={cx(tabButton, editorMode === "write" && tabButtonActive)}
              onClick={() => setEditorMode("write")}
            >
              작성
            </button>
            <button
              type="button"
              className={cx(tabButton, editorMode === "preview" && tabButtonActive)}
              onClick={() => setEditorMode("preview")}
              disabled={!content.trim()}
            >
              미리보기
            </button>
          </div>

          {/* Write 모드: 제목 입력 + 에디터 */}
          {editorMode === "write" ? (
            <>
              <Input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const editorElement = document.querySelector(
                      "[data-md-editor] .cm-editor"
                    );
                    if (editorElement) {
                      (editorElement as HTMLElement).focus();
                    }
                  }
                }}
                placeholder={"오늘 배운 내용을 기록해 보세요"}
                className={titleInputStyle}
              />
              <div className={editorWrapper} data-color-mode="light">
                <MDEditor
                  value={content}
                  style={{ boxShadow: "none" }}
                  onChange={(value: string | undefined) => {
                    setContent(value || "");
                    setEditorHeight(calculateEditorHeight(value));
                  }}
                  preview="edit"
                  hideToolbar={true}
                  visibleDragbar={false}
                  defaultTabEnable={true}
                  textareaProps={{
                    placeholder:
                      "작은 기록이 모여 큰 성장이 됩니다.\nTIL은 Frontend Fundamentals Discussion에 여러분의 GitHub 계정으로 저장돼요.\n하루에 한 줄씩, 함께 성장해봐요.",
                    style: { backgroundColor: "red !important" }
                  }}
                  height={editorHeight}
                />
              </div>
            </>
          ) : (
            /* Preview 모드: 제목 + 본문 미리보기 */
            <div className={previewContainer}>
              {title.trim() && (
                <h1 className={previewTitle}>{title}</h1>
              )}
              {content.trim() ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className={previewPlaceholder}>미리볼 내용이 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={actionArea}>
        <Button
          type="submit"
          disabled={
            !title.trim() || !content.trim() || createPostMutation.isPending
          }
          className={submitButton}
        >
          {createPostMutation.isPending ? "작성중..." : "작성하기"}
        </Button>
      </div>

      {createPostMutation.isError && (
        <div className={errorContainer}>
          <p className={errorMessage}>
            게시에 실패했습니다. 네트워크 상태를 확인해주세요.
          </p>
        </div>
      )}
    </form>
  );
}

const UserAvatar = () => {
  const { user } = useAuth();

  if (!user) {
    // FIXME: 유저 정보가 없을 때의 처리 필요
    return null;
  }
  return (
    <Avatar
      size="60"
      src={user.avatar_url}
      alt={user.login}
      fallback={user.login}
      className={avatarStyle}
    />
  );
};

const DEFAULT_CONFIG = {
  minHeight: 100,
  maxHeight: 400,
  lineHeight: 22,
  padding: 20
};

function calculateEditorHeight(
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
  paddingLeft: 0,
  _focus: {
    outline: "none",
    ring: 0
  },
  _placeholder: {
    color: "rgba(0, 0, 0, 0.2)"
  }
});

// Tab Styles
const tabContainer = css({
  display: "flex",
  gap: "4px",
  marginBottom: "12px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  width: "100%"
});

const tabButton = css({
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.5)",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
  transition: "all 0.2s ease",
  marginBottom: "-1px",
  _hover: {
    color: "rgba(0, 0, 0, 0.8)"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
});

const tabButtonActive = css({
  color: "black",
  fontWeight: "bold",
  borderBottomColor: "black"
});

// Editor Styles
const editorWrapper = css({
  width: "100%"
});

// Preview Styles
const previewContainer = css({
  width: "100%",
  minHeight: "100px",
  maxHeight: "400px",
  overflowY: "auto",
  padding: "12px 0"
});

const previewTitle = css({
  fontSize: "22px",
  fontWeight: "bold",
  lineHeight: "130%",
  color: "black",
  letterSpacing: "-0.4px",
  marginBottom: "16px"
});

const previewPlaceholder = css({
  color: "rgba(0, 0, 0, 0.3)",
  fontSize: "14px",
  fontStyle: "italic"
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

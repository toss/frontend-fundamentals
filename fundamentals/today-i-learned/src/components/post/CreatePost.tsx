import { APP_CONSTANTS, UI_CONFIG } from "@/constants";
import { cn, validateContent } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";
import { User, LogIn } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Control, useController, useForm, useWatch } from "react-hook-form";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";

interface CreatePostForm {
  title: string;
  content: string;
}

interface CreatePostProps extends BaseComponentProps {
  onSubmit: (title: string, content: string) => Promise<void>;
  isLoading?: boolean;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
}

interface TitleInputProps {
  control: Control<CreatePostForm>;
  placeholder: string;
  isSubmitting: boolean;
}

interface ContentTextareaProps {
  control: Control<CreatePostForm>;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder: string;
  isSubmitting: boolean;
}

function TitleInput({ control, placeholder, isSubmitting }: TitleInputProps) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name: "title",
    control,
    rules: {
      required: "오늘 무엇을 배웠나요?",
      maxLength: {
        value: APP_CONSTANTS.MAX_TITLE_LENGTH,
        message: `제목은 ${APP_CONSTANTS.MAX_TITLE_LENGTH}자를 초과할 수 없습니다`
      }
    }
  });

  return (
    <div className="space-y-2">
      <input
        {...field}
        type="text"
        disabled={isSubmitting}
        className={cn(
          "w-full border-none bg-transparent text-xl font-semibold",
          "placeholder:font-medium placeholder:text-lg dark:placeholder:text-gray-400",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "text-gray-800 dark:text-white leading-relaxed",
          "py-2",
          isSubmitting && "animate-pulse"
        )}
        placeholder={placeholder}
        aria-label="게시물 제목"
        aria-describedby={error ? "title-error" : undefined}
      />
      {error && (
        <span
          id="title-error"
          className="text-sm font-medium text-gray-500 dark:text-red-400"
          role="alert"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}

function ContentTextarea({
  control,
  isFocused,
  onFocus,
  onBlur,
  onKeyDown,
  placeholder,
  isSubmitting
}: ContentTextareaProps) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name: "content",
    control,
    rules: {
      validate: (value: string) => {
        const validation = validateContent(value);
        return validation.isValid || validation.error;
      }
    }
  });

  return (
    <div className="space-y-2">
      <textarea
        {...field}
        disabled={isSubmitting}
        className={cn(
          "w-full min-h-[100px] border-none bg-transparent text-base leading-[1.8]",
          "placeholder:font-normal dark:placeholder:text-gray-400",
          "focus:outline-none resize-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "text-gray-700 dark:text-white",
          isSubmitting && "animate-pulse"
        )}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        rows={isFocused ? 4 : 2}
        aria-label="게시물 내용"
        aria-describedby={error ? "content-error" : undefined}
      />
      {error && (
        <span
          id="content-error"
          className="text-sm font-medium text-red-500 dark:text-red-400"
          role="alert"
        >
          {error.message}
        </span>
      )}
    </div>
  );
}

interface PostFooterProps {
  control: Control<CreatePostForm>;
  isSubmitting: boolean;
  isValid: boolean;
}

function PostFooter({
  control,
  isSubmitting,
  isValid,
}: PostFooterProps) {
  const title = useWatch({
    control,
    name: "title",
    defaultValue: ""
  });

  const content = useWatch({
    control,
    name: "content",
    defaultValue: ""
  });

  const titleLength = title?.length || 0;
  const contentLength = content?.length || 0;
  const maxTitleLength = APP_CONSTANTS.MAX_TITLE_LENGTH;
  const maxContentLength = APP_CONSTANTS.MAX_CONTENT_LENGTH;
  const isContentOverLimit = contentLength > maxContentLength;
  const isTitleOverLimit = titleLength > maxTitleLength;

  return (
    <div className="flex items-center justify-end pt-3 border-t border-gray-100 dark:border-gray-700">
      <Button
        type="submit"
        size="sm"
        disabled={
          !isValid ||
          isSubmitting ||
          isContentOverLimit ||
          isTitleOverLimit ||
          titleLength === 0 ||
          contentLength === 0
        }
        className={cn(
          "bg-[#5672cd]",
          "text-white font-semibold px-8 py-3 rounded-full",
          "transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md",
          "relative overflow-hidden",
          isSubmitting && "animate-pulse"
        )}
      >
        {isSubmitting ? "게시 중..." : "게시"}
      </Button>
    </div>
  );
}

export function CreatePost({
  onSubmit,
  isLoading = false,
  titlePlaceholder = "오늘 무엇을 배웠나요?",
  contentPlaceholder = "간단하게 기록해봐요",
  className
}: CreatePostProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated, login } = useAuth();
  const { userProfile, isLoading: isProfileLoading } = useUserProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm<CreatePostForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: ""
    }
  });

  const title = useWatch({
    control,
    name: "title",
    defaultValue: ""
  });

  const content = useWatch({
    control,
    name: "content",
    defaultValue: ""
  });

  const hasContent = useMemo(
    () => title?.trim().length > 0 || content?.trim().length > 0,
    [title, content]
  );
  const shouldShowFooter = useMemo(
    () => isFocused || hasContent,
    [isFocused, hasContent]
  );

  const handleFormSubmit = useCallback(
    async (data: CreatePostForm) => {
      const trimmedTitle = data.title.trim();
      const trimmedContent = data.content.trim();

      if (!trimmedTitle || !trimmedContent) return;

      const validation = validateContent(trimmedContent);
      if (!validation.isValid) return;

      try {
        setIsSubmitting(true);
        await onSubmit(trimmedTitle, trimmedContent);
        reset();
        setIsFocused(false);
      } catch (error) {
        console.error("Failed to create post:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, reset]
  );


  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const trimmedTitle = title?.trim();
        const trimmedContent = content?.trim();

        if (trimmedTitle && trimmedContent && isValid) {
          await handleFormSubmit({
            title: trimmedTitle,
            content: trimmedContent
          });
        }
      }
    },
    [title, content, isValid, handleFormSubmit]
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (!hasContent) {
        setIsFocused(false);
      }
    }, UI_CONFIG.ANIMATION_DURATION.FAST);
  }, [hasContent]);

  const isProcessing = isSubmitting || isLoading;

  // 로그인하지 않은 사용자에게 로그인 유도 UI 표시
  if (!isAuthenticated) {
    return (
      <div
        className={cn(
          "relative rounded-2xl",
          "dark:from-gray-800 dark:via-gray-800 dark:to-gray-800",
          "border border-gray-100/50 dark:border-gray-700",
          "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
          "p-6 transition-all duration-300",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-500 shadow-sm">
            <User className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              TIL을 작성하려면 로그인이 필요해요
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              GitHub 계정으로 로그인하여 오늘 배운 것을 기록해보세요
            </p>
            <Button
              onClick={login}
              className={cn(
                "bg-[#5672cd] hover:bg-[#4a5db0]",
                "text-white font-semibold px-6 py-2 rounded-full",
                "transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5",
                "flex items-center space-x-2 mt-4"
              )}
            >
              <LogIn className="h-4 w-4" />
              <span>GitHub으로 로그인</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl",
        "dark:from-gray-800 dark:via-gray-800 dark:to-gray-800",
        "border border-gray-100/50 dark:border-gray-700",
        "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
        "p-6 transition-all duration-300",
        isFocused &&
        "shadow-[0_20px_40px_rgb(128,128,128,0.15)] border-gray-200/60 scale-[1.02]",
        isProcessing && "opacity-90",
        className
      )}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        aria-label="새 게시물 작성"
      >
        <div className="flex items-start space-x-3">
          {/* Profile Picture */}
          <div className="flex-shrink-0 pt-1">
            {(user || userProfile) && !isProfileLoading ? (
              <img
                src={(user?.avatar_url || userProfile?.avatar_url) || ""}
                alt={`${(user?.login || userProfile?.login)}님의 프로필`}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-200/40 shadow-sm"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-500 shadow-sm">
                {isProfileLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <User className="h-5 w-5 text-white" aria-hidden="true" />
                )}
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0 space-y-3">
            <TitleInput
              control={control}
              placeholder={titlePlaceholder}
              isSubmitting={isProcessing}
            />

            <ContentTextarea
              control={control}
              isFocused={isFocused}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={contentPlaceholder}
              isSubmitting={isProcessing}
            />

            {shouldShowFooter && (
              <div className="mt-3">
                <PostFooter
                  control={control}
                  isSubmitting={isProcessing}
                  isValid={isValid && !errors.content}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

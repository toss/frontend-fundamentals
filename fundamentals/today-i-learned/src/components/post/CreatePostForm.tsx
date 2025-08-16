import { useCallback, useMemo, useState } from "react";
import { Control, useController, useForm, useWatch } from "react-hook-form";
import { APP_CONSTANTS, UI_CONFIG } from "@/constants";
import { cn, validateContent } from "@/lib/utils";
import { useFormErrorHandler } from "@/hooks/useErrorHandler";
import { Button } from "../ui/Button";

interface CreatePostForm {
  title: string;
  content: string;
}

interface CreatePostFormProps {
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

export function CreatePostForm({
  onSubmit,
  isLoading = false,
  titlePlaceholder = "오늘 무엇을 배웠나요?",
  contentPlaceholder = "간단하게 기록해봐요"
}: CreatePostFormProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormError = useFormErrorHandler();

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
        handleFormError(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, reset, handleFormError]
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} aria-label="새 게시물 작성">
      <div className="space-y-3">
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
    </form>
  );
}
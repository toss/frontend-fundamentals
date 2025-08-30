import { cn } from "@/libs/utils";
import type { BaseComponentProps } from "@/types";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CreatePostForm } from "./CreatePostForm";
import { LoginPrompt } from "@/components/features/discussions/LoginPrompt";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { useUserProfile } from "@/api/hooks/useUser";

interface CreatePostProps extends BaseComponentProps {
  onSubmit: (title: string, content: string) => Promise<void>;
  isLoading?: boolean;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
}

export function CreatePost({
  onSubmit,
  isLoading = false,
  titlePlaceholder = "오늘 무엇을 배웠나요?",
  contentPlaceholder = "간단하게 기록해봐요",
  className
}: CreatePostProps) {
  const [isFocused] = useState(false);
  const { user, isAuthenticated, login } = useAuth();
  const { isLoading: isProfileLoading } = useUserProfile();

  // 로그인하지 않은 사용자에게 로그인 유도 UI 표시
  if (!isAuthenticated) {
    return <LoginPrompt onLogin={login} className={className} />;
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
        isLoading && "opacity-90",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        {/* Profile Picture */}
        <div className="flex-shrink-0 pt-1">
          <UserAvatar user={user} isLoading={isProfileLoading} />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <CreatePostForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            titlePlaceholder={titlePlaceholder}
            contentPlaceholder={contentPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}

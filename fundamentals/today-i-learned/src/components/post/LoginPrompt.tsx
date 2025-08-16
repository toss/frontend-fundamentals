import { User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import type { BaseComponentProps } from "@/types";

interface LoginPromptProps extends BaseComponentProps {
  onLogin: () => void;
}

export function LoginPrompt({ onLogin, className }: LoginPromptProps) {
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
            onClick={onLogin}
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
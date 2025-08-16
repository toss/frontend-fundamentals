import { useToast } from "@/components/ui/Toast";
import { ERROR_MESSAGES } from "@/constants";
import { AuthError, getUserFriendlyErrorMessage, logError } from "@/lib/errors";
import { useCallback } from "react";

interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  context?: string;
  fallbackMessage?: string;
}

export function useErrorHandler() {
  const { error: showErrorToast } = useToast();

  const handleError = useCallback(
    (error: unknown, options: ErrorHandlerOptions = {}) => {
      const {
        showToast = true,
        logToConsole = true,
        context,
        fallbackMessage = ERROR_MESSAGES.GENERIC_ERROR
      } = options;

      // 에러 객체 정규화
      let processedError: Error;
      if (error instanceof Error) {
        processedError = error;
      } else if (typeof error === "string") {
        processedError = new Error(error);
      } else {
        processedError = new Error(fallbackMessage);
      }

      // 콘솔 로깅
      if (logToConsole) {
        logError(processedError, context);
      }

      // 토스트 메시지 표시
      if (showToast) {
        const userMessage = getUserFriendlyErrorMessage(processedError);
        showErrorToast("오류 발생", userMessage);
      }

      return processedError;
    },
    [showErrorToast]
  );

  // 특별한 에러 타입별 헬퍼 메서드들
  const handleApiError = useCallback(
    (error: unknown, context?: string) => {
      return handleError(error, { context: context || "API" });
    },
    [handleError]
  );

  const handleAuthError = useCallback(
    (error: unknown) => {
      const authError =
        error instanceof AuthError
          ? error
          : new AuthError("인증 오류가 발생했습니다.");

      return handleError(authError, {
        context: "Auth",
        showToast: true
      });
    },
    [handleError]
  );

  const handleNetworkError = useCallback(
    (error: unknown) => {
      return handleError(error, {
        context: "Network",
        fallbackMessage: ERROR_MESSAGES.NETWORK_ERROR
      });
    },
    [handleError]
  );

  const handleValidationError = useCallback(
    (error: unknown) => {
      return handleError(error, {
        context: "Validation",
        fallbackMessage: ERROR_MESSAGES.VALIDATION_FAILED
      });
    },
    [handleError]
  );

  // 조용한 에러 처리 (토스트 없이 로깅만)
  const handleSilentError = useCallback(
    (error: unknown, context?: string) => {
      return handleError(error, {
        showToast: false,
        context
      });
    },
    [handleError]
  );

  return {
    handleError,
    handleApiError,
    handleAuthError,
    handleNetworkError,
    handleValidationError,
    handleSilentError
  };
}

// React Query와 함께 사용하기 위한 헬퍼
export function useQueryErrorHandler() {
  const { handleApiError } = useErrorHandler();

  return useCallback(
    (error: unknown) => {
      handleApiError(error, "Query");
    },
    [handleApiError]
  );
}

// 폼 에러 처리를 위한 헬퍼
export function useFormErrorHandler() {
  const { handleValidationError } = useErrorHandler();

  return useCallback(
    (error: unknown) => {
      handleValidationError(error);
    },
    [handleValidationError]
  );
}

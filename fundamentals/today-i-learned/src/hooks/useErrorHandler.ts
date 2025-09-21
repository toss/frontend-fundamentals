import { useToast } from "@/contexts/ToastContext";
import { ERROR_MESSAGES } from "@/constants";
import {
  AuthError,
  getUserFriendlyErrorMessage,
  logError
} from "@/utils/errors";
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

      let processedError: Error;
      if (error instanceof Error) {
        processedError = error;
      } else if (typeof error === "string") {
        processedError = new Error(error);
      } else {
        processedError = new Error(fallbackMessage);
      }

      if (logToConsole) {
        logError(processedError, context);
      }

      if (showToast) {
        const userMessage = getUserFriendlyErrorMessage(processedError);
        showErrorToast("오류 발생", userMessage);
      }

      return processedError;
    },
    [showErrorToast]
  );

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

export function useQueryErrorHandler() {
  const { handleApiError } = useErrorHandler();

  return useCallback(
    (error: unknown) => {
      handleApiError(error, "Query");
    },
    [handleApiError]
  );
}

export function useFormErrorHandler() {
  const { handleValidationError } = useErrorHandler();

  return useCallback(
    (error: unknown) => {
      handleValidationError(error);
    },
    [handleValidationError]
  );
}

import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/libs/utils";
import { UI_CONFIG } from "@/constants";
import type { BaseComponentProps } from "@/types";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps extends BaseComponentProps {
  type: ToastType;
  title: string;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    titleColor: "text-green-800 dark:text-green-200",
    messageColor: "text-green-700 dark:text-green-300"
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-800 dark:text-red-200",
    messageColor: "text-red-700 dark:text-red-300"
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconColor: "text-orange-600 dark:text-orange-400",
    titleColor: "text-orange-800 dark:text-orange-200",
    messageColor: "text-orange-700 dark:text-orange-300"
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-800 dark:text-blue-200",
    messageColor: "text-blue-700 dark:text-blue-300"
  }
} as const;

export function Toast({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = UI_CONFIG.TOAST.DEFAULT_DURATION,
  className
}: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(onClose, UI_CONFIG.ANIMATION_DURATION.NORMAL); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, UI_CONFIG.ANIMATION_DURATION.NORMAL);
  };

  if (!isVisible) {
    return null;
  }

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-[9999] max-w-sm w-full",
        "transform transition-all duration-300 ease-in-out",
        isLeaving ? "translate-x-full opacity-0" : "translate-x-0 opacity-100",
        className
      )}
    >
      <div
        className={cn(
          "rounded-lg border shadow-lg p-4",
          config.bgColor,
          config.borderColor
        )}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent
              className={cn("h-5 w-5", config.iconColor)}
              aria-hidden="true"
            />
          </div>

          <div className="ml-3 flex-1">
            <h3 className={cn("text-sm font-medium", config.titleColor)}>
              {title}
            </h3>
            {message && (
              <p className={cn("mt-1 text-sm", config.messageColor)}>
                {message}
              </p>
            )}
          </div>

          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className={cn(
                "inline-flex rounded-md p-1.5 transition-colors",
                config.iconColor,
                "hover:bg-black/5 dark:hover:bg-white/5"
              )}
              aria-label="토스트 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Toast manager hook
export interface ToastState {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  autoClose?: boolean;
  duration?: number;
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = (toast: Omit<ToastState, "id">) => {
    const id = `toast-${++toastId}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (title: string, message?: string) =>
    addToast({ type: "success", title, message });

  const error = (title: string, message?: string) =>
    addToast({ type: "error", title, message });

  const warning = (title: string, message?: string) =>
    addToast({ type: "warning", title, message });

  const info = (title: string, message?: string) =>
    addToast({ type: "info", title, message });

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
}

// Toast container component
interface ToastContainerProps {
  toasts: ToastState[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          isVisible={true}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </>
  );
}

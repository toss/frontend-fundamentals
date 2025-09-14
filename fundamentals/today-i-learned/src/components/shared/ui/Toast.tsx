import { UI_CONFIG } from "@/constants";
import { cn } from "@/libs/utils";
import type { BaseComponentProps } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps extends BaseComponentProps {
  type: ToastType;
  title: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
  action?: ToastAction;
}

export function Toast({
  title,
  isVisible,
  onClose,
  autoClose = true,
  duration = UI_CONFIG.TOAST.DEFAULT_DURATION,
  action,
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

  return (
    <div
      className={cn(
        "min-w-[400px]",
        "transform transition-all duration-300 ease-in-out",
        isLeaving ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100",
        className
      )}
    >
      <div
        className={cn(
          "relative bg-white rounded-full shadow-lg px-6 py-4 flex items-center gap-4",
          "border border-gray-100"
        )}
      >
        <div className="flex-1">
          <p className="font-medium text-gray-900">{title}</p>
        </div>

        {action && (
          <button
            onClick={action.onClick}
            className="flex-shrink-0 bg-black text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
          >
            {action.label}
          </button>
        )}

        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-2"
          aria-label="토스트 닫기"
        >
          <X className="h-5 w-5" />
        </button>
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
  action?: ToastAction;
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

  const success = (title: string, message?: string, action?: ToastAction) =>
    addToast({ type: "success", title, message, action });

  const error = (title: string, message?: string, action?: ToastAction) =>
    addToast({ type: "error", title, message, action });

  const warning = (title: string, message?: string, action?: ToastAction) =>
    addToast({ type: "warning", title, message, action });

  const info = (title: string, message?: string, action?: ToastAction) =>
    addToast({ type: "info", title, message, action });

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
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            isVisible={true}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

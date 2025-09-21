import { UI_CONFIG } from "@/constants";
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { css, cx } from "@styled-system/css";

const toastWrapper = {
  minWidth: "400px",
  transform: "translate-y-0",
  opacity: "1",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
};

const toastWrapperLeaving = {
  ...toastWrapper,
  transform: "translate-y--8px",
  opacity: "0"
};

const toastContainer = {
  position: "relative",
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  paddingX: "24px",
  paddingY: "16px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  border: "1px solid rgb(243, 244, 246)"
};

const toastContent = {
  flex: "1"
};

const toastTitle = {
  fontWeight: "500",
  color: "rgb(17, 24, 39)"
};

const toastAction = {
  flexShrink: "0",
  backgroundColor: "black",
  color: "white",
  paddingX: "20px",
  paddingY: "8px",
  borderRadius: "9999px",
  fontWeight: "500",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  _hover: {
    backgroundColor: "rgb(31, 41, 55)"
  }
};

const toastCloseButton = {
  flexShrink: "0",
  color: "rgb(156, 163, 175)",
  marginLeft: "8px",
  cursor: "pointer",
  transition: "color 0.2s ease",
  _hover: {
    color: "rgb(75, 85, 99)"
  }
};

const toastCloseIcon = {
  height: "20px",
  width: "20px"
};

const toastContainerFixed = {
  position: "fixed",
  top: "32px",
  left: "50%",
  transform: "translate-x--50%",
  zIndex: "9999",
  pointerEvents: "none"
};

const toastList = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  pointerEvents: "auto"
};

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
      className={cx(
        css(isLeaving ? toastWrapperLeaving : toastWrapper),
        className
      )}
    >
      <div className={css(toastContainer)}>
        <div className={css(toastContent)}>
          <p className={css(toastTitle)}>{title}</p>
        </div>

        {action && (
          <button onClick={action.onClick} className={css(toastAction)}>
            {action.label}
          </button>
        )}

        <button
          onClick={handleClose}
          className={css(toastCloseButton)}
          aria-label="토스트 닫기"
        >
          <X className={css(toastCloseIcon)} />
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
    <div className={css(toastContainerFixed)}>
      <div className={css(toastList)}>
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

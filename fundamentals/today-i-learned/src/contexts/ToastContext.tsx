import React, { createContext, useContext } from "react";
import {
  useToast as useToastHook,
  ToastContainer
} from "@/components/shared/ui/Toast";

const ToastContext = createContext<ReturnType<typeof useToastHook> | undefined>(
  undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastMethods = useToastHook();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <ToastContainer
        toasts={toastMethods.toasts}
        onRemove={toastMethods.removeToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

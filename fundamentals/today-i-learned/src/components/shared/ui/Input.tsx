import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm",
            "bg-white dark:bg-gray-800",
            "border-gray-300 dark:border-gray-600",
            "text-gray-900 dark:text-white",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-[#ff8a80]/30 focus:border-[#ff8a80]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            error && "border-red-300 focus:border-red-500 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm font-medium text-red-500 dark:text-red-400">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

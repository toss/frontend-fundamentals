import { useEffect } from "react";

interface KeyboardShortcutOptions {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
}

export function useKeyboardShortcut(
  options: KeyboardShortcutOptions,
  handler: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== options.key) return;

      const ctrlMatch = options.ctrlKey === undefined || e.ctrlKey === options.ctrlKey;
      const metaMatch = options.metaKey === undefined || e.metaKey === options.metaKey;
      const shiftMatch = options.shiftKey === undefined || e.shiftKey === options.shiftKey;
      const altMatch = options.altKey === undefined || e.altKey === options.altKey;

      if (ctrlMatch && metaMatch && shiftMatch && altMatch) {
        e.preventDefault();
        handler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [options, handler]);
}
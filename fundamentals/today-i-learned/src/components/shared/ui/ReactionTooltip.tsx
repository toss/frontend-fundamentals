import { ReactNode } from "react";

interface ReactionTooltipProps {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
}

export function ReactionTooltip({ 
  isVisible, 
  children,
  className = "" 
}: ReactionTooltipProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex flex-row items-center bg-white rounded-full z-50 p-1 ${className}`}
      style={{ 
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)",
        minWidth: "fit-content",
        whiteSpace: "nowrap",
        maxWidth: "300px"
      }}
    >
      {children}
    </div>
  );
}
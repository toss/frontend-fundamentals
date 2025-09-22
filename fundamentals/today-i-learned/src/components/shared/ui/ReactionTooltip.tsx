import { ReactNode } from "react";
import { css, cx } from "@styled-system/css";

interface ReactionTooltipProps {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
}

const tooltipStyles = css({
  position: "absolute",
  bottom: "full",
  left: "50%",
  transform: "translateX(-50%)",
  marginBottom: "2",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "full",
  zIndex: 50,
  padding: "1",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.16)",
  minWidth: "fit-content",
  whiteSpace: "nowrap",
  maxWidth: "300px"
});

export function ReactionTooltip({
  isVisible,
  children,
  className
}: ReactionTooltipProps) {
  if (!isVisible) return null;

  return <div className={cx(tooltipStyles, className)}>{children}</div>;
}

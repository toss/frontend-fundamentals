import { LayoutNavigation } from "./LayoutNavigation";
import { css } from "@styled-system/css";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <div className={layoutContainer}>
      <LayoutNavigation />
      <main className={mainContent}>{children}</main>
    </div>
  );
};

// Semantic style definitions
const layoutContainer = css({
  minHeight: "100vh",
  backgroundColor: "white",
  fontFamily: "sans-serif",
  fontSmoothing: "antialiased",
  overflow: "hidden"
});

const mainContent = css({
  height: "100vh",
  paddingTop: "4.6875rem",
  paddingLeft: { base: 0, lg: "3.125rem" },
  overflow: "hidden"
});

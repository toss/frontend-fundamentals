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
  fontSmoothing: "antialiased"
});

const mainContent = css({
  paddingTop: "81px",
  marginX: "auto",
  minWidth: "48rem",
  maxWidth: "1440px",
  "@media (min-width: 1024px)": {
    paddingLeft: "50px"
  }
});

import { css } from "@styled-system/css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { LayoutNavigation } from "./LayoutNavigation";

export const RootLayout = () => {
  return (
    <div className={layoutContainer}>
      <LayoutNavigation />
      <main className={mainContent}>
        <ScrollRestoration
          getKey={(location) => {
            if (
              location.pathname === "/" ||
              location.pathname === "/today-i-learned/"
            ) {
              return location.key;
            }
            return null;
          }}
        />
        <Outlet />
      </main>
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

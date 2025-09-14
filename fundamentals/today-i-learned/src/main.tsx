import { OverlayProvider } from "overlay-kit";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration
} from "react-router-dom";
import SearchPage from "./app/search/page";
import { ErrorBoundary } from "./components/shared/ErrorBoundary.tsx";
import { Layout } from "./components/shared/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import "./index.css";
import { LegacyTimelinePage } from "./pages/legacy-timeline/TimelinePage";
import { PostDetailPage } from "./pages/post/PostDetailPage";
import { MyPage } from "./pages/profile/MyPage";
import { TimelinePage } from "./pages/timeline/TimelinePage";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { ToastProvider } from "./contexts/ToastContext";

const RootLayout = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <TimelinePage />
        },
        {
          path: "search",
          element: <SearchPage />
        },
        {
          path: "profile",
          element: <MyPage />
        },
        {
          path: "legacy-timeline",
          element: <LegacyTimelinePage />
        },
        {
          path: "post/:id",
          element: <PostDetailPage />
        }
      ]
    }
  ],
  {
    basename: "/today-i-learned"
  }
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <OverlayProvider>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <ToastProvider>
                <ErrorBoundary>
                  <RouterProvider router={router} />
                </ErrorBoundary>
              </ToastProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </OverlayProvider>
    </React.StrictMode>
  );
}

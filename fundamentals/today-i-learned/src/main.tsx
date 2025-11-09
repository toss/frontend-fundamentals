import { OverlayProvider } from "overlay-kit";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import SearchPage from "./pages/search/SearchPage.tsx";
import { ErrorBoundary } from "./components/shared/ErrorBoundary.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import "./index.css";
import { PostDetailPage } from "./pages/post/PostDetailPage";
import { MyPage } from "./pages/profile/MyPage";
import { TimelinePage } from "./pages/timeline/TimelinePage";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { ToastProvider } from "./contexts/ToastContext";
import { RootLayout } from "./components/shared/layout/RootLayout.tsx";
import { CategoryIdFinder } from "./pages/dev-tools/CategoryIdFinder";
import { isDevelopment } from "./utils/env.ts";

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
          path: "post/:id",
          element: <PostDetailPage />
        },
        // 개발 환경에서만 표시
        ...(isDevelopment()
          ? [
              {
                path: "dev-tools/category-id",
                element: <CategoryIdFinder />
              }
            ]
          : [])
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

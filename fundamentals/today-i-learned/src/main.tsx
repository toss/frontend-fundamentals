import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter basename="/today-i-learned">
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </React.StrictMode>
  );
}

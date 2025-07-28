import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryProvider>
        <ThemeProvider>
          <BrowserRouter basename="/today-i-learned">
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
    </React.StrictMode>
  );
}

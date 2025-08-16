import { useLocation } from "react-router-dom";
import { OneNavigationReact } from "@shared/components";
import { Header } from "./Header";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const location = useLocation();
  const isKorean =
    !location.pathname.startsWith("/en") &&
    !location.pathname.startsWith("/ja") &&
    !location.pathname.startsWith("/zh-hans");

  return (
    <div className="min-h-screen bg-white dark:bg-[#1b1b1f] font-sans antialiased">
      <OneNavigationReact
        lang={location.pathname.split("/")[1] || "ko"}
        isKorean={isKorean}
        pathname={location.pathname}
      />

      <div className="relative flex min-h-screen flex-col">
        <Header />

        {/* Simple centered layout */}
        <main className="flex-1 pt-16">
          <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

import { useLocation } from "react-router-dom";
import { OneNavigationReact } from "@shared/components";
import { NavigationBar } from "./NavigationBar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const location = useLocation();
  const isKorean =
    !location.pathname.startsWith("/en") &&
    !location.pathname.startsWith("/ja") &&
    !location.pathname.startsWith("/zh-hans");

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <OneNavigationReact
        lang={location.pathname.split("/")[1] || "ko"}
        isKorean={isKorean}
        pathname={location.pathname}
      />

      <div className="relative flex min-h-screen flex-col mt-[120px]">
        <NavigationBar />
        <main className="flex-1">
          <div className="mx-auto min-w-3xl px-4 max-w-[1440px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

import { useLocation } from "react-router-dom";
import { OneNavigationReact } from "@shared/components";
import { NavigationBar } from "./NavigationBar";

export const LayoutNavigation: React.FC = () => {
  const location = useLocation();
  const isKorean =
    !location.pathname.startsWith("/en") &&
    !location.pathname.startsWith("/ja") &&
    !location.pathname.startsWith("/zh-hans");

  return (
    <>
      <NavigationBar />
      <OneNavigationReact
        lang={location.pathname.split("/")[1] || "ko"}
        isKorean={isKorean}
        pathname={location.pathname}
      />
    </>
  );
};

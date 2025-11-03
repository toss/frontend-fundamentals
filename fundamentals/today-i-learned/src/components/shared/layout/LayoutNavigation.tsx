import { useLocation } from "react-router-dom";
import { OneNavigationReact } from "@shared/components";
import { NavigationBar } from "./NavigationBar";

const SUPPORTED_LANGUAGES = ["ko", "en", "ja", "zh-hans"];

const extractLanguageCode = (path: string) => {
  const firstSegment = path.split("/")[1];
  const isValidLanguage = SUPPORTED_LANGUAGES.includes(firstSegment);

  if (isValidLanguage) {
    return firstSegment;
  }

  return null;
};

export const LayoutNavigation: React.FC = () => {
  const location = useLocation();
  const lang = extractLanguageCode(location.pathname) ?? "ko";
  const isKorean = lang === "ko";

  return (
    <>
      <NavigationBar />
      <OneNavigationReact
        lang={lang}
        isKorean={isKorean}
        pathname={location.pathname}
      />
    </>
  );
};

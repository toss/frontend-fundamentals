import { useEffect, useState } from "react";
import { ONE_NAVIGATION_ITEMS } from "../../config/OneNavigationItems";
import "../styles/OneNavigation.css";

interface OneNavigationProps {
  lang: string;
  isKorean: boolean;
  pathname: string;
}

export const OneNavigationReact = ({
  lang,
  isKorean,
  pathname
}: OneNavigationProps) => {
  const [locationOrigin, setLocationOrigin] = useState("");

  useEffect(() => {
    setLocationOrigin(window.location.origin);
  }, []);

  const navigationItems = ONE_NAVIGATION_ITEMS.map((item) => ({
    ...item,
    href: item.href
      .replace("/{lang}", `/${lang.split("-")[0]}`)
      .replace("/ko", "")
  }));

  const isActive = (path: string): boolean => {
    return pathname.startsWith(path);
  };

  const handleNavigation = (href: string): void => {
    const fullUrl = locationOrigin + href;
    window.location.href = fullUrl;
  };

  return (
    <div className="one-navigation">
      <div className="nav-top">
        {navigationItems.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
            data-tooltip={isKorean ? item.tooltip.ko : item.tooltip.en}
          >
            <button
              type="button"
              onClick={() => handleNavigation(item.href)}
              aria-label={isKorean ? item.tooltip.ko : item.tooltip.en}
              className="nav-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

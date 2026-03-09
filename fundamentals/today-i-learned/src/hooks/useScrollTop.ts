import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector("[data-scroll-container]")?.scrollTo({ top: 0 });
  }, [pathname]);
};

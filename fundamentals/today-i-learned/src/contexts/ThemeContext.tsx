import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // 시스템 선호도 확인
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const setTheme = (newTheme: Theme) => {
    console.log("Setting theme to:", newTheme);
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);

    // DOM 클래스 업데이트
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      console.log("Added dark class to html");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      console.log("Added light class to html");
    }
    console.log("Current html classes:", document.documentElement.className);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 초기 설정 및 시스템 선호도 변경 감지
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      // 저장된 설정이 있으면 수동 설정 적용
      setTheme(savedTheme);
    } else {
      // 저장된 설정이 없으면 시스템 설정을 따르므로 클래스 제거
      document.documentElement.classList.remove("dark", "light");
      console.log("Following system preference - removed manual classes");
    }

    // 시스템 선호도 변경 감지
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        // 수동 설정이 없을 때만 시스템 설정 따르기
        setThemeState(e.matches ? "dark" : "light");
        document.documentElement.classList.remove("dark", "light");
        console.log("System preference changed:", e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

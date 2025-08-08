import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { getApiUrl } from "../lib/api";
import type { AuthenticatedUser } from "../types/api";

export type User = AuthenticatedUser;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 사용자 정보 복원
    const savedUser = localStorage.getItem("github_user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        localStorage.removeItem("github_user");
      }
    }

    // URL 파라미터에서 OAuth 콜백 처리
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get("auth");
    const userParam = urlParams.get("user");
    const error = urlParams.get("error");

    if (authStatus === "success" && userParam) {
      try {
        const userData = JSON.parse(atob(userParam));
        setUser(userData);
        localStorage.setItem("github_user", JSON.stringify(userData));

        // URL에서 파라미터 제거
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } catch (error) {
        console.error("Failed to parse OAuth callback data:", error);
      }
    } else if (error) {
      console.error("OAuth error:", error);
      // 에러 처리 (토스트 등)
    }

    setIsLoading(false);
  }, []);

  const login = () => {
    window.location.href = getApiUrl('AUTH');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("github_user");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

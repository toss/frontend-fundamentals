import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { AUTH_LOGIN_URL, getUserInfo } from "../lib/api";
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

  // 토큰으로 사용자 정보 조회
  const fetchUserInfo = async (token: string) => {
    try {
      const userData = await getUserInfo(token);
      const userWithToken = { ...userData, access_token: token };
      setUser(userWithToken);
      localStorage.setItem("github_user", JSON.stringify(userWithToken));
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

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
    const tokenParam = urlParams.get("token");
    const error = urlParams.get("error");

    if (authStatus === "success" && tokenParam) {
      try {
        const token = atob(tokenParam);
        // 토큰으로 사용자 정보 조회
        fetchUserInfo(token);

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
    const currentHost = window.location.host;
    const protocol = window.location.protocol;
    const redirectUri = `${protocol}//${currentHost}/api/github/login-callback`;

    const loginUrl = `${AUTH_LOGIN_URL}?redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = loginUrl;
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

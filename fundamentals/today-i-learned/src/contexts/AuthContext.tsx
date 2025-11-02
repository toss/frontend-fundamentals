import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react";
import { AUTH_LOGIN_URL, getUserInfo } from "@/api/client";
import type { AuthenticatedUser } from "@/api/remote/user";

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

  const fetchUserInfo = async (token: string) => {
    try {
      const userData = await getUserInfo(token);
      const userWithToken = { ...userData, accessToken: token };
      setUser(userWithToken);
      localStorage.setItem("github_user", JSON.stringify(userWithToken));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

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

    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get("auth");
    const tokenParam = urlParams.get("token");
    const error = urlParams.get("error");

    if (authStatus === "success" && tokenParam) {
      try {
        const token = atob(tokenParam);
        fetchUserInfo(token);

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        console.error("Failed to parse OAuth callback data:", error);
      }
    } else if (error) {
      console.error("OAuth error:", error);
    }

    setIsLoading(false);
  }, []);

  const login = () => {
    if (typeof window === "undefined") {
      return;
    }

    const redirectUri =
      "https://frontend-fundamentals.com/api/github/login-callback";

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
    isAuthenticated: !!user
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

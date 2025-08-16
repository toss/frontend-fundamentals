import { cn } from "@/libs/utils";
import { LogIn, LogOut, Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ffSymbolUrl from "@/assets/ff-symbol.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "../ui/Button";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading: authLoading
  } = useAuth();
  const location = useLocation();

  const isLoading = authLoading;

  return (
    <header className="fixed top-0 left-[88px] right-0 z-50 border-b backdrop-blur-md dark:bg-[#1b1b1f]/95">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={ffSymbolUrl}
              alt="Frontend Fundamentals"
              className="h-6 w-6"
            />
            <span className="text-lg font-semibold text-[#2c3e50] dark:text-white">
              Today I Learned
            </span>
          </Link>
        </div>

        {/* Right side - Navigation */}
        <div className="flex items-center space-x-1">
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === "/"
                  ? "text-[#3451b2] hover:text-[#3451b2]"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              )}
            >
              타임라인
            </Link>
            <Link
              to="/profile"
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === "/profile"
                  ? "text-[#3451b2] hover:text-[#3451b2]"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              )}
            >
              마이페이지
            </Link>
          </nav>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Login/Profile area */}
          <div className="flex items-center space-x-2 ml-2">
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className="w-8 h-8 rounded-full object-cover"
                  style={{ aspectRatio: "1 / 1" }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.login}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="h-8 w-8 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  aria-label="로그아웃"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={login}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm">GitHub 로그인</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

import { LogIn, LogOut, Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ffSymbolUrl from "@/assets/ff-symbol.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/shared/ui/Button";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { css } from "@styled-system/css";
import { cx } from "@styled-system/css";

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
    <header className={headerContainer}>
      <div className={headerContent}>
        {/* Logo */}
        <div className={logoContainer}>
          <Link to="/" className={logoLink}>
            <img
              src={ffSymbolUrl}
              alt="Frontend Fundamentals"
              className={logoImage}
            />
            <span className={logoText}>Today I Learned</span>
          </Link>
        </div>

        {/* Right side - Navigation */}
        <div className={rightSection}>
          <nav className={navigation}>
            <Link
              to="/"
              className={cx(
                navLink,
                location.pathname === "/" ? navLinkActive : navLinkDefault
              )}
            >
              타임라인
            </Link>
            <Link
              to="/profile"
              className={cx(
                navLink,
                location.pathname === "/profile"
                  ? navLinkActive
                  : navLinkDefault
              )}
            >
              마이페이지
            </Link>
          </nav>
          {/* Theme toggle */}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className={themeToggleButton}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <Sun className={sunIcon} />
            <Moon className={moonIcon} />
          </Button>
          {/* Login/Profile area */}
          <div className={authSection}>
            {isLoading ? (
              <div className={loadingSkeleton} />
            ) : isAuthenticated && user ? (
              <div className={userProfile}>
                <UserAvatar user={user} size="24" linkToProfile={true} />
                <span className={userName}>{user.login}</span>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className={logoutButton}
                  aria-label="로그아웃"
                >
                  <LogOut className={iconSize} />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={login}
                className={loginButton}
              >
                <LogIn className={iconSize} />
                <span className={loginText}>GitHub 로그인</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className={mobileMenuButton}
            aria-label="Open menu"
          >
            <Menu className={iconSize} />
          </Button>
        </div>
      </div>
    </header>
  );
}

// Semantic style definitions
const headerContainer = css({
  position: "fixed",
  top: "0",
  left: "88px",
  right: "0",
  zIndex: "50",
  borderBottom: "1px solid",
  backdropBlur: "md",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "rgba(27, 27, 31, 0.95)"
  }
});

const headerContent = css({
  marginX: "auto",
  display: "flex",
  height: "4rem",
  maxWidth: "1440px",
  alignItems: "center",
  justifyContent: "space-between",
  paddingX: "1.5rem",
  "@media (min-width: 1024px)": {
    paddingX: "2rem"
  }
});

const logoContainer = css({
  display: "flex",
  alignItems: "center"
});

const logoLink = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem"
});

const logoImage = css({
  height: "1.5rem",
  width: "1.5rem"
});

const logoText = css({
  fontSize: "18px",
  fontWeight: "600",
  color: "#2c3e50",
  "@media (prefers-color-scheme: dark)": {
    color: "white"
  }
});

const rightSection = css({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem"
});

const navigation = css({
  display: "none",
  alignItems: "center",
  gap: "0.25rem",
  "@media (min-width: 768px)": {
    display: "flex"
  }
});

const navLink = css({
  paddingX: "0.75rem",
  paddingY: "0.5rem",
  fontSize: "14px",
  fontWeight: "500",
  transition: "colors 0.15s ease-in-out"
});

const navLinkActive = css({
  color: "#3451b2",
  _hover: {
    color: "#3451b2"
  }
});

const navLinkDefault = css({
  color: "#6b7280",
  _hover: {
    color: "#111827"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "white"
    }
  }
});

const themeToggleButton = css({
  height: "2.25rem",
  width: "2.25rem",
  color: "#6b7280",
  _hover: {
    color: "#111827"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "white"
    }
  }
});

const sunIcon = css({
  height: "1rem",
  width: "1rem",
  rotate: "0deg",
  scale: "1",
  transition: "all 0.15s ease-in-out",
  "@media (prefers-color-scheme: dark)": {
    rotate: "-90deg",
    scale: "0"
  }
});

const moonIcon = css({
  position: "absolute",
  height: "1rem",
  width: "1rem",
  rotate: "90deg",
  scale: "0",
  transition: "all 0.15s ease-in-out",
  "@media (prefers-color-scheme: dark)": {
    rotate: "0deg",
    scale: "1"
  }
});

const authSection = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginLeft: "0.5rem"
});

const loadingSkeleton = css({
  width: "2rem",
  height: "2rem",
  backgroundColor: "#e5e7eb",
  borderRadius: "50%",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "#374151"
  }
});

const userProfile = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem"
});

const userName = css({
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db"
  }
});

const logoutButton = css({
  height: "2rem",
  width: "2rem",
  color: "#6b7280",
  _hover: {
    color: "#111827"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "white"
    }
  }
});

const loginButton = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#6b7280",
  _hover: {
    color: "#111827"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "white"
    }
  }
});

const loginText = css({
  fontSize: "14px"
});

const mobileMenuButton = css({
  display: "block",
  height: "2.25rem",
  width: "2.25rem",
  color: "#6b7280",
  _hover: {
    color: "#111827"
  },
  "@media (min-width: 768px)": {
    display: "none"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "white"
    }
  }
});

const iconSize = css({
  height: "1rem",
  width: "1rem"
});

import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/api/hooks/useUser";
import { UserDropdown } from "@/components/shared/common/UserDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import { css } from "@styled-system/css";

const userProfileContainer = {
  flexShrink: "0",
  position: "relative"
};

const userButton = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingX: "16px",
  paddingY: "8px",
  border: "1px solid rgba(229, 231, 235, 0.5)",
  borderRadius: "16px",
  backgroundColor: "white",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  _hover: {
    backgroundColor: "rgb(249, 250, 251)"
  }
};

const loadingAvatar = {
  width: "40px",
  height: "40px",
  backgroundColor: "rgb(229, 231, 235)",
  borderRadius: "9999px",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
};

const profileContent = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const loadingText = {
  width: "80px",
  height: "16px",
  backgroundColor: "rgb(229, 231, 235)",
  borderRadius: "4px",
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
};

const chevronIcon = {
  width: "20px",
  height: "20px",
  color: "rgb(156, 163, 175)"
};

const avatarImage = {
  width: "30px",
  height: "30px",
  borderRadius: "9999px"
};

const profileName = {
  fontSize: "16px",
  fontWeight: "600",
  color: "rgb(55, 65, 81)",
  letterSpacing: "-0.025em"
};

const chevronIconUser = {
  width: "20px",
  height: "20px",
  color: "rgb(75, 85, 99)"
};

const fallbackAvatar = {
  width: "40px",
  height: "40px",
  borderRadius: "9999px"
};

const fallbackName = {
  fontSize: "16px",
  fontWeight: "700",
  color: "rgb(55, 65, 81)",
  letterSpacing: "-0.025em"
};

const loginText = {
  fontSize: "16px",
  fontWeight: "700",
  color: "rgb(55, 65, 81)",
  letterSpacing: "-0.025em"
};

export function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const { data: userProfile, isLoading } = useUserProfile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className={css(userProfileContainer)} ref={dropdownRef}>
      <button
        type="button"
        onClick={!user ? login : () => setIsDropdownOpen(!isDropdownOpen)}
        className={css(userButton)}
      >
        {isLoading ? (
          <>
            <div className={css(loadingAvatar)} />
            <div className={css(profileContent)}>
              <div className={css(loadingText)} />
              <ChevronDown className={css(chevronIcon)} />
            </div>
          </>
        ) : userProfile ? (
          <>
            <img
              src={userProfile.avatar_url}
              alt={userProfile.name || userProfile.login}
              className={css(avatarImage)}
            />
            <div className={css(profileContent)}>
              <span className={css(profileName)}>
                {userProfile.name || userProfile.login}
              </span>
              <ChevronDown className={css(chevronIconUser)} />
            </div>
          </>
        ) : user ? (
          <>
            <img
              src={user.avatar_url}
              alt={user.login}
              className={css(fallbackAvatar)}
            />
            <div className={css(profileContent)}>
              <span className={css(fallbackName)}>{user.login}</span>
              <ChevronDown className={css(chevronIconUser)} />
            </div>
          </>
        ) : (
          <>
            <span className={css(loginText)}>Log in</span>
          </>
        )}
      </button>

      {(user || userProfile) && (
        <UserDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          onLogout={logout}
        />
      )}
    </div>
  );
}

import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/api/hooks/useUser";
import { UserDropdown } from "@/components/shared/common/UserDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";

export function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const { data: userProfile, isLoading } = useUserProfile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="flex-shrink-0 relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={!user ? login : () => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 px-6 py-4 border border-gray-200/50 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm"
      >
        {isLoading ? (
          <>
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex items-center space-x-2">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </>
        ) : userProfile ? (
          <>
            <img
              src={userProfile.avatar_url}
              alt={userProfile.name || userProfile.login}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-gray-700 tracking-tight">
                {userProfile.name || userProfile.login}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
          </>
        ) : user ? (
          <>
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-gray-700 tracking-tight">
                {user.login}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
          </>
        ) : (
          <>
            <span className="text-base font-bold text-gray-700 tracking-tight">
              Log in
            </span>
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
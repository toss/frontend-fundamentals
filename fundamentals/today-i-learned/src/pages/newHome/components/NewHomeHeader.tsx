import { Search, Command, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/api/hooks/useUser";

export function NewHomeHeader() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useAuth();
  const { data: userProfile, isLoading } = useUserProfile();

  // Handle Command+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="search"]'
        ) as HTMLInputElement;
        searchInput?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-200/50 bg-white z-30">
      <div className="mx-auto flex h-[120px] items-center justify-between px-6 lg:px-[222px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <span className="text-[28px] font-extrabold text-[#0F0F0F] tracking-tight leading-6">
              Today I Learned
            </span>
          </Link>
        </div>

        {/* Search Bar - Hidden on tablet and mobile */}
        <div className="hidden lg:flex flex-1 ml-8">
          <div className="relative w-full max-w-[260px]">
            <div
              className={`flex items-center bg-[#F6F6F7] rounded-lg h-10 px-3 transition-all ${
                isSearchFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              <Search className="w-[14px] h-[14px] text-[#65656B] mr-2" />
              <input
                type="search"
                placeholder="Search"
                className="flex-1 bg-transparent text-[13px] text-gray-900 placeholder-[#65656B] outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className="flex items-center space-x-1 ml-2">
                <div className="flex items-center justify-center px-2 py-0.5 border border-gray-400/30 rounded bg-white">
                  <Command className="w-3 h-3 text-[#65656B]" />
                  <span className="text-xs font-medium text-[#65656B]">K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Area */}
        <div className="flex-shrink-0">
          <button
            type="button"
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
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold text-gray-700 tracking-tight">
                    Guest User
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

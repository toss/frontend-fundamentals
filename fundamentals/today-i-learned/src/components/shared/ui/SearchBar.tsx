import { Search, Command } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Search",
  onSearch
}: SearchBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const focusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  // Handle Command+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        focusSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className="hidden lg:flex flex-1 ml-8">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full max-w-[260px]"
      >
        <div
          className={`flex items-center bg-[#F6F6F7] rounded-lg h-10 px-3 transition-all ${
            isSearchFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""
          }`}
        >
          <Search className="w-[14px] h-[14px] text-[#65656B] mr-2" />
          <input
            ref={searchInputRef}
            type="search"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchChange}
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
      </form>
    </div>
  );
}

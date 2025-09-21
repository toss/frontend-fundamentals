import { Search, Command } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@styled-system/css";

const searchContainer = {
  display: "none",
  flex: "1",
  marginLeft: "32px",
  "@media (min-width: 1024px)": {
    display: "flex"
  }
};

const searchForm = {
  position: "relative",
  width: "100%",
  maxWidth: "260px"
};

const searchInputContainer = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F6F6F7",
  borderRadius: "8px",
  height: "40px",
  paddingX: "12px",
  transition: "all 0.2s ease"
};

const searchInputContainerFocused = {
  ...searchInputContainer,
  outline: "2px solid rgb(59, 130, 246)",
  outlineOffset: "2px"
};

const searchIcon = {
  width: "14px",
  height: "14px",
  color: "#65656B",
  marginRight: "8px"
};

const searchInput = {
  flex: "1",
  backgroundColor: "transparent",
  fontSize: "13px",
  color: "rgb(17, 24, 39)",
  outline: "none",
  border: "none",
  "&::placeholder": {
    color: "#65656B"
  }
};

const shortcutContainer = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginLeft: "8px"
};

const shortcutKey = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingX: "8px",
  paddingY: "2px",
  border: "1px solid rgba(156, 163, 175, 0.3)",
  borderRadius: "4px",
  backgroundColor: "white"
};

const commandIcon = {
  width: "12px",
  height: "12px",
  color: "#65656B"
};

const keyText = {
  fontSize: "12px",
  fontWeight: "500",
  color: "#65656B"
};

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
    <div className={css(searchContainer)}>
      <form onSubmit={handleSearchSubmit} className={css(searchForm)}>
        <div
          className={css(
            isSearchFocused ? searchInputContainerFocused : searchInputContainer
          )}
        >
          <Search className={css(searchIcon)} />
          <input
            ref={searchInputRef}
            type="search"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchChange}
            className={css(searchInput)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div className={css(shortcutContainer)}>
            <div className={css(shortcutKey)}>
              <Command className={css(commandIcon)} />
              <span className={css(keyText)}>K</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

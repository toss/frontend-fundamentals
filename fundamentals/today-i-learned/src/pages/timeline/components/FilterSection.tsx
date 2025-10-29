import { useSearchParams } from "react-router-dom";
import type { SortOption } from "../types";
import { css, cx } from "@styled-system/css";

interface SortTab {
  value: SortOption;
  label: string;
}

const sortTabs: SortTab[] = [
  { value: "newest", label: "새로 올라온" },
  { value: "realtime", label: "실시간 반응" },
  { value: "hall-of-fame", label: "명예의 전당" }
];

export function FilterSection() {
  const [searchParams, setSearchParams] = useSearchParams({ sort: "newest" });

  const sortOption = searchParams.get("sort") as SortOption;
  const onSortChange = (option: SortOption) => {
    setSearchParams({ sort: option });
  };

  return (
    <div className={filterContainer}>
      {sortTabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          onClick={() => onSortChange(tab.value)}
          className={cx(
            tabButton,
            sortOption !== tab.value && tabButtonInactive
          )}
        >
          <span
            className={cx(
              tabLabelBase,
              sortOption === tab.value ? tabLabelActive : tabLabelInactive
            )}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// Container Styles
const filterContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem"
});

// Tab Button Styles
const tabButton = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingX: "1rem",
  paddingY: "0.75rem",
  minWidth: "114px",
  height: "46px",
  borderRadius: "12px",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.2s"
});

const tabButtonInactive = css({
  _hover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  }
});

// Tab Label Styles
const tabLabelBase = css({
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px"
});

const tabLabelActive = css({
  color: "#0F0F0F"
});

const tabLabelInactive = css({
  color: "rgba(0, 0, 0, 0.2)"
});

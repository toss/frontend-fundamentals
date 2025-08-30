import type { FilterSectionProps, SortOption } from "../utils/types";

interface SortTab {
  value: SortOption;
  label: string;
}

const sortTabs: SortTab[] = [
  { value: "newest", label: "새로 올라온" },
  { value: "realtime", label: "실시간 반응" },
  { value: "hall-of-fame", label: "명예의 전당" }
];

export function FilterSection({
  sortOption,
  onSortChange
}: FilterSectionProps) {
  return (
    <div className="flex flex-row items-center pb-3  pt-1 gap-2">
      {sortTabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          onClick={() => onSortChange(tab.value)}
          className={`
            flex flex-row justify-center items-center
            px-4 py-3 min-w-[114px] h-[46px]
            rounded-[12px] transition-colors duration-200
            ${
              sortOption === tab.value
                ? "bg-transparent"
                : "bg-transparent hover:bg-black/5"
            }
          `}
        >
          <span
            className={`
              font-bold text-[18px] leading-[22px]
              ${sortOption === tab.value ? "text-[#0F0F0F]" : "text-black/20"}
            `}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

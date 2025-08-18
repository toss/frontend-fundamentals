import * as React from "react";
import { Badge, Select } from "../ui";
import { cn } from "../utils/cn";
import type { FilterSectionProps, SortOption } from "../utils/types";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "새로 추가됨" },
  { value: "popular", label: "인기순" },
  { value: "trending", label: "트렌딩" }
];

export function FilterSection({
  categories,
  sortOption,
  onCategoryChange,
  onSortChange
}: FilterSectionProps) {
  return (
    <div className="w-full space-y-4">
      {/* 카테고리 필터 */}
      <div className="flex flex-row items-center justify-between gap-4">
        {/* 카테고리 탭들 */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex gap-2 min-w-fit">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={category.selected ? "primary" : "default"}
                size="md"
                asButton
                interactive
                onClick={() => onCategoryChange(category.id)}
                className="shrink-0 transition-all duration-200"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex items-center gap-3">
          <Select
            value={sortOption}
            options={sortOptions}
            onChange={(value) => onSortChange(value as SortOption)}
            size="md"
            className="w-[117px]"
          />
        </div>
      </div>
    </div>
  );
}

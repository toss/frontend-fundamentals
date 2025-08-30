import { cn } from "@/libs/utils";
import type { BaseComponentProps, PostCategory, TabItem } from "@/types";
import { Clock, Crown, TrendingUp } from "lucide-react";

// Icon mapping for better maintainability
const ICON_MAP = {
  Clock: Clock,
  TrendingUp: TrendingUp,
  Crown: Crown
} as const;

// Tab configuration with typed icons
const TAB_CONFIG: TabItem<PostCategory>[] = [
  {
    id: "latest",
    label: "최신글",
    icon: "Clock"
  },
  {
    id: "weekly",
    label: "실시간 인기글",
    icon: "TrendingUp"
  },
  {
    id: "hall-of-fame",
    label: "명예의 전당",
    icon: "Crown"
  }
] as const;

interface CategoryTabsProps extends BaseComponentProps {
  activeTab: PostCategory;
  onTabChange: (tab: PostCategory) => void;
}

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <nav
      className="flex space-x-6 justify-center"
      aria-label="게시물 카테고리"
      role="tablist"
    >
      {TAB_CONFIG.map((tab) => {
        const IconComponent = ICON_MAP[tab.icon as keyof typeof ICON_MAP];
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            className={cn(
              "group relative py-2 px-1 text-sm font-medium",
              "focus:outline-none transition-all duration-200",
              isActive
                ? "text-gray-600"
                : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            )}
          >
            <div className="flex items-center gap-1.5">
              <IconComponent className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{tab.label}</span>
            </div>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

interface TabContentProps {
  activeTab: PostCategory;
  children?: React.ReactNode;
  className?: string;
}

export function TabContent({
  activeTab,
  children,
  className
}: TabContentProps) {
  return (
    <div
      className={className}
      role="tabpanel"
      id={`tabpanel-${activeTab}`}
      aria-labelledby={`tab-${activeTab}`}
    >
      {children}
    </div>
  );
}

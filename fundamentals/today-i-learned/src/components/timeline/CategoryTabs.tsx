import { cn } from "@/lib/utils";
import type { BaseComponentProps, PostCategory, TabItem } from "@/types";
import { Clock, Crown, TrendingUp } from "lucide-react";

// Icon mapping for better maintainability
const ICON_MAP = {
  Clock: Clock,
  TrendingUp: TrendingUp,
  Crown: Crown,
} as const;

// Tab configuration with typed icons
const TAB_CONFIG: TabItem<PostCategory>[] = [
  {
    id: "latest",
    label: "최신글",
    icon: "Clock",
  },
  {
    id: "weekly",
    label: "주간 인기글",
    icon: "TrendingUp",
  },
  {
    id: "hall-of-fame",
    label: "명예의 전당",
    icon: "Crown",
  }
] as const;

// Empty state configuration
const EMPTY_STATE_CONFIG: Record<PostCategory, {
  emoji: string;
  title: string;
  message: string;
}> = {
  latest: {
    emoji: "📝",
    title: "아직 새로운 글이 없어요",
    message: "첫 번째 학습 기록의 주인공이 되어보세요!"
  },
  weekly: {
    emoji: "🔥",
    title: "이번 주 인기글을 준비중이에요",
    message: "더 많은 좋아요와 댓글로 인기글을 만들어주세요!"
  },
  "hall-of-fame": {
    emoji: "👑",
    title: "전설적인 글들을 모으고 있어요",
    message: "명예의 전당에 오를 멋진 학습 기록을 작성해보세요!"
  }
} as const;

interface CategoryTabsProps extends BaseComponentProps {
  activeTab: PostCategory;
  onTabChange: (tab: PostCategory) => void;
}

export function CategoryTabs({ activeTab, onTabChange, className }: CategoryTabsProps) {
  return (
    <nav className="flex space-x-6 justify-center" aria-label="게시물 카테고리" role="tablist">
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

export function TabContent({ activeTab, children, className }: TabContentProps) {
  const emptyState = EMPTY_STATE_CONFIG[activeTab];

  return (
    <div
      className={className}
      role="tabpanel"
      id={`tabpanel-${activeTab}`}
      aria-labelledby={`tab-${activeTab}`}
    >
      {children ? (
        children
      ) : (
        <EmptyState {...emptyState} />
      )}
    </div>
  );
}

interface EmptyStateProps {
  emoji: string;
  title: string;
  message: string;
}

function EmptyState({ emoji, title, message }: EmptyStateProps) {
  return (
    <div className="text-center py-12" role="status" aria-live="polite">
      <div className="text-4xl mb-4" role="img" aria-label="Empty state icon">
        {emoji}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
}
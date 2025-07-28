import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href?: string;
  children?: SidebarItem[];
  active?: boolean;
}

const sidebarData: SidebarItem[] = [
  {
    title: "Introduction",
    children: [
      { title: "What is TIL?", href: "/", active: true },
      { title: "Getting Started", href: "/getting-started" },
      { title: "Routing", href: "/routing" },
      { title: "Deploy", href: "/deploy" }
    ]
  },
  {
    title: "Writing",
    children: [
      { title: "Markdown Extensions", href: "/markdown-extensions" },
      { title: "Asset Handling", href: "/asset-handling" },
      { title: "Frontmatter", href: "/frontmatter" },
      { title: "Using Vue in Markdown", href: "/using-vue" },
      { title: "Internationalization", href: "/i18n" }
    ]
  },
  {
    title: "Customization", 
    children: [
      { title: "Using a Custom Theme", href: "/custom-theme" },
      { title: "Extending the Default Theme", href: "/extending-theme" },
      { title: "Build-Time Data Loading", href: "/data-loading" },
      { title: "SSR Compatibility", href: "/ssr-compat" },
      { title: "Connecting to a CMS", href: "/cms" }
    ]
  },
  {
    title: "Experimental",
    children: [
      { title: "MPA Mode", href: "/mpa-mode" },
      { title: "Sitemap Generation", href: "/sitemap" }
    ]
  }
];

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["Introduction", "Writing"])
  );

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isExpanded = expandedItems.has(item.title);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.title} className="mb-1">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpanded(item.title)}
              className={cn(
                "flex w-full items-center justify-between px-2 py-1.5 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors",
                "dark:text-gray-100 dark:hover:text-gray-300"
              )}
            >
              <span>{item.title}</span>
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-400" />
              )}
            </button>
            {isExpanded && (
              <div className="mt-1 ml-2 space-y-1">
                {item.children!.map((child) => (
                  <a
                    key={child.title}
                    href={child.href}
                    className={cn(
                      "block px-2 py-1.5 text-sm transition-colors rounded",
                      child.active
                        ? "text-[#ff8a80] font-medium bg-[#ff8a80]/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      "dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800/50"
                    )}
                  >
                    {child.title}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <a
            href={item.href}
            className={cn(
              "block px-2 py-1.5 text-sm transition-colors rounded",
              item.active
                ? "text-[#ff8a80] font-medium bg-[#ff8a80]/5"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              "dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800/50"
            )}
          >
            {item.title}
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto py-6 pr-6">
      <nav className="space-y-2">
        {sidebarData.map((item) => renderSidebarItem(item))}
      </nav>
    </div>
  );
}
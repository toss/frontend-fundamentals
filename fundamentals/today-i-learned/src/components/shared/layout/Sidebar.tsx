import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { css } from "@styled-system/css";
import { cx } from "@styled-system/css";

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

  const renderSidebarItem = (item: SidebarItem) => {
    const isExpanded = expandedItems.has(item.title);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.title} className={sidebarItemContainer}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpanded(item.title)}
              className={parentButton}
            >
              <span>{item.title}</span>
              {isExpanded ? (
                <ChevronDown className={chevronIcon} />
              ) : (
                <ChevronRight className={chevronIcon} />
              )}
            </button>
            {isExpanded && (
              <div className={childrenContainer}>
                {item.children!.map((child) => (
                  <a
                    key={child.title}
                    href={child.href}
                    className={cx(
                      childLink,
                      child.active ? childLinkActive : childLinkDefault
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
            className={cx(
              directLink,
              item.active ? directLinkActive : directLinkDefault
            )}
          >
            {item.title}
          </a>
        )}
      </div>
    );
  };

  return (
    <div className={sidebarContainer}>
      <nav className={navigationContainer}>
        {sidebarData.map((item) => renderSidebarItem(item))}
      </nav>
    </div>
  );
}

// Semantic style definitions
const sidebarContainer = css({
  height: "100%",
  overflowY: "auto",
  paddingY: "1.5rem",
  paddingRight: "1.5rem"
});

const navigationContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
});

const sidebarItemContainer = css({
  marginBottom: "0.25rem"
});

const parentButton = css({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  paddingX: "0.5rem",
  paddingY: "0.375rem",
  fontSize: "14px",
  fontWeight: "600",
  color: "#111827",
  transition: "colors 0.15s ease-in-out",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  _hover: {
    color: "#6b7280"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#f3f4f6",
    _hover: {
      color: "#d1d5db"
    }
  }
});

const chevronIcon = css({
  height: "0.75rem",
  width: "0.75rem",
  color: "#9ca3af"
});

const childrenContainer = css({
  marginTop: "0.25rem",
  marginLeft: "0.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem"
});

const childLink = css({
  display: "block",
  paddingX: "0.5rem",
  paddingY: "0.375rem",
  fontSize: "14px",
  transition: "colors 0.15s ease-in-out",
  borderRadius: "0.25rem"
});

const childLinkActive = css({
  color: "#ff8a80",
  fontWeight: "500",
  backgroundColor: "rgba(255, 138, 128, 0.05)"
});

const childLinkDefault = css({
  color: "#6b7280",
  _hover: {
    color: "#111827",
    backgroundColor: "#f9fafb"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "#f3f4f6",
      backgroundColor: "rgba(31, 41, 55, 0.5)"
    }
  }
});

const directLink = css({
  display: "block",
  paddingX: "0.5rem",
  paddingY: "0.375rem",
  fontSize: "14px",
  transition: "colors 0.15s ease-in-out",
  borderRadius: "0.25rem"
});

const directLinkActive = css({
  color: "#ff8a80",
  fontWeight: "500",
  backgroundColor: "rgba(255, 138, 128, 0.05)"
});

const directLinkDefault = css({
  color: "#6b7280",
  _hover: {
    color: "#111827",
    backgroundColor: "#f9fafb"
  },
  "@media (prefers-color-scheme: dark)": {
    color: "#d1d5db",
    _hover: {
      color: "#f3f4f6",
      backgroundColor: "rgba(31, 41, 55, 0.5)"
    }
  }
});

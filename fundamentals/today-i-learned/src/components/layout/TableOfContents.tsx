import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function TableOfContents() {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 페이지의 헤딩 요소들을 찾아서 목차 생성
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = heading.id || `heading-${index}`;
      const title = heading.textContent || '';

      if (!heading.id) {
        heading.id = id;
      }

      items.push({ id, title, level });
    });

    setTocItems(items);

    // Intersection Observer로 현재 보이는 섹션 추적
    const observerOptions = {
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  // VitePress 스타일 임시 목차 데이터
  const defaultTocItems: TocItem[] = [
    { id: "use-cases", title: "Use Cases", level: 2 },
    { id: "developer-experience", title: "Developer Experience", level: 2 },
    { id: "performance", title: "Performance", level: 2 },
    { id: "what-about-vuepress", title: "What About VuePress?", level: 2 },
  ];

  const displayItems = tocItems.length > 0 ? tocItems : defaultTocItems;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className="py-6 px-6">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        On this page
      </h4>
      <nav className="space-y-1">
        {displayItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "block w-full text-left text-sm transition-colors border-l-2 py-1",
              "hover:text-[#ff8a80] hover:border-[#ff8a80]/30",
              activeId === item.id 
                ? "text-[#ff8a80] border-[#ff8a80] font-medium" 
                : "text-gray-600 border-transparent dark:text-gray-300",
              item.level >= 3 && "pl-4"
            )}
            style={{
              paddingLeft: `${Math.max(0, (item.level - 2) * 16)}px`
            }}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Key,
  type RefObject
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface UseVirtualInfiniteScrollOptions {
  itemCount: number;
  scrollElementRef: RefObject<HTMLElement>;
  getItemKey?: (index: number) => Key;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  estimatedItemHeight?: number;
  itemGap?: number;
  overscan?: number;
}

export function useVirtualInfiniteScroll({
  itemCount,
  scrollElementRef,
  getItemKey,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  estimatedItemHeight = 346, // postCardSkeleton 높이 기준
  itemGap = 24,
  overscan = 3
}: UseVirtualInfiniteScrollOptions) {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [listScrollMargin, setListScrollMargin] = useState(0);
  const totalCount = hasNextPage ? itemCount + 1 : itemCount;

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current;
    const listContainerElement = listContainerRef.current;
    if (!scrollElement || !listContainerElement) return;

    const measureScrollMargin = () => {
      const scrollElementRect = scrollElement.getBoundingClientRect();
      const listContainerRect = listContainerElement.getBoundingClientRect();
      const nextScrollMargin =
        listContainerRect.top - scrollElementRect.top + scrollElement.scrollTop;

      setListScrollMargin((prevScrollMargin) =>
        prevScrollMargin === nextScrollMargin
          ? prevScrollMargin
          : nextScrollMargin
      );
    };

    measureScrollMargin();

    const resizeObserver = new ResizeObserver(measureScrollMargin);
    resizeObserver.observe(scrollElement);
    resizeObserver.observe(listContainerElement);

    window.addEventListener("resize", measureScrollMargin);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureScrollMargin);
    };
  }, [scrollElementRef, itemCount]);

  const rowVirtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: () => scrollElementRef.current,
    getItemKey,
    estimateSize: () => estimatedItemHeight,
    overscan,
    gap: itemGap,
    scrollMargin: listScrollMargin
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const lastVirtualItem = virtualItems[virtualItems.length - 1];
    if (!lastVirtualItem) return;
    const fetchThresholdIndex = Math.max(itemCount - 2, 0);
    if (
      lastVirtualItem.index >= fetchThresholdIndex &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualItems, itemCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    listContainerRef,
    rowVirtualizer,
    virtualItems,
    scrollMargin: listScrollMargin,
    isLoaderIndex: (index: number) => index >= itemCount
  };
}

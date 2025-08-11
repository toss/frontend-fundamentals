import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
  onIntersect?: () => void;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, rootMargin = "100px", enabled = true, onIntersect } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!enabled || !elementRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Intersection changed:', entry.isIntersecting);
        setIsIntersecting(entry.isIntersecting);
        
        // 화면에 보이기 시작할 때만 콜백 실행
        if (entry.isIntersecting && onIntersect) {
          onIntersect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = elementRef.current;
    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, enabled, onIntersect]);

  return { elementRef, isIntersecting };
}

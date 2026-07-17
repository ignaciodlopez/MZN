import { useEffect, useRef, useState, type RefObject } from "react";

interface Options extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const { once = false, root = null, rootMargin = "0px", threshold = 0 } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, isIntersecting];
}

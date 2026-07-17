import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

interface ScrollState {
  direction: ScrollDirection;
  scrolled: boolean;
}

const THRESHOLD = 12;

export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({ direction: "up", scrolled: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const scrolled = y > 24;

      if (Math.abs(y - lastY) >= THRESHOLD) {
        const direction: ScrollDirection = y > lastY && y > 120 ? "down" : "up";
        setState((prev) =>
          prev.direction === direction && prev.scrolled === scrolled
            ? prev
            : { direction, scrolled },
        );
        lastY = y;
      } else {
        setState((prev) => (prev.scrolled === scrolled ? prev : { ...prev, scrolled }));
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

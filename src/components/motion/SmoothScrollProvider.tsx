/* eslint-disable react-refresh/only-export-components */
import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollContextValue {
  scrollTo: (target: string) => void;
  stop: () => void;
  start: () => void;
}

const noop = () => undefined;

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: (target) => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  },
  stop: noop,
  start: noop,
});

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = useCallback((target: string) => {
    const element = document.querySelector<HTMLElement>(target);
    if (!element) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(element, { offset: -64 });
    } else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }

    window.history.replaceState(null, "", target);
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const value = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cinematicEase } from "@/lib/animations";

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      const timeout = window.setTimeout(onComplete, 300);
      return () => window.clearTimeout(timeout);
    }

    const controls = animate(0, 100, {
      duration: 1.3,
      ease: [0.32, 0, 0.67, 0],
      onUpdate: (latest) => setProgress(Math.round(latest)),
      onComplete: () => {
        window.setTimeout(onComplete, 250);
      },
    });

    return () => controls.stop();
  }, [prefersReducedMotion, onComplete]);

  return (
    <motion.div
      role="status"
      aria-label="Cargando el sitio"
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-8 bg-background"
      exit={
        prefersReducedMotion
          ? { opacity: 0, transition: { duration: 0.25 } }
          : { y: "-100%", transition: { duration: 0.7, ease: cinematicEase } }
      }
    >
      <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold uppercase tracking-[0.14em] text-foreground">
        {site.name}
      </p>

      <div className="w-[min(60vw,320px)]" aria-hidden="true">
        <div className="h-px w-full bg-line">
          <div
            className="h-px bg-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!prefersReducedMotion && (
        <p aria-hidden="true" className="text-xs tabular-nums tracking-[0.3em] text-muted">
          {progress}%
        </p>
      )}
    </motion.div>
  );
}

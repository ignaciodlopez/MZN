import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, isEnabled } from "@/lib/utils";

type CursorVariant = "default" | "link" | "view";

export function CustomCursor() {
  const enabled = isEnabled(import.meta.env.VITE_ENABLE_CUSTOM_CURSOR);
  const finePointer = useMediaQuery("(pointer: fine) and (hover: hover)");
  const prefersReducedMotion = useReducedMotion();

  const active = enabled && finePointer && !prefersReducedMotion;

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 45, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 45, mass: 0.6 });

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest("[data-cursor='view']")) {
        setVariant("view");
      } else if (
        target.closest("a, button, input, select, textarea, label, [role='button']")
      ) {
        setVariant("link");
      } else {
        setVariant("default");
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color] duration-300 ease-cinematic",
          variant === "default" && "h-3 w-3 bg-foreground mix-blend-difference",
          variant === "link" && "h-10 w-10 bg-foreground mix-blend-difference",
          variant === "view" && "h-20 w-20 bg-accent",
        )}
      >
        {variant === "view" && (
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-background">
            Ver
          </span>
        )}
      </div>
    </motion.div>
  );
}

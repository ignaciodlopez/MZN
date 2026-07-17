import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ParallaxMediaProps {
  children: ReactNode;
  className?: string;
  amount?: number;
}

export function ParallaxMedia({ children, className, amount = 6 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  const parallaxActive = !prefersReducedMotion && isDesktop;

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {parallaxActive ? (
        <motion.div style={{ y, scale: 1 + amount / 40 }} className="h-full w-full">
          {children}
        </motion.div>
      ) : (
        <div className="h-full w-full">{children}</div>
      )}
    </div>
  );
}

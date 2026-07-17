import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cinematicEase, durations } from "@/lib/animations";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  distance = 40,
  once = true,
}: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: durations.base, ease: cinematicEase, delay },
        },
      }}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

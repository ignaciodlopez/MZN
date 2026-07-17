import { motion } from "motion/react";
import type { ElementType } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { lineReveal, staggerContainer } from "@/lib/animations";

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function RevealText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        variants={staggerContainer(0.04, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10% 0px" }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom [&:not(:last-child)]:mr-[0.28em]"
          >
            <motion.span className="inline-block will-change-transform" variants={lineReveal}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

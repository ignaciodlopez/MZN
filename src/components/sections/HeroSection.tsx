import { Play } from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, lineReveal, staggerContainer } from "@/lib/animations";

const ShowreelModal = lazy(() => import("@/components/project/ShowreelModal"));

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [showreelMounted, setShowreelMounted] = useState(false);

  const openShowreel = () => {
    setShowreelMounted(true);
    setShowreelOpen(true);
  };

  const nameLines = [site.firstName, site.lastName];

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Container className="relative z-10 pb-16 pt-36 md:pb-20">
        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="flex flex-col gap-7"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.4em] text-muted"
          >
            {site.location}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-sm font-medium uppercase tracking-[0.3em] text-foreground"
          >
            {site.roles.join(" · ")}
          </motion.p>

          <h1 className="font-display text-[clamp(4rem,13vw,12rem)] font-semibold uppercase leading-[0.82] tracking-[-0.06em] text-foreground">
            {nameLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] pt-[0.04em]">
                <motion.span className="block will-change-transform" variants={lineReveal}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="max-w-[52ch] text-base leading-relaxed text-muted md:text-lg"
          >
            {site.heroDescription}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-2">
            <MagneticButton className="w-fit">
              <Button onClick={openShowreel} data-cursor="view">
                <Play aria-hidden="true" className="h-4 w-4" />
                Watch Showreel
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground">
              {site.selectedWorkLabel}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{site.heroMeta}</p>
          </motion.div>
        </motion.div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-4 md:flex"
      >
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em] text-muted [writing-mode:vertical-rl]">
          {site.scrollHint}
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 block h-6 w-px bg-accent"
            animate={prefersReducedMotion ? undefined : { y: [-28, 66] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
          />
        </span>
      </div>

      {showreelMounted && (
        <Suspense fallback={null}>
          <ShowreelModal open={showreelOpen} onClose={() => setShowreelOpen(false)} />
        </Suspense>
      )}
    </section>
  );
}

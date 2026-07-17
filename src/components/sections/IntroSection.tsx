import { FadeUp } from "@/components/motion/FadeUp";
import { RevealText } from "@/components/motion/RevealText";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function IntroSection() {
  return (
    <section id="trabajos" className="py-section">
      <Container className="flex flex-col gap-10">
        <FadeUp>
          <SectionLabel>Trabajos seleccionados</SectionLabel>
        </FadeUp>

        <RevealText
          as="h2"
          text="Selección de proyectos que representan mi forma de contar historias."
          className="max-w-6xl font-display text-[clamp(2.75rem,8vw,8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-foreground"
        />

        <FadeUp delay={0.15} className="flex justify-end">
          <p className="shrink-0 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Videoclips · Contenido de marca · Publicidades
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}

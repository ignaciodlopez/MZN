import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { metrics } from "@/data/metrics";

export function MetricsSection() {
  return (
    <section
      aria-label="Métricas profesionales"
      className="border-t border-line bg-background-soft py-section"
    >
      <Container className="flex flex-col gap-12">
        <FadeUp>
          <SectionLabel>Números</SectionLabel>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="max-w-[65ch] text-base leading-relaxed text-muted">
            He trabajado junto a artistas, marcas, instituciones y equipos creativos
            desarrollando videoclips, campañas publicitarias y contenidos audiovisuales.
          </p>
        </FadeUp>

        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {metrics.map((metric, index) => (
            <FadeUp
              key={metric.id}
              delay={index * 0.08}
              className="flex flex-col gap-4 border-l border-line pl-6"
            >
              <dd className="order-1 font-display text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-none tracking-tight text-foreground">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </dd>
              <dt className="order-2 text-xs font-medium uppercase tracking-[0.25em] text-muted">
                {metric.label}
              </dt>
            </FadeUp>
          ))}
        </dl>
      </Container>
    </section>
  );
}

import { FadeUp } from "@/components/motion/FadeUp";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="servicios" className="py-section">
      <Container>
        <FadeUp>
          <SectionLabel>Servicios</SectionLabel>
        </FadeUp>

        <ul className="mt-16">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <li key={service.id} className="group border-t border-line last:border-b">
                <FadeUp distance={24}>
                  <div className="grid gap-3 py-7 transition-transform duration-500 ease-cinematic md:grid-cols-12 md:items-baseline md:gap-6 lg:group-hover:translate-x-3">
                    <span
                      aria-hidden="true"
                      className="text-xs tabular-nums text-muted transition-colors duration-300 group-hover:text-accent md:col-span-1"
                    >
                      {service.index}
                    </span>

                    <h3 className="flex items-center gap-4 font-display text-2xl font-semibold uppercase tracking-tight text-foreground transition-colors duration-300 md:col-span-5 md:text-3xl">
                      {service.name}
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                    </h3>

                    <p className="max-w-[60ch] text-sm leading-relaxed text-muted md:col-span-6">
                      {service.description}
                    </p>
                  </div>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

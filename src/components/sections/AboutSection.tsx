import { FadeUp } from "@/components/motion/FadeUp";
import { RevealText } from "@/components/motion/RevealText";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

const professionalDetails = [
  { label: "Base", value: "Rosario, Argentina" },
  { label: "Focus", value: "Dirección · Edición · Narrativa visual" },
  {
    label: "Selected Clients / Services",
    value:
      "Built for artists, agencies, and brands looking for images that feel authored rather than assembled.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre-mi" className="border-t border-line py-section">
      <Container>
        <FadeUp>
          <SectionLabel>Sobre mí</SectionLabel>
        </FadeUp>

        <RevealText
          as="h2"
          text="Cada proyecto merece encontrar su propio lenguaje visual."
          className="mt-10 max-w-5xl font-display text-[clamp(2.75rem,8vw,8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-foreground"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-10 md:col-span-8 lg:col-span-7">
            <FadeUp className="flex max-w-[65ch] flex-col gap-6 text-base leading-relaxed text-muted">
              <p>
                Soy Cristian Marzano, director audiovisual de Rosario, Argentina. Desde hace más
                de siete años dirijo videoclips, comerciales y piezas publicitarias con una
                mirada cinematográfica, buscando que cada proyecto tenga una identidad visual
                propia.
              </p>
              <p>
                Mi trabajo comienza mucho antes del rodaje: en la búsqueda de una idea, un ritmo
                y una forma de contar que acompañen la esencia de cada historia. Creo que la
                dirección no consiste en imponer un estilo, sino en descubrir el lenguaje visual
                que mejor representa a cada proyecto.
              </p>
              <p>
                A lo largo de mi carrera dirigí más de 600 producciones audiovisuales junto a
                artistas, marcas y equipos creativos, combinando dirección, edición y narrativa
                para construir imágenes que permanezcan en la memoria.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="md:col-span-4 md:col-start-9 lg:col-span-4">
            <dl>
              {professionalDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col gap-2 border-t border-line py-5 last:border-b"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
                    {detail.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-foreground">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

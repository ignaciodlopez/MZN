import { lazy, Suspense, useState } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FadeUp } from "@/components/motion/FadeUp";
import { RevealText } from "@/components/motion/RevealText";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { galleryImages } from "@/data/gallery";

const ImageLightbox = lazy(() => import("@/components/gallery/ImageLightbox"));

export function PhotographySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="fotografia" className="border-t border-line py-section">
      <Container className="flex flex-col gap-10">
        <FadeUp>
          <SectionLabel>Fotos Live Shows</SectionLabel>
        </FadeUp>

        <RevealText
          as="h2"
          text="La energía de un escenario, cuadro a cuadro."
          className="max-w-6xl font-display text-[clamp(2.75rem,8vw,8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-foreground"
        />

        <FadeUp delay={0.15} className="flex justify-end">
          <p className="shrink-0 text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Conciertos · Eventos · Artistas
          </p>
        </FadeUp>

        <GalleryGrid images={galleryImages} onSelect={setLightboxIndex} />
      </Container>

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <ImageLightbox
            images={galleryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        </Suspense>
      )}
    </section>
  );
}

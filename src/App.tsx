import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageLoader } from "@/components/layout/PageLoader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { PhotographySection } from "@/components/sections/PhotographySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { buildJsonLd } from "@/lib/seo";
import { isEnabled } from "@/lib/utils";

const LOADER_STORAGE_KEY = "portfolio-loader-seen";

function loaderAlreadySeen(): boolean {
  try {
    return window.sessionStorage.getItem(LOADER_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export default function App() {
  const loaderEnabled = isEnabled(import.meta.env.VITE_ENABLE_PAGE_LOADER);
  const [loading, setLoading] = useState(() => loaderEnabled && !loaderAlreadySeen());

  const finishLoader = useCallback(() => {
    try {
      window.sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
    } catch {
      // Sin sessionStorage el loader simplemente se muestra en cada visita.
    }
    setLoading(false);
  }, []);

  return (
    <SmoothScrollProvider>
      {/* JSON-LD controlado por la aplicación; no proviene de entradas del usuario. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd() }} />

      <AnimatePresence>{loading && <PageLoader onComplete={finishLoader} />}</AnimatePresence>

      <SkipLink />
      <CustomCursor />
      <Header />

      <main id="contenido">
        <HeroSection />
        <IntroSection />
        <ProjectsSection />
        <PhotographySection />
        <AboutSection />
        <MetricsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}

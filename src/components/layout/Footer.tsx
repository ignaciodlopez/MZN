import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-background-soft">
      <Container className="flex flex-col gap-12 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              {site.name}
            </p>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted">
              Dirección audiovisual, edición y fotografía. {site.location}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex min-h-11 items-center text-sm text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Navegación del pie de página" className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">Secciones</p>
            <ul className="mt-4 flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <AnimatedLink href={item.href} className="text-sm">
                    {item.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">Redes</p>
            <ul className="mt-4 flex flex-col gap-1">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start md:col-span-1 md:justify-end">
            <MagneticButton>
              <button
                type="button"
                onClick={() => scrollTo("#inicio")}
                className="flex h-12 w-12 items-center justify-center border border-line-strong text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <ArrowUp aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">Volver arriba</span>
              </button>
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p>Sitio estático — construido con React, Vite y Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}

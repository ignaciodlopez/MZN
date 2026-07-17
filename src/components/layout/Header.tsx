import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["inicio", "trabajos", "fotografia", "sobre-mi", "servicios", "contacto"];

export function Header() {
  const { direction, scrolled } = useScrollDirection();
  const { scrollTo } = useSmoothScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#inicio");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const hidden = direction === "down" && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-[transform,background-color,border-color] duration-500 ease-cinematic",
          hidden && "-translate-y-full",
          scrolled
            ? "border-b border-line bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
          <a
            href="#inicio"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("#inicio");
            }}
            className="flex min-h-11 items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {site.name}
            <span className="hidden text-[0.65rem] font-normal tracking-[0.25em] text-muted sm:inline">
              — {site.location}
            </span>
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <AnimatedLink
                key={item.href}
                href={item.href}
                active={activeSection === item.href}
                className="text-xs font-medium uppercase tracking-[0.22em]"
              >
                {item.label}
              </AnimatedLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="flex min-h-11 min-w-11 items-center justify-center text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
            <span className="sr-only">Abrir menú de navegación</span>
          </button>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cinematicEase, menuOverlay, staggerContainer } from "@/lib/animations";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  useBodyScrollLock(open);
  useFocusTrap(containerRef, open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onClose();
    window.setTimeout(() => scrollTo(href), 320);
  };

  const overlayVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : menuOverlay;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-background"
        >
          <div className="mx-auto flex h-16 w-[min(calc(100%-2rem),1600px)] items-center justify-between md:h-20">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              {site.name}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-11 min-w-11 items-center justify-center text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <X aria-hidden="true" className="h-6 w-6" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>

          <nav
            aria-label="Navegación principal"
            className="flex flex-1 items-center px-4 py-10 sm:px-8"
          >
            <motion.ul
              variants={staggerContainer(0.07, 0.15)}
              initial={prefersReducedMotion ? "visible" : "hidden"}
              animate="visible"
              className="flex w-full flex-col gap-2"
            >
              {navigation.map((item, index) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: cinematicEase },
                    },
                  }}
                  className="border-b border-line"
                >
                  <a
                    href={item.href}
                    onClick={(event) => handleNavigate(event, item.href)}
                    className="group flex items-baseline gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="text-xs tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2.25rem,9vw,4rem)] font-bold uppercase leading-none tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className="flex flex-col gap-4 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 md:flex-row md:items-center md:justify-between">
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {site.email}
            </a>
            <ul className="flex gap-6">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

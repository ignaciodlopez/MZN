import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { withBasePath } from "@/lib/paths";
import type { GalleryImage } from "@/types/gallery";

interface ImageLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const image = images[index];

  const goPrevious = () => onNavigate((index - 1 + images.length) % images.length);
  const goNext = () => onNavigate((index + 1) % images.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") onNavigate((index + 1) % images.length);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, images.length, onNavigate]);

  if (!image) return null;

  const controlClasses =
    "flex min-h-11 min-w-11 items-center justify-center text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  return (
    <Modal
      open
      onClose={onClose}
      label={`Fotografía ampliada, ${index + 1} de ${images.length}`}
      panelClassName="flex h-[100dvh] max-h-[100dvh] w-full max-w-none flex-col p-0 md:h-auto md:max-h-[90vh]"
    >
      <div className="flex items-center justify-between px-2 pb-4 pt-[max(0.5rem,env(safe-area-inset-top))]">
        <p className="text-xs tabular-nums tracking-[0.3em] text-muted" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
        <button type="button" onClick={onClose} className={controlClasses}>
          <X aria-hidden="true" className="h-6 w-6" />
          <span className="sr-only">Cerrar galería</span>
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
          touchStartX.current = null;
          if (deltaX > 48) goPrevious();
          if (deltaX < -48) goNext();
        }}
      >
        <img
          key={image.id}
          src={withBasePath(image.src)}
          width={image.width}
          height={image.height}
          alt={image.alt}
          decoding="async"
          className="max-h-[62vh] w-auto max-w-full object-contain md:max-h-[68vh]"
        />
      </div>

      <div className="flex items-end justify-between gap-4 px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <div aria-live="polite" className="min-w-0 text-sm">
          <p className="truncate font-medium text-foreground">{image.artist}</p>
          <p className="truncate text-xs text-muted">
            {image.event ? `${image.event} · ` : ""}
            {image.category} · {image.year}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={goPrevious} className={controlClasses}>
            <ChevronLeft aria-hidden="true" className="h-6 w-6" />
            <span className="sr-only">Fotografía anterior</span>
          </button>
          <button type="button" onClick={goNext} className={controlClasses}>
            <ChevronRight aria-hidden="true" className="h-6 w-6" />
            <span className="sr-only">Fotografía siguiente</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

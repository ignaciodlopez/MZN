import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types/gallery";

interface GalleryItemProps {
  image: GalleryImage;
  onSelect: () => void;
}

export function GalleryItem({ image, onSelect }: GalleryItemProps) {
  const wide = image.gridClass?.includes("col-span-2") ?? false;

  return (
    <button
      type="button"
      onClick={onSelect}
      data-cursor="view"
      aria-label={`Ampliar fotografía: ${image.alt}`}
      className={cn(
        "group relative block w-full overflow-hidden bg-surface text-left",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        wide ? "aspect-[3/2]" : "aspect-[3/4]",
      )}
    >
      <img
        src={withBasePath(image.thumbnail ?? image.src)}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.05]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex items-baseline justify-between bg-gradient-to-t from-black/75 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-cinematic group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
          {image.artist}
        </span>
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          {image.category}
        </span>
      </span>
    </button>
  );
}

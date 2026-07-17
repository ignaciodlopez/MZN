import { FadeUp } from "@/components/motion/FadeUp";
import { GalleryItem } from "@/components/gallery/GalleryItem";
import type { GalleryImage } from "@/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
  onSelect: (index: number) => void;
}

export function GalleryGrid({ images, onSelect }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
      {images.map((image, index) => (
        <FadeUp
          key={image.id}
          delay={(index % 4) * 0.06}
          distance={24}
          className={image.gridClass}
        >
          <GalleryItem image={image} onSelect={() => onSelect(index)} />
        </FadeUp>
      ))}
    </div>
  );
}

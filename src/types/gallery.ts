export interface GalleryImage {
  id: string;
  src: string;
  thumbnail?: string;
  alt: string;
  artist: string;
  event?: string;
  category: string;
  year: number;
  width: number;
  height: number;
  gridClass?: string;
}

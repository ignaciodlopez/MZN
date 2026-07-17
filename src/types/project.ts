export type ProjectAspectRatio = "16:9" | "9:16" | "2.39:1" | "4:3" | "1:1";

export type ProjectMediaType = "image" | "video";

export interface Project {
  id: string;
  index: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  client?: string;
  production?: string;
  roles: string[];
  year: number;
  aspectRatio: ProjectAspectRatio;
  mediaType: ProjectMediaType;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  mobileThumbnail?: string;
  videoUrl?: string;
  poster?: string;
  externalUrl?: string;
  metadata: string[];
  featured?: boolean;
}

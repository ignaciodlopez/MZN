import type { Project } from "@/types/project";

// Trabajos seleccionados. Para mostrar un preview de video en escritorio:
// mediaType "video" + videoUrl apuntando a un MP4 dentro de public/videos/projects/.
export const projects: Project[] = [
  {
    id: "la-similitud",
    index: "01",
    slug: "la-similitud",
    title: "La Similitud",
    category: "Videoclip",
    description:
      "A nocturnal performance film built around negative space, movement, and emotional restraint.",
    production: "Producción x MZN Audiovisual",
    roles: ["Dirección", "Edición", "Visual treatment"],
    year: 2026,
    aspectRatio: "2.39:1",
    mediaType: "image",
    thumbnail: "images/projects/project-01.png",
    thumbnailWidth: 2048,
    thumbnailHeight: 1152,
    poster: "images/projects/project-01.png",
    metadata: ["2.39:1", "Night exterior", "35mm reference"],
    featured: true,
  },
  {
    id: "tini-stoessel",
    index: "02",
    slug: "tini-stoessel",
    title: "Tini Stoessel",
    category: "Show",
    description:
      "Edición de alto impacto con un ritmo intenso, transiciones precisas y una narrativa visual diseñada para potenciar la energía del espectáculo.",
    production: "Producción x Grupo Creativo",
    roles: ["Editor", "Post supervision"],
    year: 2026,
    aspectRatio: "16:9",
    mediaType: "image",
    thumbnail: "images/projects/project-02.jpg",
    thumbnailWidth: 1376,
    thumbnailHeight: 768,
    poster: "images/projects/project-02.jpg",
    metadata: ["16:9", "Kinetic edit", "Live show"],
  },
  {
    id: "b10b-v3",
    index: "03",
    slug: "b10b-v3",
    title: "b10b_v3",
    category: "Contenido de marca",
    description:
      "A visual essay where brand presence stays secondary to gesture, place, and character.",
    roles: ["Concept", "Direction", "Editorial rhythm"],
    year: 2026,
    aspectRatio: "9:16",
    mediaType: "image",
    thumbnail: "images/projects/project-02.jpg",
    thumbnailWidth: 1376,
    thumbnailHeight: 768,
    poster: "images/projects/project-02.jpg",
    metadata: ["9:16", "Aftermovie", "Brand portrait"],
  },
];

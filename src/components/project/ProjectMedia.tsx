import { VideoPreview } from "@/components/project/VideoPreview";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import type { Project, ProjectAspectRatio } from "@/types/project";

const ratioClasses: Record<ProjectAspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "2.39:1": "aspect-[2.39/1]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

interface ProjectMediaProps {
  project: Project;
  className?: string;
}

export function ProjectMedia({ project, className }: ProjectMediaProps) {
  const showVideo = project.mediaType === "video" && project.videoUrl;

  return (
    <figure
      data-cursor="view"
      className={cn(
        "group relative overflow-hidden bg-surface",
        ratioClasses[project.aspectRatio],
        className,
      )}
    >
      <ParallaxMedia amount={4} className="h-full w-full">
        {showVideo ? (
          <VideoPreview
            src={withBasePath(project.videoUrl ?? "")}
            poster={project.poster ? withBasePath(project.poster) : undefined}
            className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
          />
        ) : (
          <img
            src={withBasePath(project.thumbnail)}
            width={project.thumbnailWidth}
            height={project.thumbnailHeight}
            alt={`${project.title} — ${project.category}, ${project.year}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
          />
        )}
      </ParallaxMedia>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-cinematic group-hover:opacity-100 group-focus-within:opacity-100">
        <span className="translate-y-2 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-transform duration-500 ease-cinematic group-hover:translate-y-0">
          Ver proyecto
        </span>
        <span className="text-xs tabular-nums text-muted">{project.year}</span>
      </figcaption>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-cinematic group-hover:scale-x-100"
      />
    </figure>
  );
}

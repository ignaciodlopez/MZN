import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { ProjectMetadata } from "@/components/project/ProjectMetadata";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  flip: boolean;
}

function ProjectHeading({ project }: { project: Project }) {
  const title = (
    <h3
      className={cn(
        "font-display font-bold uppercase leading-[0.95] tracking-tight text-foreground",
        project.featured
          ? "text-[clamp(2.5rem,6vw,5.5rem)]"
          : "text-[clamp(2rem,4.5vw,4rem)]",
      )}
    >
      {project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-start gap-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {project.title}
          <ArrowUpRight aria-hidden="true" className="mt-2 h-6 w-6 shrink-0" />
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      ) : (
        project.title
      )}
    </h3>
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-baseline gap-4 text-xs font-medium uppercase tracking-[0.25em] text-muted">
        <span aria-hidden="true" className="tabular-nums text-accent">
          {project.index}
        </span>
        {project.category}
      </p>
      {title}
    </div>
  );
}

export function ProjectCard({ project, flip }: ProjectCardProps) {
  const isPanorama = project.aspectRatio === "2.39:1";
  const isVertical = project.aspectRatio === "9:16";

  if (isPanorama) {
    return (
      <article className="border-t border-line py-14 md:py-24">
        <FadeUp>
          <ProjectMedia project={project} />
        </FadeUp>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <FadeUp className="md:col-span-5">
            <ProjectHeading project={project} />
          </FadeUp>
          <FadeUp delay={0.1} className="md:col-span-4">
            <p className="max-w-[55ch] text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="md:col-span-3">
            <ProjectMetadata project={project} />
          </FadeUp>
        </div>
      </article>
    );
  }

  return (
    <article className="border-t border-line py-14 md:py-24">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
        <FadeUp
          className={cn(
            isVertical ? "md:col-span-5 lg:col-span-4" : "md:col-span-7",
            flip ? "md:order-2" : "md:order-1",
          )}
        >
          <ProjectMedia project={project} className={cn(isVertical && "mx-auto max-w-md")} />
        </FadeUp>

        <div
          className={cn(
            "flex flex-col gap-8",
            isVertical ? "md:col-span-7 lg:col-span-7 lg:col-start-6" : "md:col-span-5",
            flip ? "md:order-1" : "md:order-2",
          )}
        >
          <FadeUp delay={0.1}>
            <ProjectHeading project={project} />
          </FadeUp>
          <FadeUp delay={0.18}>
            <p className="max-w-[55ch] text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </FadeUp>
          <FadeUp delay={0.26}>
            <ProjectMetadata project={project} />
          </FadeUp>
        </div>
      </div>
    </article>
  );
}

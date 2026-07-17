import type { Project } from "@/types/project";

export function ProjectMetadata({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
        {project.client && (
          <div>
            <dt className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
              Cliente
            </dt>
            <dd className="mt-1 text-foreground">{project.client}</dd>
          </div>
        )}
        {project.production && (
          <div>
            <dt className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
              Producción
            </dt>
            <dd className="mt-1 text-foreground">{project.production}</dd>
          </div>
        )}
        <div>
          <dt className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
            Roles
          </dt>
          <dd className="mt-1 text-foreground">{project.roles.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
            Año
          </dt>
          <dd className="mt-1 tabular-nums text-foreground">{project.year}</dd>
        </div>
      </dl>

      {project.metadata.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.metadata.map((item) => (
            <li
              key={item}
              className="border border-line px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

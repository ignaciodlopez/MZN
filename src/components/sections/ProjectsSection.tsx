import { ProjectCard } from "@/components/project/ProjectCard";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section aria-label="Listado de proyectos" className="pb-section">
      <Container>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} flip={index % 2 === 1} />
        ))}
      </Container>
    </section>
  );
}

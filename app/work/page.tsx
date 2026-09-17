import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export const metadata = { title: "Work — Bobby Liu" };

export default function WorkPage() {
  return (
    <main>
      <Header />
      <section className="page-intro">
        <p className="eyebrow">Work</p>
        <h1>Learning through practice.</h1>
        <p>
          These projects started with a question: can I automate this, secure it,
          or understand it more deeply? Each write-up covers the goal, the
          implementation, and what I would improve next.
        </p>
      </section>
      <section className="section compact">
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              index={String(index + 1).padStart(2, "0")}
              title={project.title}
              description={project.summary}
              tags={[...project.tags]}
              href={`/work/${project.slug}`}
              headingLevel="h2"
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

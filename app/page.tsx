import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { notes, projects } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Cybersecurity · Python · Linux</p>
        <h1 id="hero-title">
          I learn by building, testing, and <span>breaking things.</span>
        </h1>
        <p className="hero-copy">
          I’m Bobby Liu. This is a collection of security research, software
          projects, and technical notes from the systems I’m learning.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/work">Explore my work <span aria-hidden="true">→</span></Link>
          <Link className="text-link" href="/about">More about me</Link>
        </div>
      </section>

      <section className="section notes-preview" aria-labelledby="notes-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Security notebook</p>
            <h2 id="notes-title">Concepts, clarified</h2>
            <p className="section-copy">Working notes on the frameworks and vocabulary used in security.</p>
          </div>
          <Link className="text-link" href="/notes">Browse the notebook →</Link>
        </div>
        <div className="simple-list">
          {notes.map((note, index) => (
            <Link key={note.slug} href={`/notes/${note.slug}`}>
              <span className="list-index">{String(index + 1).padStart(2, "0")}</span>
              <span>{note.title}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Projects in practice</h2>
            <p className="section-copy">Tools and experiments built to turn technical concepts into working systems.</p>
          </div>
          <Link className="text-link" href="/work">View all projects →</Link>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              index={String(index + 1).padStart(2, "0")}
              title={project.title}
              description={project.summary}
              tags={[...project.tags]}
              href={`/work/${project.slug}`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

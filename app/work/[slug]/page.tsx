import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MediaGallery } from "@/components/MediaGallery";
import { projectDetails, projectMedia, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return { title: project ? `${project.title} — Bobby Liu` : "Project — Bobby Liu" };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const details = projectDetails[project.slug] ?? [];
  const media = projectMedia[project.slug] ?? project.media;

  return (
    <main>
      <Header />
      <article className="detail">
        <Link className="back-link" href="/work">← All projects</Link>
        <p className="eyebrow">Project case study</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>

        <div className="detail-grid">
          <div>
            <h2>Project brief</h2>
            <p>{project.purpose}</p>
          </div>
          <div>
            <h2>Core improvements</h2>
            <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <div className="article-sections">
          {details.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.code && <pre><code>{section.code}</code></pre>}
            </section>
          ))}
        </div>

        {media.length > 0 && (
          <MediaGallery
            items={media}
            heading="Project demos"
            columns={project.slug === "automatic-sudoku-solver" ? 3 : 2}
          />
        )}

        <div className="detail-actions">
          <a className="button" href={project.github} target="_blank" rel="noreferrer">View the code ↗</a>
        </div>
      </article>
      <Footer />
    </main>
  );
}

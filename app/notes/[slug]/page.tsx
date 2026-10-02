import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AiLearningGuide } from "@/components/AiLearningGuide";
import { MediaGallery } from "@/components/MediaGallery";
import { aiGuideTopics, noteDetails, notes } from "@/lib/content";

export function generateStaticParams() {
  return notes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);

  return { title: note ? `${note.title} — Bobby Liu` : "Note — Bobby Liu" };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  if (!note) notFound();

  const details = noteDetails[note.slug] ?? [];

  return (
    <main>
      <Header />
      <article className="detail note-detail">
        <Link className="back-link" href="/notes">← Security notebook</Link>
        <p className="eyebrow">Reference note</p>
        <h1>{note.title}</h1>
        <p className="lead">{note.summary}</p>

        {note.slug === "basics-of-ai" ? (
          <AiLearningGuide topics={aiGuideTopics} />
        ) : (
          <>
            <div className="article-sections">
              {details.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                </section>
              ))}
            </div>

            <MediaGallery items={note.media} heading="Visual reference" />
          </>
        )}

      </article>
      <Footer />
    </main>
  );
}

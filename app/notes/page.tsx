import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { notes } from "@/lib/content";

export const metadata = { title: "Notes — Bobby Liu" };

export default function NotesPage() {
  return (
    <main>
      <Header />
      <section className="page-intro">
        <p className="eyebrow">Security notebook</p>
        <h1>Making complex ideas usable.</h1>
        <p>
          Practical explanations of the frameworks, models, and vocabulary I
          return to while studying cybersecurity.
        </p>
      </section>
      <section className="section compact">
        <div className="note-cards">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`}>
              <h2>{note.title}</h2>
              <p>{note.summary}</p>
              <span>Read the note →</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

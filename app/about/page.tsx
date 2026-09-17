import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = { title: "About — Bobby Liu" };

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className="page-intro about-page">
        <p className="eyebrow">About</p>
        <h1>I’m Bobby. I like understanding how systems behave.</h1>
        <p>
          My interests sit where cybersecurity, Python, and systems meet.
          I learn best by building something useful, testing its limits, and
          documenting what the process taught me.
        </p>
        <p>
          This site is both a portfolio and a working notebook. It collects the
          tools I build, the security concepts I study, and the improvements I
          would make the next time around.
        </p>
        <div className="detail-actions">
          <a className="button" href="mailto:bobbyliu7@protonmail.com">Reach me at bobbyliu7@protonmail.com</a>
          <a className="text-link" href="https://github.com/SirBlob?tab=repositories" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="text-link" href="https://www.linkedin.com/in/bobby-liu/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}

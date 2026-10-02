"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./AiLearningGuide.module.css";

type GuideView = "general" | "technical";

type Diagram = {
  src: string;
  alt: string;
};

type Reference = {
  label: string;
  href: string;
};

export type AiGuideTopic = {
  title: string;
  summary: string;
  general: Diagram;
  technical: Diagram;
  references: readonly Reference[];
};

type AiLearningGuideProps = {
  topics: readonly AiGuideTopic[];
};

function topicId(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function AiLearningGuide({ topics }: AiLearningGuideProps) {
  const [view, setView] = useState<GuideView>("general");
  const [activeTopic, setActiveTopic] = useState(() => topicId(topics[0]?.title ?? ""));
  const [selected, setSelected] = useState<{ diagram: Diagram; title: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function updateActiveTopic() {
      const sections = topics
        .map((topic) => document.getElementById(topicId(topic.title)))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0 || sections.every((section) => section.getBoundingClientRect().top === 0)) {
        return;
      }

      const stickyBar = document.querySelector<HTMLElement>(`.${styles.stickySwitch}`);
      const readingLine = (stickyBar?.getBoundingClientRect().bottom ?? 140) + 24;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }

      setActiveTopic(current);
    }

    updateActiveTopic();
    window.addEventListener("scroll", updateActiveTopic, { passive: true });
    window.addEventListener("resize", updateActiveTopic);

    return () => {
      window.removeEventListener("scroll", updateActiveTopic);
      window.removeEventListener("resize", updateActiveTopic);
    };
  }, [topics]);

  function openDiagram(diagram: Diagram, title: string) {
    setSelected({ diagram, title });
    dialogRef.current?.showModal();
  }

  function keepImageClickFromClosing(event: MouseEvent<HTMLImageElement>) {
    event.stopPropagation();
  }

  return (
    <>
      <div className={styles.stickySwitch}>
        <div className={styles.levelControl}>
          <span>Reading level</span>
          <div className={styles.switcher} role="group" aria-label="Diagram detail level">
            <button type="button" aria-pressed={view === "general"} onClick={() => setView("general")}>
              General
            </button>
            <button type="button" aria-pressed={view === "technical"} onClick={() => setView("technical")}>
              Technical
            </button>
          </div>
        </div>
        <nav className={styles.contents} aria-label="AI guide contents">
          <span>On this page</span>
          <div>
            {topics.map((topic) => (
              <a
                className={activeTopic === topicId(topic.title) ? styles.activeContent : undefined}
                href={`#${topicId(topic.title)}`}
                key={topic.title}
                aria-current={activeTopic === topicId(topic.title) ? "location" : undefined}
                onClick={() => setActiveTopic(topicId(topic.title))}
              >
                {topic.title}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.topics}>
        {topics.map((topic) => {
          const diagram = topic[view];
          const label = view === "general" ? "Plain-language guide" : "Technical reference";

          return (
            <section className={styles.topic} id={topicId(topic.title)} key={topic.title}>
              <div className={styles.topicHeading}>
                <div>
                  <p className="eyebrow">{label}</p>
                  <h2>{topic.title}</h2>
                </div>
                <p>{topic.summary}</p>
              </div>
              <button
                className={styles.diagram}
                type="button"
                onClick={() => openDiagram(diagram, `${topic.title} — ${label}`)}
                aria-label={`Expand ${diagram.alt}`}
              >
                <Image src={diagram.src} alt={diagram.alt} width={1400} height={1800} unoptimized />
                <span aria-hidden="true">Expand ↗</span>
              </button>
              <div className={styles.references} aria-label={`${topic.title} references`}>
                <span>References</span>
                <div>
                  {topic.references.map((reference) => (
                    <a href={reference.href} key={reference.href} target="_blank" rel="noreferrer">
                      {reference.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-label={selected?.title ?? "Expanded AI reference diagram"}
        onClick={() => dialogRef.current?.close()}
      >
        {selected && (
          <div className={styles.viewer}>
            <button className={styles.close} type="button" onClick={() => dialogRef.current?.close()} aria-label="Close expanded diagram">
              Close ×
            </button>
            <Image
              src={selected.diagram.src}
              alt={selected.diagram.alt}
              width={1800}
              height={2200}
              unoptimized
              onClick={keepImageClickFromClosing}
            />
            <p>{selected.title}</p>
          </div>
        )}
      </dialog>
    </>
  );
}

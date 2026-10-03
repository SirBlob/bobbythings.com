"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AiGovernanceChecklist.module.css";

export type GovernanceControl = {
  setting: string;
  reason: string;
  status: "baseline" | "conditional";
  area: string;
};

export type GovernanceSection = {
  id: string;
  title: string;
  scope: string;
  controls: readonly GovernanceControl[];
  references: readonly { label: string; href: string }[];
};

type Props = {
  sections: readonly GovernanceSection[];
  reviewed: string;
};

export function AiGovernanceChecklist({ sections, reviewed }: Props) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateActiveSection() {
      const elements = sections
        .map((section) => document.getElementById(section.id))
        .filter((section): section is HTMLElement => section !== null);

      if (elements.length === 0 || elements.every((section) => section.getBoundingClientRect().top === 0)) return;

      const nav = document.querySelector<HTMLElement>(`.${styles.nav}`);
      const readingLine = (nav?.getBoundingClientRect().bottom ?? 140) + 24;
      let current = elements[0].id;

      for (const section of elements) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      }

      setActiveSection(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  useEffect(() => {
    const container = navItemsRef.current;
    const activeLink = container?.querySelector<HTMLElement>('a[aria-current="location"]');

    if (!container || !activeLink) return;

    const left = activeLink.offsetLeft - (container.clientWidth - activeLink.offsetWidth) / 2;
    const targetLeft = Math.max(0, left);

    if (typeof container.scrollTo === "function") {
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    } else {
      container.scrollLeft = targetLeft;
    }
  }, [activeSection]);

  return (
    <div className={styles.guide}>
      <aside className={styles.usage} aria-labelledby="how-to-use">
        <div>
          <p className="eyebrow">How to use this checklist</p>
          <h2 id="how-to-use">Start with a baseline, then document the decision.</h2>
        </div>
        <p>
          Adapt each control to the sensitivity of the data, the business purpose, and the protections included with the organization&apos;s product plan. Some controls require identity, device, or organizational policy rather than a single product setting.
        </p>
        <div className={styles.legend} aria-label="Control status legend">
          <span><b className={styles.baseline}>Baseline</b> Generally recommended</span>
          <span><b className={styles.conditional}>Conditional</b> Evaluate for the use case</span>
          <span><b className={styles.keep}>Keep enabled</b> Protective control</span>
        </div>
      </aside>

      <nav className={styles.nav} aria-label="Governance checklist sections">
        <span>On this page</span>
        <div ref={navItemsRef}>
          {sections.map((section) => (
            <a
              className={activeSection === section.id ? styles.active : undefined}
              href={`#${section.id}`}
              key={section.id}
              aria-current={activeSection === section.id ? "location" : undefined}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </a>
          ))}
        </div>
      </nav>

      <div className={styles.sections}>
        {sections.map((section) => (
          <section className={styles.section} id={section.id} key={section.id}>
            <header>
              <p className="eyebrow">Research area</p>
              <h2>{section.title}</h2>
              <p>{section.scope}</p>
            </header>

            <div className={styles.controls} role="list" aria-label={`${section.title} controls`}>
              {section.controls.map((control) => (
                <article className={styles.control} role="listitem" key={control.setting}>
                  <div className={styles.setting}>
                    <span className={styles.checkbox} aria-hidden="true" />
                    <div>
                      <div className={styles.controlMeta}>
                        <span className={control.status === "conditional" ? styles.conditional : styles.baseline}>
                          {control.status === "conditional" ? "Conditional" : "Baseline"}
                        </span>
                        <span>{control.area}</span>
                      </div>
                      <h3>{control.setting}</h3>
                    </div>
                  </div>
                  <p>{control.reason}</p>
                </article>
              ))}
            </div>

            <div className={styles.references}>
              <span>Official references</span>
              <div>
                {section.references.map((reference) => (
                  <a href={reference.href} key={reference.href} target="_blank" rel="noreferrer">{reference.label} ↗</a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className={styles.closing} aria-labelledby="keep-enabled">
        <p className="eyebrow">Protective controls</p>
        <h2 id="keep-enabled">Keep enabled</h2>
        <p>MFA, SSO, security audit logging, monitoring, data-loss prevention, and required compliance retention.</p>
      </section>

      <section className={styles.record} aria-labelledby="implementation-record">
        <div>
          <p className="eyebrow">Operational follow-through</p>
          <h2 id="implementation-record">Implementation record</h2>
          <p>Record who owns the control, where it is enforced, how it was verified, and when any approved exception expires.</p>
        </div>
        <div className={styles.recordFields} aria-label="Recommended implementation record fields">
          {['Owner', 'Enforcement location', 'Configuration evidence', 'Validation date', 'Exception expiry'].map((field) => <span key={field}>{field}</span>)}
        </div>
      </section>

      <footer className={styles.researchNote}>
        <p>This checklist reflects independent security analysis. It is a recommended baseline, not a vendor-prescribed standard or a universal set of switches.</p>
        <span>Last reviewed {reviewed}</span>
      </footer>
    </div>
  );
}

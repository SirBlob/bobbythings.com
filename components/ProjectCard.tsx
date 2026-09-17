import Link from "next/link";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ index, title, description, tags, href, headingLevel = "h3" }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <Link className={styles.card} href={href}>
      <div className={styles.topline}>
        <span>{index}</span>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
      <Heading className={styles.title}>{title}</Heading>
      <p>{description}</p>
      <ul aria-label="Technologies">
        {tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </Link>
  );
}

import Link from "next/link";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export function ProjectCard({ index, title, description, tags, href }: ProjectCardProps) {
  return (
    <Link className={styles.card} href={href}>
      <div className={styles.topline}>
        <span>{index}</span>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul aria-label="Technologies">
        {tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </Link>
  );
}

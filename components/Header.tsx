"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Notes", "/notes"],
  ["About", "/about"],
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link className={styles.mark} href="/" aria-label="Bobby Liu, home">
        Bobby Liu<span>.</span>
      </Link>
      <div className={styles.actions}>
        <nav aria-label="Primary navigation">
          <ul className={styles.navList}>
            {links.map(([label, href]) => {
              const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={label}>
                  <Link className={active ? styles.active : undefined} href={href} aria-current={active ? "page" : undefined}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

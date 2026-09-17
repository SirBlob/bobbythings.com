"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import styles from "./MediaGallery.module.css";

type MediaItem = {
  src: string;
  alt: string;
  caption: string;
};

type MediaGalleryProps = {
  items: readonly MediaItem[];
  heading: string;
  columns?: 2 | 3;
};

export function MediaGallery({ items, heading, columns = 2 }: MediaGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  function open(item: MediaItem) {
    setSelected(item);
    dialogRef.current?.showModal();
  }

  function handleExpandedImageClick(event: MouseEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    const bounds = image.getBoundingClientRect();
    const scale = Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
    const displayedWidth = image.naturalWidth * scale;
    const displayedHeight = image.naturalHeight * scale;
    const left = bounds.left + (bounds.width - displayedWidth) / 2;
    const top = bounds.top + (bounds.height - displayedHeight) / 2;
    const clickedImage = event.clientX >= left
      && event.clientX <= left + displayedWidth
      && event.clientY >= top
      && event.clientY <= top + displayedHeight;

    if (clickedImage) {
      event.stopPropagation();
    } else {
      dialogRef.current?.close();
    }
  }

  return (
    <section className={styles.section} aria-label={heading}>
      <div className={styles.headingRow}>
        <h2>{heading}</h2>
        <span>Click an image to expand</span>
      </div>

      <div className={`${styles.grid} ${columns === 3 ? styles.three : styles.two}`}>
        {items.map((item) => (
          <figure className={styles.card} key={item.src}>
            <button className={styles.thumbnail} type="button" onClick={() => open(item)} aria-label={`Expand ${item.caption}`}>
              <Image src={item.src} alt={item.alt} width={1200} height={900} unoptimized />
              <span aria-hidden="true">Expand ↗</span>
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        onClick={(event) => {
          const target = event.target;
          if (!(target instanceof Element) || !target.closest("img")) {
            event.currentTarget.close();
          }
        }}
      >
        {selected && (
          <div className={styles.viewer}>
            <button className={styles.close} type="button" onClick={() => dialogRef.current?.close()} aria-label="Close expanded image">
              Close ×
            </button>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1600}
              height={1200}
              unoptimized
              onClick={handleExpandedImageClick}
            />
            <p>{selected.caption}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}

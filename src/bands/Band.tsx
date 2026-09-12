import type { ReactNode } from "react";

/**
 * A band is one small-range grid with one editorial job. Bands stack; they do
 * not nest. This wrapper only adds the section landmark and a heading — the
 * grid inside it is the library's real API, used directly.
 */
export function Band({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section className="band" id={id} aria-labelledby={`${id}-title`}>
      <header className="band__header">
        <h2 id={`${id}-title`} className="band__title">{title}</h2>
        {note && <p className="band__note">{note}</p>}
      </header>
      {children}
    </section>
  );
}

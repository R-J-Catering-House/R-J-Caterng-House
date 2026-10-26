"use client";

import { useCallback, useEffect, useState } from "react";

type Photo = { key: string; title: string; image: string };

const api = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export default function GalleryGrid() {
  const [uploaded, setUploaded] = useState<Photo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${api}/api/v1/photos`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Array<{ id: number; title: string; image_url: string }>) =>
        setUploaded(data.map((item) => ({ key: `u-${item.id}`, title: item.title, image: item.image_url }))),
      )
      .catch(() => setUploaded([]))
      .finally(() => setLoaded(true));
  }, []);

  const photos = uploaded;

  const move = useCallback(
    (step: number) => setCurrent((index) => (index === null ? null : (index + step + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCurrent(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, move]);

  const active = current === null ? null : photos[current];

  if (loaded && photos.length === 0) {
    return <p className="py-16 text-center text-sm text-ink/55">Pronto compartiremos aquí fotos de nuestras celebraciones.</p>;
  }

  return (
    <>
      <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:grid-cols-3 lg:auto-rows-[16rem] lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.key}
            data-reveal
            style={{ transitionDelay: `${(index % 4) * 100}ms` }}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Ver ${photo.title}`}
            className={`group relative overflow-hidden bg-sage-olive ${index === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <img src={photo.image} alt={photo.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 p-4 opacity-0 transition duration-300 group-hover:bg-ink/45 group-hover:opacity-100 group-focus-visible:bg-ink/45 group-focus-visible:opacity-100">
              <span className="text-center font-display text-2xl text-white">{photo.title}</span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setCurrent(null)}>
          <button type="button" aria-label="Cerrar" onClick={() => setCurrent(null)} className="absolute right-5 top-5 text-4xl leading-none text-white/80 transition hover:text-white">×</button>
          <button type="button" aria-label="Anterior" onClick={(event) => { event.stopPropagation(); move(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 px-3 text-5xl leading-none text-white/70 transition hover:text-white sm:left-8">‹</button>
          <figure className="max-h-full max-w-5xl text-center" onClick={(event) => event.stopPropagation()}>
            <img src={active.image} alt={active.title} className="mx-auto max-h-[80vh] w-auto max-w-full object-contain" />
            <figcaption className="mt-4 font-display text-2xl text-white">{active.title}</figcaption>
            <p className="mt-1 text-xs tracking-widest text-white/50">{(current ?? 0) + 1} / {photos.length}</p>
          </figure>
          <button type="button" aria-label="Siguiente" onClick={(event) => { event.stopPropagation(); move(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 px-3 text-5xl leading-none text-white/70 transition hover:text-white sm:right-8">›</button>
        </div>
      )}
    </>
  );
}

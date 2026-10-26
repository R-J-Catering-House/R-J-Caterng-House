"use client";

import { FormEvent, useEffect, useState } from "react";
import SiteHeader from "@/components/marketing/SiteHeader";

type Review = { id: number; customer_name: string; rating: number; comment: string };
const api = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const STAR_GOLD = "#D4AF37";
const STAR_EMPTY = "#E4DDCB";

function Stars({ rating, size = "text-xl" }: { rating: number; size?: string }) {
  return (
    <span className={`${size} leading-none tracking-[0.15em]`} role="img" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} style={{ color: value <= rating ? STAR_GOLD : STAR_EMPTY }}>★</span>
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ customer_name: "", rating: 5, comment: "" });
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${api}/api/v1/reviews`).then((response) => response.ok ? response.json() : []).then(setReviews).catch(() => setReviews([]));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${api}/api/v1/reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setMessage(response.ok ? "Gracias por compartir tu experiencia. Tu reseña se publicará cuando sea aprobada." : "No fue posible enviar la reseña.");
    if (response.ok) setForm({ customer_name: "", rating: 5, comment: "" });
  }

  const average = reviews.length ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length : 0;
  const shown = hover || form.rating;

  return (
    <div>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-10">
        <header data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Comunidad R&J</p>
          <h1 className="mt-3 font-display text-5xl text-sage-olive sm:text-6xl">Historias reales</h1>
          <div className="luxury-divider mt-6" />
          <p className="mt-6 text-sm leading-7 text-ink/60">Las celebraciones se disfrutan más cuando se comparten. Lee las experiencias de otras familias y cuéntanos cómo fue la tuya.</p>
          {reviews.length > 0 && (
            <div className="mt-8 inline-flex flex-col items-center gap-2 rounded-xl border border-line bg-white px-10 py-5">
              <span className="font-display text-5xl font-semibold text-ink">{average.toFixed(1)}</span>
              <Stars rating={Math.round(average)} size="text-2xl" />
              <span className="text-xs uppercase tracking-[0.18em] text-ink/50">{reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}</span>
            </div>
          )}
        </header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
          <section className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} data-reveal>
              <article className="relative rounded-xl border border-line bg-white p-7 sm:p-8">
                <span aria-hidden="true" className="absolute right-6 top-2 font-display text-7xl leading-none text-line">&ldquo;</span>
                <Stars rating={review.rating} size="text-2xl" />
                <p className="mt-4 font-display text-xl leading-8 text-ink/80">{review.comment}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-olive font-display text-lg text-cream">{review.customer_name.charAt(0).toUpperCase()}</span>
                  <span className="text-sm font-semibold text-sage-olive">{review.customer_name}</span>
                </div>
              </article></div>
            ))}
            {reviews.length === 0 && (
              <p className="rounded-xl border border-line bg-white p-8 text-center text-sm text-ink/60">Sé la primera persona en compartir su experiencia.</p>
            )}
          </section>

          <form onSubmit={submit} data-reveal className="space-y-6 rounded-xl border border-line bg-white p-7 sm:p-8 lg:sticky lg:top-28">
            <div className="text-center">
              <p className="eyebrow">Tu experiencia</p>
              <h2 className="mt-2 font-display text-3xl text-sage-olive">Déjanos una reseña</h2>
            </div>

            <div className="text-center">
              <p className="field-label">Calificación</p>
              <div className="mt-3 flex items-center justify-center gap-1" role="radiogroup" aria-label="Calificación de 1 a 5 estrellas" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={form.rating === value}
                    aria-label={`${value} ${value === 1 ? "estrella" : "estrellas"}`}
                    onMouseEnter={() => setHover(value)}
                    onClick={() => setForm({ ...form, rating: value })}
                    className="p-1 text-4xl leading-none transition hover:scale-110"
                    style={{ color: value <= shown ? STAR_GOLD : STAR_EMPTY }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-ink/50">{["", "Mala", "Regular", "Buena", "Muy buena", "Excelente"][shown]}</p>
            </div>

            <label className="field-label block">Nombre
              <input required minLength={2} className="input-luxury" value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} />
            </label>
            <label className="field-label block">Mensaje
              <textarea required minLength={10} className="input-luxury min-h-32" value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} />
            </label>
            <button type="submit" className="w-full rounded-md border border-sage-olive bg-sage-olive px-5 py-3 text-sm font-semibold text-cream transition hover:bg-transparent hover:text-sage-olive">Enviar reseña</button>
            {message && <p className="text-center text-sm font-semibold text-sage-olive">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

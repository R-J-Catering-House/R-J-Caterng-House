"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import SiteHeader from "@/components/marketing/SiteHeader";

type Review = { id: number; customer_name: string; rating: number; comment: string };
const api = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ customer_name: "", rating: 5, comment: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${api}/api/v1/reviews`).then((response) => response.ok ? response.json() : []).then(setReviews).catch(() => setReviews([]));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`${api}/api/v1/reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setMessage(response.ok ? "Gracias por compartir tu experiencia. La reseña quedará pendiente de aprobación." : "No fue posible enviar la reseña.");
    if (response.ok) setForm({ customer_name: "", rating: 5, comment: "" });
  }

  return (
    <div className="space-y-12">
      <SiteHeader />
      <header className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Comunidad R&J</p><h1 className="mt-2 font-display text-5xl text-olive sm:text-6xl">Historias reales</h1></div>
        <Link href="/" className="text-sm font-bold text-olive hover:text-terracotta">Volver al inicio</Link>
      </header>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section><p className="max-w-2xl text-sm leading-7 text-ink/60">Las celebraciones se disfrutan más cuando se comparten. Lee las experiencias de otras familias y cuéntanos cómo fue la tuya.</p><div className="mt-7 space-y-4">{reviews.map((review) => <article key={review.id} className="rounded-2xl bg-white/75 p-6 shadow-sm ring-1 ring-ink/5"><div className="flex flex-wrap justify-between gap-4"><h2 className="font-display text-2xl text-olive">{review.customer_name}</h2><span className="text-terracotta">{"★".repeat(review.rating)}</span></div><p className="mt-3 text-sm leading-7 text-ink/65">{review.comment}</p></article>)}{reviews.length === 0 && <p className="rounded-2xl bg-sand/60 p-6 text-sm text-ink/60">Sé la primera persona en compartir su experiencia.</p>}</div></section>
        <form onSubmit={submit} className="h-fit space-y-5 rounded-2xl bg-white/80 p-6 shadow-md ring-1 ring-ink/5"><div><p className="eyebrow">Tu experiencia</p><h2 className="section-title">Déjanos una reseña</h2></div><label className="field-label block">Nombre<input required className="input-luxury" value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} /></label><label className="field-label block">Calificación<select className="input-luxury" value={form.rating} onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}><option value={5}>5 estrellas</option><option value={4}>4 estrellas</option><option value={3}>3 estrellas</option><option value={2}>2 estrellas</option><option value={1}>1 estrella</option></select></label><label className="field-label block">Mensaje<textarea required minLength={10} className="input-luxury min-h-32" value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} /></label><button type="submit" className="w-full rounded-xl bg-terracotta px-5 py-3 text-sm font-bold text-white transition hover:bg-terracotta/90">Enviar reseña</button>{message && <p className="text-sm font-bold text-olive">{message}</p>}</form>
      </div>
    </div>
  );
}

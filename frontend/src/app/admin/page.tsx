"use client";

import { ChangeEvent, useEffect, useState } from "react";

type Quote = { id: number; customer_name: string | null; customer_email: string | null; guests: number; package_id: number; total_amount: number; created_at: string };
type Review = { id: number; customer_name: string; rating: number; comment: string; approved: boolean };
type Photo = { id: number; title: string; image_url: string };

const api = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoData, setPhotoData] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const [quotesResponse, reviewsResponse, photosResponse] = await Promise.all([
      fetch(`${api}/api/v1/admin/quotes`, { credentials: "include" }),
      fetch(`${api}/api/v1/admin/reviews`, { credentials: "include" }),
      fetch(`${api}/api/v1/admin/photos`, { credentials: "include" }),
    ]);
    if (quotesResponse.ok) setQuotes(await quotesResponse.json());
    if (reviewsResponse.ok) setReviews(await reviewsResponse.json());
    if (photosResponse.ok) setPhotos(await photosResponse.json());
  }

  useEffect(() => { void load(); }, []);

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoData(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function uploadPhoto() {
    if (!photoTitle || !photoData) return;
    const response = await fetch(`${api}/api/v1/admin/photos`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: photoTitle, image_url: photoData }) });
    if (response.ok) {
      setPhotoTitle("");
      setPhotoData("");
      setMessage("La foto del evento quedó publicada en la galería.");
      void load();
    }
  }

  async function deletePhoto(id: number) {
    if (!window.confirm("¿Eliminar esta foto de la galería?")) return;
    const response = await fetch(`${api}/api/v1/admin/photos/${id}`, { method: "DELETE", credentials: "include" });
    if (response.ok) void load();
  }

  async function deleteReview(id: number) {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    const response = await fetch(`${api}/api/v1/admin/reviews/${id}`, { method: "DELETE", credentials: "include" });
    if (response.ok) void load();
  }

  async function approveReview(id: number) {
    const response = await fetch(`${api}/api/v1/admin/reviews/${id}/approve`, { method: "PUT", credentials: "include" });
    if (response.ok) void load();
  }

  return (
    <div className="space-y-8">
      <header className="max-w-3xl"><p className="eyebrow">Zona privada</p><h1 className="mt-2 font-display text-5xl text-olive sm:text-6xl">Reservas y comunidad</h1><p className="mt-3 text-sm leading-7 text-ink/60">Consulta cotizaciones, publica momentos de eventos y modera reseñas antes de mostrarlas.</p></header>
      {message && <p className="rounded-2xl bg-sage/20 p-4 text-sm font-bold text-sage-dark">{message}</p>}
      <section className="editorial-surface p-6 sm:p-8"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Agenda</p><h2 className="section-title">Cotizaciones recibidas</h2></div><span className="text-sm text-ink/50">{quotes.length} registros</span></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/45"><tr><th className="pb-3">Cliente</th><th className="pb-3">Invitados</th><th className="pb-3">Paquete</th><th className="pb-3">Total</th><th className="pb-3">Fecha</th></tr></thead><tbody>{quotes.map((quote) => <tr key={quote.id} className="border-b border-ink/5"><td className="py-4"><b className="block text-olive">{quote.customer_name || "Sin nombre"}</b><span className="text-xs text-ink/50">{quote.customer_email || "Sin correo"}</span></td><td className="py-4">{quote.guests}</td><td className="py-4">Menú #{quote.package_id}</td><td className="py-4 font-bold text-terracotta">₡{Number(quote.total_amount).toLocaleString("es-CR")}</td><td className="py-4 text-xs text-ink/50">{new Date(quote.created_at).toLocaleDateString("es-CR")}</td></tr>)}</tbody></table>{quotes.length === 0 && <p className="py-8 text-center text-sm text-ink/50">Todavía no hay cotizaciones guardadas.</p>}</div></section>
      <div className="grid gap-8 lg:grid-cols-2"><section className="editorial-surface p-6 sm:p-8"><p className="eyebrow">Galería privada</p><h2 className="section-title">Subir foto de evento</h2><div className="mt-5 space-y-4"><label className="field-label">Título<input className="input-luxury" value={photoTitle} onChange={(event) => setPhotoTitle(event.target.value)} /></label><label className="field-label">Imagen<input className="input-luxury" type="file" accept="image/*" onChange={selectPhoto} /></label>{photoData && <img src={photoData} alt="Vista previa" className="h-36 w-full rounded-xl object-cover" /> }<button type="button" onClick={uploadPhoto} className="editorial-button">Publicar foto</button></div><div className="mt-6 grid grid-cols-2 gap-3">{photos.map((photo) => <figure key={photo.id}><img src={photo.image_url} alt={photo.title} className="h-24 w-full rounded-lg object-cover" /><figcaption className="mt-1 flex items-center justify-between gap-2 text-xs text-ink/60"><span className="truncate">{photo.title}</span><button type="button" onClick={() => deletePhoto(photo.id)} className="shrink-0 font-bold text-red-700 hover:underline">Eliminar</button></figcaption></figure>)}</div></section><section className="editorial-surface p-6 sm:p-8"><p className="eyebrow">Voz de clientes</p><h2 className="section-title">Reseñas pendientes</h2><div className="mt-5 space-y-4">{reviews.map((review) => <article key={review.id} className="rounded-xl bg-cream p-4"><div className="flex justify-between gap-3"><b className="text-olive">{review.customer_name}</b><span className="text-terracotta">{"★".repeat(review.rating)}</span></div><p className="mt-2 text-sm leading-6 text-ink/65">{review.comment}</p>{!review.approved && <button type="button" onClick={() => approveReview(review.id)} className="mt-3 rounded-lg border border-olive px-3 py-2 text-xs font-bold text-olive">Aprobar reseña</button>}<button type="button" onClick={() => deleteReview(review.id)} className="ml-2 mt-3 rounded-lg border border-red-700/40 px-3 py-2 text-xs font-bold text-red-700">Eliminar</button></article>)}{reviews.length === 0 && <p className="text-sm text-ink/50">No hay reseñas pendientes.</p>}</div></section></div>
    </div>
  );
}

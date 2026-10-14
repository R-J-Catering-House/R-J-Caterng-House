"use client";

import { ChangeEvent, useEffect, useState } from "react";

type Quote = { id: number; customer_name: string | null; customer_email: string | null; guests: number; package_id: number; total_amount: number; created_at: string };
type Review = { id: number; customer_name: string; rating: number; comment: string; approved: boolean };
type Photo = { id: number; title: string; image_url: string };

const api = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function AdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoData, setPhotoData] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const token = localStorage.getItem("admin_token");
    const headers = { Authorization: `Bearer ${token}` };
    const [quotesResponse, reviewsResponse, photosResponse] = await Promise.all([
      fetch(`${api}/api/v1/admin/quotes`, { headers }),
      fetch(`${api}/api/v1/admin/reviews`, { headers }),
      fetch(`${api}/api/v1/admin/photos`, { headers }),
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
    const token = localStorage.getItem("admin_token");
    const response = await fetch(`${api}/api/v1/admin/photos`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ title: photoTitle, image_url: photoData }) });
    if (response.ok) {
      setPhotoTitle("");
      setPhotoData("");
      setMessage("La foto del evento quedó publicada en la galería.");
      void load();
    }
  }

  async function approveReview(id: number) {
    const token = localStorage.getItem("admin_token");
    const response = await fetch(`${api}/api/v1/admin/reviews/${id}/approve`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
    if (response.ok) void load();
  }

  return (
    <div className="space-y-8">
      <header><p className="eyebrow">Zona privada</p><h1 className="mt-2 font-display text-5xl text-emerald">Reservas y comunidad</h1><p className="mt-3 text-sm text-ink/60">Consulta cotizaciones, publica momentos de eventos y modera reseñas antes de mostrarlas.</p></header>
      {message && <p className="rounded-xl bg-gold/15 p-4 text-sm font-bold text-emerald">{message}</p>}
      <section className="rounded-2xl bg-white p-6 shadow-md"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Agenda</p><h2 className="section-title">Cotizaciones recibidas</h2></div><span className="text-sm text-ink/50">{quotes.length} registros</span></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/45"><tr><th className="pb-3">Cliente</th><th className="pb-3">Invitados</th><th className="pb-3">Paquete</th><th className="pb-3">Total</th><th className="pb-3">Fecha</th></tr></thead><tbody>{quotes.map((quote) => <tr key={quote.id} className="border-b border-ink/5"><td className="py-4"><b className="block text-emerald">{quote.customer_name || "Sin nombre"}</b><span className="text-xs text-ink/50">{quote.customer_email || "Sin correo"}</span></td><td className="py-4">{quote.guests}</td><td className="py-4">Menú #{quote.package_id}</td><td className="py-4 font-bold text-gold">₡{Number(quote.total_amount).toLocaleString("es-CR")}</td><td className="py-4 text-xs text-ink/50">{new Date(quote.created_at).toLocaleDateString("es-CR")}</td></tr>)}</tbody></table>{quotes.length === 0 && <p className="py-8 text-center text-sm text-ink/50">Todavía no hay cotizaciones guardadas.</p>}</div></section>
      <div className="grid gap-8 lg:grid-cols-2"><section className="rounded-2xl bg-white p-6 shadow-md"><p className="eyebrow">Galería privada</p><h2 className="section-title">Subir foto de evento</h2><div className="mt-5 space-y-4"><label className="field-label">Título<input className="input-luxury" value={photoTitle} onChange={(event) => setPhotoTitle(event.target.value)} /></label><label className="field-label">Imagen<input className="input-luxury" type="file" accept="image/*" onChange={selectPhoto} /></label>{photoData && <img src={photoData} alt="Vista previa" className="h-36 w-full rounded-xl object-cover" />}<button type="button" onClick={uploadPhoto} className="rounded-xl bg-emerald px-5 py-3 text-sm font-bold text-white">Publicar foto</button></div><div className="mt-6 grid grid-cols-2 gap-3">{photos.map((photo) => <figure key={photo.id}><img src={photo.image_url} alt={photo.title} className="h-24 w-full rounded-lg object-cover" /><figcaption className="mt-1 text-xs text-ink/60">{photo.title}</figcaption></figure>)}</div></section><section className="rounded-2xl bg-white p-6 shadow-md"><p className="eyebrow">Voz de clientes</p><h2 className="section-title">Reseñas pendientes</h2><div className="mt-5 space-y-4">{reviews.map((review) => <article key={review.id} className="rounded-xl bg-cream p-4"><div className="flex justify-between gap-3"><b className="text-emerald">{review.customer_name}</b><span className="text-gold">{"★".repeat(review.rating)}</span></div><p className="mt-2 text-sm leading-6 text-ink/65">{review.comment}</p>{!review.approved && <button type="button" onClick={() => approveReview(review.id)} className="mt-3 rounded-lg border border-emerald px-3 py-2 text-xs font-bold text-emerald">Aprobar reseña</button>}</article>)}{reviews.length === 0 && <p className="text-sm text-ink/50">No hay reseñas pendientes.</p>}</div></section></div>
    </div>
  );
}

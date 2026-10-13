"use client";

import { useEffect, useState } from "react";

type Package = { id: number; name: string; description: string; price_per_person: number };
type Addon = { id: number; name: string; price_type: string; price_value: number };
type Quote = { id: number; customer_name: string | null; customer_email: string | null; guests: number; total_amount: number; created_at: string };

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [gallery, setGallery] = useState<string[]>([
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=700&q=85",
  ]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = "Bearer ".concat(token);
    }
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

    Promise.all([
      fetch(`${base}/api/v1/admin/packages`, { headers }).then((r) => (r.ok ? r.json() : [])),
      fetch(`${base}/api/v1/admin/addons`, { headers }).then((r) => (r.ok ? r.json() : [])),
      fetch(`${base}/api/v1/admin/quotes`, { headers }).then((r) => (r.ok ? r.json() : [])),
    ]).then(([pkgData, addonData, quoteData]) => {
      setPackages(pkgData);
      setAddons(addonData);
      setQuotes(quoteData);
    });
  }, []);

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl bg-emerald p-6 text-white shadow-lg">
          <p className="eyebrow">Agenda de propietarias</p>
          <h1 className="mt-2 font-display text-3xl">Calendario de eventos</h1>
          <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs">
            {["L", "M", "M", "J", "V", "S", "D"].map((day) => <span key={day} className="text-white/50">{day}</span>)}
            {Array.from({ length: 21 }, (_, index) => <span key={index} className={`rounded-lg p-2 ${index === 12 ? "bg-gold font-bold text-white" : "bg-white/10 text-white/80"}`}>{index + 1}</span>)}
          </div>
          <p className="mt-4 text-xs text-white/60">Las cotizaciones en espera aparecerán aquí al conectarse con el backend.</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="eyebrow">Galería de eventos</p>
          <h2 className="mt-2 font-display text-2xl text-emerald">Fotos de referencia</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">{gallery.map((image) => <img key={image} src={image} alt="Evento R&J" className="h-28 w-full rounded-xl object-cover" />)}</div>
          <label className="mt-4 flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-emerald/30 p-4 text-center text-xs font-bold text-emerald">
            Subir foto a la galería
            <input type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setGallery((current) => [...current, URL.createObjectURL(file)]); }} />
          </label>
        </div>
      </div>
      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Catálogo (Paquetes)</h2>
        <ul className="space-y-2 text-sm">
          {packages.map((pkg) => (
            <li key={pkg.id} className="flex justify-between gap-3 border-b border-graphite-lightGray pb-2">
              <span>{pkg.name} - {pkg.description}</span>
              <span>₡{pkg.price_per_person.toLocaleString("es-CR")}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Extras</h2>
        <ul className="space-y-2 text-sm">
          {addons.map((addon) => (
            <li key={addon.id} className="flex justify-between gap-3 border-b border-graphite-lightGray pb-2">
              <span>{addon.name} ({addon.price_type})</span>
              <span>₡{addon.price_value.toLocaleString("es-CR")}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-xl font-semibold">Historial de Cotizaciones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Invitados</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td>{quote.id}</td>
                  <td>{quote.customer_name ?? "-"}</td>
                  <td>{quote.customer_email ?? "-"}</td>
                  <td>{quote.guests}</td>
                  <td>₡{quote.total_amount.toLocaleString("es-CR")}</td>
                  <td>{new Date(quote.created_at).toLocaleString("es-CR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

type Package = { id: number; name: string; description: string; price_per_person: number };
type Addon = { id: number; name: string; price_type: string; price_value: number };
type Quote = { id: number; customer_name: string | null; customer_email: string | null; guests: number; total_amount: number; created_at: string };

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

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

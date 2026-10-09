"use client";

import { useMemo, useState } from "react";

import type { Addons, QuoteRequest, QuoteResponse } from "@/types/quote";

const PACKAGE_OPTIONS = [
  { id: 1, label: "Paquete #1", price: 11000 },
  { id: 2, label: "Paquete #2", price: 12500 },
  { id: 3, label: "Paquete #3", price: 14000 },
  { id: 4, label: "Paquete #4", price: 12000 },
  { id: 5, label: "Paquete #5", price: 16500 },
];

const EXTRA_LABELS: Record<keyof Addons, string> = {
  entradas: "Entradas (+₡2.000 por invitado)",
  postres: "Mesa de postres (+₡85.000)",
  dj: "DJ (+₡200.000)",
  fotocabina: "Fotocabina (+₡85.000)",
};

const initialAddons: Addons = {
  entradas: false,
  postres: false,
  dj: false,
  fotocabina: false,
};

function formatCRC(value: number) {
  return new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }).format(value);
}

export default function CotizadorPage() {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(60);
  const [packageId, setPackageId] = useState(1);
  const [addons, setAddons] = useState<Addons>(initialAddons);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const payload: QuoteRequest = useMemo(
    () => ({
      customer_name: customerName || undefined,
      customer_email: customerEmail || undefined,
      guests,
      package_id: packageId,
      addons,
    }),
    [addons, customerEmail, customerName, guests, packageId],
  );

  async function recalculate() {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"}/api/v1/quotes/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: QuoteResponse = await response.json();
      setQuote(data);
    } finally {
      setLoading(false);
    }
  }

  async function sendPdf() {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"}/api/v1/quotes/send-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("Cotización enviada por correo (simulación).\nRevisa configuración SMTP en backend.");
  }

  const whatsappText = encodeURIComponent(
    `Hola, deseo reservar con R&J Catering House. Invitados: ${guests}. Paquete: #${packageId}. Extras: ${Object.entries(addons)
      .filter(([, selected]) => selected)
      .map(([name]) => name)
      .join(", ") || "ninguno"}. Total estimado: ${quote ? formatCRC(quote.total) : "por calcular"}.`,
  );

  return (
    <section className="grid gap-8 md:grid-cols-[1fr_360px]">
      <div className="space-y-6 rounded-lg bg-white p-6 shadow">
        <h1 className="text-3xl font-bold">Cotizador en línea</h1>

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Cantidad de invitados (60-150)</label>
            <input
              className="w-full rounded border border-graphite-lightGray px-3 py-2"
              type="number"
              min={60}
              max={150}
              value={guests}
              onChange={(event) => setGuests(Math.max(60, Math.min(150, Number(event.target.value))))}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium">Selecciona paquete base</p>
            <div className="grid gap-3">
              {PACKAGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`rounded border px-4 py-3 text-left ${packageId === option.id ? "border-graphite-mutedOlive bg-graphite-paleBeige" : "border-graphite-lightGray"}`}
                  onClick={() => setPackageId(option.id)}
                >
                  <p className="font-semibold">{option.label}</p>
                  <p className="text-sm text-graphite-grayBlue">{formatCRC(option.price)} por persona</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-medium">Selecciona extras</p>
            {(Object.keys(addons) as Array<keyof Addons>).map((addon) => (
              <label key={addon} className="flex items-center gap-3 rounded border border-graphite-lightGray px-3 py-2">
                <input
                  type="checkbox"
                  checked={addons[addon]}
                  onChange={(event) => setAddons((prev) => ({ ...prev, [addon]: event.target.checked }))}
                />
                <span>{EXTRA_LABELS[addon]}</span>
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              className="w-full rounded border border-graphite-lightGray px-3 py-2"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Nombre completo"
            />
            <label className="block text-sm font-medium">Correo electrónico</label>
            <input
              className="w-full rounded border border-graphite-lightGray px-3 py-2"
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            className="rounded border border-graphite-lightGray px-4 py-2"
            disabled={step === 1}
          >
            Anterior
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => Math.min(4, prev + 1))}
              className="rounded bg-graphite-mutedOlive px-4 py-2 text-white"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              onClick={recalculate}
              className="rounded bg-graphite-mutedOlive px-4 py-2 text-white"
              disabled={loading}
            >
              {loading ? "Calculando..." : "Calcular cotización"}
            </button>
          )}
        </div>
      </div>

      <aside className="space-y-4 rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Desglose en tiempo real</h2>
        {!quote && <p className="text-sm text-graphite-grayBlue">Completa el flujo y calcula para ver el total exacto.</p>}
        {quote && (
          <>
            <ul className="space-y-2 text-sm">
              {quote.breakdown.map((item) => (
                <li key={item.concept} className="flex justify-between gap-2">
                  <span>{item.concept}</span>
                  <span>{formatCRC(Number(item.amount))}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-graphite-lightGray pt-3">
              <p className="flex justify-between text-sm">
                <span>Extras</span>
                <span>{formatCRC(Number(quote.extras_total))}</span>
              </p>
              <p className="mt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCRC(Number(quote.total))}</span>
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://api.whatsapp.com/send?phone=50600000000&text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded bg-graphite-grayBlue px-4 py-2 text-center text-white"
              >
                Continuar por WhatsApp
              </a>
              <button
                type="button"
                onClick={sendPdf}
                disabled={!customerEmail}
                className="w-full rounded bg-graphite-palePink px-4 py-2 text-graphite-mutedOlive disabled:opacity-50"
              >
                Enviar cotización PDF al correo
              </button>
            </div>
          </>
        )}
      </aside>
    </section>
  );
}

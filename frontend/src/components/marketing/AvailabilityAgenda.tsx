"use client";

import { useEffect, useState } from "react";

type MonthStatus = { month: string; available: number; total: number };

const initialMonths: MonthStatus[] = [
  { month: "Enero 2026", available: 4, total: 8 },
  { month: "Febrero 2026", available: 2, total: 8 },
  { month: "Marzo 2026", available: 0, total: 8 },
  { month: "Abril 2026", available: 5, total: 8 },
  { month: "Mayo 2026", available: 3, total: 8 },
  { month: "Junio 2026", available: 6, total: 8 },
  { month: "Julio 2026", available: 7, total: 8 },
  { month: "Agosto 2026", available: 4, total: 8 },
  { month: "Septiembre 2026", available: 2, total: 8 },
  { month: "Octubre 2026", available: 5, total: 8 },
  { month: "Noviembre 2026", available: 1, total: 8 },
  { month: "Diciembre 2026", available: 0, total: 8 },
];

export default function AvailabilityAgenda() {
  const [months, setMonths] = useState<MonthStatus[]>(initialMonths);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000").replace(/^http/, "ws") + "/ws/availability";
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => { setConnected(true); setLoading(false); };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as { months?: MonthStatus[] };
      if (data.months) setMonths(data.months);
      setLoading(false);
    };
    socket.onerror = () => { setLoading(false); };
    socket.onclose = () => setConnected(false);
    return () => socket.close();
  }, []);

  return (
    <section id="reserva" className="mx-auto max-w-7xl rounded-3xl border border-burgundy/10 bg-white/70 p-6 shadow-sm sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Agenda en tiempo real</p>
          <h2 className="section-title">Disponibilidad 2026-2027</h2>
        </div>
        <span className="text-xs text-ink/45">{connected ? "● Actualizada en vivo" : "○ Conectando..."}</span>
      </div>
      {loading ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-2xl bg-burgundy/10" />)}</div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {months.map((item) => {
            const exhausted = item.available === 0;
            const few = item.available > 0 && item.available <= 2;
            return <article key={item.month} className="rounded-2xl border border-burgundy/10 bg-cream p-4">
              <div className="flex items-start justify-between gap-2"><h3 className="font-display text-xl text-burgundy">{item.month}</h3>{exhausted ? <span className="rounded-full bg-burgundy px-2 py-1 text-[9px] font-bold uppercase text-white">Agotado</span> : few ? <span className="rounded-full bg-burgundy px-2 py-1 text-[9px] font-bold uppercase text-white">Pocas fechas</span> : null}</div>
              <p className="mt-4 text-xs text-ink/55">{item.available ? `${item.available} de ${item.total} fechas disponibles` : "Sin disponibilidad"}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-burgundy/10"><div className="h-full rounded-full bg-burgundy" style={{ width: `${(item.available / item.total) * 100}%` }} /></div>
            </article>;
          })}
        </div>
      )}
    </section>
  );
}

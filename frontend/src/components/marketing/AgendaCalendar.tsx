"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { agendaYears, reservedDates } from "@/data/agenda";

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

const pad = (value: number) => String(value).padStart(2, "0");

function MonthGrid({ year, month, reserved, today }: { year: number; month: number; reserved: Set<string>; today: string }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];

  return (
    <article data-reveal style={{ transitionDelay: `${(month % 4) * 90}ms` }} className="rounded-xl border border-line bg-white p-4">
      <h3 className="mb-3 text-center font-display text-2xl font-semibold text-sage-dark">{monthNames[month]}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
        {weekDays.map((day, index) => <span key={index} className="pb-1 font-semibold text-ink/45">{day}</span>)}
        {cells.map((day, index) => {
          if (day === null) return <span key={`empty-${index}`} />;
          const iso = `${year}-${pad(month + 1)}-${pad(day)}`;
          const isToday = iso === today;
          const isReserved = reserved.has(iso);
          const isPast = today !== "" && iso < today;
          const base = "flex aspect-square items-center justify-center rounded-md border text-xs";
          const todayRing = isToday ? "border-gold" : "border-transparent";
          if (isReserved) return <span key={iso} title="Reservado" aria-label={`${day} de ${monthNames[month]}: reservado`} className={`${base} ${todayRing} bg-rose font-semibold text-white`}>{day}</span>;
          if (isPast) return <span key={iso} className={`${base} ${todayRing} text-ink/25`}>{day}</span>;
          return <Link key={iso} href={`/cotizador?fecha=${iso}`} title="Disponible: cotizar esta fecha" aria-label={`${day} de ${monthNames[month]}: disponible`} className={`${base} ${todayRing} bg-[#E6EBDF] text-ink transition hover:bg-sage hover:text-white`}>{day}</Link>;
        })}
      </div>
    </article>
  );
}

export default function AgendaCalendar() {
  const [year, setYear] = useState<number>(agendaYears[0]);
  const [today, setToday] = useState("");
  const reserved = new Set(reservedDates);

  useEffect(() => {
    const now = new Date();
    const iso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    setToday(iso);
    if ((agendaYears as readonly number[]).includes(now.getFullYear())) setYear(now.getFullYear());
  }, []);

  return (
    <div>
      <div data-reveal className="mb-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-6 text-xs text-ink/70">
          <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-md bg-[#E6EBDF]" />Disponible</span>
          <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-md bg-rose" />Reservado</span>
          <span className="flex items-center gap-2"><span className="h-4 w-4 rounded-md border border-gold" />Hoy</span>
        </div>
        <div className="flex gap-2" role="group" aria-label="Seleccionar año">
          {agendaYears.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={year === item}
              onClick={() => setYear(item)}
              className={`rounded-md border border-sage-dark px-5 py-2 text-sm font-semibold transition ${year === item ? "bg-sage-dark text-cream" : "text-sage-dark hover:bg-sage-dark/10"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {monthNames.map((_, month) => <MonthGrid key={`${year}-${month}`} year={year} month={month} reserved={reserved} today={today} />)}
      </div>
    </div>
  );
}

"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const months = [
  ["Enero", "Inscripciones abiertas", "Eventos íntimos y celebraciones familiares."],
  ["Febrero", "Fechas disponibles", "Bodas, aniversarios y cenas especiales."],
  ["Marzo", "Agenda en preparación", "Experiencias corporativas y reuniones privadas."],
  ["Abril", "Inscripciones abiertas", "Celebraciones de temporada en nuestros salones."],
  ["Mayo", "Fechas disponibles", "Montajes personalizados para grupos medianos."],
  ["Junio", "Agenda en preparación", "Consulta disponibilidad para tu evento."],
  ["Julio", "Inscripciones abiertas", "Celebraciones de mitad de año y eventos familiares."],
  ["Agosto", "Fechas disponibles", "Propuestas gastronómicas para cada ocasión."],
  ["Septiembre", "Agenda en preparación", "Eventos corporativos y celebraciones patrias."],
  ["Octubre", "Inscripciones abiertas", "Diseñamos una experiencia alrededor de tu fecha."],
  ["Noviembre", "Fechas disponibles", "Temporada ideal para celebrar en grande."],
  ["Diciembre", "Últimas fechas", "Cierres de año, fiestas y celebraciones especiales."],
];

export default function AgendaAccordion() {
  const [openMonth, setOpenMonth] = useState<string | null>("Enero");

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
      {months.map(([month, status, detail]) => {
        const isOpen = openMonth === month;
        return (
          <div key={month} className="border-b border-gray-200 py-1">
            <button type="button" aria-expanded={isOpen} onClick={() => setOpenMonth(isOpen ? null : month)} className={`flex w-full items-center justify-between py-4 text-left font-sans text-lg font-bold transition md:text-xl ${isOpen ? "text-[#046307]" : "text-gray-800 hover:text-[#046307]"}`}>
              <span>{month}</span>
              {isOpen ? <Minus aria-hidden="true" size={20} /> : <Plus aria-hidden="true" size={20} />}
            </button>
            {isOpen && <div className="mb-3 rounded-xl bg-[#FAF7F2] p-4 text-sm leading-6 text-gray-600"><p className="font-semibold text-[#046307]">{status}</p><p>{detail}</p><p className="mt-1">Inscripciones y reservas abiertas para eventos 2026-2027.</p></div>}
          </div>
        );
      })}
    </div>
  );
}

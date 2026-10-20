"use client";

import Link from "next/link";
import { ArrowRight, Camera, Music2, Play } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(email ? "Gracias por ser parte de nuestra comunidad." : "Escribe tu correo para suscribirte.");
    if (email) setEmail("");
  }

  return (
    <footer className="relative mt-20 overflow-hidden bg-[#6ed3b4] text-[#1A1A1A]">
      <div className="h-4 bg-[linear-gradient(135deg,transparent_8px,#6ed3b4_0)_0_0/16px_16px,linear-gradient(45deg,transparent_8px,#f7f3ea_0)_8px_0/16px_16px] -translate-y-2" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-8 pt-10 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:px-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Haz parte de nuestra comunidad</p>
          <h2 className="mt-4 max-w-md font-display text-4xl leading-none sm:text-5xl">Momentos especiales, directo a tu correo.</h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#1A1A1A]/70">Recibe novedades, ideas para celebrar y promociones de R&J Catering House.</p>
          <form onSubmit={subscribe} className="mt-7 flex max-w-md items-center border-b border-[#1A1A1A]">
            <input aria-label="Correo electrónico" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Correo electrónico" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#1A1A1A]/60" />
            <button type="submit" aria-label="Suscribirse"><ArrowRight size={22} /></button>
          </form>
          {notice && <p className="mt-3 text-xs font-semibold">{notice}</p>}
        </div>
        <div className="grid grid-cols-3 gap-5 text-sm">
          <div><h3 className="font-bold">Escuela —</h3><div className="mt-4 space-y-3"><Link className="block hover:underline" href="/servicios">Servicios</Link><Link className="block hover:underline" href="/paquetes">Paquetes</Link><Link className="block hover:underline" href="/agenda">Agenda</Link></div></div>
          <div><h3 className="font-bold">Recursos —</h3><div className="mt-4 space-y-3"><Link className="block hover:underline" href="/galeria">Galería</Link><Link className="block hover:underline" href="/resenas">Reseñas</Link></div></div>
          <div><h3 className="font-bold">Sobre mí —</h3><div className="mt-4 space-y-3"><Link className="block hover:underline" href="/nosotros">Nosotros</Link><Link className="block hover:underline" href="/agenda">Contacto</Link><Link className="block hover:underline" href="/">Inicio</Link></div></div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-[#1A1A1A]/20 px-6 py-8 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="text-sm leading-7"><p className="font-bold">hola@rjcateringhouse.com</p><p>WhatsApp: +506 6291 6883</p><p className="mt-3 text-xs text-[#1A1A1A]/60">© {new Date().getFullYear()} R&J Catering House. Todos los derechos reservados.</p></div>
        <div className="flex items-center gap-3"><span className="mr-3 font-display text-3xl font-bold text-white">R&J</span><a aria-label="Instagram" href="#" className="rounded-full bg-white p-3 text-[#046307]"><Camera size={18} /></a><a aria-label="YouTube" href="#" className="rounded-full bg-white p-3 text-[#046307]"><Play size={18} /></a><a aria-label="TikTok" href="#" className="rounded-full bg-white p-3 text-[#046307]"><Music2 size={18} /></a></div>
      </div>
    </footer>
  );
}

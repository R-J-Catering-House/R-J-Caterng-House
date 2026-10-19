<<<<<<< Updated upstream
import Link from "next/link";

export default function SiteFooter() {
  return (
    <>
      <section className="rounded-3xl bg-ink p-8 text-center text-white sm:p-12">
        <h2 className="font-display text-4xl">Todos nuestros servicios son personalizados para cada evento</h2>
        <Link href="/cotizador" className="mt-6 inline-flex rounded-full bg-ink px-7 py-3 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white hover:text-ink">Reserva aquí</Link>
      </section>
      <footer className="footer-wave mt-10 bg-pink px-6 pb-6 pt-14 text-burgundy sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
          <div><h2 className="font-bold tracking-wide">HAZ PARTE DE NUESTRA COMUNIDAD</h2><p className="mt-3 max-w-sm text-sm leading-6">Déjanos tu correo para estar enterada/o de nuestros nuevos menús, promociones y fechas disponibles para eventos!</p><form className="mt-6 flex max-w-sm border-b border-burgundy/50"><input type="email" required placeholder="Tu correo electrónico" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-burgundy/55" aria-label="Correo electrónico" /><button aria-label="Suscribirme" className="px-2 text-xl">→</button></form><p className="mt-5 text-sm">info@rjcatering.com<br />+506 6291 6883</p></div>
          <FooterLinks title="Servicios" links={["Menú Privado", "Bodas & Sociales", "Catering Corporativo", "Experiencias Culinarias"]} />
          <FooterLinks title="Recursos" links={["Menú de la Semana", "Galería", "Preguntas Frecuentes", "Rachel & Jimena", "Filosofía"]} />
          <div className="flex flex-col items-start lg:items-center"><Link href="/" className="font-display text-4xl">R&amp;J</Link><span className="font-display text-lg">Catering House</span><div className="mt-6 flex gap-2"><button type="button" aria-label="Instagram (próximamente)" className="flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-white text-xs">IG</button><button type="button" aria-label="TikTok (próximamente)" className="flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-white text-xs">TK</button><button type="button" aria-label="WhatsApp (próximamente)" className="flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-white text-xs">WA</button></div></div>
        </div>
        <p className="mt-12 border-t border-burgundy/20 pt-5 text-xs">© 2026 R&amp;J Catering House / Todos los derechos reservados. Hecho con amor por Rachel &amp; Jimena</p>
      </footer>
    </>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return <div><h3 className="font-bold">{title} <span className="ml-2">-</span></h3><ul className="mt-4 space-y-2 text-sm">{links.map((link) => <li key={link}><a href="#" className="transition hover:opacity-60">{link}</a></li>)}</ul></div>;
}
=======
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
>>>>>>> Stashed changes

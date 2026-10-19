<<<<<<< Updated upstream
export default function SiteHeader() {
  const links = [
    ["SERVICIOS", "#servicios"],
    ["PAQUETES", "#paquetes"],
    ["SERVICIOS EXTRA", "#servicios-extra"],
    ["GALERÍA", "#galeria"],
    ["RESERVA", "#reserva"],
    ["MÁS DE NOSOTRAS", "#sobre-nosotras"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/40 bg-white/60 px-3 py-3 shadow-lg shadow-burgundy/5 backdrop-blur-xl">
      <div className="relative mx-auto flex min-h-12 w-full items-center justify-center">
        <a href="#inicio" aria-label="Ir al inicio de R&J Catering House" className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-burgundy">
          <span className="block font-display text-2xl leading-none">R&amp;J</span>
          <span className="hidden text-[8px] font-bold uppercase tracking-[0.18em] sm:block">Catering House</span>
        </a>
        <nav aria-label="Navegación principal" className="flex w-full items-center justify-between gap-1 overflow-x-auto pr-20 text-[9px] font-bold uppercase tracking-[0.1em] text-burgundy sm:gap-4 sm:pr-44 sm:text-[10px]">
          {links.slice(0, 3).map(([label, href]) => <a key={href} href={href} className="shrink-0 px-1 py-2 transition hover:text-ink">{label}</a>)}
          <span className="w-12 shrink-0 sm:w-28" aria-hidden="true" />
          {links.slice(3).map(([label, href]) => <a key={href} href={href} className="shrink-0 px-1 py-2 transition hover:text-ink">{label}</a>)}
        </nav>
      </div>
=======
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

const leftLinks = [
  ["Inicio", "/"],
  ["Galería", "/galeria"],
  ["Servicios", "/servicios"],
  ["Paquetes", "/paquetes"],
] as const;

const rightLinks = [
  ["Sobre nosotras", "/nosotros"],
  ["Agenda", "/agenda"],
] as const;

const links = [...leftLinks, ...rightLinks] as const;

export default function SiteHeader({ overlay = false, sticky = true }: { overlay?: boolean; sticky?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const [path, targetHash] = href.split("#");
    return pathname === path && (!targetHash || hash === `#${targetHash}`);
  };

  return (
    <header className={`${sticky ? "fixed left-0 right-0 top-4 mx-auto" : "relative"} z-50 grid min-h-[4.5rem] w-[calc(100%-1rem)] max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full border px-3 py-2 transition-all duration-300 ease-in-out sm:w-[calc(100%-2rem)] sm:px-6 ${isScrolled ? overlay ? "border-white/20 bg-transparent text-white shadow-none backdrop-blur-md" : "border-ink/10 bg-transparent text-ink shadow-none backdrop-blur-md" : "border-amber-100/70 bg-[#FAF7F2] text-ink shadow-sm backdrop-blur-md"}`}>
      <div className="min-w-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
          className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.16em] transition sm:hidden ${isScrolled && overlay ? "border-white/30 text-white hover:border-white" : "border-ink/15 text-ink hover:border-emerald hover:text-emerald"}`}
        >
          <span aria-hidden="true" className="text-base leading-none">☰</span>
          Menú
        </button>
        <nav aria-label="Navegación principal" className={`hidden items-center gap-x-3 text-xs font-semibold uppercase tracking-[0.12em] md:flex lg:gap-x-5 ${isScrolled && overlay ? "text-white" : "text-ink"}`}>
          {leftLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-2 py-2 transition ${isActive(href) ? "text-emerald" : ""} hover:text-emerald`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <BrandMark overlay={overlay} />
      <div className="col-start-3 ml-auto flex items-center gap-3">
        <nav aria-label="Navegación secundaria" className={`hidden items-center gap-x-3 text-xs font-semibold uppercase tracking-[0.12em] lg:flex ${isScrolled && overlay ? "text-white" : "text-ink"}`}>
          {rightLinks.map(([label, href]) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`whitespace-nowrap rounded-full px-2 py-2 transition ${isActive(href) ? "text-emerald" : ""} hover:text-emerald`}>{label}</Link>
          ))}
        </nav>
        <Link href="/cotizador" className="rounded-full bg-[#046307] px-4 py-2.5 text-xs font-semibold tracking-wider text-white shadow-sm transition-all hover:bg-[#034d05] sm:px-6">
          <span className="sm:hidden">Cotizar</span>
          <span className="hidden sm:inline">Cotizar con nosotros</span>
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/30 sm:hidden" role="presentation" onClick={() => setOpen(false)}>
          <nav
            id="mobile-navigation"
            aria-label="Navegación móvil"
            className="h-full w-[min(86vw,22rem)] bg-cream px-6 py-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex min-h-16 items-center justify-between border-b border-ink/10 pb-5">
              <BrandMark />
              <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-xl text-olive">×</button>
            </div>
            <div className="flex flex-col gap-2 py-8">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-lg font-bold transition hover:bg-sand hover:text-terracotta ${isActive(href) ? "bg-sand text-terracotta" : "text-olive"}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
>>>>>>> Stashed changes
    </header>
  );
}

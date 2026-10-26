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
  ["Reseñas", "/resenas"],
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
    <header className={`${sticky ? "fixed left-1/2 top-4 -translate-x-1/2" : "relative"} z-50 w-[calc(100%-1rem)] max-w-6xl sm:w-[calc(100%-2rem)]`}>
      <div className={`mx-auto flex min-h-[4.25rem] items-center gap-3 rounded-[2rem] border px-3 py-2 shadow-lg backdrop-blur-md sm:px-5 ${isScrolled && overlay ? "border-white/25 bg-black/15 text-white" : isScrolled ? "border-ink/10 bg-[#FAF6EF]/85 text-ink" : "border-white/70 bg-[#FAF6EF]/92 text-ink"}`}>
      <div className="min-w-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
          className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.16em] transition sm:hidden ${isScrolled && overlay ? "border-white/30 text-white hover:border-white" : "border-ink/15 text-ink hover:border-sage hover:text-sage"}`}
        >
          <span aria-hidden="true" className="text-base leading-none">☰</span>
          Menú
        </button>
        <nav aria-label="Navegación principal" className={`hidden items-center gap-x-1 text-[10px] font-semibold uppercase tracking-[0.1em] md:flex lg:gap-x-3 lg:text-xs lg:tracking-[0.12em] ${isScrolled && overlay ? "text-white" : "text-ink"}`}>
          {leftLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-2 py-2 transition ${isActive(href) ? "text-sage" : ""} hover:text-sage`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <BrandMark overlay={overlay && !isScrolled} />
      <div className="col-start-3 ml-auto flex items-center gap-3">
        <nav aria-label="Navegación secundaria" className={`hidden items-center gap-x-3 text-xs font-semibold uppercase tracking-[0.12em] lg:flex ${isScrolled && overlay ? "text-white" : "text-ink"}`}>
          {rightLinks.map(([label, href]) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`whitespace-nowrap rounded-full px-2 py-2 transition ${isActive(href) ? "text-sage" : ""} hover:text-sage`}>{label}</Link>
          ))}
        </nav>
        <Link href="/cotizador" className="rounded-full bg-sage-dark px-4 py-2.5 text-xs font-semibold tracking-wider text-white shadow-sm transition-all hover:bg-sage sm:px-6">
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
              <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-xl text-sage">×</button>
            </div>
            <div className="flex flex-col gap-2 py-8">
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-lg font-bold transition hover:bg-blush hover:text-sage-dark ${isActive(href) ? "bg-blush text-sage-dark" : "text-sage"}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
      </div>
    </header>
  );
}

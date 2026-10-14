import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/30 pb-5">
      <Link href="/" className="flex items-center gap-3 text-emerald">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold font-display text-xl">R&J</span>
        <span className="font-display text-xl">Catering House</span>
      </Link>
      <nav aria-label="Navegación principal" className="flex flex-wrap items-center gap-4 text-sm font-bold text-emerald sm:gap-6">
        <Link href="/">Inicio</Link>
        <Link href="/galeria">Galería</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="/resenas">Reseñas</Link>
        <Link href="/cotizador">Cotizar con nosotros</Link>
      </nav>
      <Link href="/admin" className="rounded-full border border-gold px-4 py-2 text-xs font-bold text-emerald transition hover:bg-emerald hover:text-white">
        Panel administrador
      </Link>
    </header>
  );
}

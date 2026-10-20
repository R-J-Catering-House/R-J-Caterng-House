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
    </header>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-sage-olive py-16 text-center text-cream">
      <div data-reveal className="mx-auto max-w-lg px-6">
        <p className="font-display text-[2.6rem] font-semibold leading-none sm:text-5xl">
          R&J Catering House
        </p>
        <p className="mt-4 text-sm tracking-wide text-cream/65">
          Hacemos de tu evento un momento inolvidable
        </p>

        <div className="mt-8 flex items-center justify-center gap-8">
          <a
            href="https://www.instagram.com/catering.sers"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="opacity-50 transition hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/people/RJ-C%C3%A1tering-House/61595649053113/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="opacity-50 transition hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>

        <div className="mt-10 border-t border-white/20" />
        <p className="mt-6 text-[11px] uppercase tracking-widest text-cream/40">
          © {new Date().getFullYear()} R&J Catering House · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

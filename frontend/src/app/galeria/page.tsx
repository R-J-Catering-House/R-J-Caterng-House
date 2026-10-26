
import SiteHeader from "@/components/marketing/SiteHeader";
import GalleryGrid from "@/components/marketing/GalleryGrid";

export default function GalleryPage() {
  return (
    <div>
      <SiteHeader />
      <section className="mx-auto max-w-[88rem] px-3 pb-24 pt-36 sm:px-6">
        <div data-reveal className="mx-auto mb-12 max-w-2xl px-3 text-center">
          <p className="eyebrow">Nuestros eventos</p>
          <h2 className="mt-3 font-display text-4xl text-sage-olive sm:text-5xl">Momentos que se quedan</h2>
          <div className="luxury-divider mt-6" />
          <p className="mt-6 text-sm leading-7 text-ink/60">Espacios, montajes y detalles de las celebraciones que hemos acompañado.</p>
        </div>
        <GalleryGrid />
      </section>
    </div>
  );
}

import Image from "next/image";

type EditorialHeroProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
};

export default function EditorialHero({ eyebrow, title, highlight, description, image, imageAlt }: EditorialHeroProps) {
  return (
    <section className="relative -mx-4 min-h-[30rem] overflow-hidden bg-olive text-white shadow-xl sm:-mx-8 sm:min-h-[34rem] lg:-mx-12">
      <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent" />
      <div className="relative flex min-h-[30rem] max-w-3xl flex-col justify-end px-7 pb-12 sm:min-h-[34rem] sm:px-14 sm:pb-16">
        <p className="eyebrow text-sand">{eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">{title}<br /><span className="text-sand">{highlight}</span></h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-white/80">{description}</p>
      </div>
    </section>
  );
}

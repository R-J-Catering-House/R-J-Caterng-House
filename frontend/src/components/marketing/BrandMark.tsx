import Link from "next/link";

export default function BrandMark({ overlay = false }: { overlay?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="R&J Catering House, inicio"
      className={`group absolute left-1/2 top-1/2 flex max-w-full -translate-x-1/2 -translate-y-1/2 items-center ${overlay ? "text-white" : "text-olive"}`}
    >
      <span
        className={`relative flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full border bg-cream p-1 shadow-xl transition duration-300 group-hover:scale-105 sm:h-20 sm:w-20 ${overlay ? "border-white/80" : "border-gold"}`}
        style={{ width: "4.25rem", height: "4.25rem" }}
      >
        <img
          src="/images/brand-logo.jpe"
          alt=""
          width={80}
          height={80}
          className="block h-full w-full max-w-full rounded-full object-cover"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </span>
    </Link>
  );
}

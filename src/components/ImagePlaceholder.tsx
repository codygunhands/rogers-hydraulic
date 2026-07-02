import Image from "next/image";

/**
 * ImagePlaceholder — shows a real photo when `src` is given; otherwise a clearly
 * labeled slot describing the shot to take. `label` doubles as the alt text.
 *
 * Stock photos (Pexels) are temporary — replace with Rogers' own truck/team/job
 * photos. Slots without a src (truck, owner) are waiting on real photos.
 */
export function ImagePlaceholder({
  label,
  src,
  ratio = "16 / 9",
  tag = "Photo",
  className,
  priority,
}: {
  label: string;
  src?: string;
  ratio?: string;
  tag?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-md border border-graphite-600 ${className ?? ""}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
        {/* subtle graphite gradient for cohesion with the dark UI */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent" aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-hivis/40 bg-graphite-900 ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,#D3FF00 0 2px,transparent 2px 16px)" }}
        aria-hidden
      />
      <div className="relative z-10 flex max-w-[85%] flex-col items-center gap-2 px-4 text-center">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#D3FF00" strokeWidth="1.5" aria-hidden>
          <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.2-1.8A1 1 0 0 1 9 4.8h6a1 1 0 0 1 .8.4L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
          <circle cx="12" cy="13" r="3.3" />
        </svg>
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-hivis">{tag}</span>
        <span className="font-body text-sm leading-snug text-steel">{label}</span>
      </div>
    </div>
  );
}

export default ImagePlaceholder;

/**
 * ImagePlaceholder — a clearly-labeled slot showing exactly what real photo to
 * shoot and drop in here. Intentional (not broken-looking): dashed hi-vis frame,
 * camera glyph, a "PHOTO" tag, and the shot description.
 *
 * Swap for a real image later:
 *   <Image src="/photos/hero-truck.jpg" alt="..." fill className="object-cover" />
 */
export function ImagePlaceholder({
  label,
  ratio = "16 / 9",
  tag = "Photo",
  className,
}: {
  label: string;
  ratio?: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-hivis/40 bg-graphite-900 ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      {/* faint plate texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#D3FF00 0 2px,transparent 2px 16px)",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex max-w-[85%] flex-col items-center gap-2 px-4 text-center">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#D3FF00" strokeWidth="1.5" aria-hidden>
          <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.2-1.8A1 1 0 0 1 9 4.8h6a1 1 0 0 1 .8.4L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
          <circle cx="12" cy="13" r="3.3" />
        </svg>
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-hivis">
          {tag}
        </span>
        <span className="font-body text-sm leading-snug text-steel">{label}</span>
      </div>
    </div>
  );
}

export default ImagePlaceholder;

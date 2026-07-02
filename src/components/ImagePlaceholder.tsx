import Image from "next/image";

/**
 * ImagePlaceholder — shows a real photo when `src` is given; with no `src` it
 * renders NOTHING (no dead image blocks). A real photo or nothing at all.
 * Replace Pexels stock with Rogers' own truck/team/job photos over time.
 */
export function ImagePlaceholder({
  label,
  src,
  ratio = "16 / 9",
  className,
  priority,
}: {
  label: string;
  src?: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src) return null;
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
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}

export default ImagePlaceholder;

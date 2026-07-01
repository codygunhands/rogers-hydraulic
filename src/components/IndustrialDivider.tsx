/** Thick horizontal divider with a hi-vis segment, service-truck-graphic style. */
export function IndustrialDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className ?? ""}`} aria-hidden>
      <span className="h-[3px] w-10 rounded-sm bg-hivis" />
      <span className="h-px flex-1 bg-graphite-600" />
    </div>
  );
}

export default IndustrialDivider;

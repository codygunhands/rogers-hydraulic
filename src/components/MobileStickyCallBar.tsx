import { business } from "@/config/business";
import { tracking } from "@/config/tracking";
import { Icon } from "./Icon";

/** Fixed bottom call/request bar on mobile only. Adds safe-area padding. */
export function MobileStickyCallBar() {
  const displayNumber = tracking.callTrackingNumber || business.phone;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-graphite-600 bg-graphite-900/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={business.phoneHref}
        className="flex items-center justify-center gap-2 bg-hivis py-3.5 font-heading text-base font-bold uppercase tracking-stencil text-graphite"
        aria-label={`Call ${displayNumber} now`}
      >
        <Icon name="phone" size={18} />
        Call Now
      </a>
      <a
        href="/request-service"
        className="flex items-center justify-center gap-2 py-3.5 font-heading text-base font-bold uppercase tracking-stencil text-smoke"
      >
        Request Service
      </a>
    </div>
  );
}

export default MobileStickyCallBar;

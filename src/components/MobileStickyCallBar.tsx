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
        className="flex items-center justify-center gap-2 bg-hivis py-4 font-heading text-lg font-bold uppercase tracking-stencil text-graphite"
        aria-label={`Call ${displayNumber} now`}
      >
        <Icon name="phone" size={20} />
        Call Now
      </a>
      <a
        href={business.smsHref}
        className="flex items-center justify-center gap-2 border-l border-graphite-600 py-4 font-heading text-lg font-bold uppercase tracking-stencil text-smoke"
        aria-label="Text photos of your equipment"
      >
        <Icon name="message" size={20} />
        Text Photos
      </a>
    </div>
  );
}

export default MobileStickyCallBar;

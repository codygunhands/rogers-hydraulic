import { business } from "@/config/business";
import { tracking } from "@/config/tracking";
import { Icon } from "./Icon";

/** Top strip: after-hours availability + tap-to-call. Honest phrasing (no 24/7 claim). */
export function EmergencyStrip() {
  const displayNumber = tracking.callTrackingNumber || business.phone;
  return (
    <div className="border-b border-graphite-600 bg-graphite-900">
      <div className="container-x flex flex-col items-center justify-between gap-1 py-2 text-center sm:flex-row sm:text-left">
        <p className="font-body text-xs leading-tight text-steel sm:text-sm">
          <span className="font-semibold text-hivis">Emergency &amp; after-hours field service available.</span>{" "}
          Call for current availability.
        </p>
        <a
          href={business.phoneHref}
          className="inline-flex items-center gap-1.5 font-heading text-sm font-bold uppercase tracking-stencil text-smoke hover:text-hivis"
        >
          <Icon name="phone" size={15} />
          {displayNumber}
        </a>
      </div>
    </div>
  );
}

export default EmergencyStrip;

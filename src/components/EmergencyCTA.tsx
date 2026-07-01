import { business } from "@/config/business";
import { PhoneButton } from "./PhoneButton";
import { CTAButton } from "./CTAButton";

/** Full-width closing call-to-action band. */
export function EmergencyCTA({
  headline = "Need field service now?",
  sub,
}: {
  headline?: string;
  sub?: string;
}) {
  return (
    <section className="border-y border-graphite-600 bg-graphite-900">
      <div className="container-x flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold uppercase leading-[1.05] tracking-stencil text-smoke sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-steel">
            {sub ??
              `Mobile hydraulic hose repair, equipment field service, and trailer repair across ${business.serviceAreaShort}. On-site. After hours. Back to work.`}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <PhoneButton size="lg" />
          <CTAButton href="/request-service" variant="secondary" size="lg">
            Request Service
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export default EmergencyCTA;

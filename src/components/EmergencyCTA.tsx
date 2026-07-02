import Link from "next/link";
import { business } from "@/config/business";
import { PhoneButton } from "./PhoneButton";
import { TextPhotosButton } from "./TextPhotosButton";

/** Full-width closing call-to-action band. */
export function EmergencyCTA({
  headline = "Equipment down? We come to you.",
  sub,
}: {
  headline?: string;
  sub?: string;
}) {
  return (
    <section className="border-y border-graphite-600 bg-graphite-900">
      <div className="container-x flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold uppercase leading-[1.05] tracking-stencil text-smoke sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-steel">
            {sub ??
              `Mobile hydraulic and equipment service across ${business.serviceAreaShort}. Call or text photos — we confirm and roll.`}
          </p>
        </div>
        <div className="w-full shrink-0 md:w-auto">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <PhoneButton size="lg" className="w-full sm:w-auto" />
            <TextPhotosButton size="lg" variant="secondary" className="w-full sm:w-auto" />
          </div>
          <p className="mt-3 text-center font-body text-sm text-steel md:text-right">
            <Link href="/request-service" className="text-hivis underline underline-offset-2 hover:text-hivis-dark">
              Request non-urgent service
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default EmergencyCTA;

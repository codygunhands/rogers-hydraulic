import { business } from "@/config/business";
import { PhoneButton } from "./PhoneButton";
import { CTAButton } from "./CTAButton";

/** Home hero — the primary conversion surface. */
export function Hero() {
  return (
    <section className="bg-plate relative overflow-hidden border-b border-graphite-600">
      {/* hazard accent line at top */}
      <div className="band-hazard h-1.5 w-full" aria-hidden />
      <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">Mobile Field Service · {business.serviceAreaShort}</p>
          <h1 className="mt-4 font-heading text-5xl font-extrabold uppercase leading-[0.95] tracking-stencil text-smoke sm:text-6xl lg:text-7xl">
            Blown Hydraulic Hose?
            <span className="mt-2 block text-hivis">We Come To You.</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-steel">
            Mobile hydraulic hose repair, equipment field service, trailer repair, and
            after-hours repair across Madison County, Brazos County, and surrounding East Texas.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PhoneButton size="lg" />
            <CTAButton href="/request-service" variant="secondary" size="lg">
              Request Service
            </CTAButton>
          </div>
          <p className="mt-5 font-body text-sm text-steel">
            <span className="font-semibold text-smoke">On-Site. After Hours. Back to Work.</span>{" "}
            Call for current availability.
          </p>
        </div>

        {/* Right: plain-spoken capability panel (no stock photo needed) */}
        <div className="rounded-md border border-graphite-600 bg-graphite-900/70 p-6 sm:p-8">
          <p className="font-heading text-xl font-bold uppercase tracking-wide text-smoke">
            When equipment is down, every hour costs money.
          </p>
          <ul className="mt-5 space-y-3 font-body text-sm text-steel">
            {[
              "We bring hose repair to the jobsite — no hauling a dead machine to a shop.",
              "Hydraulic troubleshooting, cylinders, fittings, and trailer hydraulics.",
              "Emergency and after-hours calls accepted.",
              "Honest about what can be fixed on-site and what needs a shop.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-1 h-1.5 w-4 shrink-0 rounded-sm bg-hivis" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-graphite-600 pt-5">
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-hivis">
              Built for contractors, ranchers, public works &amp; operators
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

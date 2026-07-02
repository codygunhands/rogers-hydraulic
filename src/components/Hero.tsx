import { business } from "@/config/business";
import { PhoneButton } from "./PhoneButton";
import { CTAButton } from "./CTAButton";
import { ImagePlaceholder } from "./ImagePlaceholder";

/** Home hero — the primary conversion surface. */
export function Hero() {
  return (
    <section className="bg-plate relative border-b border-graphite-600">
      {/* hazard accent line at top */}
      <div className="band-hazard h-1.5 w-full" aria-hidden />
      <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="min-w-0">
          <p className="eyebrow">Mobile Field Service · {business.serviceAreaShort}</p>
          <h1 className="mt-4 font-heading text-[2rem] font-bold uppercase leading-[1] tracking-tight text-smoke sm:text-5xl sm:tracking-stencil lg:text-7xl">
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

        {/* Right: hero photo */}
        <div>
          <ImagePlaceholder
            src="/photos/hero-field-service.jpg"
            label="Field technician servicing heavy equipment on-site with tools and parts"
            ratio="4 / 3"
            priority
          />
          <p className="mt-3 text-center font-heading text-sm font-semibold uppercase tracking-widest text-hivis">
            Built for contractors, ranchers, public works &amp; operators
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;

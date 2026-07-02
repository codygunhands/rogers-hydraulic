import Link from "next/link";
import { business } from "@/config/business";
import { PhoneButton } from "./PhoneButton";
import { TextPhotosButton } from "./TextPhotosButton";
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <PhoneButton size="lg" className="w-full sm:w-auto" />
            <TextPhotosButton size="lg" variant="secondary" className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 font-body text-sm text-steel">
            <span className="font-semibold text-smoke">On-Site. After Hours. Back to Work.</span> Or{" "}
            <Link href="/request-service" className="text-hivis underline underline-offset-2 hover:text-hivis-dark">
              request non-urgent service
            </Link>
            .
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

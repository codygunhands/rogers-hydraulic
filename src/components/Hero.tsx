import Link from "next/link";
import { PhoneButton } from "./PhoneButton";
import { TextPhotosButton } from "./TextPhotosButton";
import { Icon } from "./Icon";

const READY = ["Machine type", "Failed hose", "Fittings", "Jobsite location"];

/** Home hero — the primary conversion surface. Headline first, then CTAs, then a
 * practical "call first / text photos" utility panel (no stock photo). */
export function Hero() {
  return (
    <section className="bg-plate relative border-b border-graphite-600">
      <div className="band-hazard h-1.5 w-full" aria-hidden />
      <div className="container-x grid gap-10 py-14 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="min-w-0">
          <h1 className="font-heading text-[2.25rem] font-bold uppercase leading-[0.98] tracking-tight text-smoke sm:text-6xl sm:tracking-stencil lg:text-7xl">
            Blown Hydraulic Hose?
            <span className="mt-2 block text-hivis">We Come To You.</span>
          </h1>
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-steel">
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

        {/* Right: practical utility panel (no photo) */}
        <div className="rounded-md border border-graphite-600 bg-graphite-900/70 p-6 sm:p-8">
          <p className="font-heading text-2xl font-bold uppercase leading-none tracking-stencil text-smoke sm:text-3xl">
            Call First. <span className="text-hivis">Text Photos.</span>
          </p>
          <p className="mt-3 font-body text-sm text-steel">Have this ready so we can confirm and roll:</p>
          <ul className="mt-4 space-y-3">
            {READY.map((item) => (
              <li key={item} className="flex items-center gap-3 font-heading text-lg font-semibold uppercase tracking-wide text-smoke">
                <span className="text-hivis" aria-hidden>
                  <Icon name="check" size={20} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-graphite-600 pt-4">
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

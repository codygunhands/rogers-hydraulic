import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";
import { PageHero } from "@/components/PageHero";
import { RequestServiceForm } from "@/components/RequestServiceForm";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Request Service",
  description:
    "Request mobile hydraulic hose repair, equipment field service, trailer repair, or after-hours service across Madison County, Brazos County, and surrounding East Texas.",
  path: "/request-service",
});

const READY = [
  "Machine make and model",
  "What failed and where it is on the machine",
  "Whether the failure is accessible",
  "The jobsite location",
];

export default function RequestServicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request Service", path: "/request-service" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Request Service", path: "/request-service" },
        ]}
        eyebrow="Request Service"
        title="Get Field Service Started"
        directAnswer="Tell us the machine, the problem, and the jobsite. We'll follow up with current availability. If equipment is down right now, calling is the fastest way to reach us."
        showCtas={false}
      />

      <section className="container-x py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form */}
          <div className="rounded-md border border-graphite-600 bg-graphite-900/50 p-6 sm:p-8">
            <RequestServiceForm />
          </div>

          {/* Sidebar: what to have ready + call */}
          <aside className="space-y-6">
            <div className="rounded-md border border-graphite-600 bg-graphite-900 p-6">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-smoke">
                Have this ready
              </h2>
              <ul className="mt-4 space-y-3">
                {READY.map((r) => (
                  <li key={r} className="flex gap-3 font-body text-sm text-steel">
                    <span className="mt-0.5 shrink-0 text-hivis" aria-hidden>
                      <Icon name="check" size={16} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-hivis/50 bg-graphite-900 p-6">
              <p className="font-heading text-xs uppercase tracking-widest text-steel">
                Equipment down now?
              </p>
              <a
                href={business.phoneHref}
                className="mt-2 flex items-center gap-2 font-heading text-3xl font-extrabold tracking-stencil text-hivis hover:text-hivis-dark"
              >
                <Icon name="phone" size={24} />
                {business.phone}
              </a>
              <a
                href={business.smsHref}
                className="mt-3 inline-flex items-center gap-2 font-heading text-base font-semibold uppercase tracking-wide text-smoke hover:text-hivis"
              >
                <Icon name="message" size={18} />
                Text Photos
              </a>
              <p className="mt-3 font-body text-sm leading-relaxed text-steel">
                Emergency and after-hours calls accepted. Call or text for current availability.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

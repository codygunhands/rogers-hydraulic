import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";
import { tracking } from "@/config/tracking";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Rogers Hydraulic & Equipment Services for mobile hydraulic hose repair, equipment field service, and after-hours calls across Madison County, Brazos County, and surrounding East Texas.",
  path: "/contact",
});

export default function ContactPage() {
  const displayNumber = tracking.callTrackingNumber || business.phone;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        eyebrow="Contact"
        title="Talk to Rogers Hydraulic"
        directAnswer="Call for the fastest response when equipment is down. For non-urgent questions, send a message and we'll follow up."
        showCtas={false}
      />

      <section className="container-x py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <div className="space-y-6">
            <a
              href={business.phoneHref}
              className="flex items-center gap-3 rounded-md border border-graphite-600 bg-graphite-900 p-5 transition-colors hover:border-hivis"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-hivis text-graphite">
                <Icon name="phone" size={22} />
              </span>
              <span>
                <span className="block font-heading text-xs uppercase tracking-widest text-steel">
                  Call for service
                </span>
                <span className="block font-heading text-2xl font-extrabold tracking-stencil text-smoke">
                  {displayNumber}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-3 rounded-md border border-graphite-600 bg-graphite-900 p-5 transition-colors hover:border-hivis"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-graphite-700 text-hivis">
                <Icon name="check" size={22} />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-xs uppercase tracking-widest text-steel">
                  Email
                </span>
                <span className="block truncate font-body text-base text-smoke">{business.email}</span>
              </span>
            </a>

            <div className="rounded-md border border-graphite-600 bg-graphite-900 p-5">
              <p className="font-heading text-xs uppercase tracking-widest text-steel">Service area</p>
              <p className="mt-1 font-body text-base leading-relaxed text-smoke">
                {business.serviceArea}
              </p>
              <p className="mt-3 font-heading text-xs uppercase tracking-widest text-steel">Hours</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-steel">{business.hoursText}</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-md border border-graphite-600 bg-graphite-900/50 p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-smoke">
              Send a message
            </h2>
            <p className="mt-2 font-body text-sm text-steel">
              For equipment that&apos;s down right now, calling is fastest.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

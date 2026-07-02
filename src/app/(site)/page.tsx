import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, faqSchema } from "@/config/seo";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/service-areas";
import { homeFaqs } from "@/data/site";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard, ServiceAreaCard } from "@/components/cards";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQ } from "@/components/FAQ";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { JsonLd } from "@/components/JsonLd";
import { CTAButton } from "@/components/CTAButton";

export const metadata: Metadata = pageMetadata({
  title: "Mobile Hydraulic Hose Repair & Equipment Field Service",
  description:
    "Mobile hydraulic hose repair, equipment field service, trailer repair, and after-hours repair across Madison County, Brazos County, and surrounding East Texas. Call or text photos.",
  path: "/",
});

/**
 * Homepage — a phone-first field-service dispatch page, deliberately short:
 * hero → trust bar → services → service area → how it works → FAQ → CTA.
 * Deeper detail (problem, industries, capabilities) lives on the service/about pages.
 */
export default function HomePage() {
  const serviceCards = services.map((s) => ({
    href: `/services/${s.slug}`,
    name: s.name,
    blurb: s.blurb,
    icon: s.icon,
  }));

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <TrustBar />

      {/* Services */}
      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-20">
          <SectionHeader
            eyebrow="Services"
            title="Field repair, brought to the jobsite"
            intro="Mobile hydraulic hose repair, equipment field service, and trailer repair across the Madison/Brazos corridor."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((c) => (
              <ServiceCard key={c.name} href={c.href} name={c.name} blurb={c.blurb} icon={c.icon} />
            ))}
          </div>
          <div className="mt-8">
            <CTAButton href="/services" variant="secondary">All Services</CTAButton>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="border-t border-graphite-600">
        <div className="container-x py-14 md:py-20">
          <SectionHeader
            eyebrow="Service area"
            title="Built for the Madison/Brazos corridor."
            intro={`Mobile work across ${business.serviceAreaShort}, with Madisonville as the future shop anchor.`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((a) => (
              <ServiceAreaCard key={a.slug} href={`/service-area/${a.slug}`} city={a.city} county={a.county} />
            ))}
          </div>
          <p className="mt-8 font-body text-sm text-steel">
            Also serving North Zulch, Normangee, and the surrounding East Texas corridor.{" "}
            <Link href="/service-area" className="font-semibold text-hivis hover:underline">
              See full service area →
            </Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-20">
          <SectionHeader eyebrow="How it works" title="Call, text, confirm, roll, fix it." />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-graphite-600">
        <div className="container-x py-14 md:py-20">
          <FAQ faqs={homeFaqs} />
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

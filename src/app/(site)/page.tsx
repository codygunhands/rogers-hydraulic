import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, faqSchema } from "@/config/seo";
import { business } from "@/config/business";
import { services, troubleshootingCard } from "@/data/services";
import { industries, industrialOilfieldChip } from "@/data/industries";
import { serviceAreas } from "@/data/service-areas";
import { homeFaqs } from "@/data/site";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard, IndustryCard, ServiceAreaCard } from "@/components/cards";
import { ProcessSteps } from "@/components/ProcessSteps";
import { AnswerBoxes } from "@/components/AnswerBoxes";
import { FAQ } from "@/components/FAQ";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { CTAButton } from "@/components/CTAButton";

export const metadata: Metadata = pageMetadata({
  title: "Mobile Hydraulic Hose Repair & Equipment Field Service",
  description:
    "Mobile hydraulic hose repair, equipment field service, trailer repair, and after-hours repair across Madison County, Brazos County, and surrounding East Texas. On-site. After hours. Back to work.",
  path: "/",
});

export default function HomePage() {
  const serviceCards = [
    ...services.map((s) => ({ href: `/services/${s.slug}`, name: s.name, blurb: s.blurb, icon: s.icon })),
    { href: troubleshootingCard.href, name: troubleshootingCard.name, blurb: troubleshootingCard.blurb, icon: troubleshootingCard.icon },
  ];

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <TrustBar />

      {/* Problem section */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="The problem"
            title="When equipment is down, every hour costs money."
          />
          <p className="font-body text-lg leading-relaxed text-steel">
            A failed hydraulic hose, leaking cylinder, broken trailer component, or disabled
            machine can stop a job, delay a crew, or leave equipment stranded. Rogers Hydraulic
            &amp; Equipment Services brings practical field repair directly to the site — so you
            fix it where it sits and get back to work.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-16 md:py-20">
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
            <CTAButton href="/services" variant="secondary">
              All Services
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-x py-16 md:py-20">
        <SectionHeader
          eyebrow="Industries"
          title="Built for the people who run the equipment"
          intro="Ranchers, contractors, public works, trailer operators, and industrial customers across East Texas."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <IndustryCard key={i.slug} href={`/industries/${i.slug}`} name={i.name} blurb={i.blurb} icon={i.icon} />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2.5 font-body text-sm text-steel">
          <span className="text-hivis" aria-hidden>
            <Icon name={industrialOilfieldChip.icon} size={18} />
          </span>
          Also supporting {industrialOilfieldChip.name.toLowerCase()}.
        </div>
      </section>

      {/* Service area */}
      <section className="border-y border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader
              eyebrow="Service area"
              title="Built for the Madison/Brazos corridor."
              intro={`Based for mobile work across ${business.serviceAreaShort}, with Madisonville positioned as the future shop anchor.`}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceAreas.map((a) => (
                <ServiceAreaCard key={a.slug} href={`/service-area/${a.slug}`} city={a.city} county={a.county} />
              ))}
            </div>
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
      <section className="container-x py-16 md:py-20">
        <SectionHeader
          eyebrow="How it works"
          title="From down to back-to-work"
          intro="A simple, honest process — no runaround, no guessing on your dime."
        />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </section>

      {/* Answer boxes (GEO) */}
      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-16 md:py-20">
          <SectionHeader eyebrow="Quick answers" title="The short version" />
          <div className="mt-10">
            <AnswerBoxes />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-16 md:py-20">
        <FAQ faqs={homeFaqs} />
      </section>

      <EmergencyCTA />
    </>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";
import { services } from "@/data/services";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/cards";
import { AnswerBoxes } from "@/components/AnswerBoxes";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/config/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Mobile Hydraulic & Equipment Field Repair",
  description:
    "Mobile hydraulic hose repair, equipment field service, after-hours repair, trailer repair, and preventative maintenance across Madison County, Brazos County, and surrounding East Texas.",
  path: "/services",
});

export default function ServicesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        eyebrow="Services"
        title="Mobile Hydraulic & Equipment Repair"
        directAnswer="Rogers Hydraulic brings hydraulic hose repair, equipment field service, trailer repair, after-hours calls, and preventative maintenance directly to the jobsite across Madison County, Brazos County, and surrounding East Texas."
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} href={`/services/${s.slug}`} name={s.name} blurb={s.blurb} icon={s.icon} />
          ))}
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-16 md:py-20">
          <SectionHeader eyebrow="Quick answers" title="What to know before you call" />
          <div className="mt-10">
            <AnswerBoxes />
          </div>
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

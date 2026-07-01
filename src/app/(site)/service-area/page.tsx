import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";
import { serviceAreas } from "@/data/service-areas";
import { PageHero } from "@/components/PageHero";
import { ServiceAreaCard } from "@/components/cards";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Service Area — Madison County, Brazos County & East Texas",
  description:
    "Rogers Hydraulic serves Madisonville, Bryan, College Station, Navasota, North Zulch, Normangee, and the Huntsville edge across Madison County, Brazos County, and surrounding East Texas.",
  path: "/service-area",
});

export default function ServiceAreaIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Area", path: "/service-area" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Service Area", path: "/service-area" },
        ]}
        eyebrow="Service Area"
        title="Serving the Madison/Brazos Corridor"
        directAnswer={`Rogers Hydraulic provides mobile hydraulic and equipment field service across ${business.serviceAreaShort}. Madisonville sits at the center of our area, and we work outward across the corridor. Availability varies by distance, call volume, and conditions.`}
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((a) => (
            <ServiceAreaCard key={a.slug} href={`/service-area/${a.slug}`} city={a.city} county={a.county} />
          ))}
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-16">
          <SectionHeader
            eyebrow="Also serving"
            title="Across the corridor"
            intro="Beyond the cities above, we cover the surrounding East Texas corridor — including North Zulch, Normangee, Midway, and nearby ranch and jobsite locations. Call to confirm coverage for your exact location."
          />
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { industries, industrialOilfieldChip } from "@/data/industries";
import { PageHero } from "@/components/PageHero";
import { IndustryCard } from "@/components/cards";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve — Ranch, Construction, Municipal, Trailers",
  description:
    "Mobile hydraulic and equipment field service for ranching, construction, municipal and public works, and trucking & trailers across Madison County, Brazos County, and surrounding East Texas.",
  path: "/industries",
});

export default function IndustriesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
        eyebrow="Industries"
        title="Built for the People Who Run the Equipment"
        directAnswer="Rogers Hydraulic serves ranchers, contractors, municipalities, and trailer operators across Madison County, Brazos County, and surrounding East Texas — bringing hydraulic and equipment field repair to the jobsite."
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i) => (
            <IndustryCard key={i.slug} href={`/industries/${i.slug}`} name={i.name} blurb={i.blurb} icon={i.icon} />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2.5 font-body text-sm text-steel">
          <span className="text-hivis" aria-hidden>
            <Icon name={industrialOilfieldChip.icon} size={18} />
          </span>
          Also supporting {industrialOilfieldChip.name.toLowerCase()} across the corridor.
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

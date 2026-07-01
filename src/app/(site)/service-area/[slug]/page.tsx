import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceAreas, serviceAreaBySlug } from "@/data/service-areas";
import { services } from "@/data/services";
import { pageMetadata, faqSchema, breadcrumbSchema } from "@/config/seo";
import { PageHero } from "@/components/PageHero";
import { TitledList } from "@/components/TitledList";
import { FAQ } from "@/components/FAQ";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = serviceAreaBySlug(params.slug);
  if (!area) return {};
  return pageMetadata({
    title: area.h1,
    description: area.metaDescription,
    path: `/service-area/${area.slug}`,
  });
}

const CORE_SERVICES = ["mobile-hydraulic-hose-repair", "equipment-field-service", "trailer-repair", "after-hours-repair"];

export default function ServiceAreaPage({ params }: { params: { slug: string } }) {
  const area = serviceAreaBySlug(params.slug);
  if (!area) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Service Area", path: "/service-area" },
    { name: `${area.city}, TX`, path: `/service-area/${area.slug}` },
  ];

  const localServices = services.filter((s) => CORE_SERVICES.includes(s.slug));

  return (
    <>
      <JsonLd data={[faqSchema(area.faqs), breadcrumbSchema(breadcrumbs)]} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`Service Area · ${area.county}`}
        title={area.h1}
        directAnswer={area.directAnswer}
        icon="pin"
      />

      <section className="container-x py-14 md:py-16">
        <div className="max-w-3xl space-y-5">
          {area.description.map((p) => (
            <p key={p} className="font-body text-lg leading-relaxed text-steel">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x grid gap-6 py-14 md:grid-cols-2 md:py-16">
          <TitledList title={`Who we serve in ${area.city}`} items={area.localContext} bullet="check" />
          <TitledList title="Nearby areas we cover" items={area.nearby} bullet="pin" />
        </div>
      </section>

      <section className="container-x py-14 md:py-16">
        <SectionHeader eyebrow="Services here" title={`Field service in ${area.city}`} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-center gap-3 rounded-md border border-graphite-600 bg-graphite-700/40 p-5 transition-colors hover:border-hivis/70"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-graphite-900 text-hivis">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="font-heading text-sm font-bold uppercase leading-tight text-smoke">
                {s.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-16">
          <FAQ faqs={area.faqs} />
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

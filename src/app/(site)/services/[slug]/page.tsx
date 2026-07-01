import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, serviceBySlug } from "@/data/services";
import { pageMetadata, serviceSchema, faqSchema, breadcrumbSchema } from "@/config/seo";
import { PageHero } from "@/components/PageHero";
import { TitledList } from "@/components/TitledList";
import { FAQ } from "@/components/FAQ";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = serviceBySlug(params.slug);
  if (!service) return {};
  return pageMetadata({
    title: service.h1,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceBySlug(params.slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const related = service.related.map(serviceBySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof serviceBySlug>
  >[];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.h1,
            description: service.metaDescription,
            path: `/services/${service.slug}`,
            serviceType: service.name,
          }),
          faqSchema(service.faqs),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Service"
        title={service.h1}
        directAnswer={service.directAnswer}
        icon={service.icon}
      />

      {/* Description */}
      <section className="container-x py-14 md:py-16">
        <div className="max-w-3xl space-y-5">
          {service.description.map((p) => (
            <p key={p} className="font-body text-lg leading-relaxed text-steel">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Problems + equipment */}
      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x grid gap-6 py-14 md:grid-cols-2 md:py-16">
          <TitledList title="Common problems solved" items={service.problemsSolved} />
          <TitledList title="Equipment we work on" items={service.equipmentTypes} bullet="wrench" />
        </div>
      </section>

      {/* What to expect */}
      <section className="container-x py-14 md:py-16">
        <SectionHeader eyebrow="What to expect" title="How the call goes" />
        <div className="mt-8 max-w-3xl">
          <TitledList title="Step by step" items={service.whatToExpect} numbered />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-16">
          <FAQ faqs={service.faqs} />
        </div>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="container-x py-14 md:py-16">
          <SectionHeader eyebrow="Related" title="Other ways we help" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group flex items-center gap-3 rounded-md border border-graphite-600 bg-graphite-700/40 p-5 transition-colors hover:border-hivis/70"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-graphite-900 text-hivis">
                  <Icon name={r.icon} size={22} />
                </span>
                <span className="font-heading text-base font-bold uppercase leading-tight text-smoke">
                  {r.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <EmergencyCTA />
    </>
  );
}

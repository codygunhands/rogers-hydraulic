import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industries, industryBySlug } from "@/data/industries";
import { services } from "@/data/services";
import { pageMetadata, faqSchema, breadcrumbSchema } from "@/config/seo";
import { PageHero } from "@/components/PageHero";
import { TitledList } from "@/components/TitledList";
import { FAQ } from "@/components/FAQ";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

// Stock photo per industry (temporary — replace with real job photos).
const INDUSTRY_IMAGES: Record<string, { src: string; alt: string }> = {
  "ranching-agriculture": { src: "/photos/tractor-ag.jpg", alt: "Tractor working an agricultural field" },
  "construction-excavation": { src: "/photos/excavation.jpg", alt: "Excavator moving dirt on a jobsite" },
  "municipal-public-works": { src: "/photos/backhoe-municipal.jpg", alt: "Backhoe loader used for public-works" },
  "trucking-trailers": { src: "/photos/service-truck.jpg", alt: "Service truck with hydraulic equipment" },
};

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = industryBySlug(params.slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.h1,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

// Core services surfaced on every industry page.
const CORE_SERVICES = ["mobile-hydraulic-hose-repair", "equipment-field-service", "after-hours-repair"];

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industryBySlug(params.slug);
  if (!industry) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  const relatedServices = services.filter((s) => CORE_SERVICES.includes(s.slug));

  return (
    <>
      <JsonLd data={[faqSchema(industry.faqs), breadcrumbSchema(breadcrumbs)]} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Industry"
        title={industry.h1}
        directAnswer={industry.directAnswer}
        icon={industry.icon}
      />

      <section className="container-x py-14 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {industry.description.map((p) => (
              <p key={p} className="font-body text-lg leading-relaxed text-steel">
                {p}
              </p>
            ))}
          </div>
          <ImagePlaceholder
            src={INDUSTRY_IMAGES[industry.slug]?.src}
            label={INDUSTRY_IMAGES[industry.slug]?.alt ?? `${industry.name} equipment serviced on-site`}
            ratio="4 / 3"
          />
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x grid gap-6 py-14 md:grid-cols-2 md:py-16">
          <TitledList title="Common jobs" items={industry.commonJobs} />
          <TitledList title="Equipment we work on" items={industry.equipmentTypes} bullet="wrench" />
        </div>
      </section>

      <section className="container-x py-14 md:py-16">
        <SectionHeader eyebrow="Services" title="How we help this work" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {relatedServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-center gap-3 rounded-md border border-graphite-600 bg-graphite-700/40 p-5 transition-colors hover:border-hivis/70"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-graphite-900 text-hivis">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="font-heading text-base font-bold uppercase leading-tight text-smoke">
                {s.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-16">
          <FAQ faqs={industry.faqs} />
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

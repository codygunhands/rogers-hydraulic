import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { articles } from "@/data/resources";
import { PageHero } from "@/components/PageHero";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Resources — Hydraulic Repair & Field Service Tips",
  description:
    "Practical guides on hydraulic hose failure, field repair, and preventative maintenance for ranch and construction equipment in East Texas.",
  path: "/resources",
});

export default function ResourcesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]}
        eyebrow="Resources"
        title="Field Notes on Hydraulic Repair"
        directAnswer="Practical, no-nonsense guides on what to do when a hose blows, how to spot a failure coming, and how to keep hard-run equipment working across East Texas."
        showCtas={false}
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/resources/${a.slug}`}
              className="group flex flex-col rounded-md border border-graphite-600 bg-graphite-700/40 p-6 transition-colors hover:border-hivis/70"
            >
              <span className="font-heading text-xs uppercase tracking-widest text-hivis">
                {a.readMinutes} min read
              </span>
              <h2 className="mt-3 font-heading text-xl font-bold uppercase leading-tight text-smoke">
                {a.title}
              </h2>
              <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-steel">
                {a.description}
              </p>
              <span
                aria-hidden
                className="mt-4 inline-flex items-center gap-1 font-heading text-sm font-bold uppercase tracking-stencil text-hivis"
              >
                Read <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

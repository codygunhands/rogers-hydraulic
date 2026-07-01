import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, articleBySlug } from "@/data/resources";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";
import { PageHero } from "@/components/PageHero";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { JsonLd } from "@/components/JsonLd";
import type { ArticleBlock } from "@/data/types";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articleBySlug(params.slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/resources/${article.slug}`,
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="font-body text-lg leading-relaxed text-steel">{block.text}</p>;
    case "h2":
      return (
        <h2 className="pt-4 font-heading text-2xl font-bold uppercase tracking-wide text-smoke">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 font-body text-lg leading-relaxed text-steel">
              <span className="mt-2.5 h-1.5 w-3 shrink-0 rounded-sm bg-hivis" aria-hidden />
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2">
          {block.items.map((it, i) => (
            <li key={it} className="flex gap-3 font-body text-lg leading-relaxed text-steel">
              <span className="shrink-0 font-heading font-bold text-hivis">{i + 1}.</span>
              {it}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <p className="rounded-md border-l-4 border-hivis bg-graphite-900 p-5 font-body text-lg italic leading-relaxed text-smoke">
          {block.text}
        </p>
      );
  }
}

function articleSchema(article: NonNullable<ReturnType<typeof articleBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: business.businessName },
    publisher: { "@id": `${business.baseUrl}/#organization` },
    mainEntityOfPage: `${business.baseUrl}/resources/${article.slug}`,
    image: `${business.baseUrl}/og/og-default.png`,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articleBySlug(params.slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: article.title, path: `/resources/${article.slug}` },
  ];

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={[articleSchema(article), breadcrumbSchema(breadcrumbs)]} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`Resources · ${article.readMinutes} min read`}
        title={article.title}
        showCtas={false}
      />

      <article className="container-x py-14 md:py-16">
        <div className="max-w-3xl space-y-5">
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 max-w-3xl rounded-md border border-hivis/50 bg-graphite-900 p-6">
          <p className="font-heading text-xl font-bold uppercase tracking-wide text-smoke">
            Equipment down? We come to you.
          </p>
          <p className="mt-2 font-body text-base leading-relaxed text-steel">
            Mobile hydraulic hose repair and field service across {business.serviceAreaShort}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={business.phoneHref}
              className="rounded-sm bg-hivis px-6 py-3 font-heading text-base font-bold uppercase tracking-stencil text-graphite hover:bg-hivis-dark"
            >
              Call {business.phone}
            </a>
            <Link
              href="/request-service"
              className="rounded-sm border-2 border-smoke/80 px-6 py-3 font-heading text-base font-bold uppercase tracking-stencil text-smoke hover:border-hivis hover:text-hivis"
            >
              Request Service
            </Link>
          </div>
        </div>
      </article>

      {more.length ? (
        <section className="container-x pb-16">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-smoke">
            More field notes
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {more.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}`}
                className="group rounded-md border border-graphite-600 bg-graphite-700/40 p-6 transition-colors hover:border-hivis/70"
              >
                <h3 className="font-heading text-lg font-bold uppercase leading-tight text-smoke">
                  {a.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-steel">{a.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <EmergencyCTA />
    </>
  );
}

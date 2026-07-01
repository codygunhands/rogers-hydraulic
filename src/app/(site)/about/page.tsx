import type { Metadata } from "next";
import { pageMetadata, breadcrumbSchema } from "@/config/seo";
import { business } from "@/config/business";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { AnswerBoxes } from "@/components/AnswerBoxes";
import { EmergencyCTA } from "@/components/EmergencyCTA";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "About Rogers Hydraulic & Equipment Services",
  description:
    "Rogers Hydraulic & Equipment Services is the local field-service specialist for hydraulic hose and equipment downtime across Madison County, Brazos County, and surrounding East Texas.",
  path: "/about",
});

const VALUES = [
  {
    title: "We come to you",
    text: "Field service means the repair goes to the machine. No loading and hauling a disabled machine to a shop when it can be fixed where it sits.",
  },
  {
    title: "Straight answers",
    text: "We tell you honestly what can be done on-site and what needs a shop or an ordered part — before the work, not after.",
  },
  {
    title: "Uptime is the goal",
    text: "The point is getting the machine running and the crew moving again with the least lost time.",
  },
  {
    title: "Built for the corridor",
    text: `Set up for mobile work across ${business.serviceAreaShort}, with Madisonville as the anchor.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        eyebrow="About"
        title="The Local Field-Service Specialist for Hydraulic & Equipment Downtime"
        directAnswer={`${business.businessName} provides mobile hydraulic hose repair, equipment field service, trailer repair, and after-hours repair across ${business.serviceAreaShort}. On-site. After hours. Back to work.`}
      />

      <section className="container-x py-14 md:py-16">
        <div className="max-w-3xl space-y-5">
          <p className="font-body text-lg leading-relaxed text-steel">
            Equipment does not break on a schedule. A blown hydraulic hose, a leaking cylinder, a
            trailer that will not dump, or a machine that quits in the field can stop a job and cost
            real money in downtime. Rogers Hydraulic exists to get that equipment back to work.
          </p>
          <p className="font-body text-lg leading-relaxed text-steel">
            We are a mobile field-service operation covering the Madison–Brazos corridor. Instead of
            being a shop you haul to, we bring practical hydraulic and equipment repair to the
            jobsite — for ranchers, contractors, municipalities, trailer operators, and industrial
            customers across the area.
          </p>
          <p className="font-body text-lg leading-relaxed text-steel">
            The approach is simple: show up, find the real problem, fix what can be fixed on-site
            when parts and conditions allow, and give an honest plan when a job needs more. Call for
            current availability.
          </p>
        </div>
      </section>

      <section className="border-t border-graphite-600 bg-graphite-900/40">
        <div className="container-x py-14 md:py-16">
          <SectionHeader eyebrow="How we work" title="The way we run" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-md border border-graphite-600 bg-graphite-700/40 p-6">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-smoke">
                  {v.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-steel">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-16">
        <SectionHeader eyebrow="The short version" title="What to know" />
        <div className="mt-10">
          <AnswerBoxes />
        </div>
      </section>

      <EmergencyCTA />
    </>
  );
}

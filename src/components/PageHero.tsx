import { Breadcrumbs } from "./Breadcrumbs";
import { PhoneButton } from "./PhoneButton";
import { CTAButton } from "./CTAButton";
import { Icon } from "./Icon";
import type { IconKey } from "@/data/types";

/** Interior-page hero: breadcrumbs + eyebrow + H1 + direct answer + CTAs. */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  directAnswer,
  icon,
  showCtas = true,
}: {
  breadcrumbs: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  directAnswer?: string;
  icon?: IconKey;
  showCtas?: boolean;
}) {
  return (
    <section className="bg-plate border-b border-graphite-600">
      <div className="container-x py-10 md:py-14">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex items-start gap-4">
          {icon ? (
            <span className="mt-1 hidden h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-graphite-900 text-hivis sm:flex">
              <Icon name={icon} size={26} />
            </span>
          ) : null}
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-2 max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[1.02] tracking-stencil text-smoke sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>

        {directAnswer ? (
          <p className="mt-6 max-w-3xl border-l-2 border-hivis pl-4 font-body text-lg leading-relaxed text-smoke">
            {directAnswer}
          </p>
        ) : null}

        {showCtas ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PhoneButton size="lg" />
            <CTAButton href="/request-service" variant="secondary" size="lg">
              Request Service
            </CTAButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PageHero;

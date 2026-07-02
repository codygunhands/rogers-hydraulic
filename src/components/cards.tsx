import Link from "next/link";
import { Icon } from "./Icon";
import type { IconKey } from "@/data/types";

const CARD =
  "group relative flex h-full flex-col rounded-md border border-graphite-600 bg-graphite-700/40 p-5 transition-colors hover:border-hivis/60 focus-within:border-hivis";

/** Subtle, secondary affordance — the whole card is the link. */
function Arrow() {
  return (
    <span
      aria-hidden
      className="mt-4 text-lg leading-none text-steel transition-all group-hover:translate-x-0.5 group-hover:text-hivis"
    >
      →
    </span>
  );
}

export function ServiceCard({
  href,
  name,
  blurb,
  icon,
}: {
  href: string;
  name: string;
  blurb: string;
  icon: IconKey;
}) {
  return (
    <Link href={href} className={CARD}>
      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-graphite-900 text-hivis">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="mt-4 font-heading text-xl font-bold uppercase leading-tight text-smoke">
        {name}
      </h3>
      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-steel">{blurb}</p>
      <Arrow />
    </Link>
  );
}

export function IndustryCard({
  href,
  name,
  blurb,
  icon,
}: {
  href: string;
  name: string;
  blurb: string;
  icon: IconKey;
}) {
  return (
    <Link href={href} className={CARD}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-graphite-900 text-hivis">
          <Icon name={icon} size={24} />
        </span>
        <h3 className="font-heading text-lg font-bold uppercase leading-tight text-smoke">
          {name}
        </h3>
      </div>
      <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-steel">{blurb}</p>
      <Arrow />
    </Link>
  );
}

export function ServiceAreaCard({
  href,
  city,
  county,
}: {
  href: string;
  city: string;
  county: string;
}) {
  return (
    <Link href={href} className={`${CARD} flex-row items-center gap-3`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-graphite-900 text-hivis">
        <Icon name="pin" size={20} />
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-lg font-bold uppercase leading-tight text-smoke">
          {city}, TX
        </span>
        <span className="block font-body text-xs text-steel">{county}</span>
      </span>
      <span aria-hidden className="ml-auto text-hivis transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

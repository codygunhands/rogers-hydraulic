import { Icon } from "./Icon";
import type { IconKey } from "@/data/types";

/** A titled list card with icon bullets. Used across service/industry pages. */
export function TitledList({
  title,
  items,
  bullet = "check",
  numbered = false,
}: {
  title: string;
  items: string[];
  bullet?: IconKey;
  numbered?: boolean;
}) {
  return (
    <div className="rounded-md border border-graphite-600 bg-graphite-700/40 p-6">
      <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-smoke">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item, i) => (
          <li key={item} className="flex gap-3 font-body text-sm leading-relaxed text-steel">
            {numbered ? (
              <span className="mt-0.5 shrink-0 font-heading text-sm font-bold text-hivis">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="mt-0.5 shrink-0 text-hivis" aria-hidden>
                <Icon name={bullet} size={16} />
              </span>
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TitledList;

import { trustItems } from "@/data/site";
import { Icon } from "./Icon";

/** Horizontal capability bar shown under the hero. */
export function TrustBar() {
  return (
    <div className="border-y border-graphite-600 bg-graphite-900">
      <div className="container-x">
        <ul className="grid grid-cols-2 divide-graphite-600 md:grid-cols-3 md:divide-x lg:grid-cols-6">
          {trustItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2.5 px-2 py-4 md:justify-center"
            >
              <span className="text-hivis" aria-hidden>
                <Icon name={item.icon} size={20} />
              </span>
              <span className="font-heading text-sm font-semibold uppercase tracking-wide text-smoke">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrustBar;

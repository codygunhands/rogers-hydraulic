import Link from "next/link";

/** Visual breadcrumbs. Pair with breadcrumbSchema() JSON-LD on the page. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-body text-xs text-steel">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-steel">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-smoke">
                  {item.name}
                </Link>
              )}
              {!last ? <span aria-hidden className="text-graphite-500">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

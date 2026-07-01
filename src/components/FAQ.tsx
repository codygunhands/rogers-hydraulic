import type { FAQ as FAQType } from "@/data/types";
import { SectionHeader } from "./SectionHeader";

/**
 * FAQ accordion using native <details> — works with no JS, accessible, and the
 * text is crawlable for GEO / featured snippets. Pair with faqSchema() JSON-LD.
 */
export function FAQ({
  faqs,
  title = "Frequently Asked Questions",
  eyebrow = "FAQ",
}: {
  faqs: FAQType[];
  title?: string;
  eyebrow?: string;
}) {
  if (!faqs.length) return null;
  return (
    <div>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="mt-8 divide-y divide-graphite-600 border-y border-graphite-600">
        {faqs.map((f) => (
          <details key={f.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold uppercase tracking-wide text-smoke marker:hidden">
              {f.question}
              <span
                aria-hidden
                className="shrink-0 text-2xl font-normal leading-none text-hivis transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-3xl font-body text-base leading-relaxed text-steel">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default FAQ;

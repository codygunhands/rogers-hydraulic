/** Shared prose layout for legal pages (privacy / terms). */
export function LegalBody({
  updated,
  sections,
}: {
  updated: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <section className="container-x py-14 md:py-16">
      <div className="max-w-3xl">
        <p className="rounded-sm border border-graphite-600 bg-graphite-900 p-4 font-body text-sm text-steel">
          {updated}
        </p>
        <div className="mt-8 space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-smoke">
                {s.h}
              </h2>
              <div className="mt-3 space-y-3">
                {s.p.map((para) => (
                  <p key={para} className="font-body text-base leading-relaxed text-steel">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LegalBody;

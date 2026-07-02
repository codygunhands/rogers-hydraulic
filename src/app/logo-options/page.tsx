import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo Options — Rogers Hydraulic",
  description: "Pick a logo direction.",
  robots: { index: false, follow: false },
};

/* Each direction rendered as live text (Barlow Condensed) so it's crisp + true to final. */

type Theme = "dark" | "light";

function Dir({ id, theme }: { id: "A" | "B" | "C" | "D"; theme: Theme }) {
  const primary = theme === "light" ? "text-graphite" : "text-smoke";
  const sec = theme === "light" ? "text-steel" : "text-[#AEB6BF]";

  if (id === "A") {
    return (
      <div className="flex items-stretch gap-4">
        <div className="flex flex-col leading-[0.9]">
          <span className={`font-heading text-5xl font-extrabold uppercase sm:text-6xl ${primary}`}>Rogers</span>
          <span className={`font-heading text-5xl font-extrabold uppercase sm:text-6xl ${primary}`}>Hydraulic</span>
          <span className={`mt-1.5 font-heading text-xs font-semibold uppercase tracking-[0.3em] ${sec}`}>
            Equipment Services
          </span>
        </div>
        <span className="w-2 self-stretch bg-hivis" aria-hidden />
      </div>
    );
  }
  if (id === "B") {
    return (
      <div>
        <div className="font-heading text-5xl font-extrabold uppercase leading-none sm:text-6xl">
          <span className={primary}>Rogers </span>
          <span className="text-hivis">Hydraulic</span>
        </div>
        <div className="mt-2 h-[3px] w-14 bg-hivis" aria-hidden />
        <span className={`mt-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.34em] ${sec}`}>
          Equipment Services
        </span>
      </div>
    );
  }
  if (id === "C") {
    return (
      <div>
        <span
          className={`inline-block rounded border-[3px] border-hivis px-5 py-2 ${
            theme === "light" ? "bg-white" : "bg-graphite-700"
          }`}
        >
          <span className={`font-heading text-4xl font-extrabold uppercase tracking-wide sm:text-5xl ${primary}`}>
            Rogers Hydraulic
          </span>
        </span>
        <span className={`mt-2 block font-heading text-xs font-semibold uppercase tracking-[0.34em] ${sec}`}>
          Equipment Services
        </span>
      </div>
    );
  }
  // D — hydraulic line + elbow
  return (
    <div className="inline-block">
      <div className={`font-heading text-5xl font-extrabold uppercase leading-none sm:text-6xl ${primary}`}>
        Rogers Hydraulic
      </div>
      <div className="relative mt-1.5 h-4" aria-hidden>
        <div className="absolute left-0 top-0 h-[5px] w-full bg-hivis" />
        <div className="absolute right-0 -top-4 h-5 w-[5px] bg-hivis" />
      </div>
      <span className={`mt-1 block font-heading text-xs font-semibold uppercase tracking-[0.34em] ${sec}`}>
        Equipment Services
      </span>
    </div>
  );
}

function Favicon({ id }: { id: "A" | "B" | "C" | "D" }) {
  const base =
    "flex h-20 w-20 items-center justify-center rounded-2xl bg-[#14181C] font-heading text-4xl font-extrabold";
  if (id === "B")
    return (
      <span className={base}>
        <span className="text-smoke">R</span>
        <span className="text-hivis">H</span>
      </span>
    );
  if (id === "C")
    return (
      <span className={`${base} border-[3px] border-hivis`}>
        <span className="text-smoke">RH</span>
      </span>
    );
  if (id === "A")
    return (
      <span className={`${base} gap-1`}>
        <span className="text-smoke">RH</span>
        <span className="h-10 w-1.5 bg-hivis" />
      </span>
    );
  return (
    <span className={`${base} relative`}>
      <span className="text-smoke">RH</span>
      <span className="absolute bottom-3 left-4 right-4 h-[3px] bg-hivis" />
    </span>
  );
}

const META: Record<"A" | "B" | "C" | "D", { name: string; note: string }> = {
  A: { name: "Stencil Stack", note: "Stacked, bold, lime bar. Biggest & most legible from distance." },
  B: { name: "Two-Tone", note: "ROGERS white + HYDRAULIC lime. Modern, punchy, cleanest favicon." },
  C: { name: "Nameplate Bar", note: "Wordmark in a lime-keyline plate. Stamped-tag look; busiest small." },
  D: { name: "Hydraulic Line", note: "Lime line runs under the wordmark and elbows up — graphic integrated into the type. Most distinctive." },
};

export default function LogoOptions() {
  const ids: ("A" | "B" | "C" | "D")[] = ["D", "B", "A", "C"];
  return (
    <main className="bg-plate min-h-dvh px-5 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Rogers Hydraulic · pick one</p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold uppercase tracking-stencil text-smoke">
          Logo Directions
        </h1>
        <p className="mt-3 font-body text-base text-steel">
          All emblem-free integrated wordmarks. Each is shown on dark, on light, and as the
          favicon / app icon. Reply with the letter you want (D, B, A, or C) and I&apos;ll build it
          everywhere.
        </p>

        <div className="mt-10 space-y-8">
          {ids.map((id) => (
            <section key={id} className="overflow-hidden rounded-lg border border-graphite-600">
              <div className="flex items-center justify-between border-b border-graphite-600 bg-graphite-900 px-5 py-3">
                <span className="font-heading text-xl font-bold uppercase tracking-wide text-smoke">
                  <span className="text-hivis">{id}</span> — {META[id].name}
                </span>
                <span className="hidden font-body text-sm text-steel sm:block">{META[id].note}</span>
              </div>
              <div className="grid gap-px bg-graphite-600 sm:grid-cols-[1fr_1fr_auto]">
                <div className="flex min-h-[170px] items-center bg-graphite px-8 py-10">
                  <Dir id={id} theme="dark" />
                </div>
                <div className="flex min-h-[170px] items-center bg-smoke px-8 py-10">
                  <Dir id={id} theme="light" />
                </div>
                <div className="flex min-h-[170px] items-center justify-center bg-graphite-900 px-8">
                  <Favicon id={id} />
                </div>
              </div>
              <p className="border-t border-graphite-600 bg-graphite-900 px-5 py-3 font-body text-sm text-steel sm:hidden">
                {META[id].note}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

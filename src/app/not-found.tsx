import Link from "next/link";
import { LogoTextLockup } from "@/components/LogoTextLockup";
import { business } from "@/config/business";

export default function NotFound() {
  return (
    <main className="bg-plate flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <LogoTextLockup layout="stacked" theme="dark" size={44} />
      <p className="mt-10 font-heading text-6xl font-extrabold tracking-stencil text-hivis">404</p>
      <h1 className="mt-2 font-heading text-2xl font-bold uppercase tracking-wide text-smoke">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-steel">
        That page isn&apos;t here. If your equipment is down, the fastest way to reach us is by phone.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={business.phoneHref}
          className="rounded-sm bg-hivis px-6 py-3 font-heading text-base font-bold uppercase tracking-stencil text-graphite hover:bg-hivis-dark"
        >
          Call {business.phone}
        </a>
        <Link
          href="/"
          className="rounded-sm border-2 border-smoke/80 px-6 py-3 font-heading text-base font-bold uppercase tracking-stencil text-smoke hover:border-hivis hover:text-hivis"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}

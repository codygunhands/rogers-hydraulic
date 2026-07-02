import Link from "next/link";
import { business } from "@/config/business";
import { tracking } from "@/config/tracking";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/service-areas";
import { LogoTextLockup } from "./LogoTextLockup";
import { Icon } from "./Icon";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
  { label: "Request Service", href: "/request-service" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const displayNumber = tracking.callTrackingNumber || business.phone;
  const year = 2026; // build-time constant; avoids hydration drift

  return (
    <footer className="border-t border-graphite-600 bg-graphite-900">
      <div className="container-x py-14">
        {/* Brand row — full width so the logo never collides with columns */}
        <div className="flex flex-col gap-8 border-b border-graphite-600 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <LogoTextLockup layout="horizontal" theme="dark" size={30} />
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-steel">
              {business.serviceArea}
            </p>
          </div>
          <div className="shrink-0">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-hivis">
              Dispatch
            </p>
            <a
              href={business.phoneHref}
              className="mt-1 flex items-center gap-2 font-heading text-3xl font-bold tracking-stencil text-smoke hover:text-hivis"
            >
              <Icon name="phone" size={24} />
              {displayNumber}
            </a>
            <a
              href={business.smsHref}
              className="mt-2 flex items-center gap-2 font-heading text-base font-semibold uppercase tracking-wide text-hivis hover:text-hivis-dark"
            >
              <Icon name="message" size={18} />
              Text Photos
            </a>
            <a
              href={`mailto:${business.email}`}
              className="mt-3 block font-body text-sm text-steel hover:text-smoke"
            >
              {business.email}
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 pt-10 md:grid-cols-3">
          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-hivis">Services</h2>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-body text-sm text-steel transition-colors hover:text-smoke">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-hivis">Service Area</h2>
            <ul className="mt-4 space-y-2">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-area/${a.slug}`} className="font-body text-sm text-steel transition-colors hover:text-smoke">
                    {a.city}, TX
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-hivis">Company</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="font-body text-sm text-steel transition-colors hover:text-smoke">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer + legal */}
      <div className="border-t border-graphite-600">
        <div className="container-x flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl font-body text-xs leading-relaxed text-steel/80">
            Availability, response time, and service capability vary by location, job type, parts
            availability, weather, and active call volume.
          </p>
          <p className="font-body text-xs text-steel/80">© {year} {business.legalName}</p>
        </div>
      </div>

      {/* spacer so the mobile sticky call bar never covers footer content */}
      <div className="h-16 lg:hidden" aria-hidden />
    </footer>
  );
}

export default Footer;

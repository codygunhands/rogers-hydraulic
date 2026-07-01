import Link from "next/link";
import { business } from "@/config/business";
import { tracking } from "@/config/tracking";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/service-areas";
import { LogoTextLockup } from "./LogoTextLockup";
import { Icon } from "./Icon";

export function Footer() {
  const displayNumber = tracking.callTrackingNumber || business.phone;
  const year = 2026; // build-time constant; avoids per-render Date and hydration drift

  return (
    <footer className="border-t border-graphite-600 bg-graphite-900">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + contact */}
        <div className="lg:col-span-1">
          <LogoTextLockup layout="horizontal" theme="dark" size={38} />
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-steel">
            {business.serviceArea}
          </p>
          <div className="mt-5 space-y-2">
            <a
              href={business.phoneHref}
              className="flex items-center gap-2 font-heading text-lg font-bold uppercase tracking-stencil text-smoke hover:text-hivis"
            >
              <Icon name="phone" size={18} />
              {displayNumber}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="block font-body text-sm text-steel hover:text-smoke"
            >
              {business.email}
            </a>
            <p className="font-body text-sm text-steel">
              {business.baseCity}, {business.state}
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-hivis">
            Services
          </h2>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="font-body text-sm text-steel transition-colors hover:text-smoke"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service area */}
        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-hivis">
            Service Area
          </h2>
          <ul className="mt-4 space-y-2">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-area/${a.slug}`}
                  className="font-body text-sm text-steel transition-colors hover:text-smoke"
                >
                  {a.city}, TX
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + legal */}
        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-hivis">
            Company
          </h2>
          <ul className="mt-4 space-y-2">
            <li><Link href="/about" className="font-body text-sm text-steel hover:text-smoke">About</Link></li>
            <li><Link href="/industries" className="font-body text-sm text-steel hover:text-smoke">Industries</Link></li>
            <li><Link href="/resources" className="font-body text-sm text-steel hover:text-smoke">Resources</Link></li>
            <li><Link href="/contact" className="font-body text-sm text-steel hover:text-smoke">Contact</Link></li>
            <li><Link href="/request-service" className="font-body text-sm text-steel hover:text-smoke">Request Service</Link></li>
            <li><Link href="/privacy" className="font-body text-sm text-steel hover:text-smoke">Privacy</Link></li>
            <li><Link href="/terms" className="font-body text-sm text-steel hover:text-smoke">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Disclaimer + legal line */}
      <div className="border-t border-graphite-600">
        <div className="container-x flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl font-body text-xs leading-relaxed text-graphite-500">
            Availability, response time, and service capability vary by location, job type,
            parts availability, weather, and active call volume.
          </p>
          <p className="font-body text-xs text-graphite-500">
            © {year} {business.legalName}
          </p>
        </div>
      </div>

      {/* spacer so mobile sticky bar never covers footer content */}
      <div className="h-16 lg:hidden" aria-hidden />
    </footer>
  );
}

export default Footer;

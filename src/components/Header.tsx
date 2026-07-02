"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoTextLockup } from "./LogoTextLockup";
import { PhoneButton } from "./PhoneButton";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Service Area", href: "/service-area" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the mobile menu on route change.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-graphite-600 bg-graphite-900/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-900/80">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Rogers Hydraulic — home" className="flex shrink-0 items-center">
          {/* compact RH mark on phones (guarantees room for the menu button); full wordmark on ≥md */}
          <LogoTextLockup layout="icon" theme="dark" size={24} className="md:hidden" />
          <LogoTextLockup layout="wordmark" theme="dark" size={30} className="hidden md:inline-flex" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-heading text-sm font-semibold uppercase tracking-widest transition-colors hover:text-hivis ${
                  active ? "text-hivis" : "text-smoke"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <PhoneButton />
        </div>

        {/* Mobile: menu only. Calling is handled by the hero + sticky bottom bar. */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-graphite-600 text-smoke"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div id="mobile-nav" className="border-t border-graphite-600 bg-graphite-900 lg:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-graphite-700 py-3 font-heading text-base font-semibold uppercase tracking-widest text-smoke"
              >
                {item.label}
                <span aria-hidden className="text-hivis">→</span>
              </Link>
            ))}
            <div className="py-4">
              <PhoneButton size="lg" className="w-full" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Header;

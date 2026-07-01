import * as React from "react";
import type { IconKey } from "@/data/types";

/**
 * Simple line-icon set (24x24, stroke = currentColor). Industrial, not cartoon.
 * One component, keyed by IconKey, so data files can reference icons by name.
 */

const PATHS: Record<IconKey, React.ReactNode> = {
  hose: (
    <>
      <path d="M4 5h3a0 0 0 0 1 0 0v3a0 0 0 0 1 0 0H4z" />
      <path d="M4 6.5c6 0 4 11 10 11 3 0 3.5-2 3.5-3.5" />
      <rect x="16" y="11" width="5" height="6" rx="1" />
      <path d="M18.5 11V9M18.5 17v2" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2l-5 5a1.8 1.8 0 0 0 2.5 2.5l5-5a4 4 0 0 0 5.2-5.4l-2.3 2.3-2.1-.4-.4-2.1z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  trailer: (
    <>
      <path d="M3 15h14V8H3zM17 15h3l1-3h-4z" />
      <circle cx="8" cy="17.5" r="1.6" />
      <circle cx="18" cy="17.5" r="1.6" />
      <path d="M2 15h1" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.5v5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5v-5z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  gauge: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12l4-3" />
      <path d="M12 12v.01" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h11v9H2zM13 9h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
    </>
  ),
  tractor: (
    <>
      <path d="M4 8h5l1 4h4" />
      <circle cx="7" cy="16" r="3.2" />
      <circle cx="17.5" cy="16.5" r="2.2" />
      <path d="M13 12V7h3l2 5" />
    </>
  ),
  excavator: (
    <>
      <path d="M3 18h9v-3H4z" />
      <path d="M6 15l1-3h3" />
      <path d="M10 12l4-5 5 2-3 4" />
      <circle cx="4.5" cy="18.5" r="1.4" />
      <circle cx="10.5" cy="18.5" r="1.4" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
    </>
  ),
  factory: (
    <>
      <path d="M4 20V10l5 3V10l5 3V7l6 4v9z" />
      <path d="M4 20h16" />
    </>
  ),
  phone: (
    <path d="M6 3h3l2 5-2 1.5a11 11 0 0 0 5 5L21 12l1 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4.5 6.5-7.7 6.5-11a6.5 6.5 0 1 0-13 0c0 3.3 2.5 6.5 6.5 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconKey;
  size?: number;
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}

export default Icon;

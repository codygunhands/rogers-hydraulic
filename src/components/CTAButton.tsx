import Link from "next/link";
import * as React from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm font-heading font-bold uppercase tracking-stencil transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hivis disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-hivis text-graphite hover:bg-hivis-dark",
  secondary: "border-2 border-smoke/80 text-smoke hover:border-hivis hover:text-hivis",
  ghost: "text-smoke hover:text-hivis",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Show a leading phone icon (for call CTAs). */
  withPhoneIcon?: boolean;
  "aria-label"?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withPhoneIcon,
  ...rest
}: CTAButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className ?? ""}`;
  const content = (
    <>
      {withPhoneIcon ? <Icon name="phone" size={18} /> : null}
      {children}
    </>
  );

  // tel:/mailto: use a native anchor; internal links use next/link.
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export default CTAButton;

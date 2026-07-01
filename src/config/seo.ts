import type { Metadata } from "next";
import { business, areaServedCities, areaServedCounties, activeSocialLinks } from "./business";

/**
 * Reusable SEO metadata utilities. Every page composes its metadata from
 * pageMetadata() so titles, canonicals, OpenGraph, and Twitter cards stay
 * consistent and unique.
 */

const DEFAULT_TITLE = `${business.businessName} | Mobile Hydraulic Hose Repair — Madison & Brazos County`;
const TITLE_TEMPLATE = `%s | ${business.displayName}`;
const DEFAULT_DESCRIPTION =
  "Mobile hydraulic hose repair, equipment field service, trailer repair, and after-hours repair serving Madison County, Brazos County, and surrounding East Texas. On-site. After hours. Back to work.";

const OG_IMAGE = {
  url: "/og/og-default.png",
  width: 1200,
  height: 630,
  alt: "Rogers Hydraulic & Equipment Services — On-Site. After Hours. Back to Work.",
};

export const siteMetadataBase: Metadata = {
  metadataBase: new URL(business.baseUrl),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: business.businessName,
  authors: [{ name: business.businessName }],
  creator: business.businessName,
  publisher: business.businessName,
  formatDetection: { telephone: true, address: false, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.baseUrl,
    siteName: business.businessName,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string; // absolute path starting with "/"
  noindex?: boolean;
};

/** Build per-page metadata with canonical + OG/Twitter derived from inputs. */
export function pageMetadata({ title, description, path, noindex }: PageMetaInput): Metadata {
  const url = `${business.baseUrl}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? DEFAULT_TITLE : `${title} | ${business.displayName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: business.businessName,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

const AREA_SERVED = [
  ...areaServedCounties.map((c) => ({
    "@type": "AdministrativeArea",
    name: `${c.name}, ${c.region}`,
  })),
  ...areaServedCities.map((c) => ({
    "@type": "City",
    name: `${c.name}, ${c.region}`,
  })),
];

/** LocalBusiness schema. Omits streetAddress when no real address is set. */
export function localBusinessSchema() {
  const sameAs = activeSocialLinks();
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutomotiveBusiness"],
    "@id": `${business.baseUrl}/#business`,
    name: business.businessName,
    alternateName: business.displayName,
    description:
      "Mobile hydraulic hose repair, equipment field service, trailer repair, and after-hours repair serving Madison County, Brazos County, and surrounding East Texas.",
    url: business.baseUrl,
    telephone: business.phone,
    email: business.email,
    slogan: business.tagline,
    areaServed: AREA_SERVED,
    knowsAbout: [
      "Mobile hydraulic hose repair",
      "Hydraulic equipment field service",
      "Trailer repair",
      "After-hours equipment repair",
      "Preventative hydraulic maintenance",
    ],
    ...(business.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: business.address.streetAddress,
            addressLocality: business.address.addressLocality,
            addressRegion: business.address.addressRegion,
            postalCode: business.address.postalCode,
            addressCountry: "US",
          },
        }
      : {
          address: {
            "@type": "PostalAddress",
            addressLocality: business.baseCity,
            addressRegion: business.state,
            addressCountry: "US",
          },
        }),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      geoRadius: `${business.serviceRadiusMiles * 1609}`, // meters
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema() {
  const sameAs = activeSocialLinks();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${business.baseUrl}/#organization`,
    name: business.businessName,
    url: business.baseUrl,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${business.baseUrl}/#website`,
    url: business.baseUrl,
    name: business.businessName,
    publisher: { "@id": `${business.baseUrl}/#organization` },
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
};

export function serviceSchema({ name, description, path, serviceType }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${business.baseUrl}${path}`,
    provider: { "@id": `${business.baseUrl}/#business` },
    areaServed: AREA_SERVED,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: business.phone,
        contactType: "dispatch",
      },
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.baseUrl}${item.path}`,
    })),
  };
}

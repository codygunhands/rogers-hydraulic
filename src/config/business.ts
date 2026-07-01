/**
 * SINGLE SOURCE OF TRUTH for business identity, contact, and service area.
 *
 * Dylan: change values here and they propagate site-wide (header, footer,
 * metadata, JSON-LD, llms.txt, forms). Search for "REPLACE" to find every
 * placeholder that should be updated before go-live.
 */

export const business = {
  // Identity
  businessName: "Rogers Hydraulic & Equipment Services", // legal / formal name
  displayName: "Rogers Hydraulic", // large truck / header line
  displaySecondary: "Equipment Services",
  legalName: "Rogers Hydraulic & Equipment Services, LLC",
  tagline: "On-Site. After Hours. Back to Work.",

  // Contact — REPLACE placeholders with live values
  phone: "936-000-0000",
  phoneHref: "tel:+19360000000",
  email: "service@rogershydraulic.com",

  // Domain / URLs — REPLACE before deploy
  domain: "rogershydraulic.com",
  baseUrl: "https://rogershydraulic.com",

  // Location — NO fake street address. Service-area business.
  baseCity: "Madisonville",
  state: "TX",
  stateName: "Texas",
  // REPLACE only if/when a real shop address exists. Leave null to omit
  // streetAddress from JSON-LD and render service-area instead.
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  },
  geo: {
    // Madisonville, TX approximate coordinates (center of service area).
    latitude: 30.9491,
    longitude: -95.9111,
  },

  // Service area — public-facing. Lovelady intentionally omitted.
  serviceArea: "Serving Madison County, Brazos County, and surrounding East Texas.",
  serviceAreaShort: "Madison County, Brazos County, and surrounding East Texas",
  serviceRadiusMiles: 55,

  // Hours — honest, no hard 24/7 claim
  hoursText: "Business hours by appointment. Emergency and after-hours calls accepted — call for current availability.",
  afterHoursNote: "After-hours service available.",

  // Compliance flags — only claim what is TRUE. Flip to true when verified.
  flags: {
    licensedAndInsured: false, // do NOT display "licensed & insured" unless true
    familyOwned: false,
  },

  // External profile placeholders — fill in when live, else omitted from schema
  googleBusinessUrl: "", // REPLACE with Google Business Profile URL
  socialLinks: {
    facebook: "", // REPLACE or leave empty
    instagram: "",
    youtube: "",
    linkedin: "",
  },
} as const;

/** sameAs list for JSON-LD — only non-empty profile URLs. */
export function activeSocialLinks(): string[] {
  return [
    business.socialLinks.facebook,
    business.socialLinks.instagram,
    business.socialLinks.youtube,
    business.socialLinks.linkedin,
    business.googleBusinessUrl,
  ].filter((u) => u.length > 0);
}

/** Cities named in areaServed for LocalBusiness schema and copy. */
export const areaServedCities = [
  { name: "Madisonville", region: "TX" },
  { name: "Bryan", region: "TX" },
  { name: "College Station", region: "TX" },
  { name: "Navasota", region: "TX" },
  { name: "Huntsville", region: "TX" },
  { name: "North Zulch", region: "TX" },
  { name: "Normangee", region: "TX" },
] as const;

export const areaServedCounties = [
  { name: "Madison County", region: "TX" },
  { name: "Brazos County", region: "TX" },
] as const;

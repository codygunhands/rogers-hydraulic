/** Shared content types for data-driven service / industry / area / article pages. */

export type FAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Card + nav label */
  name: string;
  /** Short card blurb */
  blurb: string;
  /** Lucide-free inline icon key (see components/icons) */
  icon: IconKey;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Direct-answer paragraph (GEO / featured-snippet friendly) */
  directAnswer: string;
  /** Longer description paragraphs */
  description: string[];
  problemsSolved: string[];
  equipmentTypes: string[];
  whatToExpect: string[];
  faqs: FAQ[];
  /** slugs of related services */
  related: string[];
  keywords: string[];
  /** Optional photo (public path) + alt shown on the detail page */
  image?: string;
  imageAlt?: string;
};

export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  icon: IconKey;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  description: string[];
  commonJobs: string[];
  equipmentTypes: string[];
  faqs: FAQ[];
  keywords: string[];
  image?: string;
  imageAlt?: string;
};

export type ServiceArea = {
  slug: string;
  city: string;
  /** e.g. "Madison County" */
  county: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  description: string[];
  /** Local context / landmarks / who we serve here */
  localContext: string[];
  nearby: string[];
  faqs: FAQ[];
  keywords: string[];
};

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  /** Simple block content */
  body: ArticleBlock[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string };

export type IconKey =
  | "hose"
  | "wrench"
  | "clock"
  | "trailer"
  | "shield"
  | "gauge"
  | "cylinder"
  | "truck"
  | "tractor"
  | "excavator"
  | "building"
  | "factory"
  | "phone"
  | "message"
  | "check"
  | "pin";

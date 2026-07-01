import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { serviceAreas } from "@/data/service-areas";
import { articles } from "@/data/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.baseUrl;
  const now = new Date("2026-07-01");

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.8 },
    { path: "/service-area", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/request-service", priority: 0.9 },
    { path: "/resources", priority: 0.6 },
  ];

  const dynamic = [
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.7 })),
    ...serviceAreas.map((a) => ({ path: `/service-area/${a.slug}`, priority: 0.8 })),
    ...articles.map((a) => ({ path: `/resources/${a.slug}`, priority: 0.5 })),
  ];

  return [...staticRoutes, ...dynamic].map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}

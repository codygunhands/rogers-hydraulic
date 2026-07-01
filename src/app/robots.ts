import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/brand"],
      },
    ],
    sitemap: `${business.baseUrl}/sitemap.xml`,
    host: business.baseUrl,
  };
}

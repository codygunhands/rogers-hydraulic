import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";
import { business } from "@/config/business";
import { PageHero } from "@/components/PageHero";
import { LegalBody } from "@/components/LegalBody";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${business.businessName}.`,
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
        eyebrow="Legal"
        title="Terms of Service"
        showCtas={false}
      />
      <LegalBody
        updated="These terms are a starting template and should be reviewed before launch."
        sections={[
          {
            h: "Overview",
            p: [
              `These terms apply to the ${business.businessName} website and the information presented on it. By using this website you agree to these terms.`,
            ],
          },
          {
            h: "Service availability",
            p: [
              "Availability, response time, and service capability vary by location, job type, parts availability, weather, and active call volume. Nothing on this website is a guarantee of a specific arrival time or that a particular repair can be completed on-site.",
              "Emergency and after-hours calls are accepted, but we do not advertise guaranteed 24/7 service. Call for current availability.",
            ],
          },
          {
            h: "Estimates and pricing",
            p: [
              "Any pricing discussed is quoted around the specific job. Service-call fees, labor, parts, distance, and after-hours or weekend timing affect the total. Pricing is confirmed with you before work proceeds where practical.",
            ],
          },
          {
            h: "Website information",
            p: [
              "We work to keep the information on this website accurate, but it is provided as general information and may change without notice. It does not constitute a professional or contractual commitment on its own.",
            ],
          },
          {
            h: "Contact",
            p: [
              `Questions about these terms can be directed to ${business.email} or ${business.phone}.`,
            ],
          },
        ]}
      />
    </>
  );
}

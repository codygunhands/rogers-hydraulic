import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";
import { business } from "@/config/business";
import { PageHero } from "@/components/PageHero";
import { LegalBody } from "@/components/LegalBody";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${business.businessName}.`,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
        eyebrow="Legal"
        title="Privacy Policy"
        showCtas={false}
      />
      <LegalBody
        updated="This policy is a starting template and should be reviewed before launch."
        sections={[
          {
            h: "What we collect",
            p: [
              `When you contact ${business.businessName} through our website forms, by phone, by text, or by email, we collect the information you provide — such as your name, company, phone number, email address, jobsite location, equipment details, and a description of your request.`,
              "Our website may also collect standard technical data (such as pages visited and general device information) through analytics tools if they are enabled.",
            ],
          },
          {
            h: "How we use it",
            p: [
              "We use the information you provide to respond to your service request, communicate about scheduling and work, and provide the services you ask for. We may use basic analytics to understand how the site is used and improve it.",
              "We do not sell your personal information.",
            ],
          },
          {
            h: "Communications",
            p: [
              "By submitting a request or agreeing to be contacted, you consent to be reached by phone, text, or email about your inquiry. You can ask us to stop contacting you at any time.",
            ],
          },
          {
            h: "Third-party services",
            p: [
              "We may use third-party providers for website hosting, analytics, and message delivery. These providers process data only as needed to provide their service.",
            ],
          },
          {
            h: "Contact",
            p: [
              `Questions about this policy can be directed to ${business.email} or ${business.phone}.`,
            ],
          },
        ]}
      />
    </>
  );
}

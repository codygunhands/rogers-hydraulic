import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyStrip } from "@/components/EmergencyStrip";
import { MobileStickyCallBar } from "@/components/MobileStickyCallBar";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema, organizationSchema } from "@/config/seo";

/** Marketing site chrome. /brand lives outside this group and gets no chrome. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), websiteSchema(), organizationSchema()]} />
      <EmergencyStrip />
      <Header />
      <main id="main" className="overflow-x-clip">{children}</main>
      <Footer />
      <MobileStickyCallBar />
    </>
  );
}

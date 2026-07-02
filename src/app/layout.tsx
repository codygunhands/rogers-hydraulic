import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { siteMetadataBase } from "@/config/seo";
import { tracking, trackingEnabled } from "@/config/tracking";
import "./globals.css";

// Oswald = industrial display / headings / logo. Inter = body / UI.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  ...siteMetadataBase,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  ...(trackingEnabled.gsc
    ? { verification: { google: tracking.gscVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#1E2329",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-graphite text-smoke antialiased">
        {children}
      </body>
    </html>
  );
}

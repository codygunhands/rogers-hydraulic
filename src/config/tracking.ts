/**
 * Analytics / tracking placeholders.
 *
 * NOTHING is hardcoded. IDs are read from environment variables so nothing
 * loads until Dylan sets them. Missing vars = tracking simply disabled (no
 * crash, no console errors).
 *
 * To enable, set any of these in .env.local or the Vercel dashboard:
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_GSC_VERIFICATION=xxxxxxxx   (Search Console meta verification)
 *   NEXT_PUBLIC_META_PIXEL_ID=xxxxxxxxxx    (optional)
 *   NEXT_PUBLIC_CALL_TRACKING_NUMBER=936-000-0000 (optional display override)
 */

export const tracking = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  // Optional call-tracking number that overrides the display phone only.
  callTrackingNumber: process.env.NEXT_PUBLIC_CALL_TRACKING_NUMBER ?? "",
} as const;

export const trackingEnabled = {
  ga: tracking.gaId.length > 0,
  gsc: tracking.gscVerification.length > 0,
  metaPixel: tracking.metaPixelId.length > 0,
} as const;

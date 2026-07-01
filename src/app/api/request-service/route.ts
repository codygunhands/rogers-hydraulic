import { NextResponse } from "next/server";
import { requestServiceSchema } from "@/lib/request-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives a service request or contact message. Validates with zod and returns
 * success. Delivery is not wired yet — see TODO. The route never throws on
 * missing env vars, so the site works before an email provider is configured.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = requestServiceSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: silently accept bots without doing anything.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // TODO: wire up delivery. Structured so a provider drops in cleanly:
  //
  //   import { Resend } from "resend";
  //   if (process.env.RESEND_API_KEY) {
  //     const resend = new Resend(process.env.RESEND_API_KEY);
  //     await resend.emails.send({
  //       from: process.env.LEAD_FROM_EMAIL!,     // e.g. "leads@rogershydraulic.com"
  //       to: process.env.LEAD_TO_EMAIL!,         // where Dylan receives leads
  //       subject: `Service request — ${data.name} (${data.location})`,
  //       text: formatLead(data),
  //     });
  //   }
  //
  // SendGrid or SMTP (nodemailer) can be swapped in the same guarded way. Until
  // a provider is set, we log server-side so requests are visible in platform logs.
  if (process.env.NODE_ENV !== "production") {
    console.info("[request-service] lead received:", {
      source: data.source,
      name: data.name,
      phone: data.phone,
      location: data.location,
      urgent: data.urgent,
      afterHours: data.afterHours,
    });
  }

  return NextResponse.json({ ok: true });
}

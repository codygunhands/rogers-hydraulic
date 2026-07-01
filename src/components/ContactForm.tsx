"use client";

import * as React from "react";
import { requestServiceSchema } from "@/lib/request-schema";
import { business } from "@/config/business";
import { TextField, TextArea, CheckboxField } from "./forms/controls";
import { CTAButton } from "./CTAButton";

type Errors = Record<string, string | undefined>;
type Status = "idle" | "submitting" | "success" | "error";

/** Lighter contact form. Posts to the same /api/request-service endpoint. */
export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const [serverError, setServerError] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      problem: String(fd.get("problem") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      source: "contact" as const,
    };

    const parsed = requestServiceSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Errors = {};
      for (const [k, v] of Object.entries(flat)) next[k] = v?.[0];
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error ?? "Something went wrong. Please call us instead.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setServerError("Network error. Please call us instead.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-md border border-hivis/60 bg-graphite-900 p-8 text-center">
        <p className="font-heading text-2xl font-bold uppercase tracking-wide text-hivis">
          Message sent
        </p>
        <p className="mt-3 font-body text-base leading-relaxed text-steel">
          Thanks for reaching out. For anything time-sensitive, calling is fastest.
        </p>
        <div className="mt-6 flex justify-center">
          <CTAButton href={business.phoneHref} size="lg" withPhoneIcon>
            Call {business.phone}
          </CTAButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label="Name" required autoComplete="name" error={errors.name} />
        <TextField id="phone" label="Phone" type="tel" required autoComplete="tel" error={errors.phone} />
      </div>
      <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      <TextArea id="problem" label="How can we help?" required error={errors.problem} />

      <CheckboxField
        id="consent"
        label="I agree to be contacted about this message by phone, text, or email."
        error={errors.consent}
      />

      {status === "error" && serverError ? (
        <p role="alert" className="font-body text-sm text-amber">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-hivis px-7 py-3.5 font-heading text-lg font-bold uppercase tracking-stencil text-graphite transition-colors hover:bg-hivis-dark disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;

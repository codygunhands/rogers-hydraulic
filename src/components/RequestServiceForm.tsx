"use client";

import * as React from "react";
import { requestServiceSchema } from "@/lib/request-schema";
import { business } from "@/config/business";
import { TextField, TextArea, CheckboxField } from "./forms/controls";
import { CTAButton } from "./CTAButton";

type Errors = Record<string, string | undefined>;
type Status = "idle" | "submitting" | "success" | "error";

export function RequestServiceForm({ source = "request-service" as const }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const [serverError, setServerError] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      location: String(fd.get("location") ?? ""),
      equipment: String(fd.get("equipment") ?? ""),
      problem: String(fd.get("problem") ?? ""),
      urgent: fd.get("urgent") === "on",
      afterHours: fd.get("afterHours") === "on",
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      source,
    };

    const parsed = requestServiceSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Errors = {};
      for (const [k, v] of Object.entries(flat)) next[k] = v?.[0];
      setErrors(next);
      // focus first invalid field
      const firstKey = Object.keys(next)[0];
      if (firstKey) form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
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
        if (data.fieldErrors) {
          const next: Errors = {};
          for (const [k, v] of Object.entries(data.fieldErrors as Record<string, string[]>))
            next[k] = v?.[0];
          setErrors(next);
        }
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
      <div
        role="status"
        className="rounded-md border border-hivis/60 bg-graphite-900 p-8 text-center"
      >
        <p className="font-heading text-2xl font-bold uppercase tracking-wide text-hivis">
          Request received
        </p>
        <p className="mt-3 font-body text-base leading-relaxed text-steel">
          Thanks — we&apos;ll follow up as soon as we can. If your equipment is down right now
          and you need the fastest response, call us directly.
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
      {/* honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label="Name" required autoComplete="name" error={errors.name} />
        <TextField id="company" label="Company" autoComplete="organization" error={errors.company} />
        <TextField id="phone" label="Phone" type="tel" required autoComplete="tel" error={errors.phone} />
        <TextField id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      </div>

      <TextField
        id="location"
        label="Location / jobsite"
        required
        placeholder="Address, cross streets, or a dropped pin"
        error={errors.location}
      />
      <TextField
        id="equipment"
        label="Equipment type"
        placeholder="e.g. Skid steer, dump trailer, tractor + loader"
        error={errors.equipment}
      />
      <TextArea
        id="problem"
        label="Problem description"
        required
        placeholder="What failed, where it is on the machine, and whether it's accessible."
        error={errors.problem}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <CheckboxField id="urgent" label="This is urgent — equipment is down now." />
        <CheckboxField id="afterHours" label="After-hours request." />
      </div>

      <div className="rounded-sm border border-graphite-600 bg-graphite-900 p-4">
        <p className="font-body text-sm text-steel">
          <span className="font-semibold text-smoke">Photos help.</span> If you can, text a photo
          of the failed hose or fitting to{" "}
          <a href={business.phoneHref} className="text-hivis hover:underline">
            {business.phone}
          </a>{" "}
          after you submit — it speeds up bringing the right parts.
        </p>
      </div>

      <CheckboxField
        id="consent"
        label="I agree to be contacted about this service request by phone, text, or email."
        error={errors.consent}
      />

      {status === "error" && serverError ? (
        <p role="alert" className="font-body text-sm text-amber">
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-hivis px-7 py-3.5 font-heading text-lg font-bold uppercase tracking-stencil text-graphite transition-colors hover:bg-hivis-dark disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Request Service"}
        </button>
        <span className="font-body text-sm text-steel">
          or call{" "}
          <a href={business.phoneHref} className="font-semibold text-smoke hover:text-hivis">
            {business.phone}
          </a>
        </span>
      </div>
    </form>
  );
}

export default RequestServiceForm;

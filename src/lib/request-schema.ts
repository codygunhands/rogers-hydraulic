import { z } from "zod";

/** Shared validation for the request-service + contact forms (client + server). */
export const requestServiceSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you at.")
    .max(40),
  email: z.string().trim().email("Enter a valid email.").max(160).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  equipment: z.string().trim().max(160).optional().or(z.literal("")),
  problem: z.string().trim().min(5, "Tell us what failed.").max(2000),
  urgent: z.boolean().optional().default(false),
  afterHours: z.boolean().optional().default(false),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree so we can contact you back." }),
  }),
  /** Distinguishes the contact form from the full request form. */
  source: z.enum(["request-service", "contact"]).default("request-service"),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  // The full service-request form needs a jobsite location; contact form doesn't.
  if (data.source === "request-service" && (!data.location || data.location.length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["location"],
      message: "Where is the jobsite?",
    });
  }
});

export type RequestServiceInput = z.infer<typeof requestServiceSchema>;

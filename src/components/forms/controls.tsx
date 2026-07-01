import * as React from "react";

const inputBase =
  "w-full rounded-sm border border-graphite-500 bg-graphite-900 px-3.5 py-2.5 font-body text-base text-smoke placeholder:text-graphite-500 focus:border-hivis focus:outline-none focus:ring-1 focus:ring-hivis";

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-heading text-sm font-semibold uppercase tracking-wide text-smoke"
    >
      {children}
      {required ? <span className="ml-1 text-hivis">*</span> : null}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 font-body text-sm text-amber">
      {message}
    </p>
  );
}

export function TextField({
  id,
  label,
  required,
  error,
  ...props
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={id}
        className={inputBase}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function TextArea({
  id,
  label,
  required,
  error,
  ...props
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        name={id}
        rows={4}
        className={inputBase}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  ...props
}: {
  id: string;
  label: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 rounded-sm border-graphite-500 bg-graphite-900 text-hivis accent-hivis focus:ring-hivis"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <span className="font-body text-sm leading-relaxed text-steel">{label}</span>
      </label>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

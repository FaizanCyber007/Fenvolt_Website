"use client";

import { useActionState, useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Copy } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import {
  contactFields,
  initialContactState,
  serviceOptions,
  timelineOptions,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { site } from "@/constants/site";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full border-b border-rule-strong bg-transparent text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent aria-[invalid=true]:border-[#ff9c7a]";

const labelClass =
  "font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted";

export function ContactForm() {
  const [instance, setInstance] = useState(0);

  return (
    <ContactFormInstance
      key={instance}
      onReset={() => setInstance((value) => value + 1)}
    />
  );
}

function ContactFormInstance({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  if (state.status === "sent") {
    return <SentPanel state={state} onReset={onReset} />;
  }

  return (
    <form action={formAction} className="mt-8" noValidate={false}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field name="name" label="Name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={contactFields.name.min}
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={inputClass}
            placeholder="Your name"
          />
        </Field>

        <Field name="email" label="Work email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={inputClass}
            placeholder="you@company.com"
          />
        </Field>

        <Field
          name="company"
          label="Company (optional)"
          error={state.errors?.company}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(state.errors?.company)}
            aria-describedby={state.errors?.company ? "company-error" : undefined}
            className={inputClass}
            placeholder="Company or agency"
          />
        </Field>

        <Field name="service" label="What you need" error={state.errors?.service}>
          <Select id="service" name="service" invalid={Boolean(state.errors?.service)}>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        <Field name="timeline" label="Timeline" error={state.errors?.timeline}>
          <Select id="timeline" name="timeline" invalid={Boolean(state.errors?.timeline)}>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        <div className="hidden sm:block" aria-hidden="true" />

        <div className="sm:col-span-2">
          <Field
            name="message"
            label="What are you building?"
            error={state.errors?.message}
          >
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={contactFields.message.min}
              aria-invalid={Boolean(state.errors?.message)}
              aria-describedby={
                state.errors?.message ? "message-error" : "message-hint"
              }
              className={cn(inputClass, "h-auto resize-y py-2 leading-relaxed")}
              placeholder="The problem, what already exists, and what a good outcome looks like."
            />
          </Field>
          <p id="message-hint" className="mt-2 text-[0.75rem] text-muted">
            A paragraph is enough. Documents and repository links can follow.
          </p>
        </div>
      </div>

      {/* honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 border-l-2 border-[#ff9c7a] pl-3 text-[0.8125rem] leading-relaxed text-[#ffc2b0]"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
          {state.message}
        </p>
      ) : null}

      {state.status === "ready" ? (
        <div className="mt-6 border border-rule bg-paper-deep/45 p-5">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
            One more step
          </p>
          <p className="mt-2 max-w-[54ch] text-[0.8125rem] leading-relaxed text-muted-strong">
            {state.message}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href={state.mailto} className="btn group">
              <span>Open mail app</span>
              <ArrowUpRight
                aria-hidden="true"
                className="btn-arrow size-4"
                strokeWidth={1.5}
              />
            </a>
            <CopyButton text={state.preview ?? ""} />
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
        <p className="max-w-[38ch] text-[0.75rem] leading-relaxed text-muted">
          Your message goes to {site.email}. No tracking, no sequence.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn group min-w-[10.5rem] disabled:cursor-wait disabled:opacity-70"
        >
          <span>{pending ? "Sending…" : "Send enquiry"}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="btn-arrow size-4"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: ContactField;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-[0.75rem] text-[#ffc2b0]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  name,
  invalid,
  children,
}: {
  id: string;
  name: string;
  invalid: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        required
        aria-invalid={invalid}
        className={cn(inputClass, "appearance-none pr-8")}
      >
        <option value="" disabled>
          Select one
        </option>
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-1 top-1/2 -mt-1 size-1.5 rotate-45 border-b border-r border-muted"
      />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2200);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-2 border border-rule-strong px-3 py-2 text-[0.75rem] transition-colors hover:border-ink"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
      ) : (
        <Copy aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
      )}
      {copied ? "Copied" : "Copy message"}
    </button>
  );
}

function SentPanel({
  state,
  onReset,
}: {
  state: ContactState;
  onReset: () => void;
}) {
  return (
    <div role="status" className="mt-8 border border-rule bg-surface p-7 sm:p-9">
      <span className="flex size-9 items-center justify-center rounded-full border border-accent-ink/40 text-accent-ink">
        <Check aria-hidden="true" className="size-4" strokeWidth={1.6} />
      </span>
      <h2 className="display mt-5 text-[2rem] leading-none">Message sent.</h2>
      <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-strong">
        {state.message}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onReset}
          className="link-line text-[0.875rem]"
        >
          Send another message
        </button>
        <a
          href={`mailto:${site.email}`}
          className="link-line text-[0.875rem] text-muted-strong"
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}

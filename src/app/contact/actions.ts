"use server";

import { site } from "@/constants/site";
import { type ContactState, validateContact } from "@/lib/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type Values = {
  name: string;
  email: string;
  company: string;
  service: string;
  timeline: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

function compose(values: Values) {
  const subject = `New enquiry — ${values.name}${
    values.company ? `, ${values.company}` : ""
  }`;

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "—"}`,
    `Service: ${values.service}`,
    `Timeline: ${values.timeline}`,
    `Received: ${new Date().toISOString()}`,
    "",
    values.message,
  ].join("\n");

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Company", values.company || "—"],
    ["Service", values.service],
    ["Timeline", values.timeline],
  ];

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f2efe7;color:#14130f;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d8d3c6;">
    <div style="padding:20px 24px;border-bottom:1px solid #d8d3c6;">
      <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6b6a62;">
        Fenvolt · new enquiry
      </p>
      <h1 style="margin:10px 0 0;font-size:22px;line-height:1.2;">${escapeHtml(subject)}</h1>
    </div>
    <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr>
              <th style="text-align:left;padding:10px 24px;border-bottom:1px solid #eeebe3;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b6a62;width:34%;">${label}</th>
              <td style="padding:10px 24px;border-bottom:1px solid #eeebe3;">${escapeHtml(value)}</td>
            </tr>`,
        )
        .join("")}
    </table>
    <div style="padding:20px 24px;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b6a62;">
        Brief
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(values.message)}</p>
    </div>
    <div style="padding:14px 24px;border-top:1px solid #d8d3c6;font-size:12px;color:#6b6a62;">
      Reply directly to this email to answer ${escapeHtml(values.name)}.
    </div>
  </div>
</body></html>`;

  return { subject, text, html };
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return {
      status: "sent",
      message: "Thanks — your message has been received.",
    };
  }

  const values: Values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    service: String(formData.get("service") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const { subject, text, html } = compose(values);

  const preview = text;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "—"}`,
      `Service: ${values.service}`,
      `Timeline: ${values.timeline}`,
      "",
      values.message,
    ].join("\n"),
  )}`;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || `Fenvolt <hello@fenvolt.com>`;

  if (!apiKey) {
    return {
      status: "ready",
      message:
        "Email delivery is not configured on this deployment yet. Your message is composed — send it from your mail app and it will reach us.",
      mailto,
      preview,
    };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: subject.replace(/[\r\n]+/g, " "),
        text,
        html,
        headers: {
          "X-Entity-Ref-ID": `contact-${Date.now()}`,
        },
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[contact] Resend rejected the message (${response.status}): ${detail.slice(0, 300)}`,
      );

      return {
        status: "error",
        message: `The form could not send right now. Email ${site.email} directly and it will reach the same inbox.`,
        mailto,
        preview,
      };
    }

    return {
      status: "sent",
      message:
        "Message sent. It is in the inbox now and will be read by an engineer, usually within two working days.",
    };
  } catch (error) {
    console.error("[contact] Resend request failed", error);

    return {
      status: "error",
      message: `The form could not reach the mail service. Email ${site.email} directly and it will reach the same inbox.`,
      mailto,
      preview,
    };
  }
}

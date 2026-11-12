"use server";

import { site } from "@/constants/site";
import { type ContactState, validateContact } from "@/lib/contact";

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

  const values = {
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

  const subject = `New enquiry — ${values.name}${
    values.company ? `, ${values.company}` : ""
  }`;
  const preview = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "—"}`,
    `Service: ${values.service}`,
    `Timeline: ${values.timeline}`,
    "",
    values.message,
  ].join("\n");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(preview)}`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return {
      status: "ready",
      message:
        "Email delivery is not configured on this deployment yet. Your message is composed — send it from your mail app and it will reach us.",
      mailto,
      preview,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
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
        text: preview,
      }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `The form could not send right now. Email ${site.email} directly and it will reach the same place.`,
        mailto,
        preview,
      };
    }

    return {
      status: "sent",
      message: "Message sent. It is in the queue and will be read by an engineer.",
    };
  } catch {
    return {
      status: "error",
      message: `The form could not reach the mail service. Email ${site.email} directly and it will reach the same place.`,
      mailto,
      preview,
    };
  }
}


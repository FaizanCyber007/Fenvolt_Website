export type ContactField =
  | "name"
  | "email"
  | "company"
  | "service"
  | "timeline"
  | "message";

export type ContactState = {
  status: "idle" | "sent" | "ready" | "error";
  message: string;
  mailto?: string;
  preview?: string;
  errors?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle", message: "" };

export const serviceOptions = [
  "Engineering capacity",
  "An AI system",
  "Both",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "In one to two months",
  "Three months or later",
  "Exploring",
] as const;

export const contactFields = {
  name: { label: "Name", min: 2, max: 80 },
  email: { label: "Work email", max: 160 },
  company: { label: "Company", max: 120 },
  message: { label: "What are you building?", min: 40, max: 4000 },
} as const;

export function validateContact(data: {
  name: string;
  email: string;
  company: string;
  service: string;
  timeline: string;
  message: string;
}) {
  const errors: Partial<Record<ContactField, string>> = {};

  if (data.name.trim().length < contactFields.name.min) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (data.company.trim().length > contactFields.company.max) {
    errors.company = "That is longer than we can store.";
  }
  if (!serviceOptions.includes(data.service as (typeof serviceOptions)[number])) {
    errors.service = "Choose the closest option.";
  }
  if (!timelineOptions.includes(data.timeline as (typeof timelineOptions)[number])) {
    errors.timeline = "Choose a timeline.";
  }
  if (data.message.trim().length < contactFields.message.min) {
    errors.message = `A little more context helps — at least ${contactFields.message.min} characters.`;
  }
  if (data.message.trim().length > contactFields.message.max) {
    errors.message = "That is beyond the length of a useful first message. Please trim it.";
  }

  return errors;
}

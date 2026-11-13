export const site = {
  name: "Fenvolt",
  tagline: "Engineering capacity for the hard parts.",
  description:
    "Fenvolt supplies senior engineers to product teams and builds AI systems — retrieval, document intelligence, and agent workflows — that run on real records.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fenvolt.com",
  email: "hello@fenvolt.com",
  founderEmail: "faizan@fenvolt.com",
  telephone: "+92-332-043-6737",
  location: "Lahore, Pakistan",
  hours: "Mon–Fri · 10:00–19:00 PKT",
  timezone: "PKT (UTC+5)",
  coordinates: "31.5204° N, 74.3587° E",
  founder: "Faizan Javed",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/faizan-javed-b0267426a/",
    },
    { label: "GitHub", href: "https://github.com/FaizanCyber007" },
  ],
  companyLinkedIn: "https://www.linkedin.com/company/fenvolt/",
} as const;

/** Person profiles plus the company page, for footers and contact panels. */
export const elsewhereLinks = [
  ...site.socials,
  { label: "Company page", href: site.companyLinkedIn },
] as const;

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceLinks = [
  { label: "Embedded engineers", href: "/services#embedded" },
  { label: "Dedicated squads", href: "/services#squads" },
  { label: "Retrieval & RAG", href: "/services#rag" },
  { label: "Document intelligence", href: "/services#documents" },
  { label: "Agent workflows", href: "/services#agents" },
  { label: "Backend & APIs", href: "/services#backend" },
] as const;

export const socialLinks = site.socials;

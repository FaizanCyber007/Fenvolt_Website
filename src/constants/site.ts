export const site = {
  name: "Fenvolt",
  tagline: "Engineering capacity for the hard parts.",
  description:
    "Fenvolt is an engineering practice: senior engineers inside product teams, AI systems that run on real records, and the design, strategy and growth work around them.",
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
  { label: "Technology", href: "/services#technology" },
  { label: "Experience & design", href: "/services#experience" },
  { label: "Strategy & consulting", href: "/services#strategy" },
  { label: "Product growth", href: "/services#growth" },
  { label: "Embedded engineers", href: "/services#embedded" },
  { label: "Retrieval & RAG", href: "/services#rag" },
] as const;

export const socialLinks = site.socials;

export type PracticeService = {
  name: string;
  body: string;
  href?: string;
};

export type Practice = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  headline: string;
  summary: string;
  services: PracticeService[];
  deliverables: string[];
  media: {
    src: string;
    poster: string;
    alt: string;
  };
};

/**
 * Four disciplines, one team. The nine detailed services on /services are the
 * deep end of this list; the rest are the surrounding work a build needs.
 */
export const practices: Practice[] = [
  {
    id: "technology",
    index: "01",
    name: "Technology",
    kicker: "Engineering",
    headline: "Build the product, not the prototype.",
    summary:
      "Web, mobile and AI systems built to run in production: typed interfaces, tests, deployment and a handover your team can maintain. The engineers who scope the work write the code.",
    services: [
      {
        name: "Web products",
        body: "Next.js and React applications, dashboards and client portals that stay fast on real content.",
      },
      {
        name: "Mobile apps",
        body: "iOS and Android in React Native, or native where the platform calls for it: offline states, push and store release.",
      },
      {
        name: "AI & applied ML",
        body: "Retrieval, document pipelines and agent workflows with evaluation built in rather than bolted on.",
        href: "/services#rag",
      },
      {
        name: "Backend & infrastructure",
        body: "APIs, queues, data models, containers and CI that keep the model call from becoming the failure point.",
        href: "/services#backend",
      },
      {
        name: "Emerging technology",
        body: "OCR and vision pipelines, on-device inference, speech, and right-to-left localisation.",
      },
    ],
    deliverables: ["Architecture note", "Tested build", "Deploy pipeline", "Handover docs"],
    media: {
      src: "/media/practice-engineering.webm",
      poster: "/media/practice-engineering.jpg",
      alt: "Close-up of hands typing on a laptop keyboard in low, warm light.",
    },
  },
  {
    id: "experience",
    index: "02",
    name: "Experience",
    kicker: "Design",
    headline: "Interfaces that survive real data.",
    summary:
      "Design is where a system earns trust or loses it. We design around the records that actually exist — long tables, missing fields, two languages, one doubtful answer — not the happy-path demo.",
    services: [
      {
        name: "Product discovery",
        body: "Interviews, constraints and a written product frame before a line of interface is drawn.",
      },
      {
        name: "User research",
        body: "Task testing with the people who will use the system, including the ones who distrust it.",
      },
      {
        name: "UX design",
        body: "Flows, states and error paths, drawn at the fidelity the decision actually needs.",
      },
      {
        name: "Visual & UI design",
        body: "Type, spacing and colour applied as a system, not a screen-by-screen paint job.",
      },
      {
        name: "Design systems",
        body: "Components and tokens documented in code, so the next screen is assembled rather than rebuilt.",
      },
    ],
    deliverables: ["Flows & states", "Component library", "Tokens & type scale", "Usability notes"],
    media: {
      src: "/media/practice-experience.webm",
      poster: "/media/practice-experience.jpg",
      alt: "A colour picker open over a wordmark on a designer's screen.",
    },
  },
  {
    id: "strategy",
    index: "03",
    name: "Strategy",
    kicker: "Consulting",
    headline: "Decide what not to build.",
    summary:
      "A short technical engagement that ends in a document you own: what the system should be, what it will cost, what could go wrong, and whether AI belongs in it at all.",
    services: [
      {
        name: "Digital transformation",
        body: "Moving a manual, document-heavy process onto software without breaking the people who run it.",
      },
      {
        name: "Product validation",
        body: "Test the assumption that can kill the project first — the data, the demand or the workflow.",
      },
      {
        name: "AI strategy",
        body: "Where a model helps, where a rule is cheaper, and what evidence you need before either ships.",
      },
      {
        name: "Planning & roadmapping",
        body: "Sequenced releases with dependencies, owners and a definition of done for each one.",
      },
      {
        name: "Technical audits",
        body: "A read of the codebase, infrastructure and delivery process, with the risks ranked.",
      },
    ],
    deliverables: ["Written assessment", "Cost envelope", "Risk register", "Roadmap"],
    media: {
      src: "/media/practice-strategy.webm",
      poster: "/media/practice-strategy.jpg",
      alt: "A person writing in a notebook beside a laptop in a dim office.",
    },
  },
  {
    id: "growth",
    index: "04",
    name: "Growth",
    kicker: "After launch",
    headline: "The part after shipping.",
    summary:
      "Launch is the start of the work. Once the system is live we watch how it is used, fix what the data exposes, and keep the releases small enough to reverse.",
    services: [
      {
        name: "Ongoing product management",
        body: "A named owner for the backlog, the release cadence and the weekly written note.",
      },
      {
        name: "Data & experimentation",
        body: "Instrument the flow, then test one change at a time against a metric that matters.",
      },
      {
        name: "User acquisition",
        body: "Find the channels that bring the right users, not the most.",
      },
      {
        name: "Retention & lifecycle",
        body: "Onboarding, notifications and the second-week return, measured rather than assumed.",
      },
      {
        name: "Staff augmentation",
        body: "Embedded engineers and designers who join your process for a quarter, then leave it documented.",
        href: "/services#embedded",
      },
    ],
    deliverables: ["Release cadence", "Instrumentation", "Experiment log", "Monthly review"],
    media: {
      src: "/media/practice-growth.webm",
      poster: "/media/practice-growth.jpg",
      alt: "A wide view of a working studio floor: rows of desks, monitors and people at work.",
    },
  },
];

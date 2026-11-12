export type Service = {
  id: string;
  index: string;
  name: string;
  headline: string;
  what: string;
  problem: string;
  approach: string[];
  stack: string[];
  engagement: string;
};

export const capacityServices: Service[] = [
  {
    id: "embedded",
    index: "A1",
    name: "Embedded engineer",
    headline: "One senior engineer, inside your team.",
    what:
      "An engineer who joins your squad, your standups and your repository. They take tickets from your backlog and review code like anyone else on the team.",
    problem:
      "Your roadmap is committed and hiring takes a quarter. Contracting a body is easy; finding someone who can read your codebase in week one is not.",
    approach: [
      "Match the stack and the domain before the first call, not after onboarding.",
      "Two-week ramp on your conventions, tooling and review process.",
      "Weekly written check-in on what shipped and what is blocked.",
    ],
    stack: ["TypeScript", "React / Next.js", "Python", "Node.js", "Postgres"],
    engagement: "Full-time, month to month",
  },
  {
    id: "squads",
    index: "A2",
    name: "Dedicated squad",
    headline: "A small team with a technical lead.",
    what:
      "Two to four engineers plus a lead, scoped to one module or product line. The lead owns the technical plan and the interface to your team.",
    problem:
      "A new surface needs delivery without pulling your senior engineers off the core product for a quarter.",
    approach: [
      "A written scope: interfaces, data model, milestones and risks.",
      "Weekly working demo against real data, not a slide.",
      "Your product manager owns priorities; our lead owns execution.",
    ],
    stack: ["Full-stack", "AI services", "CI/CD", "Cloud deployment"],
    engagement: "One to six months, defined milestones",
  },
  {
    id: "white-label",
    index: "A3",
    name: "White-label delivery",
    headline: "Engineering capacity behind your brand.",
    what:
      "We work as your bench. Your client relationship, your account, your brand stay intact; the delivery and the code are ours.",
    problem:
      "An agency has sold work it cannot staff this quarter, and the alternative is turning down the account.",
    approach: [
      "NDA and your tooling from day one; no direct client contact unless you ask.",
      "Estimates written for your account manager, not for engineers.",
      "Delivery documented so your team can maintain it afterwards.",
    ],
    stack: ["Whatever the engagement already uses"],
    engagement: "Project-based or ongoing retainer",
  },
];

export const aiServices: Service[] = [
  {
    id: "rag",
    index: "B1",
    name: "Retrieval & RAG",
    headline: "Answers with a source, or no answer.",
    what:
      "Retrieval systems over your own documents: structure-aware chunking, hybrid search, reranking, and an answer layer that must cite what it used.",
    problem:
      "A chat box over a folder of PDFs produces confident answers with no provenance. In legal, medical or financial work, that is worse than no tool at all.",
    approach: [
      "Chunk by document structure — sections, clauses, pages — not fixed token windows.",
      "Combine lexical and vector retrieval, then rerank the candidate set.",
      "Reject answers that cannot be tied to a retrieved passage. Measure first-hit accuracy on a fixed set of questions before shipping.",
    ],
    stack: [
      "FAISS",
      "pgvector",
      "Pinecone",
      "LanceDB",
      "LangGraph",
      "Cohere Rerank",
    ],
    engagement: "Fixed-scope build or embedded",
  },
  {
    id: "documents",
    index: "B2",
    name: "Document intelligence",
    headline: "Scans, tables and two scripts in one pipeline.",
    what:
      "Ingestion for documents that were never clean: scanned judgments, FIRs, invoices, forms and reports, in Urdu and English, with page-level provenance for every extracted field.",
    problem:
      "The hard part is not OCR. It is layout, tables, handwriting, mixed scripts and the fact that the value you need is often in a region a text extractor discards.",
    approach: [
      "Triage each file, then route it: native text, layout model, or OCR.",
      "OCR locally first and fall back to a cloud or vision model only where quality demands it.",
      "Extract to a typed schema with a page reference per field, and flag fields the document does not state.",
    ],
    stack: [
      "PyMuPDF",
      "DocLayout-YOLO",
      "Tesseract",
      "PaddleOCR",
      "Qwen3-VL",
      "ByT5",
    ],
    engagement: "Fixed-scope build",
  },
  {
    id: "agents",
    index: "B3",
    name: "Agent workflows",
    headline: "Routing, tools and an auditable trace.",
    what:
      "Multi-step workflows where a model chooses a path: classify the input, call the right tools, check the result, and hand back a structured record of what it did.",
    problem:
      "A single prompt cannot run a process with branches, approvals and exceptions. A brittle script cannot handle the documents that arrive outside the template.",
    approach: [
      "Keep tools narrow and typed; keep the model's job to routing and extraction.",
      "Write every step's input and output so a human can audit the decision.",
      "Put a human approval in front of anything that moves money or changes a record.",
    ],
    stack: ["LangGraph", "Tool calling", "FastAPI", "Postgres", "Queues"],
    engagement: "Fixed-scope build",
  },
  {
    id: "backend",
    index: "B4",
    name: "Backend & APIs",
    headline: "The service layer the model actually needs.",
    what:
      "The API, jobs and data model around the model: async ingestion, signed webhooks, idempotent retries, typed contracts and tests.",
    problem:
      "Most AI demos die at the point where inference becomes a service with retries, quotas, timeouts and a schema that other systems depend on.",
    approach: [
      "Typed request and response contracts before implementation.",
      "Long jobs behind a queue with progress and failure states the UI can show.",
      "Tests around the deterministic parts; fixtures for the model calls.",
    ],
    stack: ["FastAPI", "Node.js", "Postgres", "MSSQL", "MongoDB", "Docker"],
    engagement: "Embedded or fixed scope",
  },
  {
    id: "evaluation",
    index: "B5",
    name: "Evaluation & hardening",
    headline: "Measure it before you claim it.",
    what:
      "A working evaluation harness for an AI system you already have: golden question sets, retrieval metrics, regression runs and a cost and latency budget.",
    problem:
      "A system that works on the demo documents has no evidence it works on the next thousand.",
    approach: [
      "Build a fixed evaluation set from real records, with expected sources.",
      "Track retrieval and answer quality separately, so failures are attributable.",
      "Run the set on every change; block regressions before deployment.",
    ],
    stack: ["Python", "Promptfoo-style harnesses", "CI", "Structured logging"],
    engagement: "Two to four week engagement",
  },
  {
    id: "infrastructure",
    index: "B6",
    name: "AI infrastructure",
    headline: "Deploy it where the data has to stay.",
    what:
      "Containerised deployment, managed or self-hosted models, private networking and logging that does not leak client identifiers.",
    problem:
      "The model choice is often constrained by where the data is allowed to go, not by which model scores best.",
    approach: [
      "Choose hosted or self-hosted per workload, not per vendor preference.",
      "Mask identifiers before they reach logs or error reporting.",
      "Document the deployment so your team can operate it.",
    ],
    stack: ["Docker", "Linux", "Managed Postgres", "Object storage", "CI/CD"],
    engagement: "Part of a build or a short engagement",
  },
];

export const engagementModels = [
  {
    name: "Embedded",
    shape: "One engineer, full-time",
    bestFor: "A committed roadmap and a gap in the team",
    starts: "Technical call, then a two-week trial period",
    youGet: "A working engineer in your process",
  },
  {
    name: "Squad",
    shape: "Two to four engineers + lead",
    bestFor: "A module with a deadline and a clear owner",
    starts: "Written scope and milestone plan",
    youGet: "Weekly demos and a maintained board",
  },
  {
    name: "Fixed-scope build",
    shape: "Defined system, defined outcome",
    bestFor: "RAG, document pipelines, agent workflows",
    starts: "Architecture note and estimate",
    youGet: "Deployed system, documentation, handover",
  },
  {
    name: "Retainer",
    shape: "Reserved capacity",
    bestFor: "Agencies that need a bench they can call",
    starts: "Capability review and NDA",
    youGet: "Priority access to the same engineers",
  },
];

export const fitCriteria = {
  good: [
    "You have real documents, records or a codebase we can read.",
    "There is a named owner on your side who can make decisions.",
    "You want the system to work in production, not just in a demo.",
    "You are comfortable with a written scope before the build starts.",
  ],
  not: [
    "You need twenty engineers by Monday.",
    "You want a slide deck about AI transformation.",
    "The success metric is a launch announcement, not a working system.",
    "You need a model trained from scratch when retrieval would solve it.",
  ],
};

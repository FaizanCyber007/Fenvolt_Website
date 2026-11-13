export const capabilities = [
  {
    area: "Ingestion & parsing",
    detail: "Getting real documents into a usable, structured form.",
    items: [
      "PyMuPDF",
      "DocLayout-YOLO",
      "Tesseract",
      "PaddleOCR",
      "Qwen3-VL",
      "Urdu / English normalisation",
    ],
  },
  {
    area: "Retrieval & grounding",
    detail: "Finding the right passage, then proving it was used.",
    items: [
      "FAISS",
      "pgvector",
      "Pinecone",
      "LanceDB",
      "Hybrid BM25 + vector",
      "Reranking",
    ],
  },
  {
    area: "Model layer",
    detail: "Model choice, prompting, post-training and evaluation.",
    items: [
      "OpenAI",
      "Claude",
      "Llama",
      "Qwen",
      "LoRA / ByT5 fine-tuning",
      "Structured output",
    ],
  },
  {
    area: "Application & API",
    detail: "The service and interface around the model.",
    items: [
      "FastAPI",
      "Node.js",
      "React",
      "Next.js",
      "TypeScript",
      "Async jobs & webhooks",
    ],
  },
  {
    area: "Data & infrastructure",
    detail: "Storage, deployment and the parts that keep running.",
    items: [
      "Postgres",
      "MSSQL",
      "MongoDB",
      "Docker",
      "Linux",
      "CI / CD",
    ],
  },
];

export const principles = [
  {
    index: "01",
    title: "Read the data first",
    body:
      "Every estimate starts with the actual documents or repository. A pipeline designed against a sample PDF is a guess.",
  },
  {
    index: "02",
    title: "Write the design down",
    body:
      "Data flow, interfaces, failure modes and what we are not building. The note belongs to you whether or not we continue.",
  },
  {
    index: "03",
    title: "Deterministic where possible",
    body:
      "Use regex, typed schemas and explicit rules where they are reliable. Reserve the model for judgement, not bookkeeping.",
  },
  {
    index: "04",
    title: "Citations over confidence",
    body:
      "A system that says what it does not know is more useful than one that is fluent and wrong. Every extracted fact gets an anchor.",
  },
  {
    index: "05",
    title: "Ship in slices",
    body:
      "Working software every week against real records. If a slice cannot be demonstrated, it is not done.",
  },
  {
    index: "06",
    title: "Leave it documented",
    body:
      "Deployment notes, architecture decisions and tests. The handover is part of the work, not an afterthought.",
  },
];

export const approach = [
  {
    index: "01",
    title: "Scope the problem",
    body:
      "We read your documents, your repository and your constraints before proposing anything. If we are not the right fit, we say so on the first call.",
    meta: "1–2 conversations",
  },
  {
    index: "02",
    title: "Design the architecture",
    body:
      "A written system design: data flow, interfaces, failure modes, cost envelope and the parts we will not build.",
    meta: "Written note",
  },
  {
    index: "03",
    title: "Assemble the team",
    body:
      "One senior engineer or a small squad, matched to the stack. They join your standups and work in your repository.",
    meta: "1–2 weeks",
  },
  {
    index: "04",
    title: "Build in slices",
    body:
      "Working software every week, tested against real records. Progress is a demo you can run, not a status report.",
    meta: "Weekly demos",
  },
  {
    index: "05",
    title: "Ship and hand over",
    body:
      "Deployment, observability and documentation. We stay through the hardening period, then the system is yours.",
    meta: "Handover",
  },
];

export const notInScope = [
  "Staffing at volume with no technical owner on our side.",
  "AI strategy decks without a system behind them.",
  "Training a foundation model when retrieval solves the problem.",
  "Numbers we cannot reproduce from the running system.",
];

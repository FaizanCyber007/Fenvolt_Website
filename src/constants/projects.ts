export type ProjectStatus = "Research system" | "Open source" | "Product build";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  year: string;
  status: ProjectStatus;
  summary: string;
  cardLine: string;
  stack: string[];
  role: string;
  metrics: ProjectMetric[];
  visual: "specter" | "parser" | "agents";
  links?: { label: string; href: string }[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "specter",
    title: "SPECTER — Legal document intelligence",
    shortTitle: "SPECTER",
    category: "Retrieval · Document intelligence",
    year: "2025 —",
    status: "Research system",
    summary:
      "A bilingual retrieval system over Pakistani case law, built so that every answer can be traced to the page it came from.",
    cardLine:
      "Answers over scanned Urdu and English legal records, with the citation checked against the source page before it is shown.",
    stack: ["FastAPI", "FAISS", "pgvector", "Qwen3-VL", "Claude", "Clerk"],
    visual: "specter",
    role: "AI/ML engineering, retrieval architecture, ingestion pipeline",
    metrics: [
      { label: "Indexed", value: "11,341 judgments & statutes" },
      { label: "Languages", value: "Urdu · English · Roman Urdu" },
      { label: "Grounding", value: "Citation to page" },
    ],
    links: [],
    featured: true,
  },
  {
    slug: "document-parser",
    title: "Document-Parser — Bilingual legal parsing",
    shortTitle: "Document-Parser",
    category: "Open source · Parsing pipeline",
    year: "2026",
    status: "Open source",
    summary:
      "A seven-phase pipeline that turns a scanned judgment into structured, citable sections — built to survive real court documents, not clean PDFs.",
    cardLine:
      "Local-first OCR, layout-aware extraction, semantic section tagging and a deterministic citation graph. Benchmarked against LlamaParse and Reducto.",
    stack: ["Python", "PyMuPDF", "DocLayout-YOLO", "FastAPI", "Postgres"],
    visual: "parser",
    role: "Architecture, implementation, benchmark design",
    metrics: [
      { label: "Phases", value: "7 + self-correction" },
      { label: "OCR routing", value: "Local first, cloud fallback" },
      { label: "Benchmark", value: "Structural diff vs LlamaParse" },
    ],
    links: [
      {
        label: "github.com/FaizanCyber007/Document-Parser",
        href: "https://github.com/FaizanCyber007/Document-Parser",
      },
    ],
    featured: true,
  },
  {
    slug: "opsnexus",
    title: "OpsNexus — Document operations agents",
    shortTitle: "OpsNexus",
    category: "Agents · Workflow automation",
    year: "2025",
    status: "Product build",
    summary:
      "A supervisor agent that classifies incoming business documents, routes each to the right specialist tool, and returns a structured result with its reasoning trace.",
    cardLine:
      "Invoices reconciled against purchase orders and approval limits; compliance logs routed to policy checks. Every step leaves an auditable payload.",
    stack: ["Python", "LLM orchestration", "Tool calling", "FastAPI"],
    visual: "agents",
    role: "Agent architecture, tool design, ingestion UI",
    metrics: [
      { label: "Routing", value: "Supervisor → specialists" },
      { label: "Inputs", value: "PDF · DOCX · CSV · logs" },
      { label: "Output", value: "Structured result + trace" },
    ],
    links: [],
    featured: true,
  },
];

export const archiveProjects = [
  {
    title: "Urdu document OCR with a fine-tuned corrector",
    year: "2025",
    stack: "Qwen3-VL · ByT5 · PyTorch",
    note: "Diagnosed a repetition failure mode in dense Urdu VLM output, then curated a noise-controlled dataset to post-train a corrector.",
  },
  {
    title: "Multi-LLM retrieval-augmented answering",
    year: "2025",
    stack: "LangGraph · FAISS · FastAPI",
    note: "Parallel embedding, chunking and reranking pipelines with runtime model selection across GPT-4, Claude and Llama.",
  },
  {
    title: "Real-time object detection",
    year: "2025",
    stack: "YOLO · OpenCV",
    note: "Video-stream and webcam inference with a labelled, augmented dataset and an evaluation pass.",
  },
  {
    title: "Arthi management system",
    year: "2024",
    stack: "C# · MSSQL",
    note: "Normalised schema and stored procedures for agricultural market purchases, sales, payments and client records.",
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

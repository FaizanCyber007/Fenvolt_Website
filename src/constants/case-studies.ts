export type CaseSection = {
  id: string;
  index: string;
  label: string;
  title: string;
  paragraphs?: string[];
  bullets?: { title: string; text: string }[];
  visual?: "specter" | "parser" | "agents";
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  meta: { label: string; value: string }[];
  sections: CaseSection[];
  stack: string[];
  hero: "specter-image" | "parser" | "agents";
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  repository?: { label: string; href: string };
  evidence?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
  statusNote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "specter",
    eyebrow: "Document intelligence · Legal",
    title: "SPECTER",
    dek: "A legal answer is only as good as its source. SPECTER is a bilingual legal document intelligence system that checks every claim against the page before showing it.",
    meta: [
      { label: "Role", value: "Product, retrieval, ingestion" },
      { label: "Client", value: "Pakistani legal practice" },
      { label: "Status", value: "Completed · 2025" },
      { label: "Delivery", value: "Web application" },
    ],
    sections: [
      {
        id: "context",
        index: "01",
        label: "Context",
        title: "A corpus that punishes shortcuts.",
        paragraphs: [
          "Pakistani case law does not arrive as clean text. Judgments are scanned, re-scanned and photographed. FIRs are handwritten forms in Urdu. Citations are abbreviated, and the same case can appear under several reporter series.",
          "A general-purpose retrieval stack flattens all of that into fixed-size chunks. The answer may read well, but the link between a sentence and the page it came from is gone — which is the only part a lawyer can check.",
        ],
        bullets: [
          {
            title: "Three scripts",
            text: "Urdu, English and Roman-Urdu queries over the same index.",
          },
          {
            title: "No text layer",
            text: "Documents with tables, numbered paragraphs and scans that defeat a standard OCR pass.",
          },
          {
            title: "Client data",
            text: "Names, CNICs and phone numbers that cannot reach a third-party log.",
          },
        ],
      },
      {
        id: "problem",
        index: "02",
        label: "Problem",
        title: "What made this hard.",
        paragraphs: [
          "The difficulty is not building a chat interface over documents. It is producing an answer that a lawyer can verify in one click, on a corpus where the source document may be a photograph of a handwritten form.",
        ],
        bullets: [
          {
            title: "Bilingual ingestion",
            text: "OCR, translation and normalisation have to happen before retrieval, without destroying the page geometry.",
          },
          {
            title: "Structure",
            text: "Chunks must follow sections and clauses, not an arbitrary token window.",
          },
          {
            title: "Grounding",
            text: "Every claim must map to a passage, and every passage to a page.",
          },
          {
            title: "Model choice",
            text: "Four providers were benchmarked rather than assuming one was best.",
          },
        ],
      },
      {
        id: "architecture",
        index: "03",
        label: "Architecture",
        title: "Five lanes, one page anchor.",
        paragraphs: [
          "Ingestion produces three things: text, structure and a page anchor. The index stores all three. Retrieval narrows the corpus with metadata filters and hybrid search, reranking cuts the candidate set, and the answer layer is not permitted to use anything outside it.",
        ],
        visual: "specter",
      },
      {
        id: "ingestion",
        index: "04",
        label: "Ingestion",
        title: "Getting the page into the pipeline.",
        paragraphs: [
          "The OCR and translation pipeline digitises Urdu FIRs into structured English for downstream processing, keeping the original page region attached to each extracted block. Layout extraction separates headings, tables and body text before anything is chunked.",
          "When a scan defeats the OCR pass, the pipeline falls back to a vision model for that region rather than the whole document. The fallback is logged, so a bad page is visible in the run record instead of quietly becoming a bad answer.",
        ],
      },
      {
        id: "retrieval",
        index: "05",
        label: "Retrieval",
        title: "Search wide, then cut hard.",
        paragraphs: [
          "Embeddings are generated with sentence-transformer models and stored in a vector index — FAISS, Pinecone, LanceDB or pgVector depending on the deployment. Lexical and vector search run together; a reranker then cuts the candidate set to passages that can actually support an answer.",
          "OpenAI, Claude, Llama and Qwen were benchmarked on summarisation and bilingual reasoning. Prompts are built around citation grounding: the model receives selected passages and must answer from them. An answer that cannot be tied to a passage is not returned.",
        ],
      },
      {
        id: "application",
        index: "06",
        label: "Application",
        title: "Built for the person checking the answer.",
        paragraphs: [
          "The interface is a source viewer first. Filters narrow by court — Supreme Court, Islamabad High Court, Lahore High Court — and by law, case law or both. A question written in Roman Urdu is handled as readily as one in English.",
          "Access follows the matter, not the firm. Row-level security, per-firm encryption keys, masked CNIC and phone numbers in logs, and Clerk sign-in with matter-level permissions were part of the build, not a later hardening pass. When a hearing is confirmed, it goes onto a diary with calendar subscription.",
        ],
      },
      {
        id: "status",
        index: "07",
        label: "Delivery",
        title: "What shipped.",
        paragraphs: [
          "SPECTER was built and delivered by Fenvolt as a working web application: ingestion, retrieval, the matter workspace, the source viewer and citation verification. A question in English, Urdu or Roman Urdu returns an answer whose numbered claims open the passage they came from.",
          "The system is a research aid, not legal advice. Every citation opens the original judgment, and anything that cannot be tied to a passage is withheld rather than shown.",
        ],
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "FAISS",
      "Pinecone",
      "LanceDB",
      "pgvector",
      "LangChain",
      "Qwen3-VL",
      "OpenAI",
      "Claude",
      "Llama",
      "Clerk",
      "PostgreSQL",
    ],
    hero: "specter-image",
    heroImage: {
      src: "/work/specter-answer.jpg",
      alt: "SPECTER answering a limitation-period question: a structured answer with numbered citations, a list of authorities, and cited-authorities and citations-checked controls.",
      caption:
        "A live answer: conclusion, key rule, application and authorities on one screen. Ten authorities were checked before the answer was returned.",
      width: 1584,
      height: 884,
    },
    evidence: [
      {
        src: "/work/specter-fir.jpg",
        alt: "SPECTER extracting fields from a bilingual FIR, with each field anchored to a page and the original region outlined.",
        caption:
          "Structured extraction from a bilingual FIR. Each field carries a page reference; fields the document does not state are marked rather than guessed.",
        width: 1600,
        height: 899,
      },
    ],
    statusNote:
      "Completed and delivered by Fenvolt in 2025. Bilingual ingestion, citation verification and the matter workspace are in production use.",
  },
  {
    slug: "document-parser",
    eyebrow: "Document intelligence · Open source",
    title: "Document-Parser",
    dek: "Turning a scanned judgment into structured, citable sections — and keeping the parts that must be correct deterministic.",
    meta: [
      { label: "Role", value: "Architecture, implementation, benchmark" },
      { label: "Client", value: "Open source · Fenvolt" },
      { label: "Status", value: "Completed · 2026" },
      { label: "Delivery", value: "Repository + API" },
    ],
    sections: [
      {
        id: "context",
        index: "01",
        label: "Context",
        title: "Legal parsing is a structure problem.",
        paragraphs: [
          "Most PDF libraries return a stream of text. That is enough to search a document and not enough to know that a paragraph belongs to a section, that a footnote is not body text, or that a citation appeared inside a heading.",
          "For legal work, those distinctions are the document. A parser that loses them forces every downstream stage to guess.",
        ],
      },
      {
        id: "problem",
        index: "02",
        label: "Problem",
        title: "Why a generic parser fails here.",
        bullets: [
          {
            title: "Layout",
            text: "Tables, footnotes, numbering and bilingual pages in one file.",
          },
          {
            title: "OCR variance",
            text: "A local engine is cheap but uneven; cloud models are better and slower. Neither is right for every page.",
          },
          {
            title: "Citations",
            text: "They must be extracted deterministically. A hallucinated citation is worse than a missing one.",
          },
          {
            title: "Benchmarks",
            text: "Most parser comparisons are informal. A claim about accuracy needs a diff.",
          },
        ],
      },
      {
        id: "architecture",
        index: "03",
        label: "Architecture",
        title: "Seven phases, one correction loop.",
        paragraphs: [
          "Each phase is a module with its own tests. Triage decides what the document is; layout extraction separates blocks; OCR routing chooses local or cloud per page; section tagging and metadata extraction use a model. The citation graph does not.",
        ],
        visual: "parser",
      },
      {
        id: "deterministic",
        index: "04",
        label: "Determinism",
        title: "Regex, not a model.",
        paragraphs: [
          "The citation graph is built with deterministic pattern matching. That is a deliberate constraint: a citation is the one thing in a legal document that must never be invented.",
          "A model may propose a section boundary. It does not get to propose a case citation.",
        ],
      },
      {
        id: "correction",
        index: "05",
        label: "Correction",
        title: "Five detectors, one return path.",
        paragraphs: [
          "A self-correction pass re-checks structure, page anchors and citation validity. If a check fails, the document returns to OCR routing instead of being accepted with a warning attached.",
          "This is the difference between a pipeline that fails loudly and one that produces plausible output from a broken page.",
        ],
      },
      {
        id: "benchmark",
        index: "06",
        label: "Benchmark",
        title: "Read the diff, not the claim.",
        paragraphs: [
          "The parser was benchmarked against LlamaParse and Reducto on a real court judgment, with the structural diff published alongside the code. The comparison is included so the result can be inspected rather than taken on trust.",
          "It ships with offline tests, an async FastAPI job API and signed webhooks for job completion, so it can run as a service rather than a notebook.",
        ],
      },
      {
        id: "status",
        index: "07",
        label: "Delivery",
        title: "Shipped open source, with the evidence.",
        paragraphs: [
          "The pipeline, the benchmark and the tests are in the public repository, alongside the structural diff against LlamaParse and Reducto. If you are evaluating parsers for legal or bilingual documents, you can re-run the comparison rather than trust a summary.",
        ],
      },
    ],
    stack: [
      "Python",
      "PyMuPDF",
      "DocLayout-YOLO",
      "Tesseract",
      "FastAPI",
      "PostgreSQL",
      "Docker",
    ],
    hero: "parser",
    repository: {
      label: "github.com/FaizanCyber007/Document-Parser",
      href: "https://github.com/FaizanCyber007/Document-Parser",
    },
    statusNote:
      "Completed and published open source. The benchmark, the structural diff and the test suite ship with the repository.",
  },
  {
    slug: "opsnexus",
    eyebrow: "Agent systems · Document operations",
    title: "OpsNexus",
    dek: "A supervisor agent that routes business documents to the right specialist tool, then shows its work.",
    meta: [
      { label: "Role", value: "Agent architecture, tools, UI" },
      { label: "Client", value: "Document operations team" },
      { label: "Status", value: "Completed · 2025" },
      { label: "Delivery", value: "Web application" },
    ],
    sections: [
      {
        id: "context",
        index: "01",
        label: "Context",
        title: "Documents arrive without a routing slip.",
        paragraphs: [
          "An operations team receives invoices, security logs and questionnaires into the same inbox. Each needs a different process, a different set of checks and a different system of record.",
          "The first job is not extraction. It is classification: which process does this document belong to, and what should happen to it next?",
        ],
      },
      {
        id: "problem",
        index: "02",
        label: "Problem",
        title: "Four failures worth designing for.",
        bullets: [
          {
            title: "Routing",
            text: "The wrong pipeline on the right document is still a failure.",
          },
          {
            title: "Reconciliation",
            text: "An invoice line must be checked against a purchase order and an approval limit, not just parsed.",
          },
          {
            title: "Auditability",
            text: "A decision that cannot be reconstructed is not usable in an audit.",
          },
          {
            title: "Mixed inputs",
            text: "PDF, DOCX, CSV, text and logs in one queue, with different structure and different confidence.",
          },
        ],
      },
      {
        id: "architecture",
        index: "03",
        label: "Architecture",
        title: "Supervisor, specialists, structured output.",
        paragraphs: [
          "The supervisor classifies the document and selects a route. Specialist tools do the deterministic work: purchase-order lookup, policy retrieval, line-item reconciliation. The model chooses and reads; it does not invent the numbers.",
        ],
        visual: "agents",
      },
      {
        id: "reconciliation",
        index: "04",
        label: "Reconciliation",
        title: "Line items, limits, discrepancies.",
        paragraphs: [
          "Invoices are checked line by line against open purchase orders and approval limits. The result is a structured report: extracted total, matched lines, unmatched lines, and the reason each discrepancy was flagged.",
          "Payment status is set to pending review, not approved. Nothing that moves money happens without a person confirming it.",
        ],
      },
      {
        id: "trace",
        index: "05",
        label: "Trace",
        title: "Every step keeps its payload.",
        paragraphs: [
          "Each step records its input and its output, including the supervisor's route and reasoning. The trace is attached to the document, so a reviewer can see what the system did and why before confirming anything.",
          "That trace is also the debugging surface. When a document is routed incorrectly, the failed step is visible instead of buried in a prompt.",
        ],
      },
      {
        id: "status",
        index: "06",
        label: "Delivery",
        title: "Delivered end to end.",
        paragraphs: [
          "The interface supports drag-and-drop ingestion for the supported formats and shows the workflow trace per document. Invoice reconciliation and compliance audit shipped as separate routes behind the same supervisor, with every step's payload retained for audit.",
        ],
      },
    ],
    stack: [
      "Python",
      "LLM orchestration",
      "Tool calling",
      "Structured output",
      "FastAPI",
      "React",
    ],
    hero: "agents",
    statusNote:
      "Completed and delivered with invoice reconciliation and compliance audit routes on one supervisor.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

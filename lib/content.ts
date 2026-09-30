import type { ImageKey } from "./images";

/* ───────────────────────── Profile ───────────────────────── */

export const profile = {
  name: "Sunny Prajapati",
  first: "Sunny",
  last: "Prajapati",
  role: "Software Engineer",
  discipline: "Full-Stack & AI",
  email: "sunnyprajapati2908@gmail.com",
  city: "Gandhinagar, India",
  coordinates: "23.21°N 72.63°E",
  version: "v2026.09",
  status: "Open to opportunities",
  resume: "/Sunny_Prajapati_Resume.pdf",
} as const;

export type SocialLink = { label: string; handle: string; href: string };

export const socials: SocialLink[] = [
  { label: "GitHub", handle: "sunny-pixels", href: "https://github.com/sunny-pixels" },
  { label: "LinkedIn", handle: "sunnyprajapati2908", href: "https://www.linkedin.com/in/sunnyprajapati2908/" },
  { label: "LeetCode", handle: "sunny-pixels", href: "https://leetcode.com/u/sunny-pixels/" },
];

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ───────────────────────── README / About ───────────────────────── */

export const about = {
  statement:
    "I build interfaces that feel crafted, and the systems behind them that hold up in production.",
  body: [
    "I'm a software engineer at Blitz Infocom, where I work on AI-powered recruitment tooling: semantic search, LLM pipelines and the APIs that serve them.",
    "Outside that, I design and build editorial, motion-led websites for brands in fashion, jewellery, art and business. The work runs from typography and scroll choreography through to deployment.",
  ],
  stats: [
    { value: 300, suffix: "+", label: "DSA problems solved" },
    { value: 10, suffix: "", label: "Products shipped live", pad: 2 },
    { value: 4, suffix: "", label: "AI & backend systems", pad: 2 },
  ],
};

/* ───────────────────────── Releases (featured UI work) ───────────────────────── */

export type Release = {
  slug: string;
  name: string;
  client: string;
  sector: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  url: string;
  image: ImageKey;
};

export const releases: Release[] = [
  {
    slug: "maliha",
    name: "Maliha",
    client: "Maliha by Anar & Anoli",
    sector: "Fashion · Occasion wear",
    location: "Ahmedabad",
    summary:
      "A storefront and lookbook for a handcrafted occasion-wear label, with full-bleed editorial photography and a quiet, boutique-paced shopping flow.",
    highlights: ["Editorial lookbook", "Category shop: kurtas, lehengas, custom orders", "Boutique-style navigation"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"], // TODO: placeholder — confirm exact stack
    url: "https://maliha-designs.vercel.app/",
    image: "maliha",
  },
  {
    slug: "kk-jewels",
    name: "KK Jewels",
    client: "KK Jewels Silver Studio",
    sector: "Luxury silver · Heritage",
    location: "Ahmedabad",
    summary:
      "“The Art of Living in Silver”: a heritage silver studio presented as six storied collections, from dining and devotion to heirloom furniture and jewellery.",
    highlights: ["Six narrative collections", "Cinematic hero carousel", "Detail-first product photography"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"], // TODO: placeholder — confirm exact stack
    url: "https://kk-jewels.vercel.app/",
    image: "kkJewels",
  },
  {
    slug: "almirah",
    name: "Almirah",
    client: "Almirah Luxe Gallery",
    sector: "Experiential venue · Art",
    location: "Ahmedabad",
    summary:
      "A luxury gallery venue told as a museum catalogue: architectural drawings, pinned scroll chapters, a hand-drawn survey map and a layered 3D-feeling SVG hero.",
    highlights: ["Pinned catalogue chapters", "Pointer-parallax SVG sculpture", "Loader → hero choreography"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
    url: "https://almirah-gallery.vercel.app/",
    image: "almirah",
  },
];

/* ───────────────────────── Deployments (client work) ───────────────────────── */

export type Deployment = {
  name: string;
  what: string;
  region: string;
  stack: string;
  url: string;
  domain: string;
  image: ImageKey;
};

export const deployments: Deployment[] = [
  {
    name: "Blitz Infocom",
    what: "Enterprise AI software & IT staffing",
    region: "IN · US · UAE",
    stack: "Next.js · TS · Tailwind",
    url: "https://blitzinfocom.com/",
    domain: "blitzinfocom.com",
    image: "blitz",
  },
  {
    name: "Onyx Technologies",
    what: "Payroll, staffing & workforce solutions",
    region: "United States",
    stack: "Next.js · TS · Tailwind",
    url: "https://onyxllc-ebon.vercel.app/",
    domain: "onyxllc-ebon.vercel.app",
    image: "onyx",
  },
  {
    name: "Dev Tours & Travels",
    what: "Destinations, packages & itineraries",
    region: "India",
    stack: "Next.js · TS · Tailwind",
    url: "https://dev-tours-and-travels.vercel.app/",
    domain: "dev-tours-and-travels.vercel.app",
    image: "devTours",
  },
  {
    name: "Rahul Impex",
    what: "Premium dry fruits retail",
    region: "India",
    stack: "Next.js · TS · Tailwind", // TODO: placeholder — confirm exact stack
    url: "https://rahul-impex.vercel.app/",
    domain: "rahul-impex.vercel.app",
    image: "rahulImpex",
  },
];

/* ───────────────────────── Systems (AI & backend) ───────────────────────── */

export type Figure = { value: string; label: string };
export type SystemLink = { label: string; href: string };

export type System = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  figures: Figure[];
  points: string[];
  stack: string[];
  links: SystemLink[];
  image?: ImageKey;
};

export const systems: System[] = [
  {
    id: "SYS-01",
    name: "Career Lens",
    kind: "AI resume intelligence platform",
    summary:
      "Parses resumes, extracts candidate insight and matches people to live job listings by meaning rather than keywords, then tailors the resume to each role.",
    figures: [
      { value: "768-d", label: "all-mpnet-base-v2 embeddings" },
      { value: "3", label: "LLM providers: Gemini, Groq, Ollama" },
    ],
    points: [
      "Semantic matching with locally generated embeddings and vector similarity scoring",
      "AI resume-tailoring engine that preserves the original format and styling",
      "Application tracker with resume versioning and AI recommendations",
    ],
    stack: ["Next.js", "TypeScript", "Python", "Ollama", "Gemini", "Groq", "RapidAPI"],
    links: [
      { label: "Live demo", href: "https://job-search-seven-rose.vercel.app/" },
      { label: "GitHub", href: "https://github.com/sunny-pixels/job-search" },
    ],
    image: "careerLens",
  },
  {
    id: "SYS-02",
    name: "ShipDoc AI",
    kind: "Document Q&A & extraction for logistics TMS",
    summary:
      "Grounded Q&A and structured extraction over Rate Confirmations, BOLs and invoices, with guardrails that refuse to answer rather than hallucinate.",
    figures: [
      { value: "50s → 6s", label: "Cold start after PyTorch → ONNX" },
      { value: "2-layer", label: "Similarity gate + confidence guardrail" },
    ],
    points: [
      "Hybrid retrieval: local MiniLM embeddings (fastembed / ONNX) plus lexical matching",
      "Blended confidence scoring calibrated against real sample documents",
    ],
    stack: ["Next.js", "Python", "FastAPI", "MongoDB", "Groq", "fastembed"],
    links: [{ label: "Live demo", href: "https://ultra-doc-theta.vercel.app/" }],
    image: "shipdoc",
  },
  {
    id: "SYS-03",
    name: "SiteScan",
    kind: "Production-grade URL audit service",
    summary:
      "Fetches pages safely and returns structured audits, with the production safeguards a public fetcher needs designed in from the start.",
    figures: [
      { value: "10k/day", label: "Audits in the scale-out design, 500 concurrent" },
      { value: "80%+", label: "Test coverage (Jest, Supertest)" },
    ],
    points: [
      "SSRF protection, bounded concurrency queue and sliding-window rate limiting",
      "Swappable CacheProvider: in-memory to Redis via config alone",
      "/metrics observability and CI rollback gated on error rate",
    ],
    stack: ["Node.js", "TypeScript", "Express", "Zod", "Redis", "Jest"],
    links: [{ label: "GitHub", href: "https://github.com/sunny-pixels/page-pulse" }],
  },
  {
    id: "SYS-04",
    name: "SLA Monitor",
    kind: "Service reliability & health telemetry",
    summary:
      "A dashboard for service health checks: availability against SLA targets, latency, failure logs and incident windows across services, regions and agents.",
    figures: [
      { value: "SLA", label: "Availability vs target, per service" },
      { value: "CSV", label: "Health-log ingest with filters" },
    ],
    points: ["Filter by date range, service and status", "Degraded-incident tracking with multi-region agents"],
    stack: ["Next.js", "TypeScript"], // TODO: placeholder — confirm exact stack
    links: [{ label: "Live demo", href: "https://sla-monitoring-dashboard-web.vercel.app/" }],
    image: "slaMonitor",
  },
];

/** Signature diagram: the Career Lens matching pipeline. */
export const pipeline = [
  { id: "01", label: "Resume", note: "PDF / DOCX" },
  { id: "02", label: "Parse", note: "LLM extraction" },
  { id: "03", label: "Embed", note: "768-d vectors" },
  { id: "04", label: "Retrieve", note: "Jobs via RapidAPI" },
  { id: "05", label: "Score", note: "Cosine + hybrid" },
  { id: "06", label: "Match", note: "Ranked & tailored" },
];

/* ───────────────────────── Changelog (experience) ───────────────────────── */

export type Commit = {
  hash: string;
  tag: string;
  period: string;
  role: string;
  org: string;
  orgNote: string;
  href?: string;
  points: string[];
};

export const changelog: Commit[] = [
  {
    hash: "f4c2a91",
    tag: "HEAD",
    period: "Jan 2026 — Present",
    role: "Software Engineer",
    org: "Blitz Infocom",
    orgNote: "Enterprise AI software & staffing",
    href: "https://blitzinfocom.com/",
    points: [
      "AI resume analysis and job-matching workflows on Ollama, Google Gemini and Groq",
      "Semantic search pipelines with vector embeddings and similarity scoring",
      "Job aggregation via RapidAPI; REST APIs for parsing, ATS scoring and keyword extraction",
      "Architecture, testing and deployment of a production AI recruitment platform",
    ],
  },
  {
    hash: "7be03d5",
    tag: "internship",
    period: "May 2025 — Jul 2025",
    role: "Full Stack Intern",
    org: "TSC",
    orgNote: "The Special Character",
    points: [
      "Built SportsWalla, a sports-venue booking platform with calendar integration (Next.js, TS, Tailwind)",
      "Migrated Yogateria's e-commerce to Medusa.js, Payload CMS and PostgreSQL",
      "Shipped responsive UI, API integrations and performance work across projects",
    ],
  },
  {
    hash: "0a1e9c3",
    tag: "init",
    period: "Oct 2022 — Present",
    role: "B.Tech, Computer Science",
    org: "Pandit Deendayal Energy University",
    orgNote: "Gandhinagar · CGPA 8.28",
    points: ["Data structures & algorithms, OOP, DBMS, operating systems"],
  },
];

/* ───────────────────────── Manifest (skills) ───────────────────────── */

export type ManifestGroup = { key: string; items: string[] };

export const manifest: ManifestGroup[] = [
  { key: "languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C / C++", "SQL"] },
  { key: "frontend", items: ["React", "Next.js", "Tailwind CSS", "GSAP", "HTML5 / CSS3"] },
  { key: "backend", items: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT Auth"] },
  { key: "ai", items: ["LLM apps", "RAG pipelines", "Vector embeddings", "Semantic search", "Ollama · Gemini · Groq"] },
  { key: "data", items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Payload CMS", "Medusa.js"] },
  { key: "tooling", items: ["Git & GitHub", "Docker", "Vercel", "Render", "Jest"] },
];

export const marqueeWords = [
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "GSAP",
  "LLMs",
  "RAG",
  "PostgreSQL",
  "Redis",
  "Tailwind",
];

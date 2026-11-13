// All the content of the site lives here.
// Want to change text, add a project, or a skill? Edit this file only.

export const profile = {
  name: "Himanshu",
  fullName: "Himanshu Naik",
  tagline: "Backend & AI engineer · Pune, India",
  photo: "/assets/images/pfp.jpg",
  status: "Open to backend & AI roles",
  email: "himanshucnaik45@gmail.com",
  // PDF lives in public/, so it's served at himanshunaik.dev/Himanshu_Naik_Resume.pdf
  resume: "/Himanshu_Naik_Resume.pdf",
};

export const work = {
  company: "Upswing",
  description: "Cognitive Hospitality Solutions",
  logo: "/assets/images/upswing.png",
  url: "https://www.upswing.cloud/",
  roles: [
    { title: "Jr. Backend Developer (Part-time)", dates: "Apr – Oct 2026" },
    { title: "Software Developer Intern", dates: "Feb – Apr 2026" },
  ],
  highlights: [
    "Built a staff agent on an MCP server, then rebuilt it as a read-only RAG agent with document citations and role-based access",
    "Led 2 of the 11 live hotel PMS integrations (StayNtouch, Hop) and took StayNtouch through vendor pre-certification",
    "Shipped a versioned prompt service that hot-reloads prompts over RabbitMQ, so prompt changes no longer need a redeploy",
    "Hardened the platform with rate limits, Origin allow-lists and LLM-outage detection, and fixed RabbitMQ and MongoDB connection leaks",
  ],
  stats: [
    { value: "~178×", label: "faster hotel availability checks" },
    { value: "11 s → 4 ms", label: "webhook credential lookup" },
    { value: "40+", label: "organizations on the 27-service platform" },
  ],
};

// What I'm building right now
export const now = {
  name: "research-pal",
  url: "https://github.com/himanshu-45naik/research-pal",
  description:
    "An assistant that answers questions from research papers. Building the ingestion pipeline first: PDF in, clean typed text out, with a Groq-backed LLM layer.",
  // "done" = finished, "now" = working on it
  steps: [
    { label: "Open PDFs safely", status: "done" },
    { label: "Extract text, positions, fonts", status: "done" },
    { label: "Clean up headers, hyphens, Unicode", status: "now" },
  ],
  tech: "Python · PyMuPDF · Pydantic · Groq",
};

// Shown in this order. extra = an optional second link (live demo, download...)
export const projects = [
  {
    name: "AI Feedback System",
    description: "Users get an AI reply to their review; admins get summaries and suggested actions",
    tech: "FastAPI · PostgreSQL · Gemini",
    url: "https://github.com/himanshu-45naik/ai-feedback-system",
  },
  {
    name: "Shared Object",
    description: "Co-built at an AI Tinkerers hackathon: an agent that flags when two Slack threads decide opposite things",
    tech: "TypeScript · OpenAI SDK · PostgreSQL",
    url: "https://github.com/himanshu-45naik/sharedObj",
    extra: { label: "demo", url: "https://www.loom.com/share/9637251a74ee402a849cc18f5008072b" },
  },
  {
    name: "Parchi",
    description: "A macOS app for notes, to-dos and photos that stay on your desktop. No account",
    tech: "Swift · macOS",
    url: "https://github.com/himanshu-45naik/parchi",
    extra: {
      label: "download",
      url: "https://github.com/himanshu-45naik/parchi/releases/latest/download/Parchi.dmg",
    },
  },
  {
    name: "Network Intrusion Detection",
    description: "XGBoost on 2.8M network flows, served with FastAPI, Prometheus metrics and drift detection",
    tech: "Python · ZenML · MLflow",
    url: "https://github.com/himanshu-45naik/Network-intrusion-detection",
    extra: { label: "live", url: "https://nids-api-bibt.onrender.com" },
  },
  {
    name: "Waste Watch Campus",
    description: "Campus waste reports where Gemini classifies waste type and severity from photos",
    tech: "Flask · Gemini",
    url: "https://github.com/himanshu-45naik/Waste-Watch-Campus",
  },
];

// Skills, grouped. Taken from my GitHub profile and repos.
export const stack = [
  { group: "Languages", items: ["Python", "TypeScript", "SQL", "Swift"] },
  { group: "AI & agents", items: ["LangGraph", "LangChain", "LangSmith", "MCP", "RAG", "Qdrant"] },
  { group: "Backend", items: ["FastAPI", "Flask", "gRPC", "RabbitMQ", "Airflow"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { group: "ML & MLOps", items: ["scikit-learn", "XGBoost", "MLflow", "ZenML", "Docker"] },
];

export const education = {
  school: "Savitribai Phule Pune University",
  degree: "B.E. Artificial Intelligence & Data Science",
  dates: "Aug 2023 – May 2027",
  graduating: "2027",
};

export const contact = {
  title: "Hiring for backend or AI?",
  text: "I'm open to internships and entry-level roles, and I take on small freelance projects.",
};

// Leave a url empty ("") to hide that link.
export const links = [
  { label: "GitHub", url: "https://github.com/himanshu-45naik" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/himanshu-45naik" },
  { label: "Email", url: "mailto:himanshucnaik45@gmail.com" },
];

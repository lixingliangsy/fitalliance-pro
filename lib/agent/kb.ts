import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What FitAlliance Pro does",
    keywords: ["FitAlliance Pro", "fitalliance-pro", "what", "product", "about", "Fitness community and coaching hub"],
    body: "Fitness community and coaching hub. FitAlliance Pro is a fitness community and coaching hub where trainers and studio owners run member programs, check-ins, progress tracking, and a community feed from one place.",
    source: "FitAlliance Pro product definition",
    tags: [],
  },
  {
    id: "features",
    title: "FitAlliance Pro features",
    keywords: ["features", "feature", "can", "does", "Member programs & check-ins", "Coach dashboard", "Community feed", "Progress tracking"],
    body: "FitAlliance Pro includes: Member programs & check-ins; Coach dashboard; Community feed; Progress tracking. It does not add capabilities that are not listed here.",
    source: "FitAlliance Pro feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "FitAlliance Pro pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for FitAlliance Pro: $29/month and $290/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "FitAlliance Pro pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use FitAlliance Pro",
    keywords: ["how", "start", "use", "tool", "run", "Try fitalliance-pro"],
    body: "Open FitAlliance Pro and use Try fitalliance-pro.",
    source: "FitAlliance Pro tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is FitAlliance Pro?",
    keywords: ["What", "is", "FitAlliance", "Pro?"],
    body: "FitAlliance Pro is a fitness community and coaching hub for trainers and studio owners, with programs, check-ins, a coach dashboard, and a community feed.",
    source: "FitAlliance Pro FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What does the coach dashboard show?",
    keywords: ["What", "does", "the", "coach", "dashboard", "show?"],
    body: "It rolls up member progress so a trainer sees who is on track at a glance.",
    source: "FitAlliance Pro FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Can members track progress?",
    keywords: ["Can", "members", "track", "progress?"],
    body: "Yes. Members log progress and it shows up in the coach dashboard and their own view.",
    source: "FitAlliance Pro FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about FitAlliance Pro are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "FitAlliance Pro support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}

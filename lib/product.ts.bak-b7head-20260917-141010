export const PRODUCT = {
  toolTitle: "Try fitalliance-pro",
  ctaLabel: "Generate",
  resultLabel: "Result",
  priceMonthly: 29,
  priceYearly: 290,
  productId: "",
  yearlyProductId: "",
  checkoutUrl: "",
  "name": "FitAlliance Pro",
  "slug": "fitalliance-pro",
  "tagline": "Fitness community and coaching hub",
  "description": "Build a fitness community with programs, member progress, and coach tools — built for trainers and studio owners.",
  inputs: [
    {
      key: 'goal',
      label: 'Member goal (e.g. 5k, strength, weight loss)',
      type: 'textarea',
      placeholder: 'Train a small group for a 10k in 8 weeks',
    },
    {
      key: 'members',
      label: 'Member roster (name, level)',
      type: 'textarea',
      placeholder: 'Alex, beginner\nSam, intermediate',
    },
    {
      key: 'focus',
      label: 'Program focus',
      type: 'select',
      options: ['Group classes', '1:1 coaching', 'Challenges', 'Hybrid'],
    },
  ],
  "features": [
    "Member programs & check-ins",
    "Coach dashboard",
    "Community feed",
    "Progress tracking"
  ],
  definitionLead: "FitAlliance Pro is a fitness community and coaching hub where trainers and studio owners run member programs, check-ins, progress tracking, and a community feed from one place.",
  geoFaq: [
    { q: "What is FitAlliance Pro?", a: "FitAlliance Pro is a fitness community and coaching hub for trainers and studio owners, with programs, check-ins, a coach dashboard, and a community feed." },
    { q: "What does the coach dashboard show?", a: "It rolls up member progress so a trainer sees who is on track at a glance." },
    { q: "Can members track progress?", a: "Yes. Members log progress and it shows up in the coach dashboard and their own view." },
    { q: "Is there a community feature?", a: "A community feed keeps members connected and engaged between sessions." },
    { q: "Who should use it?", a: "Trainers and studio owners who want programs, coaching, and community in one place." },
    { q: "Does it replace several tools?", a: "It combines programs, check-ins, progress, and community that are often split across separate apps." },
  ],
  systemPrompt: "You are the AI engine for fitalliance-pro. Given user inputs, produce clear structured output that matches the product purpose.",
  mock: (inputs: Record<string, string>): string => {
    const lines = Object.entries(inputs || {}).map(([k, v]) => k + ': ' + v)
    return 'fitalliance-pro DEMO\n\n' + (lines.join('\n') || 'No inputs') + '\n\n---\nPreview result. Add OPENAI_API_KEY for live AI.'
  },
}

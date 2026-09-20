/**
 * Deterministic fitness-compliance rules for fitalliance-pro.
 * Rule-based (no LLM) tagging of generated content with stable ids + real refs.
 *
 * Research-augmented (RAD) against:
 *  - FTC — weight-loss / health claims (16 CFR Part 255)
 *  - GDPR Art.9 — special-category (health) data
 *  - ACSM exercise guidance
 */
export const RULESET_ID = 'fitness-compliance'
export const RULESET_VERSION = '2026-07-20'

export interface RuleResult {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  message: string
  ref?: string
}

export interface Rule {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  ref: string
  check: (content: string, context?: Record<string, string>) => RuleResult
}

const rules: Rule[] = [
  {
    ruleId: 'FA-01',
    name: 'Health disclaimer (not medical advice)',
    category: 'disclaimer',
    severity: 'high',
    ref: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
    check: (content) => {
      const passed = /(not medical advice|consult (a|your) (doctor|physician|health professional)|for informational purposes)/i.test(content)
      return {
        ruleId: 'FA-01',
        name: 'Health disclaimer (not medical advice)',
        category: 'disclaimer',
        severity: 'high',
        passed,
        message: passed
          ? 'Health disclaimer present (FTC health-claim guidance).'
          : 'Add a "not medical advice / consult a professional" disclaimer (FTC).',
        ref: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
      }
    },
  },
  {
    ruleId: 'FA-02',
    name: 'No unsubstantiated outcome claims',
    category: 'claims',
    severity: 'high',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/ftc-rule-concerning-use-endorsements-testimonials',
    check: (content) => {
      const bad = /(lose \d+ ?(kg|lbs|pounds) in (a|one) week|guaranteed (weight loss|results)|melt fat overnight)/i.test(content)
      const passed = !bad
      return {
        ruleId: 'FA-02',
        name: 'No unsubstantiated outcome claims',
        category: 'claims',
        severity: 'high',
        passed,
        message: passed
          ? 'No unrealistic/unsubstantiated outcome claims (FTC 16 CFR Part 255).'
          : 'Remove unsubstantiated "guaranteed/rapid" outcome claims (FTC 16 CFR Part 255).',
        ref: 'https://www.ftc.gov/legal-library/browse/rules/ftc-rule-concerning-use-endorsements-testimonials',
      }
    },
  },
  {
    ruleId: 'FA-03',
    name: 'Exercise-safety cue',
    category: 'safety',
    severity: 'medium',
    ref: 'https://www.acsm.org/',
    check: (content) => {
      const passed = /(consult (a|your) (trainer|professional)|start slowly|listen to your body|warm up)/i.test(content)
      return {
        ruleId: 'FA-03',
        name: 'Exercise-safety cue',
        category: 'safety',
        severity: 'medium',
        passed,
        message: passed
          ? 'Exercise-safety cue present (ACSM guidance).'
          : 'Add an exercise-safety cue (e.g. consult a trainer, warm up) (ACSM).',
        ref: 'https://www.acsm.org/',
      }
    },
  },
  {
    ruleId: 'FA-04',
    name: 'Special-category health-data consent',
    category: 'privacy',
    severity: 'high',
    ref: 'https://gdpr-info.eu/art-9/',
    check: (content) => {
      const passed = /(consent|explicit consent|i agree|opt[- ]?in)/i.test(content)
      return {
        ruleId: 'FA-04',
        name: 'Special-category health-data consent',
        category: 'privacy',
        severity: 'high',
        passed,
        message: passed
          ? 'Consent language for health data present (GDPR Art.9).'
          : 'Obtain explicit consent before processing health data (GDPR Art.9).',
        ref: 'https://gdpr-info.eu/art-9/',
      }
    },
  },
  {
    ruleId: 'FA-05',
    name: 'Age-appropriateness / minor gating',
    category: 'safety',
    severity: 'medium',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/children-online-privacy-protection-rule-coppa',
    check: (content) => {
      const targetsMinor = /(for (kids|children under 13)|teen workout plan)/i.test(content)
      const passed = !targetsMinor
      return {
        ruleId: 'FA-05',
        name: 'Age-appropriateness / minor gating',
        category: 'safety',
        severity: 'medium',
        passed,
        message: passed
          ? 'No inappropriate minor-targeting detected (COPPA).'
          : 'Add age-gating / parental-consent before targeting minors (COPPA).',
        ref: 'https://www.ftc.gov/legal-library/browse/rules/children-online-privacy-protection-rule-coppa',
      }
    },
  },
  {
    ruleId: 'FA-06',
    name: 'Before/after disclosure',
    category: 'claims',
    severity: 'medium',
    ref: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
    check: (content) => {
      const hasBeforeAfter = /(before and after|results may vary|individual results)/i.test(content)
      const passed = !hasBeforeAfter || /(results may vary|individual results)/i.test(content)
      return {
        ruleId: 'FA-06',
        name: 'Before/after disclosure',
        category: 'claims',
        severity: 'medium',
        passed,
        message: passed
          ? 'Before/after claims include "results may vary" disclosure (FTC).'
          : 'Add "results may vary" disclosure to before/after claims (FTC).',
        ref: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
      }
    },
  },
]

export function runAllRules(content: string, context?: Record<string, string>): RuleResult[] {
  return rules.map((r) => r.check(content, context))
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}

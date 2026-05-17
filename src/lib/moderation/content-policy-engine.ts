import { CONTENT_POLICY_RULES, MODERATION_SCORE_WEIGHTS } from "@/constants/content-policy";
import type { ModerationFinding, ModerationResult, ModerationRule } from "@/types/moderation";

function excerptFor(text: string, term: string) {
  const normalized = text.toLowerCase();
  const index = normalized.indexOf(term.toLowerCase());
  if (index < 0) return undefined;
  const start = Math.max(0, index - 45);
  const end = Math.min(text.length, index + term.length + 45);
  return text.slice(start, end).trim();
}

function applies(rule: ModerationRule, context: { bedtimeSafe: boolean; ageRange?: string }) {
  if (rule.bedtimeSafeOnly && !context.bedtimeSafe) return false;
  if (rule.ageRanges && context.ageRange && !rule.ageRanges.includes(context.ageRange)) return false;
  return true;
}

export class ContentPolicyEngine {
  constructor(private readonly rules = CONTENT_POLICY_RULES) {}

  evaluate(
    text: string,
    context: { bedtimeSafe: boolean; ageRange?: string; requireStructuredStory?: boolean }
  ): ModerationResult {
    const normalized = text.toLowerCase();
    const findings: ModerationFinding[] = [];

    for (const rule of this.rules) {
      if (!applies(rule, context)) continue;

      for (const term of rule.blockedTerms ?? []) {
        if (normalized.includes(term.toLowerCase())) {
          findings.push({
            ruleId: rule.id,
            category: rule.category,
            severity: rule.severity,
            label: rule.label,
            excerpt: excerptFor(text, term),
            recommendation: rule.description
          });
        }
      }

      for (const term of rule.requiredTerms ?? []) {
        if (context.requireStructuredStory && !normalized.includes(term.toLowerCase())) {
          findings.push({
            ruleId: rule.id,
            category: rule.category,
            severity: rule.severity,
            label: rule.label,
            recommendation: `Add or clarify: ${rule.description}`
          });
        }
      }
    }

    const score = findings.reduce(
      (total, finding) => total + MODERATION_SCORE_WEIGHTS[finding.severity],
      0
    );
    const allowed = !findings.some((finding) => finding.severity === "blocked") && score < 80;
    const reviewNotes = [
      allowed ? "Content is allowed for parent review." : "Content needs parent review before use.",
      context.bedtimeSafe
        ? "Bedtime-safe mode was evaluated with stricter rules."
        : "General child-appropriate mode was evaluated."
    ];

    return {
      allowed,
      score,
      findings,
      checkedAt: new Date().toISOString(),
      reviewNotes
    };
  }
}

export const contentPolicyEngine = new ContentPolicyEngine();

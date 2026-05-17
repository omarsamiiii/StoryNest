import type { PrivacyChecklistItem, PrivacyFinding, RedactionResult } from "@/types/privacy";
import type { ChildProfile } from "@/types/children";

const patterns: Array<{
  kind: PrivacyFinding["kind"];
  label: string;
  pattern: RegExp;
  replacement: string;
}> = [
  {
    kind: "email",
    label: "Email address",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    replacement: "[email]"
  },
  {
    kind: "phone",
    label: "Phone number",
    pattern: /\b(?:\+?\d{1,2}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g,
    replacement: "[phone]"
  },
  {
    kind: "address",
    label: "Street address",
    pattern: /\b\d{1,5}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,4}\s+(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Drive|Dr)\b/g,
    replacement: "[address]"
  },
  {
    kind: "school",
    label: "School name",
    pattern: /\b[A-Z][A-Za-z' -]{2,}\s+(?:Elementary|Primary|School|Academy)\b/g,
    replacement: "[school]"
  },
  {
    kind: "date",
    label: "Specific date",
    pattern: /\b(?:\d{1,2}\/\d{1,2}\/\d{2,4}|January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
    replacement: "[date]"
  }
];

export class PrivacyRedactor {
  redact(text: string): RedactionResult {
    const findings: PrivacyFinding[] = [];
    let redacted = text;

    for (const rule of patterns) {
      redacted = redacted.replace(rule.pattern, (value, offset: number) => {
        findings.push({
          kind: rule.kind,
          label: rule.label,
          value,
          start: offset,
          end: offset + value.length
        });
        return rule.replacement;
      });
    }

    return {
      original: text,
      redacted,
      findings,
      changed: findings.length > 0
    };
  }

  checklist(children: ChildProfile[]): PrivacyChecklistItem[] {
    const hasOnlyNicknames = children.every(
      (child) => child.nickname.split(/\s+/).length <= 2 && child.nickname.length <= 40
    );
    const allBedtimeSafe = children.every((child) => child.bedtimeSafeDefault);
    return [
      {
        id: "nickname-only",
        label: "Nickname-based child profiles",
        complete: hasOnlyNicknames,
        detail: "Profiles should avoid legal names and sensitive identifiers."
      },
      {
        id: "age-range-only",
        label: "Age ranges instead of birth dates",
        complete: children.every((child) => ["3-4", "5-6", "7-8", "9-10"].includes(child.ageRange)),
        detail: "StoryNest stores age ranges rather than exact birth dates."
      },
      {
        id: "bedtime-safe-default",
        label: "Bedtime-safe defaults enabled",
        complete: allBedtimeSafe,
        detail: "Parents can still adjust per story, but safe defaults reduce mistakes."
      },
      {
        id: "no-public-sharing",
        label: "No public sharing surfaces",
        complete: true,
        detail: "The MVP has no public feed, public child profile, or child chat."
      }
    ];
  }
}

export const privacyRedactor = new PrivacyRedactor();

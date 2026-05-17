export type ModerationSeverity = "info" | "low" | "medium" | "high" | "blocked";

export type ModerationCategory =
  | "bedtime-safety"
  | "privacy"
  | "age-fit"
  | "scary-content"
  | "violence"
  | "medical"
  | "commercial"
  | "direct-child-address"
  | "general-quality";

export interface ModerationRule {
  id: string;
  category: ModerationCategory;
  severity: ModerationSeverity;
  label: string;
  description: string;
  blockedTerms?: string[];
  requiredTerms?: string[];
  bedtimeSafeOnly?: boolean;
  ageRanges?: string[];
}

export interface ModerationFinding {
  ruleId: string;
  category: ModerationCategory;
  severity: ModerationSeverity;
  label: string;
  excerpt?: string;
  recommendation: string;
}

export interface ModerationResult {
  allowed: boolean;
  score: number;
  findings: ModerationFinding[];
  checkedAt: string;
  reviewNotes: string[];
}

export interface StoryReviewRecord {
  id: string;
  userId: string;
  storyId: string;
  result: ModerationResult;
  reviewer: "system" | "parent";
  parentApproved: boolean;
  createdAt: string;
}

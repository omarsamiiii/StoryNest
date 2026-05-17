import type { ModerationRule } from "@/types/moderation";

export const CONTENT_POLICY_RULES: ModerationRule[] = [
  {
    id: "privacy-no-full-name",
    category: "privacy",
    severity: "medium",
    label: "Avoid full child identity",
    description: "Stories and prompts should not request legal names, addresses, schools, or birthdays.",
    blockedTerms: ["full name", "last name", "address", "school name", "birthday", "birth date"]
  },
  {
    id: "privacy-no-public-sharing",
    category: "privacy",
    severity: "high",
    label: "No public sharing language",
    description: "The MVP is private and must not encourage public child profiles or public feeds.",
    blockedTerms: ["public profile", "share publicly", "social feed", "followers"]
  },
  {
    id: "bedtime-no-cliffhanger",
    category: "bedtime-safety",
    severity: "medium",
    label: "Avoid cliffhangers",
    description: "Bedtime-safe stories should close gently instead of ending with unresolved tension.",
    blockedTerms: ["to be continued", "what happened next", "cliffhanger"],
    bedtimeSafeOnly: true
  },
  {
    id: "scary-no-nightmare",
    category: "scary-content",
    severity: "blocked",
    label: "No nightmare imagery",
    description: "Nightmare, horror, and jump-scare language is not appropriate for bedtime mode.",
    blockedTerms: ["nightmare", "horror", "jump scare", "terrifying", "haunted"],
    bedtimeSafeOnly: true
  },
  {
    id: "violence-no-graphic",
    category: "violence",
    severity: "blocked",
    label: "No graphic violence",
    description: "Graphic violence is blocked from all child-facing story output.",
    blockedTerms: ["blood", "gore", "weapon", "stab", "shoot", "attack"]
  },
  {
    id: "medical-no-advice",
    category: "medical",
    severity: "high",
    label: "No medical advice",
    description: "The product must not produce medical advice or replace caregiver judgment.",
    blockedTerms: ["dosage", "diagnose", "medicine advice", "ignore the doctor"]
  },
  {
    id: "commercial-no-ads",
    category: "commercial",
    severity: "medium",
    label: "No child-targeted ads",
    description: "Story content should not include purchase pressure or child-targeted promotions.",
    blockedTerms: ["buy now", "ask your parents to buy", "limited time offer"]
  },
  {
    id: "child-chat-no-direct",
    category: "direct-child-address",
    severity: "medium",
    label: "Avoid direct child chat framing",
    description: "StoryNest is parent-controlled and should not mimic an unsupervised child chat.",
    blockedTerms: ["tell me your secret", "message me", "chat with me privately"]
  },
  {
    id: "quality-has-moral",
    category: "general-quality",
    severity: "info",
    label: "Includes a moral",
    description: "A strong StoryNest story should include a parent-readable moral.",
    requiredTerms: ["moral"]
  },
  {
    id: "age-young-short",
    category: "age-fit",
    severity: "low",
    label: "Young children need short pacing",
    description: "Ages 3-4 should use shorter scenes and concrete language.",
    ageRanges: ["3-4"],
    blockedTerms: ["complex metaphor", "abstract philosophy"]
  }
];

export const MODERATION_SCORE_WEIGHTS = {
  info: 0,
  low: 5,
  medium: 15,
  high: 35,
  blocked: 100
} as const;

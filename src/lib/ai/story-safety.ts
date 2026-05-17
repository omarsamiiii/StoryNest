import type { StorySafetyMetadata } from "@/types/story";

const BLOCKED_TERMS = ["gore", "weapon", "nightmare", "kidnap", "blood", "horror"];

export function analyzeStorySafety(text: string, bedtimeSafe: boolean): StorySafetyMetadata {
  const normalized = text.toLowerCase();
  const blockedTerms = BLOCKED_TERMS.filter((term) => normalized.includes(term));

  const safetyNotes = [
    "Parent-controlled generation only.",
    "Avoids direct child chat and public sharing.",
    "Uses nickname and age range only."
  ];

  if (bedtimeSafe) {
    safetyNotes.push("Keeps conflict gentle, reassuring, and sleep-friendly.");
  }

  return {
    bedtimeSafe,
    blockedTerms,
    safetyNotes
  };
}

export function assertStoryIsSafe(text: string, bedtimeSafe: boolean) {
  const metadata = analyzeStorySafety(text, bedtimeSafe);
  if (metadata.blockedTerms.length > 0) {
    throw new Error(`Story contains blocked bedtime terms: ${metadata.blockedTerms.join(", ")}`);
  }
  return metadata;
}

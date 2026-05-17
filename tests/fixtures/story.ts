import type { Story } from "@/types/story";

export function fixtureStory(overrides: Partial<Story> = {}): Story {
  return {
    id: "story_fixture",
    userId: "user_fixture",
    childProfileId: "child_fixture",
    title: "Mira and the Moonlit Garden",
    summary: "Mira learns that kindness grows when shared.",
    recommendedAge: "5-6",
    estimatedReadingTime: "4 minutes",
    theme: "moonlit garden",
    tone: "calm",
    length: "short",
    pages: [
      {
        title: "Part 1",
        body: "Mira found a lantern glowing softly in the garden."
      }
    ],
    moral: "Kindness grows when shared.",
    vocabularyWords: ["lantern", "gentle"],
    discussionQuestions: ["What made the garden feel peaceful?"],
    safetyMetadata: {
      bedtimeSafe: true,
      blockedTerms: [],
      safetyNotes: ["Keeps conflict gentle, reassuring, and sleep-friendly."]
    },
    favorite: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides
  };
}

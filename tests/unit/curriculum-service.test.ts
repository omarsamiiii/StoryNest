import { describe, expect, it } from "vitest";
import { CurriculumService } from "@/lib/curriculum/curriculum-service";
import type { ChildProfile } from "@/types/children";
import { fixtureStory } from "../fixtures/story";

const child: ChildProfile = {
  id: "child_1",
  userId: "user_1",
  nickname: "Mira",
  ageRange: "5-6",
  interests: ["ocean", "animals", "nature"],
  preferredTone: "calm",
  bedtimeSafeDefault: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};

describe("CurriculumService", () => {
  it("recommends profile-aware lessons and downranks covered lessons", () => {
    const service = new CurriculumService();
    const stories = [
      fixtureStory({
        childProfileId: "child_1",
        theme: "quiet tide pool",
        moral: "Slow breaths can help big feelings drift away."
      })
    ];

    const recommendations = service.recommendLessons(child, stories, 4);

    expect(recommendations).toHaveLength(4);
    expect(recommendations.some((item) => item.alreadyCovered)).toBe(true);
    expect(recommendations[0]?.score).toBeGreaterThanOrEqual(recommendations[1]?.score ?? 0);
  });

  it("returns story seeds suitable for the generation form", () => {
    const service = new CurriculumService();

    const seed = service.toStorySeed("breathing-with-the-tide");

    expect(seed).toMatchObject({
      theme: "quiet tide pool",
      lesson: "Slow breaths can help big feelings drift away.",
      length: "short",
      tone: "calm"
    });
    expect(seed.extraInstructions).toContain("Parent goal");
    expect(seed.extraInstructions).toContain("vocabulary words");
  });

  it("throws for missing curriculum lesson ids", () => {
    const service = new CurriculumService();

    expect(() => service.toStorySeed("not-real")).toThrow("Curriculum lesson not found");
  });
});


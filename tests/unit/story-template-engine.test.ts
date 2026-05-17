import { describe, expect, it } from "vitest";
import { StoryTemplateEngine } from "@/lib/templates/story-template-engine";
import type { ChildProfile } from "@/types/children";
import type { StoryTemplate } from "@/types/templates";

const child: ChildProfile = {
  id: "child_1",
  userId: "user_1",
  nickname: "Mira",
  ageRange: "5-6",
  interests: ["space", "robots"],
  preferredTone: "educational",
  bedtimeSafeDefault: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};

const templates: StoryTemplate[] = [
  {
    id: "space",
    name: "Space Questions",
    category: "learning",
    description: "A curious astronomy story.",
    recommendedAgeRanges: ["5-6", "7-8"],
    interests: ["space", "robots"],
    tone: "educational",
    length: "medium",
    themeSeed: "sleepy observatory",
    lessonSeed: "questions help us learn",
    parentInstructionSeed: "Keep the ending calm.",
    bedtimeSafe: true
  },
  {
    id: "ocean",
    name: "Ocean Calm",
    category: "bedtime",
    description: "A quiet ocean story.",
    recommendedAgeRanges: ["3-4"],
    interests: ["ocean"],
    tone: "calm",
    length: "short",
    themeSeed: "tide pool",
    lessonSeed: "slow breaths help",
    parentInstructionSeed: "Use soft imagery.",
    bedtimeSafe: true
  }
];

describe("StoryTemplateEngine", () => {
  it("scores templates using age, interests, tone, and bedtime safety", () => {
    const engine = new StoryTemplateEngine(templates);

    const [recommendation] = engine.recommend(child, 1);

    expect(recommendation.template.id).toBe("space");
    expect(recommendation.score).toBe(100);
    expect(recommendation.reasons).toContain("Uses educational tone");
  });

  it("turns a template into a valid story generation input", () => {
    const engine = new StoryTemplateEngine(templates);

    const input = engine.toStoryInput(child, "space");

    expect(input).toMatchObject({
      childProfileId: "child_1",
      theme: "sleepy observatory",
      lesson: "questions help us learn",
      length: "medium",
      tone: "educational",
      bedtimeSafe: true
    });
  });

  it("throws when a selected template no longer exists", () => {
    const engine = new StoryTemplateEngine(templates);

    expect(() => engine.toStoryInput(child, "missing")).toThrow("Story template not found");
  });
});


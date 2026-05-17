import { describe, expect, it } from "vitest";
import { storyGenerationInputSchema } from "@/validation/story";

describe("storyGenerationInputSchema", () => {
  it("accepts a complete parent-controlled story request", () => {
    const parsed = storyGenerationInputSchema.parse({
      childProfileId: "child_1",
      theme: "ocean kindness",
      lesson: "sharing helps everyone",
      length: "medium",
      tone: "educational",
      bedtimeSafe: true,
      extraInstructions: "Mention a lighthouse."
    });

    expect(parsed.length).toBe("medium");
    expect(parsed.bedtimeSafe).toBe(true);
  });

  it("rejects unsupported story lengths", () => {
    expect(() =>
      storyGenerationInputSchema.parse({
        childProfileId: "child_1",
        theme: "space",
        lesson: "patience",
        length: "epic",
        tone: "calm",
        bedtimeSafe: true
      })
    ).toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { buildStoryPrompt } from "@/lib/ai/prompt-builder";
import { fixtureChild } from "../fixtures/child";

describe("buildStoryPrompt", () => {
  it("includes child-safe personalization details and bedtime constraints", () => {
    const prompt = buildStoryPrompt(fixtureChild, {
      childProfileId: fixtureChild.id,
      theme: "moonlit garden",
      lesson: "kindness grows when shared",
      length: "short",
      tone: "calm",
      bedtimeSafe: true
    });

    expect(prompt).toContain("Child nickname: Mira");
    expect(prompt).toContain("Age range: 5-6");
    expect(prompt).toContain("bedtime-safe constraints");
    expect(prompt).not.toContain("birth date");
  });
});

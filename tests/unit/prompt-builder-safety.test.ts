import { describe, expect, it } from "vitest";
import { buildStoryPrompt } from "@/lib/ai/prompt-builder";
import { fixtureChild } from "../fixtures/child";

describe("buildStoryPrompt safety modes", () => {
  it("uses general child-appropriate language when bedtime-safe mode is disabled", () => {
    const prompt = buildStoryPrompt(fixtureChild, {
      childProfileId: fixtureChild.id,
      theme: "robot parade",
      lesson: "trying again",
      length: "long",
      tone: "funny",
      bedtimeSafe: false
    });

    expect(prompt).toContain("Keep the story child-appropriate");
    expect(prompt).not.toContain("no cliffhanger ending");
  });

  it("includes optional parent instructions without requiring them", () => {
    const prompt = buildStoryPrompt(fixtureChild, {
      childProfileId: fixtureChild.id,
      theme: "ocean",
      lesson: "patience",
      length: "short",
      tone: "calm",
      bedtimeSafe: true,
      extraInstructions: "Include a lighthouse"
    });

    expect(prompt).toContain("Parent instruction: Include a lighthouse.");
  });
});

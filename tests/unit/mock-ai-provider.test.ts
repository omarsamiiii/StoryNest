import { describe, expect, it } from "vitest";
import { MockAIProvider } from "@/lib/ai/mock-ai-provider";
import { buildStoryPrompt } from "@/lib/ai/prompt-builder";
import { fixtureChild } from "../fixtures/child";

describe("MockAIProvider", () => {
  it("returns structured bedtime story content from a prompt", async () => {
    const prompt = buildStoryPrompt(fixtureChild, {
      childProfileId: fixtureChild.id,
      theme: "moonlit garden",
      lesson: "sharing gently",
      length: "medium",
      tone: "calm",
      bedtimeSafe: true
    });

    const story = await new MockAIProvider().generateStory({
      prompt,
      userId: fixtureChild.userId,
      childProfileId: fixtureChild.id
    });

    expect(story.title).toContain("Mira");
    expect(story.pages).toHaveLength(4);
    expect(story.safetyMetadata.bedtimeSafe).toBe(true);
    expect(story.discussionQuestions.length).toBeGreaterThan(0);
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { storyGenerationService } from "@/lib/services/story-generation-service";

describe("StoryGenerationService", () => {
  beforeEach(() => resetLocalStore());

  it("generates and saves a mock story while incrementing usage", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });
    const child = await repositories.children.create(user.id, {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space", "friendship"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });

    const story = await storyGenerationService.generate({
      userId: user.id,
      childProfileId: child.id,
      theme: "moonlit garden",
      lesson: "kindness grows when shared",
      length: "short",
      tone: "calm",
      bedtimeSafe: true
    });

    const usage = await repositories.usage.get(user.id);
    expect(story.title).toContain("Mira");
    expect(story.pages.length).toBe(3);
    expect(usage.generatedStories).toBe(1);
  });
});

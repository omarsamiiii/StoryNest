import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { storyReviewService } from "@/lib/moderation/story-review-service";
import { repositories } from "@/lib/repositories";
import { fixtureStory } from "../fixtures/story";

describe("StoryReviewService", () => {
  beforeEach(() => resetLocalStore());

  it("reviews saved stories and records audit history", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["nature"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    const story = await repositories.stories.save(fixtureStory({ userId: "user_1", childProfileId: child.id }));

    const review = await storyReviewService.reviewStory("user_1", story.id);
    const audits = await repositories.auditLogs.listByUser("user_1");

    expect(review.parentApproved).toBe(true);
    expect(audits[0]).toMatchObject({ action: "moderation.review", entityId: story.id });
  });

  it("flags draft text before it is persisted as a story", async () => {
    const result = await storyReviewService.reviewDraft({
      userId: "user_1",
      storyId: "draft_1",
      text: "A nightmare chased everyone through a cave.",
      bedtimeSafe: true,
      ageRange: "5-6"
    });

    expect(result.allowed).toBe(false);
    expect(result.findings[0]?.category).toBe("scary-content");
  });
});

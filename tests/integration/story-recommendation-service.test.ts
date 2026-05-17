import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { storyRecommendationService } from "@/lib/recommendations/story-recommendation-service";
import { fixtureStory } from "../fixtures/story";

describe("StoryRecommendationService", () => {
  beforeEach(() => resetLocalStore());

  it("builds a recommendation board for every child profile", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "7-8",
      interests: ["space", "robots"],
      preferredTone: "educational",
      bedtimeSafeDefault: true
    });
    await repositories.stories.save(
      fixtureStory({ userId: "user_1", childProfileId: child.id, theme: "sleepy observatory" })
    );

    const board = await storyRecommendationService.board("user_1");

    expect(board.recommendationsByChild).toHaveLength(1);
    expect(board.recommendationsByChild[0]).toMatchObject({
      childProfileId: child.id,
      childNickname: "Mira"
    });
    expect(board.recommendationsByChild[0]?.templates.length).toBeGreaterThan(0);
  });
});


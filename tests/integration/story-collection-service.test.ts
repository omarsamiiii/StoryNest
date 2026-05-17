import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { storyCollectionService } from "@/lib/services/story-collection-service";
import { fixtureStory } from "../fixtures/story";

describe("StoryCollectionService", () => {
  beforeEach(() => resetLocalStore());

  it("creates collection summaries with story counts", async () => {
    const collection = await storyCollectionService.create("user_1", {
      name: "Calm favorites",
      description: "Quiet stories"
    });
    const story = await repositories.stories.save(fixtureStory({ userId: "user_1" }));
    await storyCollectionService.addStory("user_1", collection.id, story.id);

    const summaries = await storyCollectionService.summaries("user_1");

    expect(summaries).toEqual([
      {
        collection: expect.objectContaining({ name: "Calm favorites" }),
        storyCount: 1,
        latestStoryTitle: "Mira and the Moonlit Garden"
      }
    ]);
  });

  it("does not add stories that are not owned by the user", async () => {
    const collection = await storyCollectionService.create("user_1", {
      name: "Calm favorites",
      description: ""
    });
    const story = await repositories.stories.save(fixtureStory({ userId: "user_2" }));

    await expect(storyCollectionService.addStory("user_1", collection.id, story.id)).rejects.toThrow(
      "Story not found"
    );
  });
});

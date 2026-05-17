import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { nowIso } from "@/lib/db/id";
import { repositories } from "@/lib/repositories";
import type { Story } from "@/types/story";

function story(overrides: Partial<Story>): Story {
  return {
    id: "story_default",
    userId: "user_1",
    childProfileId: "child_1",
    title: "A Garden Story",
    summary: "A gentle garden story.",
    recommendedAge: "5-6",
    estimatedReadingTime: "4 minutes",
    theme: "garden",
    tone: "calm",
    length: "short",
    pages: [{ title: "Part 1", body: "A calm beginning." }],
    moral: "kindness",
    vocabularyWords: ["gentle"],
    discussionQuestions: ["What felt kind?"],
    safetyMetadata: { bedtimeSafe: true, blockedTerms: [], safetyNotes: [] },
    favorite: false,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    ...overrides
  };
}

describe("StoryRepository filters", () => {
  beforeEach(() => resetLocalStore());

  it("filters by child, theme, favorite state, and search text", async () => {
    await repositories.stories.save(
      story({
        id: "story_1",
        childProfileId: "child_1",
        title: "Moon Garden",
        theme: "garden",
        favorite: true
      })
    );
    await repositories.stories.save(
      story({
        id: "story_2",
        childProfileId: "child_2",
        title: "Ocean Lantern",
        theme: "ocean",
        favorite: true
      })
    );
    await repositories.stories.save(
      story({
        id: "story_3",
        childProfileId: "child_1",
        title: "Robot Picnic",
        theme: "robots",
        favorite: false
      })
    );

    const stories = await repositories.stories.listByUser("user_1", {
      childProfileId: "child_1",
      theme: "garden",
      favorite: "favorite",
      search: "moon",
      sort: "newest"
    });

    expect(stories.map((item) => item.id)).toEqual(["story_1"]);
  });

  it("sorts titles alphabetically when requested", async () => {
    await repositories.stories.save(story({ id: "story_b", title: "Zebra Night" }));
    await repositories.stories.save(story({ id: "story_a", title: "Apple Moon" }));

    const stories = await repositories.stories.listByUser("user_1", { sort: "title" });

    expect(stories.map((item) => item.title)).toEqual(["Apple Moon", "Zebra Night"]);
  });
});

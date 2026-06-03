import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { readingSessionService } from "@/lib/wellbeing/reading-session-service";
import { repositories } from "@/lib/repositories";
import { fixtureStory } from "../fixtures/story";

describe("ReadingSessionService", () => {
  beforeEach(() => resetLocalStore());

  it("records reading sessions and summarizes minutes by child", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["nature"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    const story = await repositories.stories.save(
      fixtureStory({ id: "story_1", userId: "user_1", childProfileId: child.id })
    );

    const session = await readingSessionService.record("user_1", {
      childProfileId: child.id,
      storyId: story.id,
      reaction: "settled",
      minutesRead: 9,
      parentNote: "Very calm ending.",
      favoriteMoment: "The lantern"
    });
    const summary = await readingSessionService.summary("user_1");

    expect(session).toMatchObject({ minutesRead: 9, reaction: "settled" });
    expect(summary.totalMinutes).toBe(9);
    expect(summary.byChild[0]?.sessions[0]).toMatchObject({
      storyTitle: "Mira and the Moonlit Garden",
      favoriteMoment: "The lantern"
    });
  });
});


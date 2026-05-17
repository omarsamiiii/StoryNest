import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { readingInsightsService } from "@/lib/analytics/reading-insights-service";
import { repositories } from "@/lib/repositories";
import { fixtureStory } from "../fixtures/story";

describe("ReadingInsightsService", () => {
  beforeEach(() => resetLocalStore());

  it("summarizes child reading profiles and favorite themes", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    await repositories.stories.save(
      fixtureStory({ userId: "user_1", childProfileId: child.id, theme: "space", favorite: true })
    );

    const report = await readingInsightsService.report("user_1");

    expect(report.totalStories).toBe(1);
    expect(report.favoriteCount).toBe(1);
    expect(report.childProfiles[0]).toMatchObject({
      childNickname: "Mira",
      favoriteThemes: ["space"],
      bedtimeSafeRatio: 100
    });
  });
});

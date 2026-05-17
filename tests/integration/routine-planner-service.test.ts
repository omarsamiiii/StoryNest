import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { routinePlannerService } from "@/lib/services/routine-planner-service";
import { fixtureStory } from "../fixtures/story";

describe("RoutinePlannerService", () => {
  beforeEach(() => resetLocalStore());

  it("builds a seven-night plan from child profiles even before preferences exist", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    await repositories.stories.save(fixtureStory({ userId: "user_1", childProfileId: child.id }));

    const plan = await routinePlannerService.plan("user_1");

    expect(plan.nights).toHaveLength(7);
    expect(plan.nights[0]).toMatchObject({
      childNickname: "Mira",
      suggestedStoryTitle: "Mira and the Moonlit Garden"
    });
  });

  it("uses saved routine preferences when available", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "7-8",
      interests: ["robots"],
      preferredTone: "educational",
      bedtimeSafeDefault: true
    });
    await repositories.routinePreferences.upsert("user_1", {
      childProfileId: child.id,
      cadence: "daily",
      preferredMinutes: 12,
      preferredTone: "educational",
      includeColoring: true,
      quietStartMinutes: 10,
      lightsOutReminder: true
    });

    const plan = await routinePlannerService.plan("user_1");

    expect(plan.nights[0]?.readingMinutes).toBe(12);
    expect(plan.nights[0]?.windDownSteps).toContain(
      "Offer a coloring page for tomorrow, not after lights out."
    );
  });
});

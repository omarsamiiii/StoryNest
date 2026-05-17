import { beforeEach, describe, expect, it } from "vitest";
import { curriculumService } from "@/lib/curriculum/curriculum-service";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { fixtureStory } from "../fixtures/story";

describe("Curriculum plan integration", () => {
  beforeEach(() => resetLocalStore());

  it("builds one curriculum plan per child profile", async () => {
    const first = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["ocean", "nature"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    const second = await repositories.children.create("user_1", {
      nickname: "Leo",
      ageRange: "9-10",
      interests: ["sports", "friendship"],
      preferredTone: "educational",
      bedtimeSafeDefault: true
    });
    await repositories.stories.save(
      fixtureStory({
        userId: "user_1",
        childProfileId: first.id,
        theme: "quiet tide pool",
        moral: "Slow breaths can help big feelings drift away."
      })
    );

    const plan = await curriculumService.buildPlan("user_1");

    expect(plan.childPlans.map((child) => child.childProfileId)).toEqual([first.id, second.id]);
    expect(plan.childPlans[0]?.nextLessons.length).toBeGreaterThan(0);
    expect(plan.childPlans[0]?.coveredDomains[0]).toMatchObject({ domain: "emotional-regulation" });
  });
});

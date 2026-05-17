import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { coloringPageService } from "@/lib/services/coloring-page-service";
import { fixtureStory } from "../fixtures/story";

describe("coloring page plan limits", () => {
  beforeEach(() => resetLocalStore());

  it("blocks coloring pages on the free plan", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });
    const story = await repositories.stories.save(fixtureStory({ userId: user.id }));

    await expect(coloringPageService.generateForStory(user.id, story.id, 1)).rejects.toThrow(
      "Upgrade"
    );
  });

  it("caps generated coloring pages at three for premium plans", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });
    await repositories.subscriptions.updatePlan(user.id, "family");
    const story = await repositories.stories.save(fixtureStory({ userId: user.id }));

    const pages = await coloringPageService.generateForStory(user.id, story.id, 10);

    expect(pages).toHaveLength(3);
  });
});

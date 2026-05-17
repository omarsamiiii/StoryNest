import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { usageService } from "@/lib/services/usage-service";

describe("usage after plan changes", () => {
  beforeEach(() => resetLocalStore());

  it("recalculates remaining stories when the parent upgrades", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });
    await repositories.usage.incrementStories(user.id);
    await repositories.usage.incrementStories(user.id);

    await repositories.subscriptions.updatePlan(user.id, "premium");
    const summary = await usageService.summary(user.id);

    expect(summary.storyLimit).toBe(50);
    expect(summary.remainingStories).toBe(48);
  });
});

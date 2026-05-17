import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";
import { usageService } from "@/lib/services/usage-service";

describe("UsageService", () => {
  beforeEach(() => resetLocalStore());

  it("reports free plan story limits", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });

    const summary = await usageService.summary(user.id);

    expect(summary.storyLimit).toBe(3);
    expect(summary.remainingStories).toBe(3);
  });

  it("blocks generation when the monthly limit is reached", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });

    await repositories.usage.incrementStories(user.id);
    await repositories.usage.incrementStories(user.id);
    await repositories.usage.incrementStories(user.id);

    await expect(usageService.assertCanGenerateStory(user.id)).rejects.toThrow("monthly story limit");
  });
});

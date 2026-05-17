import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";

describe("SubscriptionRepository", () => {
  beforeEach(() => resetLocalStore());

  it("returns the same subscription when ensuring a user repeatedly", async () => {
    const first = await repositories.subscriptions.ensureForUser("user_1");
    const second = await repositories.subscriptions.ensureForUser("user_1");

    expect(second).toEqual(first);
  });

  it("preserves subscription identity when changing plans", async () => {
    const initial = await repositories.subscriptions.ensureForUser("user_1");
    const upgraded = await repositories.subscriptions.updatePlan("user_1", "premium");

    expect(upgraded.id).toBe(initial.id);
    expect(upgraded.planId).toBe("premium");
  });
});

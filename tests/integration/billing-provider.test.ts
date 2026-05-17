import { beforeEach, describe, expect, it } from "vitest";
import { billingProvider } from "@/lib/billing/mock-billing-provider";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";

describe("MockBillingProvider", () => {
  beforeEach(() => resetLocalStore());

  it("creates a free subscription before upgrade", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });

    const subscription = await billingProvider.getSubscription(user.id);

    expect(subscription.planId).toBe("free");
    expect(subscription.status).toBe("active");
  });

  it("updates the user's plan during mocked upgrade", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });

    const subscription = await billingProvider.upgrade(user.id, "family");

    expect(subscription.planId).toBe("family");
  });
});

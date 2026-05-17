import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";

vi.mock("@/lib/auth/session", () => ({
  requireUser: vi.fn(async () => ({ id: "billing_user", name: "Parent", email: "parent@example.com" }))
}));

describe("billing upgrade API route", () => {
  beforeEach(() => resetLocalStore());

  it("simulates plan upgrades through the billing provider", async () => {
    const { POST } = await import("@/app/api/billing/upgrade/route");
    const response = await POST(
      new Request("http://localhost/api/billing/upgrade", {
        method: "POST",
        body: JSON.stringify({ planId: "premium" })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      userId: "billing_user",
      planId: "premium",
      status: "active"
    });
  });

  it("rejects unsupported plan identifiers", async () => {
    const { POST } = await import("@/app/api/billing/upgrade/route");

    await expect(
      POST(
        new Request("http://localhost/api/billing/upgrade", {
          method: "POST",
          body: JSON.stringify({ planId: "enterprise" })
        })
      )
    ).rejects.toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { getPlanLimit, getPlanOptions } from "@/lib/billing/plan-utils";

describe("plan utilities", () => {
  it("returns premium coloring page access", () => {
    expect(getPlanLimit("premium").coloringPagesPerStory).toBeGreaterThan(0);
  });

  it("lists all public plan options", () => {
    expect(getPlanOptions().map((plan) => plan.id)).toEqual(["free", "premium", "family"]);
  });
});

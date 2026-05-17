import { describe, expect, it } from "vitest";
import { contentPolicyEngine } from "@/lib/moderation/content-policy-engine";

describe("ContentPolicyEngine", () => {
  it("blocks nightmare terms in bedtime-safe mode", () => {
    const result = contentPolicyEngine.evaluate("A nightmare appeared in the story.", {
      bedtimeSafe: true
    });

    expect(result.allowed).toBe(false);
    expect(result.findings[0]?.category).toBe("scary-content");
  });

  it("allows gentle text without findings", () => {
    const result = contentPolicyEngine.evaluate("A calm lantern helped everyone say goodnight.", {
      bedtimeSafe: true
    });

    expect(result.allowed).toBe(true);
    expect(result.findings).toEqual([]);
  });
});

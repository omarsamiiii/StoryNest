import { describe, expect, it } from "vitest";
import { childProfileInputSchema } from "@/validation/children";

describe("childProfileInputSchema", () => {
  it("accepts privacy-conscious child profile fields", () => {
    const parsed = childProfileInputSchema.parse({
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space", "magic"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });

    expect(parsed.nickname).toBe("Mira");
  });

  it("rejects profiles without interests", () => {
    expect(() =>
      childProfileInputSchema.parse({
        nickname: "Mira",
        ageRange: "5-6",
        interests: [],
        preferredTone: "calm",
        bedtimeSafeDefault: true
      })
    ).toThrow();
  });
});

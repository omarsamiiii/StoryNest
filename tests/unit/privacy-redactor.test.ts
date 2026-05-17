import { describe, expect, it } from "vitest";
import { PrivacyRedactor } from "@/lib/privacy/privacy-redactor";
import type { ChildProfile } from "@/types/children";

const redactor = new PrivacyRedactor();

describe("PrivacyRedactor", () => {
  it("redacts contact and location details from parent instructions", () => {
    const result = redactor.redact("Please mention 123 Moon Road and parent@example.com in the story.");

    expect(result.changed).toBe(true);
    expect(result.redacted).toContain("[address]");
    expect(result.redacted).toContain("[email]");
    expect(result.findings.map((finding) => finding.kind)).toEqual(["email", "address"]);
  });

  it("returns a clean checklist for nickname-only child profiles", () => {
    const children: ChildProfile[] = [
      {
        id: "child_1",
        userId: "user_1",
        nickname: "Mira",
        ageRange: "5-6",
        interests: ["space"],
        preferredTone: "calm",
        bedtimeSafeDefault: true,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      }
    ];

    const checklist = redactor.checklist(children);

    expect(checklist.every((item) => item.complete)).toBe(true);
  });
});


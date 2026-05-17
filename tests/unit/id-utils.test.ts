import { describe, expect, it } from "vitest";
import { createId, nowIso } from "@/lib/db/id";

describe("id utilities", () => {
  it("creates IDs with the requested prefix", () => {
    expect(createId("story")).toMatch(/^story_[a-z0-9]+$/);
  });

  it("creates unique IDs across calls", () => {
    expect(createId("child")).not.toBe(createId("child"));
  });

  it("returns ISO timestamps", () => {
    expect(() => new Date(nowIso()).toISOString()).not.toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { analyzeStorySafety, assertStoryIsSafe } from "@/lib/ai/story-safety";

describe("story safety", () => {
  it("records bedtime-safe metadata", () => {
    const metadata = analyzeStorySafety("A gentle lantern glowed softly.", true);

    expect(metadata.bedtimeSafe).toBe(true);
    expect(metadata.safetyNotes).toContain("Keeps conflict gentle, reassuring, and sleep-friendly.");
  });

  it("blocks unsafe terms", () => {
    expect(() => assertStoryIsSafe("A horror scene appeared.", true)).toThrow("blocked");
  });
});

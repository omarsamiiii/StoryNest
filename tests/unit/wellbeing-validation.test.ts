import { describe, expect, it } from "vitest";
import { moodCheckInInputSchema, readingSessionInputSchema } from "@/validation/wellbeing";

describe("wellbeing validation", () => {
  it("coerces numeric form fields for mood check-ins", () => {
    const parsed = moodCheckInInputSchema.parse({
      childProfileId: "child_1",
      mood: "worried",
      energyLevel: "4",
      parentNote: "Needed a calmer story tonight."
    });

    expect(parsed.energyLevel).toBe(4);
    expect(parsed.mood).toBe("worried");
  });

  it("rejects unsafe mood energy values", () => {
    expect(() =>
      moodCheckInInputSchema.parse({
        childProfileId: "child_1",
        mood: "restless",
        energyLevel: 9,
        parentNote: ""
      })
    ).toThrow();
  });

  it("validates reading session notes for known reactions", () => {
    const parsed = readingSessionInputSchema.parse({
      childProfileId: "child_1",
      storyId: "story_1",
      reaction: "wanted-repeat",
      minutesRead: "12",
      parentNote: "Asked to read the ending again.",
      favoriteMoment: "The lantern page"
    });

    expect(parsed.minutesRead).toBe(12);
    expect(parsed.reaction).toBe("wanted-repeat");
  });
});


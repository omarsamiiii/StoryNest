import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoryGenerationForm } from "@/components/stories/story-generation-form";
import { fixtureChild } from "../fixtures/child";

vi.mock("@/lib/services/story-actions", () => ({
  generateStoryAction: vi.fn()
}));

describe("StoryGenerationForm", () => {
  it("renders all story generation controls", () => {
    render(<StoryGenerationForm children={[fixtureChild]} />);

    expect(screen.getByLabelText("Child profile")).toHaveDisplayValue("Mira · ages 5-6");
    expect(screen.getByLabelText("Theme")).toBeRequired();
    expect(screen.getByLabelText("Lesson or moral")).toBeRequired();
    expect(screen.getByLabelText("Bedtime-safe mode")).toBeChecked();
    expect(screen.getByRole("button", { name: "Generate story" })).toBeInTheDocument();
  });

  it("uses the first child profile preferred tone as default tone", () => {
    render(<StoryGenerationForm children={[{ ...fixtureChild, preferredTone: "magical" }]} />);

    expect(screen.getByLabelText("Tone")).toHaveDisplayValue("magical");
  });
});

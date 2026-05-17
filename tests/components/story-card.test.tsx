import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoryCard } from "@/components/stories/story-card";
import { fixtureStory } from "../fixtures/story";

describe("StoryCard", () => {
  it("links to the story reader and shows story metadata", () => {
    render(<StoryCard story={fixtureStory({ id: "story_123", theme: "space" })} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/app/stories/story_123");
    expect(screen.getByText("space")).toBeInTheDocument();
    expect(screen.getByText("4 minutes")).toBeInTheDocument();
  });

  it("renders favorite stories without hiding the title", () => {
    render(<StoryCard story={fixtureStory({ favorite: true })} />);

    expect(screen.getByText("Mira and the Moonlit Garden")).toBeInTheDocument();
  });
});

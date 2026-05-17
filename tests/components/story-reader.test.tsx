import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StoryReader } from "@/components/stories/story-reader";
import { fixtureStory } from "../fixtures/story";

vi.mock("@/lib/services/story-actions", () => ({
  favoriteStoryAction: vi.fn()
}));

vi.mock("@/lib/services/coloring-actions", () => ({
  generateColoringPagesAction: vi.fn()
}));

describe("StoryReader", () => {
  it("renders story sections and parent reading aids", () => {
    render(
      <StoryReader
        story={fixtureStory({
          pages: [
            { title: "A Quiet Start", body: "Mira tucked the lantern beside a sleepy flower." },
            { title: "A Kind Choice", body: "She shared its glow with a friend." }
          ]
        })}
      />
    );

    expect(screen.getByRole("heading", { name: "Mira and the Moonlit Garden" })).toBeInTheDocument();
    expect(screen.getByText("A Quiet Start")).toBeInTheDocument();
    expect(screen.getByText("A Kind Choice")).toBeInTheDocument();
    expect(screen.getByText("Kindness grows when shared.")).toBeInTheDocument();
    expect(screen.getByText("lantern, gentle")).toBeInTheDocument();
  });

  it("links to the printable story view and exposes coloring generation", () => {
    render(<StoryReader story={fixtureStory({ id: "story_print" })} />);

    expect(screen.getByRole("link", { name: "Print" })).toHaveAttribute(
      "href",
      "/app/stories/story_print/print"
    );
    expect(screen.getByRole("button", { name: "Generate coloring pages" })).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import { exportStory } from "@/lib/export/story-exporter";
import { fixtureStory } from "../fixtures/story";

describe("exportStory", () => {
  it("exports stories as markdown", () => {
    const result = exportStory(fixtureStory(), "markdown");

    expect(result.filename).toBe("mira-and-the-moonlit-garden.md");
    expect(result.mimeType).toContain("text/markdown");
    expect(result.body).toContain("# Mira and the Moonlit Garden");
    expect(result.body).toContain("## Discussion questions");
  });

  it("exports stories as plain text without markdown heading markers", () => {
    const result = exportStory(fixtureStory(), "plainText");

    expect(result.filename).toBe("mira-and-the-moonlit-garden.txt");
    expect(result.body).toContain("Mira and the Moonlit Garden");
    expect(result.body).not.toContain("## Moral");
  });

  it("exports stories as formatted json", () => {
    const result = exportStory(fixtureStory({ id: "story_json" }), "json");

    expect(result.filename).toBe("mira-and-the-moonlit-garden.json");
    expect(JSON.parse(result.body)).toMatchObject({ id: "story_json" });
  });
});

import { describe, expect, it } from "vitest";
import { MockImageProvider } from "@/lib/image/mock-image-provider";
import type { Story } from "@/types/story";

const story: Story = {
  id: "story_1",
  userId: "user_1",
  childProfileId: "child_1",
  title: "Mira and the Moon",
  summary: "A calm story.",
  recommendedAge: "5-6",
  estimatedReadingTime: "4 minutes",
  theme: "moon",
  tone: "calm",
  length: "short",
  pages: [],
  moral: "sharing",
  vocabularyWords: [],
  discussionQuestions: [],
  safetyMetadata: { bedtimeSafe: true, blockedTerms: [], safetyNotes: [] },
  favorite: false,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};

describe("MockImageProvider", () => {
  it("returns printable SVG data URLs", async () => {
    const pages = await new MockImageProvider().generateColoringPages(story, 1);

    expect(pages[0]?.prompt).toContain("Black and white printable line-art");
    expect(pages[0]?.imageUrl).toContain("data:image/svg+xml");
  });
});

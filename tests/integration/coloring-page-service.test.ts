import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { billingProvider } from "@/lib/billing/mock-billing-provider";
import { repositories } from "@/lib/repositories";
import { coloringPageService } from "@/lib/services/coloring-page-service";
import { storyGenerationService } from "@/lib/services/story-generation-service";

describe("ColoringPageService", () => {
  beforeEach(() => resetLocalStore());

  it("generates SVG coloring pages for premium users", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });
    await billingProvider.upgrade(user.id, "premium");
    const child = await repositories.children.create(user.id, {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    const story = await storyGenerationService.generate({
      userId: user.id,
      childProfileId: child.id,
      theme: "moon",
      lesson: "sharing",
      length: "short",
      tone: "calm",
      bedtimeSafe: true
    });

    const pages = await coloringPageService.generateForStory(user.id, story.id, 2);

    expect(pages).toHaveLength(2);
    expect(pages[0]?.imageUrl).toContain("data:image/svg+xml");
  });
});

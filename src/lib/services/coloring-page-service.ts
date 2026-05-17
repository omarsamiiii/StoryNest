import { PLAN_LIMITS } from "@/constants/plans";
import { createId, nowIso } from "@/lib/db/id";
import { MockImageProvider } from "@/lib/image/mock-image-provider";
import { repositories } from "@/lib/repositories";

export class ColoringPageService {
  constructor(private readonly imageProvider = new MockImageProvider()) {}

  async generateForStory(userId: string, storyId: string, count = 3) {
    const story = await repositories.stories.findById(userId, storyId);
    if (!story) throw new Error("Story not found.");

    const subscription = await repositories.subscriptions.ensureForUser(userId);
    const allowed = PLAN_LIMITS[subscription.planId].coloringPagesPerStory;
    if (allowed < 1) throw new Error("Upgrade to generate printable coloring pages.");

    const boundedCount = Math.max(1, Math.min(count, allowed, 3));
    const generated = await this.imageProvider.generateColoringPages(story, boundedCount);
    const timestamp = nowIso();
    return repositories.coloringPages.saveMany(
      generated.map((page) => ({
        ...page,
        id: createId("color"),
        createdAt: timestamp
      }))
    );
  }
}

export const coloringPageService = new ColoringPageService();

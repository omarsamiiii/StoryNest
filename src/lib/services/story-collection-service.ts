import { repositories } from "@/lib/repositories";
import type { CollectionStorySummary } from "@/types/collections";
import type { CollectionInput } from "@/validation/collections";

export class StoryCollectionService {
  async create(userId: string, input: CollectionInput) {
    return repositories.collections.create(userId, input);
  }

  async addStory(userId: string, collectionId: string, storyId: string) {
    const story = await repositories.stories.findById(userId, storyId);
    if (!story) throw new Error("Story not found.");
    const collection = await repositories.collections.addStory(userId, collectionId, storyId);
    if (!collection) throw new Error("Collection not found.");
    return collection;
  }

  async removeStory(userId: string, collectionId: string, storyId: string) {
    const collection = await repositories.collections.removeStory(userId, collectionId, storyId);
    if (!collection) throw new Error("Collection not found.");
    return collection;
  }

  async summaries(userId: string): Promise<CollectionStorySummary[]> {
    const [collections, stories] = await Promise.all([
      repositories.collections.listByUser(userId),
      repositories.stories.listByUser(userId)
    ]);
    return collections.map((collection) => {
      const collectionStories = collection.storyIds
        .map((storyId) => stories.find((story) => story.id === storyId))
        .filter(Boolean);
      const latest = collectionStories.sort((a, b) =>
        b!.createdAt.localeCompare(a!.createdAt)
      )[0];
      return {
        collection,
        storyCount: collection.storyIds.length,
        latestStoryTitle: latest?.title
      };
    });
  }
}

export const storyCollectionService = new StoryCollectionService();

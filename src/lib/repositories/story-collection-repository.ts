import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { StoryCollection } from "@/types/collections";
import type { CollectionInput } from "@/validation/collections";

export class StoryCollectionRepository {
  async listByUser(userId: string) {
    return getLocalStore()
      .collections.filter((collection) => collection.userId === userId)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async findById(userId: string, id: string) {
    return (
      getLocalStore().collections.find(
        (collection) => collection.userId === userId && collection.id === id
      ) ?? null
    );
  }

  async create(userId: string, input: CollectionInput): Promise<StoryCollection> {
    const timestamp = nowIso();
    const collection: StoryCollection = {
      id: createId("collection"),
      userId,
      name: input.name,
      description: input.description,
      storyIds: [],
      createdAt: timestamp,
      updatedAt: timestamp
    };
    getLocalStore().collections.push(collection);
    return collection;
  }

  async update(userId: string, id: string, input: CollectionInput) {
    const collection = await this.findById(userId, id);
    if (!collection) return null;
    collection.name = input.name;
    collection.description = input.description;
    collection.updatedAt = nowIso();
    return collection;
  }

  async delete(userId: string, id: string) {
    const store = getLocalStore();
    const initialLength = store.collections.length;
    store.collections = store.collections.filter(
      (collection) => !(collection.userId === userId && collection.id === id)
    );
    return store.collections.length !== initialLength;
  }

  async addStory(userId: string, collectionId: string, storyId: string) {
    const collection = await this.findById(userId, collectionId);
    if (!collection) return null;
    if (!collection.storyIds.includes(storyId)) {
      collection.storyIds.push(storyId);
      collection.updatedAt = nowIso();
    }
    return collection;
  }

  async removeStory(userId: string, collectionId: string, storyId: string) {
    const collection = await this.findById(userId, collectionId);
    if (!collection) return null;
    collection.storyIds = collection.storyIds.filter((id) => id !== storyId);
    collection.updatedAt = nowIso();
    return collection;
  }
}

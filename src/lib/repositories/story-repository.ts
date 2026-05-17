import type { Story } from "@/types/story";
import type { StoryLibraryQuery } from "@/validation/story";
import { getLocalStore } from "@/lib/db/local-store";

export class StoryRepository {
  async listByUser(userId: string, query?: Partial<StoryLibraryQuery>) {
    let stories = getLocalStore().stories.filter((story) => story.userId === userId);

    if (query?.search) {
      const needle = query.search.toLowerCase();
      stories = stories.filter(
        (story) =>
          story.title.toLowerCase().includes(needle) ||
          story.summary.toLowerCase().includes(needle) ||
          story.theme.toLowerCase().includes(needle)
      );
    }

    if (query?.childProfileId && query.childProfileId !== "all") {
      stories = stories.filter((story) => story.childProfileId === query.childProfileId);
    }

    if (query?.theme && query.theme !== "all") {
      stories = stories.filter((story) => story.theme === query.theme);
    }

    if (query?.favorite === "favorite") {
      stories = stories.filter((story) => story.favorite);
    }

    return [...stories].sort((a, b) => {
      if (query?.sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      if (query?.sort === "title") return a.title.localeCompare(b.title);
      return b.createdAt.localeCompare(a.createdAt);
    });
  }

  async findById(userId: string, id: string) {
    return getLocalStore().stories.find((story) => story.userId === userId && story.id === id) ?? null;
  }

  async save(story: Story) {
    getLocalStore().stories.push(story);
    return story;
  }

  async setFavorite(userId: string, id: string, favorite: boolean) {
    const story = await this.findById(userId, id);
    if (!story) return null;
    story.favorite = favorite;
    story.updatedAt = new Date().toISOString();
    return story;
  }

  async distinctThemes(userId: string) {
    const themes = getLocalStore().stories
      .filter((story) => story.userId === userId)
      .map((story) => story.theme);
    return Array.from(new Set(themes)).sort();
  }
}

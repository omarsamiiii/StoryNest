import type { ColoringPage } from "@/types/coloring";
import { getLocalStore } from "@/lib/db/local-store";

export class ColoringPageRepository {
  async listByStory(userId: string, storyId: string) {
    return getLocalStore().coloringPages.filter(
      (page) => page.userId === userId && page.storyId === storyId
    );
  }

  async saveMany(pages: ColoringPage[]) {
    getLocalStore().coloringPages.push(...pages);
    return pages;
  }
}

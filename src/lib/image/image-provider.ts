import type { ColoringPage } from "@/types/coloring";
import type { Story } from "@/types/story";

export interface ImageProvider {
  generateColoringPages(story: Story, count: number): Promise<Omit<ColoringPage, "id" | "createdAt">[]>;
}

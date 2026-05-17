import type { Story } from "@/types/story";

export interface StoryPromptPayload {
  prompt: string;
  userId: string;
  childProfileId: string;
}

export interface AIProvider {
  generateStory(payload: StoryPromptPayload): Promise<Omit<Story, "id" | "createdAt" | "updatedAt">>;
}

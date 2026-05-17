import { z } from "zod";
import { STORY_LENGTHS, STORY_TONES } from "@/constants/children";

export const storyGenerationInputSchema = z.object({
  childProfileId: z.string().min(1),
  theme: z.string().trim().min(2).max(80),
  lesson: z.string().trim().min(2).max(120),
  length: z.enum(STORY_LENGTHS),
  tone: z.enum(STORY_TONES),
  bedtimeSafe: z.coerce.boolean().default(true),
  extraInstructions: z.string().trim().max(300).optional()
});

export const storyLibraryQuerySchema = z.object({
  search: z.string().optional().default(""),
  childProfileId: z.string().optional().default("all"),
  theme: z.string().optional().default("all"),
  favorite: z.enum(["all", "favorite"]).optional().default("all"),
  sort: z.enum(["newest", "oldest", "title"]).optional().default("newest")
});

export type StoryGenerationInput = z.infer<typeof storyGenerationInputSchema>;
export type StoryLibraryQuery = z.infer<typeof storyLibraryQuerySchema>;

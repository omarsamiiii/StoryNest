import { z } from "zod";

export const collectionInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().max(240).default("")
});

export const collectionStoryInputSchema = z.object({
  collectionId: z.string().min(1),
  storyId: z.string().min(1)
});

export type CollectionInput = z.infer<typeof collectionInputSchema>;

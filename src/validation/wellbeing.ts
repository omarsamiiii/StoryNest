import { z } from "zod";

export const moodCheckInInputSchema = z.object({
  childProfileId: z.string().min(1),
  mood: z.enum(["peaceful", "silly", "worried", "tired", "curious", "restless"]),
  energyLevel: z.coerce.number().int().min(1).max(5),
  parentNote: z.string().max(280).default("")
});

export const readingSessionInputSchema = z.object({
  childProfileId: z.string().min(1),
  storyId: z.string().min(1),
  reaction: z.enum(["settled", "engaged", "sleepy", "asked-questions", "wanted-repeat"]),
  minutesRead: z.coerce.number().int().min(1).max(60),
  parentNote: z.string().max(500).default(""),
  favoriteMoment: z.string().max(240).optional()
});

export type MoodCheckInInput = z.infer<typeof moodCheckInInputSchema>;
export type ReadingSessionInput = z.infer<typeof readingSessionInputSchema>;


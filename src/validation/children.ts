import { z } from "zod";
import { AGE_RANGES, INTERESTS, STORY_TONES } from "@/constants/children";

export const childProfileInputSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, "Nickname is required")
    .max(40, "Use a nickname instead of a full legal name"),
  ageRange: z.enum(AGE_RANGES),
  interests: z.array(z.enum(INTERESTS)).min(1).max(5),
  preferredTone: z.enum(STORY_TONES),
  bedtimeSafeDefault: z.coerce.boolean().default(true)
});

export type ChildProfileInput = z.infer<typeof childProfileInputSchema>;

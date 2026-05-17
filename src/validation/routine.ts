import { z } from "zod";
import { STORY_TONES } from "@/constants/children";

export const routinePreferencesInputSchema = z.object({
  childProfileId: z.string().min(1),
  cadence: z.enum(["daily", "weeknights", "custom"]).default("daily"),
  preferredMinutes: z.coerce.number().int().min(4).max(20).default(8),
  preferredTone: z.enum(STORY_TONES).default("calm"),
  includeColoring: z.coerce.boolean().default(false),
  quietStartMinutes: z.coerce.number().int().min(0).max(30).default(5),
  lightsOutReminder: z.coerce.boolean().default(true)
});

export type RoutinePreferencesInput = z.infer<typeof routinePreferencesInputSchema>;

import type { StoryTone } from "@/types/children";

export type RoutineCadence = "daily" | "weeknights" | "custom";

export interface RoutinePreferences {
  id: string;
  userId: string;
  childProfileId: string;
  cadence: RoutineCadence;
  preferredMinutes: number;
  preferredTone: StoryTone;
  includeColoring: boolean;
  quietStartMinutes: number;
  lightsOutReminder: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineNightPlan {
  day: string;
  childProfileId: string;
  childNickname: string;
  theme: string;
  tone: StoryTone;
  readingMinutes: number;
  suggestedStoryId?: string;
  suggestedStoryTitle?: string;
  parentPrompt: string;
  windDownSteps: string[];
}

export interface RoutinePlan {
  userId: string;
  generatedAt: string;
  nights: RoutineNightPlan[];
  safetyNotes: string[];
}

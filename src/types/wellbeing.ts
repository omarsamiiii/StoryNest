import type { StoryTone } from "@/types/children";

export type BedtimeMood = "peaceful" | "silly" | "worried" | "tired" | "curious" | "restless";
export type SessionReaction = "settled" | "engaged" | "sleepy" | "asked-questions" | "wanted-repeat";

export interface MoodCheckIn {
  id: string;
  userId: string;
  childProfileId: string;
  mood: BedtimeMood;
  energyLevel: number;
  parentNote: string;
  suggestedTone: StoryTone;
  suggestedTheme: string;
  calmingPrompt: string;
  createdAt: string;
}

export interface ReadingSession {
  id: string;
  userId: string;
  childProfileId: string;
  storyId: string;
  reaction: SessionReaction;
  minutesRead: number;
  parentNote: string;
  favoriteMoment?: string;
  createdAt: string;
}

export interface KeepsakeCertificate {
  id: string;
  childProfileId: string;
  childNickname: string;
  title: string;
  subtitle: string;
  achievement: string;
  detailLines: string[];
  palette: "sunrise" | "moonlight" | "rainbow";
  generatedAt: string;
}


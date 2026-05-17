import type { StoryTone } from "@/types/children";
import type { STORY_LENGTHS } from "@/constants/children";

export type StoryLength = (typeof STORY_LENGTHS)[number];

export interface StorySafetyMetadata {
  bedtimeSafe: boolean;
  blockedTerms: string[];
  safetyNotes: string[];
}

export interface StorySection {
  title: string;
  body: string;
}

export interface Story {
  id: string;
  userId: string;
  childProfileId: string;
  title: string;
  summary: string;
  recommendedAge: string;
  estimatedReadingTime: string;
  theme: string;
  tone: StoryTone;
  length: StoryLength;
  pages: StorySection[];
  moral: string;
  vocabularyWords: string[];
  discussionQuestions: string[];
  safetyMetadata: StorySafetyMetadata;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoryGenerationRequest {
  userId: string;
  childProfileId: string;
  theme: string;
  lesson: string;
  length: StoryLength;
  tone: StoryTone;
  bedtimeSafe: boolean;
  extraInstructions?: string;
}

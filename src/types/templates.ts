import type { Interest, StoryTone } from "@/types/children";
import type { StoryLength } from "@/types/story";

export type TemplateCategory = "bedtime" | "learning" | "confidence" | "friendship" | "transition";

export interface StoryTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  recommendedAgeRanges: string[];
  interests: Interest[];
  tone: StoryTone;
  length: StoryLength;
  themeSeed: string;
  lessonSeed: string;
  parentInstructionSeed: string;
  bedtimeSafe: boolean;
}

export interface TemplateRecommendation {
  template: StoryTemplate;
  score: number;
  reasons: string[];
}

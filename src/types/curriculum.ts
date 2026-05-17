import type { AgeRange, Interest, StoryTone } from "@/types/children";
import type { StoryLength } from "@/types/story";

export type CurriculumDomain =
  | "emotional-regulation"
  | "confidence"
  | "friendship"
  | "curiosity"
  | "responsibility"
  | "transitions"
  | "creativity"
  | "family-values";

export type CurriculumDifficulty = "starter" | "growing" | "stretch";

export interface CurriculumLesson {
  id: string;
  domain: CurriculumDomain;
  difficulty: CurriculumDifficulty;
  title: string;
  parentGoal: string;
  childFacingGoal: string;
  recommendedAgeRanges: AgeRange[];
  interests: Interest[];
  tone: StoryTone;
  length: StoryLength;
  themeSeeds: string[];
  moralSeed: string;
  vocabularyTargets: string[];
  discussionPrompts: string[];
  bedtimeSafetyNotes: string[];
  followUpActivity: string;
}

export interface CurriculumTrack {
  id: string;
  title: string;
  description: string;
  domain: CurriculumDomain;
  lessonIds: string[];
  parentOutcome: string;
}

export interface CurriculumRecommendation {
  lesson: CurriculumLesson;
  score: number;
  reasons: string[];
  alreadyCovered: boolean;
}

export interface CurriculumPlan {
  userId: string;
  generatedAt: string;
  childPlans: Array<{
    childProfileId: string;
    childNickname: string;
    recommendedTrack: CurriculumTrack;
    nextLessons: CurriculumRecommendation[];
    coveredDomains: Array<{ domain: CurriculumDomain; count: number }>;
    parentGuidance: string[];
  }>;
}


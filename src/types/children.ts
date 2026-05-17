import type { AGE_RANGES, INTERESTS, STORY_TONES } from "@/constants/children";

export type AgeRange = (typeof AGE_RANGES)[number];
export type Interest = (typeof INTERESTS)[number];
export type StoryTone = (typeof STORY_TONES)[number];

export interface ChildProfile {
  id: string;
  userId: string;
  nickname: string;
  ageRange: AgeRange;
  interests: Interest[];
  preferredTone: StoryTone;
  bedtimeSafeDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

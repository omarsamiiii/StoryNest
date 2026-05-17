export interface ReadingInsight {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: "positive" | "neutral" | "warning";
}

export interface ChildReadingProfile {
  childProfileId: string;
  childNickname: string;
  storyCount: number;
  favoriteThemes: string[];
  commonVocabulary: string[];
  averageReadingMinutes: number;
  bedtimeSafeRatio: number;
}

export interface ParentInsightReport {
  userId: string;
  generatedAt: string;
  totalStories: number;
  favoriteCount: number;
  estimatedReadingMinutes: number;
  mostUsedThemes: string[];
  childProfiles: ChildReadingProfile[];
  insights: ReadingInsight[];
}

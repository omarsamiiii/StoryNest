export type MilestoneCategory =
  | "story-count"
  | "favorite-habit"
  | "bedtime-safe"
  | "variety"
  | "discussion"
  | "profile-care";

export type MilestoneTier = "bronze" | "silver" | "gold" | "rainbow";

export interface MilestoneRule {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  tier: MilestoneTier;
  target: number;
  unit: string;
  parentTip: string;
}

export interface MilestoneProgress {
  rule: MilestoneRule;
  progress: number;
  target: number;
  percent: number;
  achieved: boolean;
  achievedAt?: string;
  encouragement: string;
}

export interface ChildMilestoneBoard {
  childProfileId: string;
  childNickname: string;
  storyCount: number;
  favoriteCount: number;
  bedtimeSafeCount: number;
  themeCount: number;
  vocabularyWordCount: number;
  discussionQuestionCount: number;
  milestones: MilestoneProgress[];
  nextMilestone?: MilestoneProgress;
}

export interface ParentMilestoneReport {
  userId: string;
  generatedAt: string;
  totalAchieved: number;
  totalAvailable: number;
  childBoards: ChildMilestoneBoard[];
  familyHighlights: string[];
}


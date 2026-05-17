import type { User } from "@/types/auth";
import type { AuditLogEntry } from "@/types/audit";
import type { Subscription } from "@/types/billing";
import type { ChildProfile } from "@/types/children";
import type { ColoringPage } from "@/types/coloring";
import type { StoryCollection } from "@/types/collections";
import type { GenerationJob } from "@/types/jobs";
import type { BedtimeReminder } from "@/types/notifications";
import type { RoutinePreferences } from "@/types/routine";
import type { Story } from "@/types/story";
import type { StoryReviewRecord } from "@/types/moderation";

export interface UsageRecord {
  userId: string;
  month: string;
  generatedStories: number;
}

export interface LocalStore {
  users: User[];
  passwordHashes: Record<string, string>;
  children: ChildProfile[];
  stories: Story[];
  coloringPages: ColoringPage[];
  collections: StoryCollection[];
  routinePreferences: RoutinePreferences[];
  subscriptions: Subscription[];
  usage: UsageRecord[];
  auditLogs: AuditLogEntry[];
  storyReviews: StoryReviewRecord[];
  generationJobs: GenerationJob[];
  bedtimeReminders: BedtimeReminder[];
}

const globalForStore = globalThis as typeof globalThis & {
  storyNestStore?: LocalStore;
};

export function getLocalStore(): LocalStore {
  if (!globalForStore.storyNestStore) {
    globalForStore.storyNestStore = {
      users: [],
      passwordHashes: {},
      children: [],
      stories: [],
      coloringPages: [],
      collections: [],
      routinePreferences: [],
      subscriptions: [],
      usage: [],
      auditLogs: [],
      storyReviews: [],
      generationJobs: [],
      bedtimeReminders: []
    };
  }

  return globalForStore.storyNestStore;
}

export function resetLocalStore() {
  globalForStore.storyNestStore = undefined;
}

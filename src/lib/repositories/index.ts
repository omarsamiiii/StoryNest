import { ChildProfileRepository } from "@/lib/repositories/child-profile-repository";
import { AuditLogRepository } from "@/lib/repositories/audit-log-repository";
import { BedtimeReminderRepository } from "@/lib/repositories/bedtime-reminder-repository";
import { ColoringPageRepository } from "@/lib/repositories/coloring-page-repository";
import { GenerationJobRepository } from "@/lib/repositories/generation-job-repository";
import { StoryRepository } from "@/lib/repositories/story-repository";
import { StoryCollectionRepository } from "@/lib/repositories/story-collection-repository";
import { SubscriptionRepository } from "@/lib/repositories/subscription-repository";
import { RoutinePreferencesRepository } from "@/lib/repositories/routine-preferences-repository";
import { StoryReviewRepository } from "@/lib/repositories/story-review-repository";
import { UsageRepository } from "@/lib/repositories/usage-repository";
import { UserRepository } from "@/lib/repositories/user-repository";

export const repositories = {
  users: new UserRepository(),
  auditLogs: new AuditLogRepository(),
  subscriptions: new SubscriptionRepository(),
  children: new ChildProfileRepository(),
  stories: new StoryRepository(),
  collections: new StoryCollectionRepository(),
  coloringPages: new ColoringPageRepository(),
  routinePreferences: new RoutinePreferencesRepository(),
  storyReviews: new StoryReviewRepository(),
  generationJobs: new GenerationJobRepository(),
  bedtimeReminders: new BedtimeReminderRepository(),
  usage: new UsageRepository()
};

import type { AuditLogEntry } from "@/types/audit";
import type { Subscription } from "@/types/billing";
import type { ChildProfile } from "@/types/children";
import type { ColoringPage } from "@/types/coloring";
import type { StoryCollection } from "@/types/collections";
import type { GenerationJob } from "@/types/jobs";
import type { StoryReviewRecord } from "@/types/moderation";
import type { BedtimeReminder } from "@/types/notifications";
import type { RoutinePreferences } from "@/types/routine";
import type { Story } from "@/types/story";

type Row = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asObject<T extends object>(value: unknown, fallback: T): T {
  return value && typeof value === "object" ? (value as T) : fallback;
}

export const postgresMappers = {
  childToRow(child: ChildProfile) {
    return {
      id: child.id,
      user_id: child.userId,
      nickname: child.nickname,
      age_range: child.ageRange,
      interests: child.interests,
      preferred_tone: child.preferredTone,
      bedtime_safe_default: child.bedtimeSafeDefault,
      created_at: child.createdAt,
      updated_at: child.updatedAt
    };
  },

  childFromRow(row: Row): ChildProfile {
    return {
      id: asString(row.id),
      userId: asString(row.user_id),
      nickname: asString(row.nickname),
      ageRange: asString(row.age_range) as ChildProfile["ageRange"],
      interests: asArray<ChildProfile["interests"][number]>(row.interests),
      preferredTone: asString(row.preferred_tone) as ChildProfile["preferredTone"],
      bedtimeSafeDefault: asBoolean(row.bedtime_safe_default, true),
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at)
    };
  },

  storyToRow(story: Story) {
    return {
      id: story.id,
      user_id: story.userId,
      child_profile_id: story.childProfileId,
      title: story.title,
      summary: story.summary,
      recommended_age: story.recommendedAge,
      estimated_reading_time: story.estimatedReadingTime,
      theme: story.theme,
      tone: story.tone,
      length: story.length,
      pages: story.pages,
      moral: story.moral,
      vocabulary_words: story.vocabularyWords,
      discussion_questions: story.discussionQuestions,
      safety_metadata: story.safetyMetadata,
      favorite: story.favorite,
      created_at: story.createdAt,
      updated_at: story.updatedAt
    };
  },

  storyFromRow(row: Row): Story {
    return {
      id: asString(row.id),
      userId: asString(row.user_id),
      childProfileId: asString(row.child_profile_id),
      title: asString(row.title),
      summary: asString(row.summary),
      recommendedAge: asString(row.recommended_age),
      estimatedReadingTime: asString(row.estimated_reading_time),
      theme: asString(row.theme),
      tone: asString(row.tone) as Story["tone"],
      length: asString(row.length) as Story["length"],
      pages: asArray<Story["pages"][number]>(row.pages),
      moral: asString(row.moral),
      vocabularyWords: asArray<string>(row.vocabulary_words),
      discussionQuestions: asArray<string>(row.discussion_questions),
      safetyMetadata: asObject<Story["safetyMetadata"]>(row.safety_metadata, {
        bedtimeSafe: true,
        blockedTerms: [],
        safetyNotes: []
      }),
      favorite: asBoolean(row.favorite),
      createdAt: asString(row.created_at),
      updatedAt: asString(row.updated_at)
    };
  },

  subscriptionToRow(subscription: Subscription) {
    return {
      id: subscription.id,
      user_id: subscription.userId,
      plan_id: subscription.planId,
      status: subscription.status,
      current_period_start: subscription.currentPeriodStart,
      current_period_end: subscription.currentPeriodEnd
    };
  },

  coloringPageToRow(page: ColoringPage) {
    return {
      id: page.id,
      user_id: page.userId,
      story_id: page.storyId,
      title: page.title,
      description: page.description,
      prompt: page.prompt,
      image_url: page.imageUrl,
      created_at: page.createdAt
    };
  },

  collectionToRow(collection: StoryCollection) {
    return {
      id: collection.id,
      user_id: collection.userId,
      name: collection.name,
      description: collection.description,
      story_ids: collection.storyIds,
      created_at: collection.createdAt,
      updated_at: collection.updatedAt
    };
  },

  routineToRow(routine: RoutinePreferences) {
    return {
      id: routine.id,
      user_id: routine.userId,
      child_profile_id: routine.childProfileId,
      cadence: routine.cadence,
      preferred_minutes: routine.preferredMinutes,
      preferred_tone: routine.preferredTone,
      include_coloring: routine.includeColoring,
      quiet_start_minutes: routine.quietStartMinutes,
      lights_out_reminder: routine.lightsOutReminder,
      created_at: routine.createdAt,
      updated_at: routine.updatedAt
    };
  },

  auditToRow(entry: AuditLogEntry) {
    return {
      id: entry.id,
      user_id: entry.userId,
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId,
      metadata: entry.metadata,
      created_at: entry.createdAt
    };
  },

  reviewToRow(review: StoryReviewRecord) {
    return {
      id: review.id,
      user_id: review.userId,
      story_id: review.storyId,
      result: review.result,
      reviewer: review.reviewer,
      parent_approved: review.parentApproved,
      created_at: review.createdAt
    };
  },

  jobToRow(job: GenerationJob) {
    return {
      id: job.id,
      user_id: job.userId,
      type: job.type,
      status: job.status,
      attempts: job.attempts,
      max_attempts: job.maxAttempts,
      payload: job.payload,
      result: job.result,
      error: job.error,
      scheduled_at: job.scheduledAt,
      started_at: job.startedAt,
      completed_at: job.completedAt,
      created_at: job.createdAt,
      updated_at: job.updatedAt
    };
  },

  reminderToRow(reminder: BedtimeReminder) {
    return {
      id: reminder.id,
      user_id: reminder.userId,
      child_profile_id: reminder.childProfileId,
      channel: reminder.channel,
      status: reminder.status,
      local_time: reminder.localTime,
      message: reminder.message,
      scheduled_for_day: reminder.scheduledForDay,
      created_at: reminder.createdAt,
      updated_at: reminder.updatedAt
    };
  }
};

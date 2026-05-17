import { sqlBuilder } from "@/lib/persistence/sql-builder";
import { postgresMappers } from "@/lib/persistence/postgres-mappers";
import type { AuditLogEntry } from "@/types/audit";
import type { ChildProfile } from "@/types/children";
import type { ColoringPage } from "@/types/coloring";
import type { StoryCollection } from "@/types/collections";
import type { GenerationJob } from "@/types/jobs";
import type { StoryReviewRecord } from "@/types/moderation";
import type { BedtimeReminder } from "@/types/notifications";
import type { RoutinePreferences } from "@/types/routine";
import type { Story } from "@/types/story";

const allColumns: string[] | undefined = undefined;

export class PostgresQueryFactory {
  childProfiles = {
    insert: (child: ChildProfile) =>
      sqlBuilder.insert({
        table: "child_profiles",
        values: postgresMappers.childToRow(child),
        returning: allColumns
      }),
    listByUser: (userId: string) =>
      sqlBuilder.select({
        table: "child_profiles",
        where: { user_id: userId },
        orderBy: [{ column: "created_at", direction: "desc" }]
      }),
    findById: (userId: string, id: string) =>
      sqlBuilder.select({
        table: "child_profiles",
        where: { user_id: userId, id },
        limit: 1
      }),
    update: (userId: string, id: string, values: Partial<ChildProfile>) =>
      sqlBuilder.update({
        table: "child_profiles",
        values: postgresMappers.childToRow({
          id,
          userId,
          nickname: values.nickname ?? "",
          ageRange: values.ageRange ?? "5-6",
          interests: values.interests ?? [],
          preferredTone: values.preferredTone ?? "calm",
          bedtimeSafeDefault: values.bedtimeSafeDefault ?? true,
          createdAt: values.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }),
        where: { user_id: userId, id },
        returning: allColumns
      }),
    delete: (userId: string, id: string) =>
      sqlBuilder.delete({
        table: "child_profiles",
        where: { user_id: userId, id },
        returning: ["id"]
      })
  };

  stories = {
    insert: (story: Story) =>
      sqlBuilder.insert({
        table: "stories",
        values: postgresMappers.storyToRow(story),
        returning: allColumns
      }),
    listByUser: (userId: string) =>
      sqlBuilder.select({
        table: "stories",
        where: { user_id: userId },
        orderBy: [{ column: "created_at", direction: "desc" }]
      }),
    findById: (userId: string, id: string) =>
      sqlBuilder.select({
        table: "stories",
        where: { user_id: userId, id },
        limit: 1
      }),
    favorite: (userId: string, id: string, favorite: boolean) =>
      sqlBuilder.update({
        table: "stories",
        values: { favorite, updated_at: new Date().toISOString() },
        where: { user_id: userId, id },
        returning: allColumns
      }),
    listForChild: (userId: string, childProfileId: string) =>
      sqlBuilder.select({
        table: "stories",
        where: { user_id: userId, child_profile_id: childProfileId },
        orderBy: [{ column: "created_at", direction: "desc" }]
      })
  };

  coloringPages = {
    insert: (page: ColoringPage) =>
      sqlBuilder.insert({
        table: "coloring_pages",
        values: postgresMappers.coloringPageToRow(page),
        returning: allColumns
      }),
    listByStory: (userId: string, storyId: string) =>
      sqlBuilder.select({
        table: "coloring_pages",
        where: { user_id: userId, story_id: storyId },
        orderBy: [{ column: "created_at", direction: "desc" }]
      })
  };

  collections = {
    insert: (collection: StoryCollection) =>
      sqlBuilder.insert({
        table: "story_collections",
        values: postgresMappers.collectionToRow(collection),
        returning: allColumns
      }),
    listByUser: (userId: string) =>
      sqlBuilder.select({
        table: "story_collections",
        where: { user_id: userId },
        orderBy: [{ column: "created_at", direction: "desc" }]
      }),
    updateStories: (userId: string, id: string, storyIds: string[]) =>
      sqlBuilder.update({
        table: "story_collections",
        values: { story_ids: storyIds, updated_at: new Date().toISOString() },
        where: { user_id: userId, id },
        returning: allColumns
      })
  };

  routines = {
    upsert: (routine: RoutinePreferences) =>
      sqlBuilder.raw`
        insert into routine_preferences (
          id,
          user_id,
          child_profile_id,
          cadence,
          preferred_minutes,
          preferred_tone,
          include_coloring,
          quiet_start_minutes,
          lights_out_reminder,
          created_at,
          updated_at
        )
        values (
          ${routine.id},
          ${routine.userId},
          ${routine.childProfileId},
          ${routine.cadence},
          ${routine.preferredMinutes},
          ${routine.preferredTone},
          ${routine.includeColoring},
          ${routine.quietStartMinutes},
          ${routine.lightsOutReminder},
          ${routine.createdAt},
          ${routine.updatedAt}
        )
        on conflict (user_id)
        do update set
          child_profile_id = excluded.child_profile_id,
          cadence = excluded.cadence,
          preferred_minutes = excluded.preferred_minutes,
          preferred_tone = excluded.preferred_tone,
          include_coloring = excluded.include_coloring,
          quiet_start_minutes = excluded.quiet_start_minutes,
          lights_out_reminder = excluded.lights_out_reminder,
          updated_at = excluded.updated_at
        returning *
      `,
    findByUser: (userId: string) =>
      sqlBuilder.select({
        table: "routine_preferences",
        where: { user_id: userId },
        limit: 1
      })
  };

  audit = {
    insert: (entry: AuditLogEntry) =>
      sqlBuilder.insert({
        table: "audit_logs",
        values: postgresMappers.auditToRow(entry),
        returning: allColumns
      }),
    listByUser: (userId: string, limit = 50) =>
      sqlBuilder.select({
        table: "audit_logs",
        where: { user_id: userId },
        orderBy: [{ column: "created_at", direction: "desc" }],
        limit
      })
  };

  moderation = {
    insertReview: (review: StoryReviewRecord) =>
      sqlBuilder.insert({
        table: "story_reviews",
        values: postgresMappers.reviewToRow(review),
        returning: allColumns
      }),
    latestByStory: (userId: string, storyId: string) =>
      sqlBuilder.select({
        table: "story_reviews",
        where: { user_id: userId, story_id: storyId },
        orderBy: [{ column: "created_at", direction: "desc" }],
        limit: 1
      })
  };

  jobs = {
    insert: (job: GenerationJob) =>
      sqlBuilder.insert({
        table: "generation_jobs",
        values: postgresMappers.jobToRow(job),
        returning: allColumns
      }),
    claimNext: () =>
      sqlBuilder.raw`
        update generation_jobs
        set status = 'running', attempts = attempts + 1, started_at = now(), updated_at = now()
        where id = (
          select id
          from generation_jobs
          where status = 'queued'
          order by created_at asc
          for update skip locked
          limit 1
        )
        returning *
      `,
    complete: (userId: string, id: string, result: object) =>
      sqlBuilder.update({
        table: "generation_jobs",
        values: { status: "completed", result, updated_at: new Date().toISOString() },
        where: { user_id: userId, id },
        returning: allColumns
      }),
    fail: (userId: string, id: string, error: string) =>
      sqlBuilder.update({
        table: "generation_jobs",
        values: { status: "failed", error, updated_at: new Date().toISOString() },
        where: { user_id: userId, id },
        returning: allColumns
      })
  };

  reminders = {
    insert: (reminder: BedtimeReminder) =>
      sqlBuilder.insert({
        table: "bedtime_reminders",
        values: postgresMappers.reminderToRow(reminder),
        returning: allColumns
      }),
    due: (beforeIso: string) =>
      sqlBuilder.raw`
        select *
        from bedtime_reminders
        where status = 'scheduled'
          and scheduled_for_day <= ${beforeIso}
        order by scheduled_for_day asc, local_time asc
      `,
    listByUser: (userId: string) =>
      sqlBuilder.select({
        table: "bedtime_reminders",
        where: { user_id: userId },
        orderBy: [{ column: "scheduled_for", direction: "asc" }]
      })
  };
}

export const postgresQueryFactory = new PostgresQueryFactory();

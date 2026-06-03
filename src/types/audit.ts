export type AuditAction =
  | "auth.signup"
  | "auth.login"
  | "child.create"
  | "child.update"
  | "child.delete"
  | "story.generate"
  | "story.favorite"
  | "story.export"
  | "coloring.generate"
  | "billing.upgrade"
  | "collection.create"
  | "collection.story.add"
  | "routine.preferences.save"
  | "mood.checkin"
  | "reading.session"
  | "moderation.review"
  | "reminder.schedule"
  | "job.enqueue"
  | "job.retry"
  | "job.complete";

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  metadata: Record<string, string | number | boolean | null>;
  createdAt: string;
}

export interface AuditTimelineGroup {
  date: string;
  entries: AuditLogEntry[];
}

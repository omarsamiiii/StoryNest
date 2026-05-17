export type JobType = "story-generation" | "coloring-page" | "story-export" | "routine-plan";
export type JobStatus = "queued" | "running" | "completed" | "failed" | "canceled";

export interface GenerationJob {
  id: string;
  userId: string;
  type: JobType;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  payload: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: string;
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobTransition {
  jobId: string;
  from: JobStatus;
  to: JobStatus;
  reason: string;
  at: string;
}

export interface QueueSummary {
  queued: number;
  running: number;
  completed: number;
  failed: number;
  canceled: number;
}

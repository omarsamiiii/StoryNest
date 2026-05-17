import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { GenerationJob, JobStatus, JobType, QueueSummary } from "@/types/jobs";

export class GenerationJobRepository {
  async enqueue(input: {
    userId: string;
    type: JobType;
    payload: Record<string, unknown>;
    scheduledAt?: string;
    maxAttempts?: number;
  }): Promise<GenerationJob> {
    const timestamp = nowIso();
    const job: GenerationJob = {
      id: createId("job"),
      userId: input.userId,
      type: input.type,
      status: "queued",
      attempts: 0,
      maxAttempts: input.maxAttempts ?? 3,
      payload: input.payload,
      scheduledAt: input.scheduledAt ?? timestamp,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    getLocalStore().generationJobs.push(job);
    return job;
  }

  async listByUser(userId: string) {
    return getLocalStore()
      .generationJobs.filter((job) => job.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async findById(userId: string, id: string) {
    return getLocalStore().generationJobs.find((job) => job.userId === userId && job.id === id) ?? null;
  }

  async transition(
    userId: string,
    id: string,
    status: JobStatus,
    details: { result?: Record<string, unknown>; error?: string } = {}
  ) {
    const job = await this.findById(userId, id);
    if (!job) return null;
    const timestamp = nowIso();
    if (status === "running") {
      job.startedAt = timestamp;
      job.attempts += 1;
    }
    if (status === "completed" || status === "failed" || status === "canceled") {
      job.completedAt = timestamp;
    }
    job.status = status;
    job.result = details.result ?? job.result;
    job.error = details.error;
    job.updatedAt = timestamp;
    return job;
  }

  async nextQueued(userId: string) {
    const now = nowIso();
    return (
      getLocalStore()
        .generationJobs.filter(
          (job) => job.userId === userId && job.status === "queued" && job.scheduledAt <= now
        )
        .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))[0] ?? null
    );
  }

  async summary(userId: string): Promise<QueueSummary> {
    const jobs = await this.listByUser(userId);
    return jobs.reduce(
      (summary, job) => ({ ...summary, [job.status]: summary[job.status] + 1 }),
      { queued: 0, running: 0, completed: 0, failed: 0, canceled: 0 }
    );
  }
}
